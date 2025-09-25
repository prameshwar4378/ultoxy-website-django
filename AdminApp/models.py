from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    date = models.DateField()
    description = models.TextField()  # Will use Summernote for this field
    thumbnail = models.ImageField(upload_to='blog_thumbnails/')
    author_name = models.CharField(max_length=100)
    author_image = models.ImageField(upload_to='author_images/')

    def __str__(self):
        return self.title




class ContactInquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} ({self.email})"
