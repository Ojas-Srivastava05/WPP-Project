from django.apps import AppConfig
from django.apps import AppConfig

class DashboardConfig(AppConfig):
    name = 'dashboard'

    def ready(self):
        import dashboard.signals
from django.apps import AppConfig

class DashboardConfig(AppConfig):
    name = 'dashboard'
    verbose_name = 'Dashboard'

    def ready(self):
        import dashboard.signals
