from django.urls import path
from . import views


app_name = 'chat'
urlpatterns = [
    path('chats/' , views.UserChats.as_view(), name='chats'),
    path('chats/create/', views.CreateChat.as_view(), name='create_chat'),
    path('<int:pk>/', views.Chat.as_view(), name='chat'),
    path('<int:pk>/sent_message/', views.SentMessages.as_view(), name='chat'),
    path('<int:pk>/update/', views.UpdateChat.as_view(), name='update_chat'),
    path('<int:pk>/delete/', views.DeleteChat.as_view(), name='delete_chat'),

]