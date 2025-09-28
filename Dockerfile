FROM python:3.10.2-slim as base
WORKDIR /app

COPY . .
RUN apt-get update && apt-get install -y weasyprint
RUN python -m pip install -r requirements.txt
RUN python -m nltk-imports
EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
