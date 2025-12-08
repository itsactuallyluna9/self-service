import os
import mariadb
from flask import current_app, g

# database configuration - these can be loaded from environment variables!
# by default, we'll use localhost and the sandbox database with the selfservice user.
# see sql/create_sandbox_user.sql to create this user and database.
DB_HOST = os.environ.get('DB_HOST', '127.0.0.1')
DB_PORT = int(os.environ.get('DB_PORT', 3306))
DB_USER = os.environ.get('DB_USER', 'selfservice')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'password')
DB_NAME = os.environ.get('DB_NAME', 'sandbox')

def get_db():
    if 'db' not in g:
        try:
            g.db = mariadb.connect(
                user=DB_USER,
                password=DB_PASSWORD,
                host=DB_HOST,
                port=DB_PORT,
                database=DB_NAME
            )
        except mariadb.Error as e:
            current_app.logger.error(f"Error connecting to the database: {e}")
            g.db = None
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_app(app):
    app.teardown_appcontext(close_db)
