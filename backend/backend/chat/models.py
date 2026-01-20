from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError


# query sets and managers
class MessageQuerySet(models.QuerySet):
    def alive(self):
        return self.filter(is_deleted=False)


class MessageManager(models.Manager):
    def get_queryset(self):
        return MessageQuerySet(self.model, using=self._db).filter(is_deleted=False)

    def alive(self):
        return self.get_queryset()


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
        related_name="messages",
        db_index=True
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_messages",
        db_index=True
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    is_deleted = models.BooleanField(default=False)
    is_edited = models.BooleanField(default=False)

    objects = MessageManager()
    all_objects = models.Manager()

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["chat", "created_at"]),
            models.Index(fields=["sender"]),
        ]

    def clean(self):
        if not self.content.strip():
            raise ValidationError("Message cannot be empty")

    def delete(self, using=None, keep_parents=False):
        self.is_deleted = True
        self.save(update_fields=["is_deleted"])
