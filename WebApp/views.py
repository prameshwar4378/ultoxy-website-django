from django.shortcuts import render,redirect
from AdminApp.models import BlogPost, ContactInquiry
from django.contrib import messages
# Create your views here.
def index(request):
    return render(request, 'index.html')
def services(request):
    return render(request, 'services.html')
def contact_us(request):
    return render(request, 'contact_us.html')

def about_us(request):
    # Blog section logic
    featured_post = BlogPost.objects.order_by('-date').first()
    other_posts = BlogPost.objects.order_by('-date')[1:4]

    # Contact form submission logic
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        # Save to database
        ContactInquiry.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message,
        )

        # Optional: Add success message
        messages.success(request, "Your message has been sent successfully! ✅")
        return redirect("about_us")  # Replace with your urlpattern name

    context = {
        "featured_post": featured_post,
        "other_posts": other_posts,
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
