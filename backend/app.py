from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
import os
import psycopg2
import psycopg2.extras

# Create a Flask server.
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create a cursor and initialize psycopg
pg_conn_string = os.environ["PG_CONN_STRING"]

connection = psycopg2.connect(pg_conn_string)


# Set to automatically commit each statement
connection.set_session(autocommit=True)

cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
"""
CREATE TABLE comments (
  id SERIAL PRIMARY KEY, 
  author STRING, 
  comment_data STRING, 
  time_posted STRING, 
  num_likes INT, 
  num_dislikes INT,
  group_time INT
)"

CREATE TABLE times_of_shows (
    name STRING,
    season_num INT,
    episode_num INT,
    episode_name STRING,
    duration INT
)
"""



def db_get_all():
    cursor.execute('SELECT * FROM comments')
    results = cursor.fetchall()
    return results


def db_get_by_id(id):
    cursor.execute('SELECT * FROM comments WHERE id = %s', (id, ))
    result = cursor.fetchone()
    return result


def db_filter_comments(group):
    cursor.execute(
        'SELECT * FROM comments WHERE group = %s',
        (id, group))
    result = cursor.fetchall()
    return result


def db_create_comment(author, comment_data, time_posted, num_likes, num_dislikes, group_time):
    cursor.execute(
        "INSERT INTO comments (author, comment_data, time_posted, num_likes, num_dislikes, group_time) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (author, comment_data, time_posted, num_likes, num_dislikes, group_time))
    result = cursor.fetchall()
    return result


def db_update_comment(id, new_comment_data):
    cursor.execute("UPDATE COMMENT SET comment = %s WHERE id = %s RETURNING id",
                   (new_comment_data, id))
    result = cursor.fetchall()
    return result


def db_delete_comment(id):
    cursor.execute("DELETE FROM comments WHERE id = %s RETURNING id", (id, ))
    result = cursor.fetchall()
    return result


# Routes!
@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return jsonify(db_get_all())


@app.route("/<id>", methods=['GET'])
@cross_origin()
def get_by_id(id):
    comment = db_get_by_id(id)
    if not comment:
        return jsonify({"error": "invalid id", "code": 404})
    return jsonify(comment)


@app.route("/search", methods=['GET'])
@cross_origin()
def filter_comments():
    result = db_filter_comments(
                                request.args.get('group'))
    return jsonify(result)


@app.route("/", methods=['POST'])
@cross_origin()
def create_comment():
    new_comment = request.json
    try:
        res = db_create_comment(new_comment['author'],
                                new_comment['comment_data'],
                                new_comment['time_posted'],
                                new_comment['num_likes'],
                                new_comment['num_dislikes'],
                                new_comment['group_time'])
        return jsonify(res)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/<id>", methods=['PUT'])
@cross_origin()
def update_comment(id):
    try:
        comment = request.json['comment_data']
      
        return jsonify(db_update_comment(id, comment))
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/<id>", methods=['DELETE'])
@cross_origin()
def delete_comment(id):
    try:
        return jsonify(db_delete_comment(id))
    except Exception as e:
        return jsonify({"error": str(e)})

# scary database stuff above
@app.route("/create_comments", methods=['GET'])
@cross_origin()
def create_table_comments():
    cursor.execute("""
    CREATE TABLE comments (
    id SERIAL PRIMARY KEY, 
    author STRING, 
    comment_data STRING, 
    time_posted STRING, 
    num_likes INT, 
    num_dislikes INT,
    group_time INT
    );
    """)
    return "ok"

@app.route("/create_netflix", methods=['GET'])
@cross_origin()
def create_table_netflix():
    cursor.execute("""
    "CREATE TABLE netflix_titles (show_id SERIAL PRIMARY KEY, \
    type STRING, title STRING, \
    director STRING, cast_cast STRING, \
    country STRING, rating STRING, release_year INT, duration STRING);""")

    return "ok netflix"

@cross_origin()
def create_table_friends():
    cursor.execute("""
     "CREATE TABLE friends_data (year_of_prod INT, season_num INT, \
    episode_num INT, episode_title STRING, \
    duration INT, summary STRING, director STRING, num_stars INT, \
    num_votes INT);""")

    return "ok friends"


    
    
# Runs the API and exposes it on https://<repl name>.<replit username>.repl.co
# ex. Mine deploys to https://htn-api.jayantsh.repl.co.
app.run(host="0.0.0.0", debug=True, port=5646)
