from django.urls import path 
from rest_framework.authtoken import views as authView
from . import views



app_name="accounts"


urlpatterns = [
    path('register/' , views.UserRegisterView.as_view() ),
    path("api-token-auth/" , authView.obtain_auth_token ),
]


