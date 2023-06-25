//refrence to the form, input field and list unordered list elements.
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const addTaskForm = document.querySelector(
  "#addTaskForm"
)

//style
taskList.style = `
list-style: none;
margin-top: 1rem;
font-size: 1.5rem;
`

//create task
const createTaskItem = (task) => `
<li>
  <input type="checkbox" name="task" value="${task}"
   onChange="toggleTaskCompletion(event)"
   >

   <label for="task">${task}</label>
   <button class="clear-btn" type="button" onClick="removeTask(event)">
     X
   </button>
    </li>
  `
//hold the tasks from local storage
const storedTasks = 
JSON.parse(localStorage.getItem('tasks')) || []


//render the tasks
const renderTasks = () => {
    storedTasks.forEach((task) => {
      const taskItem = createTaskItem(task)
      taskList.insertAdjacentHTML('beforeend', taskItem)
 })
}
window.onload = renderTasks


//add tasks to the list
const addTask = (event) => {
    event.preventDefault()

    const task = taskInput.value
    const taskItem = createTaskItem(task)
    taskList.insertAdjacentHTML('beforeend', taskItem)

    storedTasks.push(task)
    localStorage.setItem(
        'tasks',
        JSON.stringify(storedTasks)
    )

  addTaskForm.reset() 
}
addTaskForm.addEventListener('submit', addTask)

//task completion
const toggleTaskCompletion = (event) => {
  const taskItem = event.target.parentElement
  const task = taskItem.querySelector('label')
 
 
  if (event.target.checked) {
    task.style.textDecoration = 'line-through'
  }else {
    task.style.textDecoration = 'none'
  }
}

//remove task
const removeTask = (event) => {
   const taskItem = event.target.parentElement
   const task = taskItem.querySelector('label').innerText
   
   const indexOfTask = storedTasks.indexOf(task)
   storedTasks.splice(indexOfTask, 1)
   localStorage.setItem(
    'tasks',
    JSON.stringify(storedTasks)
   )

   taskItem.remove()
  }

 