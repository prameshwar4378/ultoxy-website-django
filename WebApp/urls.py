from django.contrib import admin
from django.urls import path
from .views import *
 
urlpatterns = [
    path('', index, name='index'),
    path('services/', services, name='services'),
    path('contact_us/', contact_us, name='contact_us'),
    path('about_us/', about_us, name='about_us'),
    path('blog/', blog, name='blog'),
    path('blog-details/', blog_details, name='blog_details'),

] 
