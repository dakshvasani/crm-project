from django.urls import path
from .views import TaskListCreate, TaskRetrieveUpdateDelete

urlpatterns = [
    path("", TaskListCreate.as_view()),
    path("<int:pk>/", TaskRetrieveUpdateDelete.as_view()),
]