from django.shortcuts import render, redirect
from .models import Club, UserProfile
from django.contrib.auth.decorators import login_required

@login_required
def dashboard_view(request):
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

# Create your views here.
