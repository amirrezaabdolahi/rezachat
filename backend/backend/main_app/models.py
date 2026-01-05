from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class PrivateChat(models.Model):
    user1 = models.ForeignKey(User , related_name="chats_started" , on_delete=models.CASCADE)
    user2 = models.ForeignKey(User , related_name="chats_received" , on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user1" , "user2")

    def save(self , *args, **kwargs):
        # make the smaller id user 1 and bigger one user 2
        if self.user1.id > self.user2.id:
            self.user1 , self.user2 = self.user2, self.user1
        super().save(*args , **kwargs)

    def __str__(self):
        return f"{self.user1} - {self.user2} : {self.created_at} chatID : {self.id}"

class Messages(models.Model):
    chat = models.ForeignKey(PrivateChat , on_delete=models.CASCADE , related_name="messages")
    message = models.TextField()
    sender = models.ForeignKey(User , on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.chat} - {self.sender} : {self.message}"