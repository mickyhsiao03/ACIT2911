var xhr = null;
    getXmlHttpRequestObject = function () {
        if (!xhr) {
            // Create a new XMLHttpRequest object 
            xhr = new XMLHttpRequest();
        }
        return xhr;
    };

function getHist() {
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = historyCallback;
    // asynchronous requests
    xhr.open("POST", "http://localhost:6969/history", true);
    // Send the request over the network
    var histformData = new FormData(document.getElementById("histForm"))
    xhr.send(histformData);
    console.log(xhr.responseText)
};
function historyCallback() {
    // Check response is ready or not
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("User data received!");
        dataDiv = document.getElementById('history-container');
        // Set current data text
        console.log(JSON.parse(xhr.responseText))
        result = JSON.parse(xhr.responseText)
        dataDiv.innerHTML = JSON.stringify(result)
    }
    else {
        dataDiv = document.getElementById('history-container');
        dataDiv.innerHTML = `<h2>User does not exist.</h2>`
    }
};

function getCourses() {
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = dataCallback;
    // asynchronous requests
    xhr.open("GET", "http://localhost:6969/courses", true);
    // Send the request over the network
    xhr.send(null);
};
function dataCallback() {
    // Check response is ready or not
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("User data received!");
        dataDiv = document.getElementById('result-container');
        // Set current data text
        console.log(JSON.parse(xhr.responseText))
        result = JSON.parse(xhr.responseText)
        result_display = []
        for (let i = 0; i < result.length;i++){
            result_display.push(result[i]['course_name']);
        }
        dataDiv.innerHTML = JSON.stringify(result_display)
    }
};

function calculateGrades() {
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = gradesCallback;
    // asynchronous requests
    xhr.open("POST", "http://localhost:6969/grades", true);
    // Send the request over the network
    var formData = new FormData( document.getElementById("gradeForm"))
    xhr.send(formData);
};
function gradesCallback() {
    // Check response is ready or not
    var formData = new FormData( document.getElementById("gradeForm"))
    if (xhr.readyState == 4 && xhr.status == 200) {
        // Set current data text
        result = JSON.parse(xhr.responseText)
        console.log(result)

        //current final mark
        document.getElementById('current').innerHTML = `<h2>Current Final Mark: ${result[0].total}% </h2>`

        //detail calc
        document.getElementById('calc').innerHTML = "Calculation Details";
        document.getElementById('cquiz').innerHTML = `Quiz: ${formData.get('quiz')}% x ${result[0].quiz}% =  ${parseFloat(formData.get('quiz') * (result[0].quiz)/100 || 0)}%`;
        document.getElementById('clab').innerHTML = `Lab: ${formData.get('lab')}% x ${result[0].lab}% =  ${parseFloat(formData.get('lab') * (result[0].lab)/100 || 0)}%` ;
        document.getElementById('cassignments').innerHTML = `Assignment and Project: ${formData.get('assignments')}% x ${result[0].assignments_projects}% =  ${parseFloat(formData.get('assignment') * (result[0].assignment)/100 || 0)}%` ;
        document.getElementById('cpresentations').innerHTML = `Presentations: ${formData.get('presentation')}% x ${result[0].presentations}% =  ${parseFloat(formData.get('presentation') * (result[0].presentation)/100 || 0)}%` ;
        document.getElementById('cparticipation').innerHTML = `Participation: ${formData.get('participation')}% x ${result[0].participation}% =  ${parseFloat(formData.get('participation') * (result[0].participation)/100 || 0)}%` ;
        document.getElementById('cmidterm').innerHTML = `Midterm: ${formData.get('midterm')}% x ${result[0].midterm}% =  ${parseFloat(formData.get('midterm') * (result[0].midterm)/100 || 0)}%` ;
        document.getElementById('cfinal').innerHTML = `Final: ${formData.get('final')}% x ${result[0].final}% =  ${parseFloat(formData.get('final') * (result[0].final)/100 || 0)}%` ;
    }
    else {
        document.getElementById('calc').innerHTML = `<h2>Please fill out all fields </h2>`;
    }
};

function searchCourse(){
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = searchCallback;
    // asynchronous requests
    xhr.open("POST", "http://localhost:6969/search", true);
    // Send the request over the network
    var formData = new FormData( document.getElementById("searchForm"))
    xhr.send(formData);
};
function searchCallback() {
    // Check response is ready or not
    var formData = new FormData( document.getElementById("searchForm"))
    if (xhr.readyState == 4 && xhr.status == 200) {
        // Set current data text
        result = JSON.parse(xhr.responseText)
        console.log(result)

        //course marks distribution
        document.getElementById('dist').innerHTML = "Course Marks Distribution";
        document.getElementById('dcourse').innerHTML = `<h3>${result.course_name}</h3>` ;
        document.getElementById('dquiz').innerHTML = `Quiz: ${result.quiz}%`;
        document.getElementById('dlab').innerHTML = `Lab: ${result.lab}%` ;
        document.getElementById('dassignments').innerHTML = `Assignment and Project: ${result.assignments_projects}%` ;
        document.getElementById('dpresentations').innerHTML = `Presentations: ${result.presentations}%` ;
        document.getElementById('dparticipation').innerHTML = `Participation: ${result.participation}%` ;
        document.getElementById('dmidterm').innerHTML = `Midterm: ${result.midterm}%` ;
        document.getElementById('dfinal').innerHTML = `Final: ${result.final}%` ;
    }
    else{
        document.getElementById('dist').innerHTML = `<h2>Course "${formData.get("course")}" Not Found </h2>`;
        document.getElementById('dcourse').innerHTML = '' ;
        document.getElementById('dquiz').innerHTML = '';
        document.getElementById('dlab').innerHTML = '' ;
        document.getElementById('dassignments').innerHTML = '' ;
        document.getElementById('dpresentations').innerHTML = '' ;
        document.getElementById('dparticipation').innerHTML = '' ;
        document.getElementById('dmidterm').innerHTML = '' ;
        document.getElementById('dfinal').innerHTML = '' ;
    }
};

