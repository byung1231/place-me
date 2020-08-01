from pymongo import MongoClient
from flask import Flask
from flask.ext.googlemaps import GoogleMaps

app = Flask(__name__)
GoogleMaps(app)

client = MongoClient("mongodb+srv://python-user:5197297817@cluster0.5vcts.mongodb.net/")

