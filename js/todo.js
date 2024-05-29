const host = "http://35.169.119.254:8001";
const todosContainer = document.querySelector('.todos_container');

function getTodos() {
    axios.get(`${host}/todo`)
    .then(response => {
        console.log(response.data);
        renderTodos(response.data.todos);
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
    });
}

function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_item');
        todoDiv.textContent = todo.item;
        todosContainer.appendChild(todoDiv);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btnDelete');
        btnDelete.textContent = 'x';
        btnDelete.addEventListener('click', function() {
            deleteTodo(todo.id);
        });

        todoDiv.appendChild(btnDelete);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

const todoInput = document.querySelector(".todo_input");

todoInput.addEventListener('keypress', function (event) {
    if(event.key == 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const title = todoInput.value.trim();
    let todoData = {
        id: 0,
        item: title,
    };
    if(title == '') return;

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            getTodos();
        }).catch(error => {
            console.error("Error adding todo:", error);
        });
}

function deleteTodo(todoId) {
    axios.delete(`${host}/todo/${todoId}`)
        .then(function (response) {
            console.log('Deleted');
            getTodos();
        }).catch(error => {
            console.error('Error deleting todo:', error);
        });
}