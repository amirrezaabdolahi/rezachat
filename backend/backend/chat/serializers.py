from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Chat, Message

# --------------------------
# User Serializer (basic)
# --------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


# --------------------------
# Message Serializer
# --------------------------
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "chat", "sender", "content", "timestamp"]
        read_only_fields = ["id", "timestamp", "sender"]


# --------------------------
# Chat Serializer
# --------------------------
class ChatSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    # messages = MessageSerializer(many=True, read_only=True)
    # last_message = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ["id", "name", "users", "created_at"]
        read_only_fields = ["id", "created_at" ]

    # def get_last_message(self, obj):
    #     last_msg = obj.messages.order_by("-timestamp").first()
    #     if last_msg:
    #         return MessageSerializer(last_msg).data
    #     return None


