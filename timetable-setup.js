const addClassBtn = document.querySelector(".add-class");
const className = document.querySelector(".class");
const room = document.querySelector(".room");
const fgCheck = document.querySelector(".form-check");
const classList = document.querySelector(".class-list");
const editArea = document.querySelector(".edit-class");

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const PERIODS = 11;

let classes = [];

addClassBtn.addEventListener('click', function(e){
    e.preventDefault();
    let classData = {
        className: className.value.trim(),
        room: room.value.trim(),
        form: fgCheck.checked,
    }
    console.log(fgCheck.checked);
    addClass(classData);
});

function addClass(item){
    if(item !== ''){
        const newClass = {
            id: Date.now(),
            name: item.className,
            room: item.room,
            form: item.form,
        };
        let duplicate = false;
        classes.forEach(function(item){
            if (item.name === className.value && item.room === room.value){
                console.log("DUPLICATE");
                //change class for text fields  -  change border colour
                // add error message
                duplicate = true;
            } 
        }) 
        if (!duplicate){
            classes.push(newClass);
            addToLocalStorage(classes);
            console.log(classes);
            className.value = "";
            room.value = "";
            fgCheck.checked = false;
        }    
    }
}

function renderClasses(classes){
    classList.innerHTML = "";
    // console.log(classes.includes("1650289634182"));
    classes.forEach(function(item){
        const form = item.form;
        const li = document.createElement('li');
        li.setAttribute('class', 'class-item');
        li.setAttribute('data-key', item.id);

        if (form){
            li.classList.add('form-group');
            //hide check box for future additions. T can only have 1 form group
        }
        li.innerHTML = `
            <span class="class-name">${item.name}</span>
            <span class="room-name">${item.room}</span>
            <button class="del-class">Del</button>
        `;
        classList.append(li);
    });
}

function renderEdit(classes){
    editArea.innerHTML = "${";
    // classes.forEach(function(item){
    //     const form = item.form;
    //     const li = document.createElement('li');
    //     li.setAttribute('class', 'class-item');
    //     li.setAttribute('data-key', item.id);

    //     if (form){
    //         li.classList.add('form-group');
    //         //hide check box for future additions. T can only have 1 form group
    //     }
    //     li.innerHTML = `
    //         <span class="class-name">${item.name}</span>
    //         <span class="room-name">${item.room}</span>
    //         <button class="del-class">Del</button>
    //     `;
    //     classList.append(li);
    // });
}

function addToLocalStorage(classList){
    localStorage.setItem('classes', JSON.stringify(classes));
    renderClasses(classes)
}

function getFromLocalStorage(){
    const ref = localStorage.getItem('classes');
    if(ref){
        classes = JSON.parse(ref);
        renderClasses(classes);
    }
}

function delClass(id){
    classes = classes.filter(function(item){
        return item.id != id;
    });
    addToLocalStorage(classes);
}

//main
getFromLocalStorage();

// const delBtn = document.querySelector("del-class");

// delBtn.addEventListener('click',function(e){
//     delClass(e.target.parentElement.getAttribute('data-key'));
// })

classList.addEventListener('click',function(e){
    if(e.target.classList.contains('del-class')){
        delClass(e.target.parentElement.getAttribute('data-key'));
    } else if(e.target.classList.contains('class-name') || e.target.classList.contains('room-name')){
        editClass(e.target.parentElement.getAttribute('data-key'))
    }
});

function editClass(id){
    // console.log("CLICK" + id);
    let match = false;
    let classEdit
    while(!match){
        classes.forEach(function(item){
            if(item.id == id){
                console.log("MATCH");
                match = true;
                classEdit = item.name;

            }
            // const form = item.form;
            // const li = document.createElement('li');
            // li.setAttribute('class', 'class-item');
            // li.setAttribute('data-key', item.id);
    
            // if (form){
            //     li.classList.add('form-group');
            //     //hide check box for future additions. T can only have 1 form group
            // }
            // li.innerHTML = `
            //     <span class="class-name">${item.name}</span>
            //     <span class="room-name">${item.room}</span>
            //     <button class="del-class">Del</button>
            // `;
            // classList.append(li);
        });
    }
    editArea.innerHTML = `<p>Class: ${classEdit}</p>`;
       

}