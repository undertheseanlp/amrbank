from django.db import models


class AMRDoc(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    amr = models.TextField(blank=True)

    class Meta:
        ordering = ('created',)
