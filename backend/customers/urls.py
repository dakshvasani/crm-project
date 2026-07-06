from django.urls import path
from .views import CustomerListCreate, CustomerRetrieveUpdateDelete, DashboardStats

urlpatterns = [
    path("", CustomerListCreate.as_view(), name="customer-list"),
    path("dashboard/", DashboardStats.as_view(), name="dashboard-stats"),
    path("<int:pk>/", CustomerRetrieveUpdateDelete.as_view(), name="customer-detail"),
]