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
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["id", "created_at", "sender"]


# --------------------------
# Sent Message Serializer
# --------------------------

class SentMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ["id", "created_at", "sender"]

        def validate_content(self, value):
            if not value.strip():
                raise serializers.ValidationError("Content cannot be empty")
            return value


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
        read_only_fields = ["id", "created_at"]

    # def get_last_message(self, obj):
    #     last_msg = obj.messages.order_by("-timestamp").first()
    #     if last_msg:
    #         return MessageSerializer(last_msg).data
    #     return None


# --------------------------
# Chat creating Serializer
# --------------------------
class ChatCreateSerializer(serializers.Serializer):
    target_id = serializers.IntegerField()

    def validate_target_id(self, value):
        request = self.context["request"]

        if value == request.user.id:
            raise serializers.ValidationError("نمی‌تونی با خودت چت بسازی")

        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("کاربر مورد نظر وجود ندارد")

        return value

    def create(self, validated_data):
        user = self.context["request"].user
        target_id = validated_data["target_id"]
        target_user = User.objects.get(id=target_id)

        # جلوگیری از duplicate chat
        chat = Chat.objects.filter(users=user).filter(users=target_user).first()
        if chat:
            return chat

        chat = Chat.objects.create()
        chat.users.add(user, target_user)
        return chat