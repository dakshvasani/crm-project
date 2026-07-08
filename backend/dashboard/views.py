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
            # Summary Cards
            "total_customers": Customer.objects.count(),
            "active_customers": Customer.objects.filter(
                status="Active"
            ).count(),
            "inactive_customers": Customer.objects.filter(
                status="Inactive"
            ).count(),

            "total_leads": Lead.objects.count(),
            "new_leads": Lead.objects.filter(
                status="New"
            ).count(),
            "contacted_leads": Lead.objects.filter(
                status="Contacted"
            ).count(),
            "qualified_leads": Lead.objects.filter(
                status="Qualified"
            ).count(),
            "lost_leads": Lead.objects.filter(
                status="Lost"
            ).count(),

            "total_tasks": Task.objects.count(),
            "pending_tasks": Task.objects.filter(
                status="Pending"
            ).count(),
            "in_progress_tasks": Task.objects.filter(
                status="In Progress"
            ).count(),
            "completed_tasks": Task.objects.filter(
                status="Completed"
            ).count(),

            # Charts
            "customer_chart": [
                {
                    "name": "Active",
                    "value": Customer.objects.filter(
                        status="Active"
                    ).count(),
                },
                {
                    "name": "Inactive",
                    "value": Customer.objects.filter(
                        status="Inactive"
                    ).count(),
                },
            ],

            "lead_chart": [
                {
                    "name": "New",
                    "value": Lead.objects.filter(
                        status="New"
                    ).count(),
                },
                {
                    "name": "Contacted",
                    "value": Lead.objects.filter(
                        status="Contacted"
                    ).count(),
                },
                {
                    "name": "Qualified",
                    "value": Lead.objects.filter(
                        status="Qualified"
                    ).count(),
                },
                {
                    "name": "Lost",
                    "value": Lead.objects.filter(
                        status="Lost"
                    ).count(),
                },
            ],

            "task_chart": [
                {
                    "name": "Pending",
                    "value": Task.objects.filter(
                        status="Pending"
                    ).count(),
                },
                {
                    "name": "In Progress",
                    "value": Task.objects.filter(
                        status="In Progress"
                    ).count(),
                },
                {
                    "name": "Completed",
                    "value": Task.objects.filter(
                        status="Completed"
                    ).count(),
                },
            ],

            # Recent Activity
            "recent_customers": list(
                Customer.objects.order_by("-created_at")
                .values(
                    "id",
                    "name",
                    "email",
                    "status",
                )[:5]
            ),

            "recent_leads": list(
                Lead.objects.order_by("-created_at")
                .values(
                    "id",
                    "name",
                    "email",
                    "status",
                )[:5]
            ),

            "upcoming_tasks": list(
                Task.objects.order_by("due_date")
                .values(
                    "id",
                    "title",
                    "status",
                    "due_date",
                )[:5]
            ),
        }

        return Response(data)