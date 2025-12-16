import os
import sys
import traceback

# allow absolute imports from the backend directory
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend import db
from backend.routes import all_courses, auth, cart, filter_support, user_courses, unofficial_transcript
from flask import Flask, jsonify, request
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app) 

    @app.before_request
    def error_flag():
        from random import random
        always_error = request.args.get('always_error', 'false').lower() == 'true'
        if always_error:
            raise Exception("Forced error for testing purposes.")
        
        intermittent_error = request.args.get('intermittent_error', 'false').lower() == 'true'
        if intermittent_error and random() < 0.5:
            # 50% chance to raise an error
            raise Exception("Intermittent forced error for testing purposes.")

    app.register_blueprint(auth.bp, url_prefix='/api')
    app.register_blueprint(all_courses.bp, url_prefix='/api')
    app.register_blueprint(user_courses.bp, url_prefix='/api')
    app.register_blueprint(filter_support.bp, url_prefix='/api')
    app.register_blueprint(cart.bp, url_prefix='/api')
    app.register_blueprint(unofficial_transcript.bp, url_prefix='/api')

    @app.get('/')
    def index():
        return jsonify({'success': True})
    
    # handle thrown errors globally
    # return {"success": False, "error": str(e)}...
    @app.errorhandler(Exception)
    def handle_exception(e):
        response = {
            "success": False,
            "message": str(e),
            "repr": repr(e),
            "traceback": traceback.format_exception(type(e), e, e.__traceback__)
        }
        print(f"Error: {str(e)}\nTraceback: {repr(e)}")
        return jsonify(response), 500

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
