from django.contrib.auth.models import User
from django.db import models

# Create your models here.



class Chat(models.Model):
    users = models.ManyToManyField(User)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


