from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status

from .serializers import UserSerializer


# Create your views here.


class UserChats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        ser_data = UserSerializer(user)
        return Response(ser_data.data)