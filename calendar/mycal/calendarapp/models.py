# calendarapp/models.py
from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255, blank=True)
    all_day = models.BooleanField(default=False)

    def __str__(self):
        return self.title
