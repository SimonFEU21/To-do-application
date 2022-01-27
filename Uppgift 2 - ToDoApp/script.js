const form = document.querySelector('#td-Form');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

const fetchTodos = async () => {
    
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  todos = data;

  listTodos();
}

fetchTodos();


const listTodos = () => {
  output.innerHTML = ''
  todos.forEach(todo => {
    output.appendChild(createTodoElement(todo))
  })
}

const createTodoElement = todo => {

  let card = document.createElement('div');
  card.classList.add('todo');

  let title = document.createElement('p');
  title.classList.add('todo-title');
  title.innerText = todo.title

  let button = document.createElement('button');
  button.classList.add('btn-primary', 'btn-secondary');
  button.innerText = 'X';

  
  card.appendChild(title);
  card.appendChild(button);
  

  button.addEventListener('click', () => removeTodo(todo.id, card))
  return card;
}

// remove from DataBase

function removeTodo(id, todo) {
  todos = todos.filter(todo => todo.id !== id)
  listTodos()

  // DELETE from db
  
  if('btn-secondary' === true) {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
     method: 'DELETE',
    });
    }
  todo.remove()
  console.log(todos)
}




const createNewTodo = title => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    todos.unshift(data);
    listTodos()
    // output.prepend(createTodoElement(data))
  })
}

// console.log(title);


form.addEventListener('submit', e => {
  e.preventDefault();
  
  if(input.value !== '') {
    createNewTodo(input.value);
    input.value = '';
    input.focus()
    
  } else {
    alert ('You must type something');
  }
  
})