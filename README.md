# Clubify

## Overview
Clubify is a next-generation platform for campus organizations to thrive. It connects students to the heartbeat of campus life—allowing them to discover elite student organizations, view upcoming events, and stay in the loop via a beautiful, premium "neon" interface.

## Architecture
This project utilizes a modern decoupled architecture:
- **Frontend**: Next.js 14+ with React, Tailwind CSS v4, and Framer Motion.
- **Backend**: Django 5.2 with Django Ninja (FastAPI-like REST framework).
- **Authentication**: JWT (JSON Web Tokens) via `django-ninja-jwt`.
- **Database**: SQLite (Development out-of-the-box).

## Features
- **Premium UI/UX**: Designed meticulously with custom neon branding, glassmorphism, and seamless micro-animations.
- **Dynamic Dashboard**: Personalized feeds showing trending clubs and saved organizations.
- **Calendar Integration**: Client-side `@fullcalendar/react` interface mapping directly to the Django API event models.
- **API First**: The backend acts entirely as an independent JSON microservice, separated cleanly from the client application.

## Getting Started

### Prerequisites
- Node.js 20+
- Python 3.10+

### 1. Run the Backend API
```bash
# In the root directory (WPP-Project)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
The Django API will run at `http://localhost:8000/api`. You can view the swagger docs at `http://localhost:8000/api/docs`.

### 2. Run the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:3000`.

## Admin Access
To access the generic Django Admin to manage database models manually:
1. Create a superuser:
```bash
python manage.py createsuperuser
```
2. Navigate to `http://localhost:8000/admin`.
*(Note: An augmented Admin Notification portal is planned).*

## License
© 2024 Clubify • Premium Campus Network