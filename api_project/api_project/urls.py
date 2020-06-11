from django.urls import include, path
from rest_framework import routers
import api_project.views as api_views

from api_project.views.obtain_token import CustomAuthToken
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'groups', api_views.GroupViewSet)

urlpatterns = [
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('login', obtain_jwt_token),
    path('', include(router.urls)),
]