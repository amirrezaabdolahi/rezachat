from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from main_app.models import PrivateChat
from main_app.serializers import PrivateChatSerializer

# Create your views here.


class UserRegisterView(APIView):
    def post(self , request):
        ser_data = UserSerializer(data=request.data)
        if ser_data.is_valid():
            User.objects.create_user(
                username=ser_data.validated_data['username'],
                email=ser_data.validated_data['email'],
                password=ser_data.validated_data['password'],
            )
            return Response({"success": True, "data": ser_data.data } , status=status.HTTP_201_CREATED)
        return Response({"success": False, "error": ser_data.errors} , status=status.HTTP_400_BAD_REQUEST)
    

class UsersDatas(APIView):

    permission_classes = [IsAuthenticated]

    def get(self , request):
        user = request.user
        ser_user = UserSerializer(user)
        chats = PrivateChat.objects.get(user1 = user)   
        ser_chats = PrivateChatSerializer(chats , many=True)

        return Response({"user" : ser_user.data , "chats" : ser_chats})









