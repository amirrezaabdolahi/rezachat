from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE , related_name='sender')
    recevier = models.OneToOneRel(Chat, on_delete=models.CASCADE , related_name='message')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    