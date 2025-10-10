from django.shortcuts import render,redirect
from AdminApp.models import BlogPost, ContactInquiry,Projects
from django.contrib import messages
# Create your views here.
def index(request):
    projects=Projects.objects.filter(is_active=True).order_by('-id') 
    context={
        "projects":projects,
    }
    return render(request, 'index.html',context)

def services(request):
    return render(request, 'services.html')


def contact_us(request):
    # ContactInquiry.objects.all().order_by('-id').delete()  # Clear previous inquiries (for testing purposes)
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        mobile = request.POST.get("mobile")
        message = request.POST.get("message")

        if not name or not mobile or not message:
            messages.error(request, "Please fill all required fields.")
            return redirect("contact_us")  # Or render the form with error context

        # Save to database
        ContactInquiry.objects.create(
            name=name,
            email=email,
            subject=subject,
            mobile=mobile,
            message=message,
        )

        messages.success(request, "Your message has been sent successfully! ✅")
        return redirect("/contact_us")  # Use URL name if set in urls.py

    return render(request, "contact_us.html")

def about_us(request):
    # Blog section logic
    featured_post = BlogPost.objects.order_by('-date').first()
    other_posts = BlogPost.objects.order_by('-date')[1:4]

    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")
        mobile = request.POST.get("mobile")  # ✅ This was missing

        # Optional: basic validation
        if not name or not mobile or not message:
            messages.error(request, "Please fill in all required fields.")
            return redirect("contact_us")  # Or render form again with error

        # Save to database
        ContactInquiry.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message,
            mobile=mobile  # ✅ Add this
        )

        messages.success(request, "Your message has been sent successfully! ✅")
        return redirect("/about_us")  # Or use: return redirect("about_us")

    projects=Projects.objects.filter(is_active=True).order_by('-id') 
 
    context = {
        "featured_post": featured_post,
        "other_posts": other_posts,
        "projects":projects,
    }
    return render(request, "about_us.html", context)


def blog(request):
    posts = BlogPost.objects.order_by('-date')
    blogs = BlogPost.objects.order_by('-date') 

    context = {
        "posts": posts,
        "blogs": blogs,
    }
    return render(request, 'blogs.html', context)

from AdminApp.models import BlogPost, BlogPhotosVideos
from django.shortcuts import get_object_or_404 

import re

def extract_video_id(embed_url):
    if embed_url:
        match = re.search(r"embed/([a-zA-Z0-9_-]+)", embed_url)
        if match:
            return match.group(1)
        
    return None


def blog_details(request,id):
    # try:
        latest_news = BlogPost.objects.select_related().order_by('-id')[:10]
        news_details = get_object_or_404(BlogPost, id=id)
        
        photos_videos = BlogPhotosVideos.objects.filter(blog=news_details) 
        video_data=[]
        for embed_link in photos_videos:
            embed_url= embed_link.video_link
            video_id=extract_video_id(embed_url)
            if video_id:
                video_data.append(
                    {"thumbnail_url":f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg",
                    "video_url":f"https://www.youtube.com/embed/{video_id}",
                    "id":embed_link.id} 
                )

        news_photos=BlogPhotosVideos.objects.filter(image__isnull=False,blog=news_details)
        return render(request, "blog_details.html", {"latest_news":latest_news,"news_details": news_details,"news_photos":news_photos,'video_data': video_data})
    # except Exception as e: 
    #     return render(request, "404.html", status=404)
