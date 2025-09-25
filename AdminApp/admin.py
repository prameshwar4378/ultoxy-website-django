from django.contrib import admin

# Register your models here.
from .models import BlogPost, ContactInquiry

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author_name", "date")
    list_filter = ("category", "date")
    search_fields = ("title", "description", "author_name")
    ordering = ("-date",)


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "subject", "message")
    ordering = ("-created_at",)