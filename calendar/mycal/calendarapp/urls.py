# calendarapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.calendar_view, name='calendar'),
    path('add/', views.add_event, name='add_event'),
]

# eventsite/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('calendarapp.urls')),
]
urlpatterns = [
    path('', views.calendar_view, name='calendar'),
]
