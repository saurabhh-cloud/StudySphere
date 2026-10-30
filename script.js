
/* ==================================
   StudySphere - Task Management
   ================================== */

// Find the HTML elements we need
const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskSubjectInput = document.getElementById("task-subject");
const taskDateInput = document.getElementById("task-date");
const taskList = document.getElementById("task-list");

// Dashboard counters
const totalTasksDisplay = document.getElementById("total-tasks");
const completedTasksDisplay =
    document.getElementById("completed-tasks");
const pendingTasksDisplay =
    document.getElementById("pending-tasks");

// Store tasks while the page is open
let tasks = [];
let nextTaskId = 1;


// 1. Add a new task
taskForm.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get values entered by the user
    const taskName = taskNameInput.value.trim();
    const taskSubject = taskSubjectInput.value;
    const taskDate = taskDateInput.value;

    // Check that the task name and subject are provided
    if (taskName === "" || taskSubject === "") {
        alert("Please enter a task name and choose a subject.");
        return;
    }

    // Create a task object
    const newTask = {
        id: nextTaskId,
        name: taskName,
        subject: taskSubject,
        date: taskDate,
        completed: false
    };

    nextTaskId++;

    // Store the task
    tasks.push(newTask);

    // Update the website
    renderTasks();

    // Clear the form
    taskForm.reset();
});


// 2. Display tasks on the website
function renderTasks() {

    // Clear the old list before displaying updated tasks
    taskList.replaceChildren();

    
    // Get the text typed into the search box
    const searchBox = document.getElementById("task-search");

    const searchText = searchBox.value.toLowerCase().trim();


    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks yet. Add your first study task!";
        emptyMessage.className = "empty-message";
        taskList.appendChild(emptyMessage);
    }

    
    // Find tasks that match the search text
    const matchingTasks = tasks.filter(function (task) {

        const name = task.name.toLowerCase();
        const subject = task.subject.toLowerCase();

        return name.includes(searchText) ||
               subject.includes(searchText);
    });

    // Display only matching tasks
    matchingTasks.forEach(function (task) {


        // Create a list item for this task
        const listItem = document.createElement("li");

        // Show task name and subject safely as text
        const taskTitle = document.createElement("strong");
        taskTitle.textContent = task.name + " - " + task.subject;
        listItem.appendChild(taskTitle);

        // Show deadline if one was selected
        if (task.date !== "") {
            const deadline = document.createElement("p");
            deadline.textContent = "Deadline: " + task.date;
            listItem.appendChild(deadline);
        }

        // Create a completion checkbox
        const completeLabel = document.createElement("label");
        const completeCheckbox = document.createElement("input");

        completeCheckbox.type = "checkbox";
        completeCheckbox.checked = task.completed;

        completeCheckbox.addEventListener("change", function () {
            task.completed = completeCheckbox.checked;
            renderTasks();
        });

        completeLabel.appendChild(completeCheckbox);
        completeLabel.appendChild(
            document.createTextNode(" Completed")
        );

        listItem.appendChild(completeLabel);

        // Add a delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        listItem.appendChild(deleteButton);

        // Visually distinguish completed tasks
        if (task.completed) {
            listItem.style.opacity = "0.65";
            taskTitle.style.textDecoration = "line-through";
        }

        taskList.appendChild(listItem);
    });

    // Update the dashboard numbers
    updateDashboard();
}


// 3. Update dashboard statistics
function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasksDisplay.textContent = total;
    completedTasksDisplay.textContent = completed;
    pendingTasksDisplay.textContent = pending;
}


// Display the initial empty state
renderTasks();

document.getElementById("task-search")
    .addEventListener("input", renderTasks);

// Select the Toggle Theme button
const themeToggle = document.getElementById("theme-toggle");

// Change the theme when the button is clicked
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});    
// Select the study-time calculator form
const calculatorForm = document.getElementById("calculator-form");

// Select the result display
const calculatorResult = document.getElementById("calculator-result");

// Calculate total study time
calculatorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const hours = Number(document.getElementById("study-hours").value);
    const minutes = Number(document.getElementById("study-minutes").value);

    const totalMinutes = hours * 60 + minutes;

    calculatorResult.textContent =
        "Total study time: " + totalMinutes + " minutes";
});

// Select the feedback form
const feedbackForm = document.getElementById("feedback-form");

// Select the feedback result message
const feedbackResult = document.getElementById("feedback-result");

// Validate the feedback form
feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("student-name").value.trim();
    const email = document.getElementById("student-email").value.trim();
    const message = document.getElementById("feedback-message").value.trim();

    if (name === "" || email === "" || message === "") {
        feedbackResult.textContent = "Please fill in all fields.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        feedbackResult.textContent = "Please enter a valid email address.";
        return;
    }

    feedbackResult.textContent = "Thank you, " + name + "! Your feedback has been validated.";
    feedbackForm.reset();
});