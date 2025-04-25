from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('send-notification/<int:club_id>/', views.send_notification_view, name='send_notification'),
    path('send-notification/', views.send_notifications_view, name='send_notifications'),
    path('notifications/', views.notifications_view, name='notifications'),
]