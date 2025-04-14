# calendarapp/views.py
from django.shortcuts import render, redirect
from .forms import EventForm
from .models import Event
from django.contrib.auth.decorators import login_required

@login_required
def calendar_view(request):
    events = Event.objects.filter(user=request.user)
    return render(request, 'calendarapp/calendar.html', {'events': events})

@login_required
def add_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user
            event.save()
            return redirect('calendar')
    else:
        form = EventForm()
    return render(request, 'calendarapp/add_event.html', {'form': form})
def calendar_view(request):
    return render(request, 'calendarapp/calendar.html')  # update path if needed
# Create your views here.
from django.shortcuts import render

def calendar_view(request):
    return render(request, 'calendarapp/calendar.html')  # Path to your template
