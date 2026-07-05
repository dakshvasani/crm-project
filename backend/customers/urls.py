from django.urls import path
from .views import CustomerListCreate, CustomerRetrieveUpdateDelete

urlpatterns = [
    path("", CustomerListCreate.as_view(), name="customer-list"),
    path("<int:pk>/", CustomerRetrieveUpdateDelete.as_view(), name="customer-detail"),
]