from rest_framework import serializers
from django.contrib.auth.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}

    def validate(self, data):
        username = data['username']
        if username == 'admin':
            raise serializers.ValidationError("Username cannot be 'admin'")
        if len(username) <= 3:
            raise serializers.ValidationError("Username cannot be less than 4 characters")
        return data

class UserLoginSerializer(serializers.Serializer):
    pass

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
