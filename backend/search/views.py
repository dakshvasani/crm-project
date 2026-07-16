from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from leads.models import Lead
from tasks.models import Task


class GlobalSearch(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get("q", "")

        customers = Customer.objects.filter(
            name__icontains=query
        ).values(
            "id",
            "name",
            "email"
        )[:5]

        leads = Lead.objects.filter(
            name__icontains=query
        ).values(
            "id",
            "name",
            "email"
        )[:5]

        tasks = Task.objects.filter(
            title__icontains=query
        ).values(
            "id",
            "title",
            "status"
        )[:5]

        return Response({
            "customers": customers,
            "leads": leads,
            "tasks": tasks
        })