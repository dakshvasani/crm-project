from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer
from notifications.utils import create_notification


class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        task = serializer.save()

        create_notification(
            f"New task '{task.title}' was created."
        )


class TaskRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        task = serializer.save()

        create_notification(
            f"Task '{task.title}' was updated."
        )

    def perform_destroy(self, instance):
        create_notification(
            f"Task '{instance.title}' was deleted."
        )

        instance.delete()