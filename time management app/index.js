var addbutton = document.getElementById("addbtn");
var input = document.getElementById("taskInput");
var tasklst = document.getElementById("tasklist");
var dateInput = document.getElementById("date");
var timeInput = document.getElementById("time");

addbutton.addEventListener("click", function() {
    var text = input.value.trim();
    var dueDate = dateInput.value;
    var dueTime = timeInput.value;
    
    addTask(text, dueDate, dueTime);
    saveTasksToLocalStorage()
    clearInputFields();
});
window.onload = function() {
    loadTasksFromLocalStorage();
};
function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTask(task.text, task.dueDate, task.dueTime);
    });
}
function saveTasksToLocalStorage() {
        var tasks = [];
        var rows = tasklst.rows;
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].cells;
            tasks.push({
                text: cells[2].textContent,
                dueDate: cells[0].textContent,
                dueTime: cells[1].textContent
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

function addTask(taskText, dueDate, dueTime) {
    if (taskText !== '') {
        var row = tasklst.insertRow(-1); 

        var cell1 = row.insertCell(0); 
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3); 
        
        var dueDateTime = new Date(dueDate + 'T' + dueTime);
        var remainingTime = calculateRemainingTime(dueDateTime);
        
        cell1.textContent = dueDate; 
        cell2.textContent = dueTime;
        cell3.textContent = taskText;
        cell4.textContent = remainingTime;


        setInterval(function() {
            remainingTime = calculateRemainingTime(dueDateTime);
            cell4.textContent = remainingTime;
        }, 1000);

        row.addEventListener('click', function() {
            this.parentNode.removeChild(this); 
        });
    }
}

function calculateRemainingTime(dueDateTime) {
    var now = new Date();
    var timeDiff = dueDateTime - now;

    if (timeDiff <= 0) {
        return 'Expired';
    }

    var seconds = Math.floor((timeDiff / 1000) % 60);
    var minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    var hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function clearInputFields() {
    input.value = ''; // Clear task input field
    dateInput.value = ''; // Clear date input field
    timeInput.value = ''; // Clear time input field
}
