from django.shortcuts import render
from .models import Questions,MultipleAnswers
from .serializers import QuestionsSerializer,MultipleAnswersSerializer,UserRegister
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import EmailMessage
from rest_framework.decorators import api_view,permission_classes
# from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token


# Create your views here.

class RegisterView(APIView):
    def post(self,request,format=None):
        print(request.data)
        serializer=UserRegister(data=request.data)

        data={}
        if serializer.is_valid():
            account=serializer.save()
            data['response']='registered'
            data['username']=account.username
            data['email']=account.email
            token,create=Token.objects.get_or_create(user=account)
            data['token']=token.key
        else:
            data=serializer.errors
        return Response(data)



class QuestionAnswerView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request,num):
        questionscount = Questions.objects.all().count()
        questions = Questions.objects.get(questionNumber=num)
        answer = MultipleAnswers.objects.get(questionsId=questions.id)
        serializer = QuestionsSerializer(questions)
        answerSerializer = MultipleAnswersSerializer(answer)
        print(serializer.data)
        data={}
        data["question"] = serializer.data
        data["answers"] = answerSerializer.data
        data["questionscount"] = questionscount
        return Response(data)


@api_view()
@permission_classes([IsAuthenticated])
def send_email(request):
    mark = request.GET.get('mark')
    totalQuestions = request.GET.get('totalQuestions')
    user = request.user
    msg = EmailMessage('Quiz Score',
                       f'Congratulations your score{mark}/{totalQuestions}', to=[user.email])
    msg.send()
    return Response({"message":'sended'})