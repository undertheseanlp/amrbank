from rest_framework import serializers

from service.models import AMRDoc


class AMRDocSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AMRDoc
        fields = ('id', 'text', 'amr', 'status', 'quality')