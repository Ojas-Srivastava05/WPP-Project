from django.shortcuts import render, redirect
from .models import Club, UserProfile
from django.contrib.auth.decorators import login_required

@login_required
def dashboard_view(request):
    # Get or create the user's profile
    profile, created = UserProfile.objects.get_or_create(user=request.user)

    # Handle the POST request where clubs are selected
    if request.method == 'POST':
        selected = request.POST.getlist('clubs')  # Get list of selected club IDs
        profile.clubs.set(selected)  # Update user's clubs
        return redirect('dashboard')  # Redirect to avoid re-posting on refresh

    # Fetch all clubs and the clubs associated with the user
    context = {
        'all_clubs': Club.objects.all(),  # All clubs in the database
        'user_clubs': profile.clubs.all()  # Clubs that the user is a member of
    }

    return render(request, 'dashboard/dashboard.html', context)