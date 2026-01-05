from django.urls import path
from . import views

app_name = 'main_app'
urlpatterns = [
    path("pv/" , views.ChatView.as_view() ),
    path("message/" , views.MessageView.as_view() ),
]