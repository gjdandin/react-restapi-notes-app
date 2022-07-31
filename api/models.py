from django.db import models

# Create your models here. Equivalent to db tables.

class Note(models.Model):
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True) #Every save, the updated changes to now
    created = models.DateTimeField(auto_now_add=True) #now_add only takes timestamp on the creation of model

    def __str__(self):
        return self.body[0:50] # only the first 50 chars.


