from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Questions,MultipleAnswers

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = "__all__"

class MultipleAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleAnswers
        fields = "__all__"