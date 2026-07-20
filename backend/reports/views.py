from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from leads.models import Lead
from tasks.models import Task


class ReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = {
            "summary": {
                "customers": Customer.objects.count(),
                "active_customers": Customer.objects.filter(status="Active").count(),
                "inactive_customers": Customer.objects.filter(status="Inactive").count(),

                "leads": Lead.objects.count(),
                "new_leads": Lead.objects.filter(status="New").count(),
                "contacted_leads": Lead.objects.filter(status="Contacted").count(),
                "qualified_leads": Lead.objects.filter(status="Qualified").count(),

                "tasks": Task.objects.count(),
                "completed_tasks": Task.objects.filter(status="Completed").count(),
                "pending_tasks": Task.objects.filter(status="Pending").count(),
                "in_progress_tasks": Task.objects.filter(status="In Progress").count(),
            }
        }

        return Response(data)