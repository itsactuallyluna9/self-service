import os
from . import db
from .routes import all_courses, auth, user_courses
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) 

    app.register_blueprint(auth.bp, url_prefix='/api')
    app.register_blueprint(all_courses.bp, url_prefix='/api')
    app.register_blueprint(user_courses.bp, url_prefix='/api')

    db.init_app(app)
    
    return app

if __name__ == '__main__':
    app = create_app()
    # other config
    FLASK_PORT = int(os.environ.get('PORT', 5000))
    # TODO: we could add some things here to automatically run migrations, etc.
    # later problems... y'know once we *have* a database schema.
    # my favorite <3
    app.run(debug=True, host='0.0.0.0', port=FLASK_PORT)
