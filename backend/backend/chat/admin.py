from django.contrib import admin

from .models import Chat, Message

# Register your models here.

admin.site.register(Chat)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("id", "chat", "sender", "is_deleted", "created_at")
    list_filter = ("is_deleted", "created_at")
    search_fields = ("content",)

    def has_delete_permission(self, request, obj=None):
        return False
