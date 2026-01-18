from django.urls import path 
from . import views



app_name="accounts"


urlpatterns = [
    path('register/' , views.UserRegisterView.as_view() ),
    path('user-data/' , views.UsersDatas.as_view())
]


