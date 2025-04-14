from django.urls import path
from . import views
urlpatterns = [
    path('livestream/',views.livestream, name='livestream'),
]
