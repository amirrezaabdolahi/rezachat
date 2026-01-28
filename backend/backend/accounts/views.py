from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


# Create your views here.


class Register(APIView):
    def post(self, request):
        user_data = request.data
        ser_data = UserRegisterSerializer(data=user_data)
        if ser_data.is_valid():
            User.objects.create_user(**ser_data.validated_data)
            return Response({"success": True, "data": ser_data.validated_data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "data": ser_data.errors}, status=status.HTTP_400_BAD_REQUEST)


class SearchUser(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get("q", "").strip()

        if not query or len(query) < 2:
            return Response({
                "success": True,
                "data": []
            })

        users = User.objects.filter(
            Q(username__icontains=query)
        ).exclude(id=request.user.id)[:10]

        return Response({
            "success": True,
            "data": [
                {
                    "id": u.id,
                    "username": u.username
                } for u in users
            ]
        })
