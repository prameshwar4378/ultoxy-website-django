from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    date = models.DateField()
    content = models.TextField()  # Will use Summernote for this field
    thumbnail = models.ImageField(upload_to='blog_thumbnails/')
    author_name = models.CharField(max_length=100)
    author_image = models.ImageField(upload_to='author_images/')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    
class BlogPhotosVideos(models.Model):
    blog = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="blog_photos/", blank=True, null=True)
    video_link = models.CharField(blank=True, null=True, help_text="Enter YouTube video link", max_length=255)
    def __str__(self):
        return f"{self.blog.title} Photos and Videos"

    def get_youtube_embed_url(self):
        if self.video_link:
            video_id = self.get_video_id()
            print(video_id)
            return f"https://www.youtube.com/embed/{video_id}"
        return None

    def get_video_id(self):
        if self.video_link:
            return self.video_link.split('v=')[-1]
        return None

    def video_thumbnail(self):
        if self.video_link:
            video_id = self.get_video_id()
            return f"https://img.youtube.com/vi/{video_id}/0.jpg"
        return None



class ContactInquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(null=True, blank=True)
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    mobile = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} ({self.email})"




from django.core.exceptions import ValidationError

class Projects(models.Model):
    project_name = models.CharField(max_length=255)
    project_type = models.CharField(max_length=100)
    project_description = models.TextField()
    project_image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    project_long_image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.project_name

    def clean(self):
        """Ensure at least one image field is provided."""
        if not self.project_image and not self.project_long_image:
            raise ValidationError("At least one of Project Image or Long Project Image is required.")



 