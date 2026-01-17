from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta : 
        model = User
        fields = ['username' , 'email', 'password']
        extra_kwargs = {"username" : {"required" : True} , "email" : {"required" : True} , 'password': {'write_only': True}}


