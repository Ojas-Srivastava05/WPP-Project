from ninja import Router
from ninja_jwt.authentication import JWTAuth
from typing import List
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
