from django.contrib import admin
from .models import Notification

# Create a custom admin interface for notifications
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('club', 'user', 'message', 'is_read', 'timestamp')  # What fields to display in the admin
    list_filter = ('club', 'is_read')  # Filters to sort by club or read/unread
    search_fields = ('user__username', 'club__name', 'message')  # Make it searchable by user, club, or message

# Register the Notification model with the custom admin interface
admin.site.register(Notification, NotificationAdmin)