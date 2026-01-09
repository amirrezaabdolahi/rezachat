from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_images/', default='default.jpg' , null=True , blank=True)

    def __str__(self):
        return f"{self.user.username} Profile"
    


# signals dowblow

def create_profile(sender, instance, created, **kwargs):
     if created:
         user_profile = Profile(user=instance)
         user_profile.save()

post_save.connect(create_profile , sender=User)
