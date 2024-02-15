
from flask import Flask, render_template
from flask_json import FlaskJSON
import jwt

import sys
import datetime
import bcrypt
import traceback


app = Flask(__name__,
            static_folder='static',
            template_folder='templates')
FlaskJSON(app)



@app.route('/') #endpoint
def site():
    return render_template("Website.html", content="Testing")



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
