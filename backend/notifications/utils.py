from .models import Notification


def create_notification(message):
    Notification.objects.create(
        message=message
    )