from app import app
from livereload import Server

if __name__ == "__main__":
    app.debug = True
    server = Server(app.wsgi_app)
    server.watch('templates/')
    server.watch('static/')
    server.watch('app.py')
    server.serve(port=5000, host='127.0.0.1')
