const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        const timestamp = new Date();
        const dateTimeString = timestamp.toLocaleString(); // Format the date and time

        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerHTML = `
            <span>${todoText}</span>
            <span class="timestamp">${dateTimeString}</span>
        `;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = '';

        updateLS();
    }
}

todoEl.addEventListener('touchstart', (e) => {
    e.preventDefault();

    // Check if it's a long press (more than 500ms, for example)
    const touchDuration = 200; // milliseconds
    const touchStartTime = new Date().getTime();

    const longPressTimer = setTimeout(() => {
        const index = Array.from(todosUL.children).indexOf(todoEl);
        todos.splice(index, 1);
        todoEl.remove();
        updateLS();
    }, touchDuration, touchStartTime);

    todoEl.addEventListener('touchend', () => {
        clearTimeout(longPressTimer);
    });
});





function updateLS() {
    const todoElements = document.querySelectorAll('li');

    const todos = [];

    todoElements.forEach(todoEl => {
        todos.push({
            text: todoEl.querySelector('span:first-child').innerText,
            completed: todoEl.classList.contains('completed'),
            timestamp: todoEl.querySelector('.timestamp').innerText
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}








