from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from .models import Club, UserProfile, Notification
from django.http import JsonResponse

from django.shortcuts import render

def send_notifications_view(request):
    # You can pass context to this view if needed
    return render(request, 'authentication/send_notification.html')

def dashboard_view(request):
    # Ensure the user is logged in
    if not request.user.is_authenticated:
        return redirect('login')  # Redirect to the login page

    # Retrieve or create the user profile
    profile, created = UserProfile.objects.get_or_create(user=request.user)

    # Handling POST requests for updating clubs
    if request.method == 'POST':
        selected = request.POST.getlist('clubs')  # Get selected clubs
        profile.clubs.set(selected)  # Update the user's clubs
        return redirect('dashboard')  # Redirect to the dashboard

    # Prepare context data for the dashboard
    context = {
        'all_clubs': Club.objects.all(),  # Get all clubs
        'user_clubs': profile.clubs.all()  # Get the clubs the user is a part of
    }
    return render(request, 'dashboard/dashboard.html', context)


def send_notification(request, club_id, message):
    # Get the club instance
    club = Club.objects.get(id=club_id)
    
    # Get all members of the club
    users_in_club = club.members.all()

    # Send the notification to each member of the club
    for user in users_in_club:
        Notification.objects.create(
            club=club,
            user=user,
            message=message,
        )

    # Redirect to the club notifications page after sending the notifications
    return render(request, 'dashboard/notifications.html', {'club': club})


@login_required
def notifications_view(request):
    # Get all unread notifications for the logged-in user
    notifications = Notification.objects.filter(user=request.user, is_read=False).order_by('-timestamp')
    
    # Render notifications page
    return render(request, 'dashboard/notifications.html', {'notifications': notifications})


@login_required
def send_notification_view(request, club_id):
    # Handle sending notifications via a POST request
    if request.method == 'POST':
        message = "Hi"  # The message you want to send to NEXUS members
        club = get_object_or_404(Club, id=club_id)  # Get the specific club

        # Check if the club is "NEXUS" (if you want to send the message only to NEXUS)
        if club.name == "NEXUS":
            # Send notification to all members of the NEXUS club
            for user in club.members.all():
                Notification.objects.create(
                    club=club,
                    user=user,
                    message=message
                )

            # Redirect to the notifications page after sending the notification
            return redirect('notifications')  # Adjust this URL as needed
        else:
            # Redirect to a different page if the club is not NEXUS
            return redirect('dashboard')  # or any other page