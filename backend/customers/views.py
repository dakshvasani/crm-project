from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class CustomerListCreate(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


class CustomerRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class DashboardStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            "customers": Customer.objects.count(),
            "active_customers": Customer.objects.filter(status="Active").count(),
            "inactive_customers": Customer.objects.filter(status="Inactive").count(),
        }

        return Response(data)