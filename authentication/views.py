from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login

# Home Page
def home(request):
    return render(request, "authentication/index.html")

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
        return redirect('signin')

    return render(request, "authentication/signup.html")

# Sign-In View
def signin(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, "Successfully signed in.")
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")
            return redirect('signin')

    return render(request, "authentication/signin.html")

# Sign-Out Placeholder
def signout(request):
    pass