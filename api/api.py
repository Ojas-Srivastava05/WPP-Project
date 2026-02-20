from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
from api.endpoints import clubs_router, events_router, notifications_router, auth_extensions_router

# Instantiate the main Ninja API router using NinjaExtraAPI for JWT support
api = NinjaExtraAPI(
    title="Clubify API",
    description="REST API for the Clubify College Management App",
    version="1.0.0"
)

# Register the JWT auth controller directly
api.register_controllers(NinjaJWTDefaultController)

api.add_router("/clubs", clubs_router)
api.add_router("/events", events_router)
api.add_router("/notifications", notifications_router)
api.add_router("/auth", auth_extensions_router)

@api.get("/hello", tags=["Misc"])
def hello(request):
    return {"message": "Welcome to the Clubify API!"}

