import json
from flask import Flask, request
import flask
from flask_cors import CORS
import calculate as calc

app = Flask(__name__)
CORS(app)

@app.route('/courses', methods=['GET'])
def courses():
    with open("./courses.json", 'r') as f:
        file_data = json.load(f)
        return flask.jsonify(file_data)

@app.route('/search', methods=['POST'])
def search():
    return calc.find_course(request.form['course'])
            

@app.route('/grades', methods=['POST'])
def calculate():
    user = request.form['user']
    course = request.form['course']
    quiz = float(request.form['quiz'])
    lab = float(request.form['lab'])
    assignments = float(request.form['assignments'])
    presentation = float(request.form['presentation'])
    participation = float(request.form['participation'])
    midterm = float(request.form['midterm'])
    final = float(request.form['final'])
    total_mark = calc.calculate(user,course,quiz,lab,assignments,presentation,participation,midterm,final)
    details = []
    with open("./courses.json", 'r') as f:
        file_data = json.load(f)
        for i in file_data:
            if i['course_name'] == course:
                details.append(i)
    details[0]["total"] = total_mark
    return flask.jsonify(details)

@app.route('/history', methods=['POST'])
def getMarks():
    user = request.form['histUser']
    result = calc.get_marks(user)
    print(result)
    return flask.jsonify(result)

if __name__ == "__main__":
    app.run("localhost", 6969)
