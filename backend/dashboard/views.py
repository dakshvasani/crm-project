from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from leads.models import Lead
from tasks.models import Task
from django.utils import timezone
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes

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

            "recent_activity": [
                {
                    "type": "Customer",
                    "message": f"Customer '{c.name}' added",
                    "date": c.created_at,
                }
                for c in Customer.objects.order_by("-created_at")[:5]
            ],
            
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
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def global_search(request):

    query = request.GET.get("q", "")

    customers = Customer.objects.filter(
        Q(name__icontains=query) |
        Q(email__icontains=query)
    )[:5]

    leads = Lead.objects.filter(
        Q(name__icontains=query) |
        Q(email__icontains=query)
    )[:5]

    tasks = Task.objects.filter(
        Q(title__icontains=query)
    )[:5]

    return Response({

        "customers": [
            {
                "id": c.id,
                "name": c.name,
                "email": c.email,
            }
            for c in customers
        ],

        "leads": [
            {
                "id": l.id,
                "name": l.name,
                "email": l.email,
            }
            for l in leads
        ],

        "tasks": [
            {
                "id": t.id,
                "title": t.title,
                "status": t.status,
            }
            for t in tasks
        ],
    })