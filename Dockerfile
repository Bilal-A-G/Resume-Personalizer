FROM python:3.10.2-slim as base
WORKDIR /app

COPY . .
RUN apt-get update && apt-get install -y weasyprint
RUN python -m pip install -r requirements.txt
RUN python -m nltk-imports
EXPOSE 8080

CMD flask run
