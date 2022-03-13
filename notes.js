// Add button
const noteAddBtn = document.querySelector(".note-add");
// Input text field
const noteInputText = document.querySelector(".note-input-text");
// Note list
const noteList = document.querySelector(".notes-list");

//Array to store the note items
//array will contain note objects. the object has id, name, completed (see below! *1)
let notes = [];

// add eventlistener to the form - listen for click. 
noteAddBtn.addEventListener('click', function(event){
    //Prevent page from reloading on submit
    // event.preventDefault();
    addNote(noteInputText.value.trim()); // call addTodo function with input box current value
});

// Add note item to list
function addNote(item){
    //if item is not empty (can't add empty item!)
    if (item !== ''){
        //make note object - (*1)
        const note = {
            id: Date.now(),
            name: item,
            completed: false
        };
    //Add to array
    notes.push(note);
    addToLocalStorage(notes);
    noteInputText.value = '';
    console.log(notes);
    }
}

// function to render given todos to screen
function renderNotes(notes) {
    // clear everything inside <ul> with class=todo-items
    noteList.innerHTML = '';
    // run through each item inside todos
    notes.forEach(function(item) {
      // check if the item is completed
      const checked = item.completed ? 'checked': null;
      // make a <li> element and fill it - <li> </li>
      const li = document.createElement('li');
      //Set <li> class: <li class="item"> </li>
      li.setAttribute('class', 'note-item');
      
      // Set the LI attribute to be the ID (date stamp) <li class="item" data-key="20200708"> </li>
      li.setAttribute('data-key', item.id);
      
      /* <li class="item" data-key="20200708"> 
            <input type="checkbox" class="checkbox">
            Go to Gym
            <button class="delete-button">X</button>
          </li> */
      // if item is completed, then add a class to <li> called 'checked', which will add line-through style
      if (item.completed === true) {
        li.classList.add('note-checked');
      }
  
      li.innerHTML = `
            <input type="checkbox" class="note-checkbox" ${checked}>
            <span class="note-text">${item.name}</span>
            <button class="note-delete-btn far fa-trash-alt">DEL</button>
      `;
      // finally add the <li> to the <ul>
      noteList.append(li);
    });

  }

// Adds the todos to local storage
function addToLocalStorage(todos){
    //convert array to string, searialize - JSON
    //localStorage is part of the DOM
    //access these values like an object, or with the Storage.getItem() and Storage.setItem() methods
    //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    localStorage.setItem('notes', JSON.stringify(notes));
    //render to the screen
    renderNotes(notes);
}