from ninja import ModelSchema, Schema
from django.contrib.auth.models import User
from dashboard.models import Club, Notification
from calendarapp.models import Event
from datetime import datetime
from typing import List, Optional

class UserSchema(ModelSchema):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ClubSchema(ModelSchema):
    president: Optional[UserSchema] = None
    
    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'logo', 'created_at']

class EventSchema(ModelSchema):
    user: UserSchema
    club: Optional[ClubSchema] = None
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'start_time', 'end_time', 'location', 'all_day']

class NotificationSchema(ModelSchema):
    club: ClubSchema
    
    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'timestamp']

class ErrorSchema(Schema):
    detail: str
