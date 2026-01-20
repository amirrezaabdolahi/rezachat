from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, ChatSerializer, MessageSerializer, ChatCreateSerializer
from django.shortcuts import get_object_or_404


class UserChats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        chats = user.chats.all()

        ser_chat = ChatSerializer(chats, many=True)
        ser_data = UserSerializer(user)

        return Response({
            "user": ser_data.data,
            "chats": ser_chat.data,
        })


class CreateChat(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        chat_create_serializer = ChatCreateSerializer(data=request.data)
        if chat_create_serializer.is_valid():
            chat_create_serializer.save()
            return Response({"success": True, "data": chat_create_serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "data": chat_create_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class Chat(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request , pk):
        user = request.user
        chat = user.chats.get(pk=pk)
        messages = chat.messages.all()
        ser_chat = ChatSerializer(chat)
        ser_messages = MessageSerializer(messages , many=True)
        return Response({'success': True, 'data': ser_chat.data , 'messages': ser_messages.data})


class UpdateChat(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        user = request.user
        chat = get_object_or_404(
            user.chats,
            pk=pk
        )

        ser_chat = ChatSerializer(chat, data=request.data , partial=True)
        if ser_chat.is_valid():
            ser_chat.save()
            return Response({"success": True, "data": ser_chat.data } , status=status.HTTP_200_OK)
        return Response({"success": False, "data": ser_chat.errors} , status=status.HTTP_400_BAD_REQUEST)


class DeleteChat(APIView):
    pass
