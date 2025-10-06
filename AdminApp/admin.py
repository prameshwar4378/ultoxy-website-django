from django.contrib import admin

# Register your models here.
from .models import BlogPost, ContactInquiry, Projects, BlogPhotosVideos
 
@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "subject", "message")
    ordering = ("-created_at",)


 
from django.contrib import admin
from django.utils.html import format_html
from .models import BlogPost, BlogPhotosVideos


class BlogPhotosVideosInline(admin.TabularInline):
    model = BlogPhotosVideos
    extra = 1  # allows adding one extra empty row by default
    fields = ("image_preview", "image", "video_link", "video_preview")
    readonly_fields = ("image_preview", "video_preview")

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="60" style="object-fit:cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Image Preview"

    def video_preview(self, obj):
        if obj.video_link:
            return format_html(
                '<iframe width="200" height="120" src="{}" frameborder="0" allowfullscreen></iframe>',
                obj.get_youtube_embed_url()
            )
        return "No Video"
    video_preview.short_description = "Video Preview"


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "date", "is_active", "thumbnail_preview", "author_name")
    list_filter = ("category", "is_active", "date")
    search_fields = ("title", "content", "author_name")
    ordering = ("-date",)
    inlines = [BlogPhotosVideosInline]

    fieldsets = (
        ("Blog Info", {
            "fields": ("title", "category", "date", "content", "is_active")
        }),
        ("Thumbnail & Author", {
            "fields": ("thumbnail", "thumbnail_preview", "author_name", "author_image", "author_preview")
        }),
    )
    readonly_fields = ("thumbnail_preview", "author_preview")

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" width="120" height="80" style="object-fit:cover;" />', obj.thumbnail.url)
        return "No Thumbnail"
    thumbnail_preview.short_description = "Thumbnail Preview"

    def author_preview(self, obj):
        if obj.author_image:
            return format_html('<img src="{}" width="60" height="60" style="border-radius:50%;" />', obj.author_image.url)
        return "No Author Image"
    author_preview.short_description = "Author Preview"


@admin.register(BlogPhotosVideos)
class BlogPhotosVideosAdmin(admin.ModelAdmin):
    list_display = ("blog", "image_preview", "video_link", "video_thumbnail_preview")
    search_fields = ("blog__title", "video_link")
    list_filter = ("blog__category",)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="60" style="object-fit:cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Image Preview"

    def video_thumbnail_preview(self, obj):
        if obj.video_link:
            return format_html('<img src="{}" width="120" height="80" />', obj.video_thumbnail())
        return "No Video"
    video_thumbnail_preview.short_description = "Video Thumbnail"
 




from django.utils.html import format_html

@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'project_type', 'is_active')
    list_filter = ('project_type', 'is_active')
    search_fields = ('project_name', 'project_type')
    list_editable = ('is_active',)
    ordering = ('project_name',)
    list_per_page = 20

    readonly_fields = ('image_preview', 'long_image_preview')

    fieldsets = (
        ('Basic Information', {
            'fields': ('project_name', 'project_type', 'project_description', 'link', 'is_active')
        }),
        ('Images', {
            'fields': ('project_image', 'image_preview', 'project_long_image', 'long_image_preview')
        }),
    )

    def image_preview(self, obj):
        if obj.project_image:
            return format_html('<img src="{}" width="150" style="border-radius:8px;"/>', obj.project_image.url)
        return "(No image)"
    image_preview.short_description = "Project Image Preview"

    def long_image_preview(self, obj):
        if obj.project_long_image:
            return format_html('<img src="{}" width="250" style="border-radius:8px;"/>', obj.project_long_image.url)
        return "(No image)"
    long_image_preview.short_description = "Long Image Preview"
