from django.contrib import admin

# Register your models here.
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "company", "status", "created_at")
    search_fields = ("name", "email", "company")
    list_filter = ("status",)