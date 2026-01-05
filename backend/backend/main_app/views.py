from django.db import models
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import PrivateChatSerializer, MessagesSerializer
from .models import PrivateChat


# Create your views here.

class ChatView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chat_id = request.query_params.get('chat')
        if not chat_id:
            return Response(
                {"success": False, "message": "chat id is required", "data": None},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Only allow access if the authenticated user is part of the chat
        chat = PrivateChat.objects.filter(
            models.Q(id=chat_id) & (models.Q(user1=request.user) | models.Q(user2=request.user))
        ).first()

        if not chat:
            return Response(
                {"success": False, "message": "chat doesn't exist or you don't have access", "data": None},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PrivateChatSerializer(chat)
        return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        user1 = request.user  # always the authenticated user
        user2_id = request.data.get("user2")

        if not user2_id:
            return Response(
                {"success": False, "message": "user2 is required", "data": None},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Ensure user2 exists
        user2 = get_object_or_404(User, id=user2_id)

        # Check if chat already exists
        chat = PrivateChat.objects.filter(
            models.Q(user1=user1, user2=user2) | models.Q(user1=user2, user2=user1)
        ).first()

        if chat:
            serializer = PrivateChatSerializer(chat)
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)

        # Create new chat with user1 always = request.user
        serializer = PrivateChatSerializer(data={"user1": user1.id, "user2": user2.id})
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class MessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response(
                {"success": True, "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"success": False, "message": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
