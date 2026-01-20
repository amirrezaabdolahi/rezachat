from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Chat(models.Model):
    users = models.ManyToManyField(User, related_name="chats")
    name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} {self.id} - {self.created_at} "


class Message(models.Model):
    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_messages"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["chat", "created_at"]),
        ]
    #
    # def __str__(self):
    #     return f"< {self.sender} > in < {self.chat.name} > at < {self.timestamp} >"
