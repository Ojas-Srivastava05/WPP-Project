from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.index,name='home'),
    path('second/', views.second_page, name='second_page'),
    path('login/', views.login_view, name='login'),
    path('signup/',views.signup,name="signup"),
    path('signin/', views.signin_view, name='signin'),
]