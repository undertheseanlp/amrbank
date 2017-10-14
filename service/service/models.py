from django.db import models


class Corpus(models.Model):
    title = models.TextField()
    description = models.TextField(blank=True)

    def __str__(self):
        return "{} - {}".format(str(self.id), self.title)


class Document(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    amr = models.TextField(blank=True)
    status = models.TextField(blank=True)
    quality = models.TextField(blank=True)
    corpus = models.ForeignKey(Corpus, related_name="documents")

    class Meta:
        ordering = ('created',)
