FROM python:3
ENV PYTHONUNBUFFERED 1
EXPOSE 8001
RUN mkdir /code
WORKDIR /code
COPY api_project/requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/