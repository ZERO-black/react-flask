from io import BytesIO
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from PIL import Image
import base64

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskApp.db'
db = SQLAlchemy(app)
CORS(app)

@app.route('/')
def home_page():
    return "home page"

@app.route('/uploadname', methods=('POST',))
def uploadname():
    try:
        name = request.get_json()["name"]
        print(request.get_json())
    except:
        return "upload failed"
    return name

@app.route('/send_image', methods=['POST'])
def send_image():
    image = request.get_json()["image"].split(",")[-1]
    image = Image.open(BytesIO(base64.b64decode(image)))

    rgb_array = []
    rgb_image = image.convert("RGB")
    x, y = image.size
    # for i in range(x//10):
    #     for j in range(y//10):
    #         rgb_array.append(rgb_image.getpixel((i, j)))
    rgb_array = rgb_image.getcolors(x*y)
    rgb_array.sort(key=lambda x:x[0], reverse=True)
    color_dict = dict()
    # 임의로 다섯개 설정, 만약 다섯개보다 적을 경우 (거의 그럴 일 없겠지만) 예외 처리 필요
    for i in range(30):
        # 편의를 위해 to hex
        color_dict[i] = [rgb_array[i][0], '#{:02x}{:02x}{:02x}'.format(rgb_array[i][1][0], rgb_array[i][1][1], rgb_array[i][1][2])]
    return jsonify([color_dict, x*y])

if __name__ == '__main__':
    app.run(debug=True)