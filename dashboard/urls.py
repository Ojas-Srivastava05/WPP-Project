from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('send_notification/<int:club_id>/', views.send_notification, name='send_notification'),
    path('notifications/', views.notifications_view, name='notifications'),
    path('mark_as_read/<int:notification_id>/', views.mark_as_read, name='mark_as_read'),
]