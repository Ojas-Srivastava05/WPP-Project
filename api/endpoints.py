from ninja import Router
from ninja_jwt.authentication import JWTAuth
from typing import List, Optional
from django.shortcuts import get_object_or_404
from .schemas import ClubSchema, ErrorSchema, EventSchema, NotificationSchema
from dashboard.models import Club, Notification
from calendarapp.models import Event

# 2. Clubs Router
clubs_router = Router(tags=["Clubs"])

@clubs_router.get("/", response=List[ClubSchema])
def list_clubs(request):
    """Get all available clubs"""
    return Club.objects.all()

@clubs_router.get("/{int:club_id}", response={200: ClubSchema, 404: ErrorSchema})
def get_club(request, club_id: int):
    """Get a specific club by ID"""
    try:
        return Club.objects.get(id=club_id)
    except Club.DoesNotExist:
        return 404, {"detail": "Club not found"}

@clubs_router.post("/{int:club_id}/join", auth=JWTAuth(), response={200: dict, 404: ErrorSchema})
def join_club(request, club_id: int):
    """Join a club (Requires Authentication)"""
    try:
        club = Club.objects.get(id=club_id)
        profile = request.user.userprofile
        profile.clubs.add(club)
        return 200, {"success": True, "message": f"Successfully joined {club.name}"}
    except Club.DoesNotExist:
        return 404, {"detail": "Club not found"}

# 3. Events (Calendar) Router
events_router = Router(tags=["Calendar Events"])

@events_router.get("/", response=List[EventSchema])
def list_events(request):
    """Get all events"""
    return Event.objects.all().order_by('start_time')

@events_router.post("/", auth=JWTAuth(), response={201: EventSchema})
def create_event(request, payload: EventSchema):
    """Create a new event"""
    event = Event.objects.create(
        user=request.user,
        title=payload.title,
        description=payload.description,
        start_time=payload.start_time,
        end_time=payload.end_time,
        location=payload.location,
        all_day=payload.all_day,
        club_id=payload.club.id if payload.club else None
    )
    return 201, event

# 4. Notifications Router
notifications_router = Router(tags=["Notifications"])

@notifications_router.get("/", auth=JWTAuth(), response=List[NotificationSchema])
def list_notifications(request):
    """Get all notifications for the authenticated user"""
    return Notification.objects.filter(user=request.user).order_by('-timestamp')

@notifications_router.post("/{int:notif_id}/read", auth=JWTAuth(), response={200: dict, 404: ErrorSchema})
def mark_read(request, notif_id: int):
    """Mark a notification as read"""
    try:
        notif = Notification.objects.get(id=notif_id, user=request.user)
        return 200, {"success": True, "message": "Notification marked as read"}
    except Notification.DoesNotExist:
        return 404, {"detail": "Notification not found"}

# 5. Auth Extensions Router
from ninja import Schema
from django.contrib.auth.models import User
import firebase_admin
from firebase_admin import credentials, messaging
from pathlib import Path
import os

# Initialize Firebase Admin once
from django.conf import settings
CRED_PATH = Path(os.environ.get('FIREBASE_CREDENTIALS_PATH', settings.BASE_DIR / 'clubify-9e6ed-firebase-adminsdk-fbsvc-1dee9e0c36.json'))
if CRED_PATH.exists() and not firebase_admin._apps:
    cred = credentials.Certificate(str(CRED_PATH))
    firebase_admin.initialize_app(cred)

class RegisterSchema(Schema):
    username: str
    password: str

auth_extensions_router = Router(tags=["Auth Extensions"])

@auth_extensions_router.post("/register", auth=None, response={201: dict, 400: ErrorSchema})
def register_user(request, payload: RegisterSchema):
    """Register a new user"""
    if User.objects.filter(username=payload.username).exists():
        return 400, {"detail": "Username already exists."}
    
    user = User.objects.create_user(
        username=payload.username,
        password=payload.password
    )
    # Also create the UserProfile that is expected
    from dashboard.models import UserProfile
    UserProfile.objects.get_or_create(user=user)
    
    return 201, {"success": True, "message": "Account created successfully!"}


# 6. Admin Panel Router
admin_router = Router(tags=["Admin Operations"])

class BroadcastSchema(Schema):
    title: str
    message: str
    target_club_id: Optional[int] = None # None means all users

@admin_router.post("/broadcast", auth=JWTAuth(), response={200: dict, 403: ErrorSchema, 500: ErrorSchema})
def broadcast_notification(request, payload: BroadcastSchema):
    """Send a push notification to members of a club (or everyone) and save to DB."""
    if not request.user.is_superuser:
        return 403, {"detail": "Admin privileges required."}
    
    target_users = []
    if payload.target_club_id:
        try:
            club = Club.objects.get(id=payload.target_club_id)
            target_users = [p.user for p in club.members.all()]
        except (Club.DoesNotExist, AttributeError):
            target_users = [] # Some clubs might not have members easily queryable, fallback to all users in a real app, but for now let's just create generic notifications
    
    if not target_users:
        target_users = User.objects.all()
        
    club_ref = Club.objects.first() # Just associate it with the first club or None if your model allows it
    if payload.target_club_id:
        club_ref = Club.objects.filter(id=payload.target_club_id).first()

    # Create DB Notifications
    for u in target_users:
        if club_ref:
            Notification.objects.create(
                user=u,
                club=club_ref,
                message=f"{payload.title}: {payload.message}",
                is_read=False
            )
            
    # Send Firebase Push Notification via topic
    if firebase_admin._apps:
        topic = f"club_{payload.target_club_id}" if payload.target_club_id else "all_users"
        fcm_msg = messaging.Message(
            notification=messaging.Notification(
                title=payload.title,
                body=payload.message,
            ),
            topic=topic,
        )
        try:
            response = messaging.send(fcm_msg)
            return 200, {"success": True, "message": f"Broadcast sent! FCM message ID: {response}"}
        except Exception as e:
            return 500, {"detail": str(e)}
            
    return 200, {"success": True, "message": "Notifications saved to DB. Firebase Push disabled (SDK not initialized)."}
