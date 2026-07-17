from django.urls import path
from .views import DashboardView
from .views import global_search

urlpatterns = [
    path("", DashboardView.as_view(), name="dashboard"),
    path("search/", global_search),
]