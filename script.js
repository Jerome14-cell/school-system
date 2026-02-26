let students = [];

// Register Student
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const id = document.getElementById("studentId").value.trim();

    // Unique ID validation
    if(students.some(student => student.id === id)){
        alert("Student ID must be unique!");
        return;
    }

    const student = {
        id: id,
        name: document.getElementById("name").value.trim(),
        gender: document.getElementById("gender").value,
        age: parseInt(document.getElementById("age").value),
        form: parseInt(document.getElementById("formLevel").value),
        performance: []
    };

    students.push(student);
    displayStudents();
    this.reset();
});

// Display Students
function displayStudents(){
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {

        let avg = calculateAverage(student);

        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>Form ${student.form}</td>
            <td>${avg}</td>
            <td>
                <button class="view-btn" onclick="addPerformance(${index})">Add Result</button>
                <button onclick="promoteStudent(${index})">Promote</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

// Delete Student
function deleteStudent(index){
    students.splice(index,1);
    displayStudents();
}

// Add Performance
function addPerformance(index){
    let math = parseInt(prompt("Math Score:"));
    let english = parseInt(prompt("English Score:"));
    let science = parseInt(prompt("Science Score:"));
    let social = parseInt(prompt("Social Studies Score:"));

    const performance = {
        form: students[index].form,
        subjects: {
            math, english, science, social
        }
    };

    students[index].performance.push(performance);
    displayStudents();
}

// Calculate Average
function calculateAverage(student){
    if(student.performance.length === 0) return "N/A";

    let latest = student.performance[student.performance.length - 1];
    let scores = Object.values(latest.subjects);
    let sum = scores.reduce((a,b) => a+b,0);
    return (sum / scores.length).toFixed(2);
}

// Promote Student
function promoteStudent(index){
    if(students[index].form < 4){
        students[index].form++;
        alert("Student promoted successfully!");
    } else {
        alert("Student already completed Form 4!");
    }
    displayStudents();
}