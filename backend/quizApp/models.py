from enum import unique
from django.db import models

# Create your models here.
from django.contrib.auth.models import User

ANSWER=(
    ('option1','option1'),
    ('option2','option2'),
    ('option3','option3'),
    ('option4','option4'),
)

User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False

class Questions(models.Model):
    questionNumber = models.IntegerField(unique=True)
    question = models.TextField()
    allowedtime = models.IntegerField()


class MultipleAnswers(models.Model):
    questionsId = models.OneToOneField(Questions,on_delete=models.CASCADE)
    option1 = models.TextField()
    option2 = models.TextField()
    option3 = models.TextField()
    option4 = models.TextField()
    answer = models.CharField(max_length=200,choices=ANSWER)