//window.localStorage.clear();
const form = document.querySelector('.announce-form');
// select the input box
const announceInput = document.querySelector('.announcement');
const announceDate = document.querySelector('.date');
// select the <ul> with class="todo-items"
const announceList = document.querySelector('.announce-items');
const clear2 = document.querySelector('.button-div2')

let announceItems = [];

clear2.addEventListener('click', function(event){
  if(event.target.classList.contains('sort-button-span2')){
    //alert('test')
    announceItems.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });
    addToLocalStorage2(announceItems);
  }
  if(event.target.classList.contains('clear-button-span2')){
    announceItems = [];
    addToLocalStorage2(announceItems);
  }
});

announceList.addEventListener('click', function(event){
  if(event.target.tagName === 'LI'){
    event.target.classList.toggle('checked');
  }
}, false);

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
  announceItems.push(entry);
  addToLocalStorage2(announceItems);
  
  announceInput.value = '';
  announceDate.value = '';
}

function renderItems2(items){
  // announceItems.sort(function(a,b){
  //   return new Date(a.date) - new Date(b.date);
  // });
  announceList.innerHTML = '';
  //alert('test')
  for(let i = 0; i<items.length; i++){
    var checked = items[i].completed ? 'checked': null;
    
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', items[i].id);
    li.setAttribute('id', items[i].id);
    if(items[i].completed === true){
      li.classList.add('checked');
    }
    li.setAttribute('draggable', true);
    
    li.innerHTML = `
    ${items[i].date} &emsp; ${items[i].name}
    <button class='delete-button'>-</button>`;
    
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
  if (event.target && event.target.nodeName === 'LI'){
    toggle2(event.target.id);  // Check if the element is a LI
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo2(event.target.parentElement.getAttribute('data-key'));
    window.localStorage.removeItem(event.target.parentElement);
  }
});


let dragged2;
let id2;
let index2;
let indexDrop2;
let list2;

announceList.addEventListener("dragstart", ({target}) => {
    dragged2 = target;
    id2 = target.id;
    list2 = target.parentNode.children;
    for(let i = 0; i < list2.length; i += 1) {
      if(list2[i] === dragged2){
        index2 = i;
      }
    }
});

announceList.addEventListener("dragover", (event) => {
  event.preventDefault();
});

announceList.addEventListener("drop", ({target}) => {
  if(target.className == "item" && target.id !== id2) {
    let test2 = [...list2];
    let second2 = test2.indexOf(target)
    //alert(index);
    //alert(second);
    dragged2.remove( dragged2 );
    for(let i = 0; i < list2.length; i++) {
      if(list2[i] === target){
        indexDrop2 = i;
      }
    }
    // alert(index);
    //alert(indexDrop2);
    //console.log(ind2ex, indexDrop2);
    if(index2 > indexDrop2) {
      target.before( dragged2 );
    } 
    else {
      target.after( dragged2 );
    }

    announceItems = swapItems2(index2, second2);
    addToLocalStorage2(announceItems);
  }
});

function swapItems2(first, second){
  let [tmp] = announceItems.splice(first,1); 
  announceItems.splice(second,0, tmp);
  return announceItems; 
}


