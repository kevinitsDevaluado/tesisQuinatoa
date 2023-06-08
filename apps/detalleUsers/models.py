from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class detalleUsers(models.Model):
    userRegistrado = models.ForeignKey(User, null=True,blank=True, related_name='nuevo')
    userRegistra = models.ForeignKey(User, null=True,blank=True, related_name='antiguo')
    fechaReg = models.DateTimeField(auto_now_add=True)
    def __str__(self): return '{}'.format(self.userRegistrado)
