from pymongo import MongoClient
from flask import Flask, request, jsonify
import os

app = Flask(__name__, static_folder='../build', static_url_path='/')
#GoogleMaps(app)

client = MongoClient("mongodb+srv://python-user:5197297817@cluster0.5vcts.mongodb.net/placeme")

db = client.placeme
collection = db.history

@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))


@app.route('/api/save', methods = ['POST'])
def insert_history():
    record = request.json
    collection.insert_one(record)
