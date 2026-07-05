from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer


class CustomerListCreate(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


class CustomerRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]