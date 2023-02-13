const todoButton = document.querySelector('.todo-button');
const inputText = document.querySelector('.input-text');
const ulList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
console.log('logging filteoption')
console.log(filterOption)

todoButton.addEventListener('click', addToDO);
ulList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

function addToDO(event){
    event.preventDefault();
    //Create todo-div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    //Create LI item
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = inputText.value;
    todoDiv.appendChild(todoItem);

    //Create completed button
    const completedButton = document.createElement('button');
    completedButton.classList.add('completed-button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(trashButton);

    // Appedn the todo-div to the ulList
    ulList.appendChild(todoDiv);
    
    //Clear the intput text 
    inputText.value = "";
};

function deleteCheck(event){
    const item = event.target;
    console.log(item);
    // because there is icon class inside trash button (see line #28 and #29) clicking on that button means - sometime you are clicking on the trash-button 
    // and sometimes on the icon. So if your click target was icon then below if condition does not work. Adding a check for another i class also fails 
    // as in that case it removes the button which is parent of i itself rather than the entire li element. so best fix is to remove the pointer event from
    // icon classes inside css.
  
 /*    if(item.classList[0] === "trash-button" || item.classList[0] === "fas"){
        const todoParent = item.parentElement;
        todoParent.remove();
    } */

    if(item.classList[0] === "trash-button"){
        const parentItem = item.parentElement;
        parentItem.classList.add("fall")
        parentItem.addEventListener('transitionend', function(){
            parentItem.remove();
        })
        //parentItem.remove();
    }


    if(item.classList[0] === "completed-button"){
        const parentItem = item.parentElement;
        parentItem.classList.toggle("completed");
    }

};

function filterTodo(event){    
    //get all the to do task you created which is under ul 
    const todos = ulList.childNodes;
    console.log(todos)
    //const todos = Array.from(ulList.childNodes);
    //loop thru all the individual to do task and check what filter option user has selected - all, completed or uncomplete
    //and decide based whether it should be displayed 
    todos.forEach(function(todo){        
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){                    
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;                
        }
    })
}