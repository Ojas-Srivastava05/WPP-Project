# dashboard/models.py
from django.db import models
from django.contrib.auth.models import User

# dashboard/models.py
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default='No bio provided')  # Provide a default value
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    clubs = models.ManyToManyField('Club', related_name='members', blank=True)

    def __str__(self):
        return self.user.username

class Club(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Notification(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)  # To track whether the notification has been read
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user} in {self.club} - {self.message}"