from django.shortcuts import render, redirect
from .models import Event
from django.contrib.auth.decorators import login_required

@login_required
def calendar_view(request):
    # For now, just show events the user created or events for their clubs.
    user_events = Event.objects.filter(user=request.user)
    return render(request, 'calendarapp/calendar.html', {'events': user_events})

@login_required
def add_event(request):
    # This will be refined later with a proper form
    pass
