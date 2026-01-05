from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User


# Create your views here.


class UserAPIView(APIView):

    serializer_class = UserSerializer

    def get(self, request):
        users = User.objects.all()
        ser_data = UserSerializer(users, many=True)
        return Response({"success": True, "data": ser_data.data} , status=status.HTTP_200_OK)


    def post(self, request):
        ser_data = UserSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save()
            return Response({"success": True, "data": ser_data.data} , status=status.HTTP_201_CREATED)
        return Response({"success": False, "error": ser_data.errors} , status=status.HTTP_400_BAD_REQUEST)







