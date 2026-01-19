from django.urls import path
from . import views


app_name = 'chat'
urlpatterns = [
    path('chats/' , views.UserChats.as_view(), name='chats'),
]