let loadTask = () => {
    const list = document.querySelector('.js-todo-list');

    //Array for tasks
    let todoItems = [];

    let renderTodo = (todo) => {
        localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
        //select current todo in DOM
        const item = document.querySelector(`[data-key='${todo.id}']`);
        if (todo.deleted) {
            //remove from DOM
            item.remove();
            if (todoItems.length === 0) list.innerHTML = '';
            return;
        };
        //Check if task is checked
        const isChecked = todo.checked ? 'done' : '';
        //create li
        const node = document.createElement('li');
        node.setAttribute('class', `todo-item ${isChecked}`);
        node.setAttribute('data-key', todo.id);
        //Set content
        node.innerHTML =
            `<input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
        </button>`;
        //Append list if it doesn't exist
        if (item) {
            //replace if not
            list.replaceChild(node, item);
        } else {
            list.appendChild(node);
        }
    };

    //Create object
    let addTodo = (text) => {
        const todo = {
            text,
            checked: false,
            id: Date.now(),
        };
        //push into array
        todoItems.push(todo);
        renderTodo(todo);
    };

    const toggleDone = (key) => {
        const index = todoItems.findIndex(item => item.id === Number(key));
        //set to opposite
        todoItems[index].checked = !todoItems[index].checked;
        renderTodo(todoItems[index]);
    };

    function deleteTodo(key) {
        const index = todoItems.findIndex(item => item.id === Number(key));
        const todo = {
            deleted: true,
            ...todoItems[index]
        };
        todoItems = todoItems.filter(item => item.id !== Number(key));
        renderTodo(todo);
    }

    const form = document.querySelector('.js-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const input = document.querySelector('.js-todo-input');

        const text = input.value.trim();
        if (text !== '') {
            addTodo(text);
            input.value = '';
            input.focus();
        }
    });


    list.addEventListener('click', event => {
        if (event.target.classList.contains('js-tick')) {
            const itemKey = event.target.parentElement.dataset.key;
            toggleDone(itemKey);
        }

        if (event.target.classList.contains('js-delete-todo')) {
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const ref = localStorage.getItem('todoItemsRef');
        if (ref) {
            todoItems = JSON.parse(ref);
            todoItems.forEach(t => {
                renderTodo(t);
            });
        }
    });
};
export default loadTask;