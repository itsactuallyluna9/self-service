import os
from backend import db
from backend.blueprints import all_courses, auth, user_courses
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# other config
FLASK_PORT = int(os.environ.get('PORT', 5000))

app.register_blueprint(auth.bp, url_prefix='/api')
app.register_blueprint(all_courses.bp, url_prefix='/api')
app.register_blueprint(user_courses.bp, url_prefix='/api')

db.init_app(app)

if __name__ == '__main__':
    # TODO: we could add some things here to automatically run migrations, etc.
    # later problems... y'know once we *have* a database schema.
    # my favorite <3
    app.run(debug=True, host='0.0.0.0', port=FLASK_PORT)
