from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework import status

# Create your views here.


class UserRegisterView(APIView):
    def post(self , request):
        ser_data = UserSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save()
            return Response({"success": True, "data": ser_data.data} , status=status.HTTP_201_CREATED)
        return Response({"success": False, "error": ser_data.errors} , status=status.HTTP_400_BAD_REQUEST)