//window.localStorage.clear();
const form = document.querySelector('.announce-form');
// select the input box
const announceInput = document.querySelector('.announcement');
const announceDate = document.querySelector('.date');
// select the <ul> with class="todo-items"
const announceList = document.querySelector('.announce-items');

let announceItems = [];

form.addEventListener('submit', function(event){
  event.preventDefault();
  addAnnounce(announceInput.value, announceDate.value);
});

function addAnnounce(item, dueDate){
  if(item !== ''){
    var entry = {     //code has this as const
      id: Date.now(),
      date: dueDate,
      name: item, 
      completed: false
    };
  }
  else{
    alert('You must enter something!');
    return; 
  }
  announceItems.push(entry);
  addToLocalStorage2(announceItems);

  announceInput.value = '';
  announceDate.value = '';
}

function renderItems2(items){
  announceItems.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  });
  announceList.innerHTML = '';
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
    
    announceList.append(li);
  }
}

// function to add todos to local storage
function addToLocalStorage2(items) {
  // conver the array to string then store it.
  localStorage.setItem('announces', JSON.stringify(items));
  // render them to screen
  renderItems2(items);
}

// function helps to get everything from local storage
function getFromLocalStorage2() {
  var reference = localStorage.getItem('announces');
  // if reference exists
  if (reference) {
    // converts back to array and store it in items array
    announceItems = JSON.parse(reference);
    renderItems2(announceItems);
  }
}

// toggle the value to completed and not completed
function toggle2(id) {
  for(let i = 0; i<announceItems.length; i++){
   if(announceItems[i].id == id){
     announceItems[i].completed = !announceItems[i].completed;
   }
  }
  addToLocalStorage2(announceItems);
};

function deleteTodo2(id) {
  // filters out the <li> with the id and updates the todos array
  announceItems = announceItems.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
  //window.localStorage.removeItem(item.id);

  // update the localStorage
  addToLocalStorage2(announceItems);
}

getFromLocalStorage2();

announceList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle2(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo2(event.target.parentElement.getAttribute('data-key'));
    window.localStorage.removeItem(event.target.parentElement);
  }
});
