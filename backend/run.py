from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskApp.db'
db = SQLAlchemy(app)
CORS(app)

@app.route('/')
def home_page():
    return "home page"

@app.route('/image')
def image_page():
    return "image"

@app.route('/uploadname', methods=('POST',))
def uploadname():
    try:
        name = request.get_json()["name"]
        print(request.get_json())
    except:
        return "upload failed"


    return name

@app.route('/showname', methods=['GET'])
def showname():
    return "name"
if __name__ == '__main__':
    app.run(debug=True)