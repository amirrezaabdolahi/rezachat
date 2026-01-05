from rest_framework import serializers
from .models import PrivateChat , Messages



class MessagesSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    class Meta:
        model = Messages
        fields = ['id', 'chat', 'sender', 'message', 'created_at']

class PrivateChatSerializer(serializers.ModelSerializer):
    messages = MessagesSerializer(many=True, read_only=True)
    class Meta:
        model = PrivateChat
        fields = ['id', 'user1', 'user2', 'created_at', 'messages']












