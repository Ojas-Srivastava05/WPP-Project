# dashboard/models.py
from django.db import models
from django.contrib.auth.models import User

class Club(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    logo = models.ImageField(upload_to='club_logos/', blank=True, null=True)
    president = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='managed_clubs')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clubs = models.ManyToManyField(Club, related_name='members', blank=True)

    def __str__(self):
        return self.user.username

class Notification(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='notifications')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user} in {self.club} - {self.message}"