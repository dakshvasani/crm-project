from django.urls import path
from .views import LeadListCreate, LeadRetrieveUpdateDelete

urlpatterns = [
    path("", LeadListCreate.as_view(), name="lead-list"),
    path("<int:pk>/", LeadRetrieveUpdateDelete.as_view(), name="lead-detail"),
]