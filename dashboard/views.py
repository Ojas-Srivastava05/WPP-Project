from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Club, UserProfile
from django.shortcuts import render
from .models import Club, Notification
from django.http import JsonResponse


def dashboard_view(request):
    if not request.user.is_authenticated:
        return redirect('login')  # Use the name of your home page URL pattern

    profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        selected = request.POST.getlist('clubs')
        profile.clubs.set(selected)
        return redirect('dashboard')

    context = {
        'all_clubs': Club.objects.all(),
        'user_clubs': profile.clubs.all()
    }
    
    
def send_notification(request, club_id, message):
    club = Club.objects.get(id=club_id)
    users_in_club = club.members.all()  # assuming you have a members relationship

    for user in users_in_club:
        Notification.objects.create(
            club=club,
            user=user,
            message=message,
        )
    
    return render(request, 'dashboard/club_notifications.html', {'club': club})

def notifications_view(request):
    notifications = Notification.objects.filter(user=request.user, is_read=False)
    return render(request, 'dashboard/notifications.html', {'notifications': notifications})

def mark_as_read(request, notification_id):
    notification = Notification.objects.get(id=notification_id)
    notification.is_read = True
    notification.save()
    return JsonResponse({"status": "success"})

    return render(request, 'dashboard/dashboard.html', context)