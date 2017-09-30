from django.shortcuts import render
from rest_framework import viewsets

from service.models import AMRDoc
from service.serializers import AMRDocSerializer


def editor(request):
    return render(request, 'index.html')


class AMRViewSet(viewsets.ModelViewSet):
    queryset = AMRDoc.objects.all()
    serializer_class = AMRDocSerializer
