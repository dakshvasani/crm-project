from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from leads.models import Lead
from tasks.models import Task


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = {
            "customers": Customer.objects.count(),
            "active_customers": Customer.objects.filter(status="Active").count(),
            "inactive_customers": Customer.objects.filter(status="Inactive").count(),

            "leads": Lead.objects.count(),
            "new_leads": Lead.objects.filter(status="New").count(),

            "tasks": Task.objects.count(),
            "pending_tasks": Task.objects.filter(status="Pending").count(),
            "completed_tasks": Task.objects.filter(status="Completed").count(),

            "recent_customers": list(
                Customer.objects.order_by("-created_at")
                .values("id", "name", "email")[:5]
            ),

            "recent_leads": list(
                Lead.objects.order_by("-created_at")
                .values("id", "name", "email")[:5]
            ),

            "upcoming_tasks": list(
                Task.objects.order_by("due_date")
                .values("id", "title", "status", "due_date")[:5]
            ),
        }

        return Response(data)