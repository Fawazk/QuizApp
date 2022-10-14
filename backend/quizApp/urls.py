from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register',views.RegisterView.as_view(),name='register'),
    path('login',obtain_auth_token,name='login'),
    path('question-answer/<int:num>/',views.QuestionAnswerView.as_view(),name='questionanswer'),
    path('send-email',views.send_email,name='sendemail')
]