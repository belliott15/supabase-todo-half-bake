import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');
const loaderEl = document.querySelector('.load-wrapper');
const submitButton = document.querySelector('#submit');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();

    const data = new FormData(todoForm);
    await createTodo(data.get('todo'));
    displayTodos();

    submitButton.classList.toggle('animating');

    todoForm.reset();
});

async function displayTodos() {
    loaderEl.classList.remove('hidden');
    todosEl.textContent = '';
    // fetch the todos
    let todos = await getTodos();
    // display the list of todos
    for (let todo of todos){
        let todoList = renderTodo(todo);
         // be sure to give each todo an event listener
        if (todo.complete){
            todoList.classList.add('complete');
            todoList.classList.remove('incomplete');
        } else {
            todoList.addEventListener('click', async () => {
                await completeTodo(todo.id);
                displayTodos();
            });
        }
    // on click, complete that todo
        todosEl.append(todoList);
    }
    loaderEl.classList.add('hidden');
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', async () => {
    await displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});
