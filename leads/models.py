from django.db import models
from django.db.models.base import Model

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100,unique=True,null=False)
    message = models.CharField(max_length=500,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)