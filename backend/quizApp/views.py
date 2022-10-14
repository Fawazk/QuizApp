from django.shortcuts import render
from .models import Questions,MultipleAnswers
from .serializers import QuestionsSerializer,MultipleAnswersSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.core.mail import EmailMessage

# Create your views here.
# @5PuzdzVDKZdq5nfkp
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from config import EMAILTO

@api_view()
def send_email(request):
    msg = EmailMessage('Quiz Score',
                       'Here is the message.', to=[EMAILTO])
    msg.send()
    return Response({"message":'sended'})

class QuestionAnswerView(APIView):
    # permission_classes=[IsAdminUser]
    def get(self, request,num):
        questions = Questions.objects.get(questionNumber=num)
        answer = MultipleAnswers.objects.get(questionsId=questions.id)
        serializer = QuestionsSerializer(questions)
        answerSerializer = MultipleAnswersSerializer(answer)
        print(serializer.data)
        data={}
        data["question"] = serializer.data
        data["answers"] = answerSerializer.data
        return Response(data)




