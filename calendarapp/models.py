from django.db import models
from django.contrib.auth.models import User
from dashboard.models import Club

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='events', null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    all_day = models.BooleanField(default=False)

    def __str__(self):
        return self.title
