from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, ChatSerializer

class UserChats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        chats = user.chats.all()

        ser_chat = ChatSerializer(chats, many=True)
        ser_data = UserSerializer(user)

        return Response({
            "user": ser_data.data,    # ← حتما باید .data باشه
            "chats": ser_chat.data    # ← حتما باید .data باشه
        })

# class CreateChat(APIView):
#     permission_classes=[IsAuthenticated]

