from django.urls import path
from . import views


urlpatterns = [
    path('question-answer/<int:num>/',views.QuestionAnswerView.as_view(),name='questionanswer'),
    path('send-email',views.send_email,name='sendemail')
]