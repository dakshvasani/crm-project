from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Customer
from .serializers import CustomerSerializer
from notifications.utils import create_notification


class CustomerListCreate(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        customer = serializer.save()

        create_notification(
            f"New customer '{customer.name}' was added."
        )


class CustomerRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        customer = serializer.save()

        create_notification(
            f"Customer '{customer.name}' was updated."
        )

    def perform_destroy(self, instance):
        create_notification(
            f"Customer '{instance.name}' was deleted."
        )

        instance.delete()


class DashboardStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            "customers": Customer.objects.count(),
            "active_customers": Customer.objects.filter(status="Active").count(),
            "inactive_customers": Customer.objects.filter(status="Inactive").count(),
        }

        return Response(data)