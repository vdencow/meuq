from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api_project.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that enables users to be shown or updated.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that enable groups to be shown or updated.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
