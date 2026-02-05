from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, ChatSerializer, MessageSerializer, ChatCreateSerializer, SentMessageSerializer
from django.shortcuts import get_object_or_404
from .models import Message


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
        serializer = ChatCreateSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            chat = serializer.save()

            return Response(
                {
                    "success": True,
                    "data": ChatSerializer(chat).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "success": False,
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
        
        

class Chat(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        chat = get_object_or_404(
            request.user.chats,
            pk=pk
        )

        messages = chat.messages.all()

        return Response(
            {
                "success": True,
                "chat": ChatSerializer(chat).data,
                "messages": MessageSerializer(messages, many=True).data,
            }
        )


class UpdateChat(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        chat = get_object_or_404(
            user.chats,
            pk=pk
        )

        ser_chat = ChatSerializer(chat, data=request.data, partial=True)
        if ser_chat.is_valid():
            ser_chat.save()
            return Response({"success": True, "data": ser_chat.data}, status=status.HTTP_200_OK)
        return Response({"success": False, "data": ser_chat.errors}, status=status.HTTP_400_BAD_REQUEST)


class DeleteChat(APIView):
    def post(self, request, pk):
        user = request.user
        chat = get_object_or_404(user.chats, pk=pk)
        chat.delete()
        return Response({"success": True, "data": chat.data}, status=status.HTTP_200_OK)


# class AddMember(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request, pk):
#         user = request.user
#         chat = get_object_or_404(user.chats, pk=pk)
#         users = request.data['users']users


class SentMessages(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        chat = get_object_or_404(user.chats, pk=pk)

        ser_message = SentMessageSerializer(data={
            **request.data,
            "chat": pk
        })

        if ser_message.is_valid():
            message = ser_message.save(
                sender=user,
                chat=chat,
            )
            return Response({"success": True, "data": SentMessageSerializer(message).data},
                            status=status.HTTP_201_CREATED)
        return Response({"success": False, "data": ser_message.errors}, status=status.HTTP_400_BAD_REQUEST)


class DeleteMessages(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        message = get_object_or_404(
            Message.objects,
            pk=pk,
            sender=user
        )
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
