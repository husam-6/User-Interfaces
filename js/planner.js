//window.localStorage.clear();
const todoForm = document.querySelector('.form');
// select the input box
const todoInput = document.querySelector('.plan-inp');
const todoDate = document.querySelector('.due-date');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.items');

let items = [];

todoForm.addEventListener('submit', function(event){
  event.preventDefault();
  addItem(todoInput.value, todoDate.value);
});

function addItem(item, dueDate){
  if(item !== ''){
    var entry = {     //code has this as const
      id: Date.now(),
      date: dueDate,
      name: item, 
      completed: false
    };
  }
  else{
      alert("You must enter something!");
      return;
    }
  items.push(entry);
  addToLocalStorage(items);

  todoInput.value = '';
  todoDate.value = '';
}

function renderItems(items){
  items.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  });
  todoItemsList.innerHTML = '';
  //alert('test')
  for(let i = 0; i<items.length; i++){
    var checked = items[i].completed ? 'checked': null;
    
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', items[i].id);
    if(items[i].completed === true){
      li.classList.add('checked');
    }
    
    li.innerHTML = `
    <input type='checkbox' class='checkbox' ${checked}>
    ${items[i].date}: ${items[i].name}
    <button class='delete-button'>X</button>`;
    
    todoItemsList.append(li);
  }
}

// function to add todos to local storage
function addToLocalStorage(items) {
  // conver the array to string then store it.
  localStorage.setItem('items', JSON.stringify(items));
  // render them to screen
  renderItems(items);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
  var reference = localStorage.getItem('items');
  // if reference exists
  if (reference) {
    // converts back to array and store it in items array
    items = JSON.parse(reference);
    renderItems(items);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  for(let i = 0; i<items.length; i++){
   if(items[i].id == id){
     items[i].completed = !items[i].completed;
   }
  }
  addToLocalStorage(items);
};

function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  items = items.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
  //window.localStorage.removeItem(item.id);

  // update the localStorage
  addToLocalStorage(items);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
    window.localStorage.removeItem(event.target.parentElement);
  }
});
