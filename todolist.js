const todoForm = document.querySelector('.todoForm');
let blankState = document.querySelector('.blankState')
let todoList = document.querySelector(".todoList");
// console.log(todoList);
let todoItems;
let mainitems = JSON.parse(localStorage.getItem('item'));
if (mainitems != null) {
  todoItems = mainitems
} else {
  todoItems = [];
}

render();
todoForm.addEventListener('submit', addTodo, false);

function addTodo(e) {
  e.preventDefault();
  const task = document.querySelector('#task').value.trim();
  const schedule = document.querySelector('#Scheduled').value;
  const category = document.querySelector('#category').value;
  if (task === "" || schedule === "") {
    (blankState.textContent = "Please Fill All Fields!")
    return;
  } else {
    let todo = {
      task,
      schedule,
      category,
    };
    
    todoItems.push(todo);
    todoForm.reset();
    localStorage.setItem('item', JSON.stringify(todoItems));
    
    todoList.innerHTML = "";
    render();
  };
};


function render() {
  let todoItems = JSON.parse(localStorage.getItem("item"))

  if (todoItems != null) {
  for (i = 0; i < todoItems.length; i++) {
      todo = todoItems[i];

      todoList.insertAdjacentHTML("beforeend",
        `<p id = ${todo.id} class = 'todo'>
        <span> &nbsp ${todo.category}:</span> &nbsp
          ${todo.task} at ${todo.schedule} 
          <span>
          <button onclick = 'deleteTodo(${todo.id})' class ="but" id = ${todo.id}> DEL</button>
          </span></p>`
      );
    }
  }
}

function deleteTodo(todo) {
  let todoItems = JSON.parse(localStorage.getItem("item"));

  let indextodo = todoItems.findIndex(i => i.id === todo);
  todoItems.splice(indextodo, 1);

  blankState.textContent = 'Task deleted';

  localStorage.setItem('item', JSON.stringify(todoItems));
  todoList.innerHTML = "";
  render();
}