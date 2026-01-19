from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from rest_framework import status


# Create your views here.


class Register(APIView):
    def post(self, request):
        user_data = request.data
        ser_data = UserRegisterSerializer(data=user_data)
        if ser_data.is_valid():
            User.objects.create_user(**ser_data.validated_data)
            return Response({"success": True, "data": ser_data.validated_data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "data": ser_data.errors}, status=status.HTTP_400_BAD_REQUEST)
