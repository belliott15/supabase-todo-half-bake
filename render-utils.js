export function renderTodo(todo) {
    // create a div and a p tag
    const todoContainer = document.createElement('div');
    const pTag = document.createElement('p');
    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    todoContainer.classList.add('complete');
    // add the 'todo' css class no matter what
    todoContainer.classList.add('todo');
    // put the todo's text into the p tag
    pTag.textContent = todo;
    // append stuff
    todoContainer.append(pTag);
    // return the div
    return todoContainer;
}