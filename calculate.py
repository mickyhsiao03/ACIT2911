import json
import os 
import os.path
from datetime import date

user_name = input('enter a user name: ')


def calculate(course, quiz, lab, assignment, presentation, participation, midterm, final):
    today = date.today()
    check_list = []
    with open("./courses.json" , 'r') as f:
        file_data = json.load(f)
        for courses in file_data:
            check_list.append(courses['course_name'])
        if course not in check_list:
            print('course not found')
            exit()
        else:
            for i in file_data:
                if i['course_name'] == course:
                    quiz_mark = quiz * (i['quiz']/100)
                    lab_mark = lab * (i['lab']/100)
                    assignment_mark = assignment * (i['assignments_projects']/100)
                    presentation_mark = presentation * (i['presentations']/100)
                    participation_mark = participation * (i['participation']/100)
                    midterm_mark = midterm * (i['midterm']/100)
                    final_mark = final * (i['final']/100)
                    total_mark = quiz_mark + lab_mark + assignment_mark + presentation_mark + participation_mark + midterm_mark +final_mark

                    print('quiz mark:',quiz_mark,
                        'lab mark:', lab_mark,
                        'assignment mark:', assignment_mark,
                        'presentation mark:', presentation_mark,
                        'participation mark:', participation_mark,
                        'midterm mark:', midterm_mark,
                        'final mark:', final_mark,
                        'total mark:', total_mark
                    )
            

    if not os.path.exists("./users/{0}.json".format(user_name)):
        create_json = [{
                            "course_name": "",
                            "quiz": 0,
                            "lab": 0,
                            "assignments_projects": 0,
                            "presentations": 0,
                            "participation": 0,
                            "midterm": 0,
                            "final": 0,
                            "total": 0,
                            "date": ""
                        }]
        with open("./users/{0}.json".format(user_name), 'w') as f:
            json.dump(create_json, f, indent=4)
        with open("./users/{0}.json".format(user_name), 'r+') as f:
            file_data = json.load(f)
            for i in file_data:
                i['course_name'] = course
                i['quiz'] = quiz_mark
                i['lab'] = lab_mark
                i['assignments_projects'] = assignment_mark
                i['presentations'] = presentation_mark
                i['participation'] = participation_mark
                i['midterm'] = midterm_mark
                i['final'] = final_mark
                i['total'] = total_mark
                i['date'] = today.strftime("%m/%d/%y")
                f.seek(0)
                json.dump(file_data, f, indent =4)
                f.truncate()
    else:
        with open("./users/{0}.json".format(user_name), 'r+') as f:
            file_data = json.load(f)
            user_list = []
            for i in file_data:
                user_list.append(i['course_name'])
            if course not in user_list:
                to_add = {
                            "course_name": course,
                            "quiz": quiz_mark,
                            "lab": lab_mark,
                            "assignments_projects": assignment_mark,
                            "presentations": presentation_mark,
                            "participation": participation_mark,
                            "midterm": midterm_mark,
                            "final": final_mark,
                            "total": total_mark,
                            "date": today.strftime("%m/%d/%y")
                }
                file_data.append(to_add)
                f.seek(0)
                json.dump(file_data, f, indent =4)
                f.truncate()
            else:
                for i in file_data:
                    if i['course_name'] == course:
                        i['quiz'] = quiz_mark
                        i['lab'] = lab_mark
                        i['assignments_projects'] = assignment_mark
                        i['presentations'] = presentation_mark
                        i['participation'] = participation_mark
                        i['midterm'] = midterm_mark
                        i['final'] = final_mark
                        i['total'] = total_mark
                        i['date'] = today.strftime("%m/%d/%y")
                        f.seek(0)
                        json.dump(file_data, f, indent =4)
                        f.truncate()

                        
    return

calculate('ACIT 1515',50,20,30,50,10,30,10)