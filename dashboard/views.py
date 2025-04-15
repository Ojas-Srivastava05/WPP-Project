from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Club, UserProfile

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

    return render(request, 'dashboard/dashboard.html', context)