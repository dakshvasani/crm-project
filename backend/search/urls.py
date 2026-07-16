from django.urls import path
from .views import GlobalSearch

urlpatterns = [
    path("", GlobalSearch.as_view()),
]