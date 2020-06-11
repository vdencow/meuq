from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'password', 'id']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(self, validated_data)

    def update(self, a, validated_data):
        print('entered x')
        if 'password' in validated_data\
                and validated_data['password'] is not None \
                and validated_data['password'].strip() != '':
            print('entered 2')
            validated_data['password'] = make_password(validated_data.get('password'))
        else:
            print('entered 1')
            print(validated_data)
            del a.password
        return super(UserSerializer, self).update(a, validated_data)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
