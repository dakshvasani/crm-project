from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Lead
from .serializers import LeadSerializer
from notifications.utils import create_notification


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        lead = serializer.save()

        create_notification(
            f"New lead '{lead.name}' was added."
        )


class LeadRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        lead = serializer.save()

        create_notification(
            f"Lead '{lead.name}' was updated."
        )

    def perform_destroy(self, instance):
        create_notification(
            f"Lead '{instance.name}' was deleted."
        )

        instance.delete()