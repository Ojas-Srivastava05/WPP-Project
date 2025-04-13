from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.urls import reverse  # Import reverse
from django.views import View
from django.contrib.auth import logout
from django.contrib import messages

# Home Page
def index(request):
    return render(request, "authentication/index.html")

def second_page(request):
    return render(request,'authentication/Second Page.html')

def login_view(request):
    return render(request,'authentication/login.html')

# Sign-Up View
def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        firstname = request.POST.get("firstname")
        lastname = request.POST.get("lastname")
        mobile = request.POST.get("mobile")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('signup')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        myuser = User.objects.create_user(username=username, email=email, password=password)
        myuser.first_name = firstname
        myuser.last_name = lastname
        myuser.save()

        messages.success(request, "Your account has been successfully created.")
        return redirect('second_page')

    if request.method == "GET":
        storage = get_messages(request)
        for _ in storage:
            pass  # ✅ Now safely inside the GET block

    return render(request, 'authentication/signup.html')

# Sign-In View
from django.contrib.messages import get_messages
from django.contrib.auth import authenticate, login

def signin_view(request):
    if request.method == "GET":
        # Clear old messages (optional, for cleaner UX)
        storage = get_messages(request)
        for _ in storage:
            pass
        return render(request, 'authentication/signin.html')

    elif request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "Successfully signed in!")
            return redirect('second_page')
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, 'authentication/signin.html')

from django.contrib.auth.views import LogoutView

class CustomLogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('home')  # This does the redirection