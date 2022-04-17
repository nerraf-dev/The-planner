const addClassBtn = document.querySelector(".add-class");
const className = document.querySelector(".class");
const room = document.querySelector(".room");
const fgCheck = document.querySelector(".form-check");

let classes = [];

addClassBtn.addEventListener('click', function(e){
    let classData = {
        className: className.value.trim(),
        room: room.value.trim(),
        form: fgCheck.value,
    }
    console.log(classData);
    // addClass(classData);
});

function addClass(item){
    if(item !== ''){
        const newClass = {
            name: item.className,
            room: item.room,
            form: item.form,
        };
        classes.push(newClass);
        // addToLocalStorage(classes);
        console.log(classes);
    }
}