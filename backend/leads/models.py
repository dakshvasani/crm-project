from django.db import models

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    source = models.CharField(max_length=100)
    status = models.CharField(max_length=30, default="New")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name