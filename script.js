let todoItemsContainer = document.getElementById("todoItemsContainer");
let addButton= document.getElementById("addButton");
let savingButton=document.getElementById("savingButton");

let todoList=getItemOfTodoListFromLocalStoarge();


function onStatusChange(checkboxId,labelId,todoId){
    let checkboxElement=document.getElementById(checkboxId);
    console.log(checkboxElement.checked);

    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let objectTodoIndex=todoList.findIndex(function(each){
        let eachTodoId="todo"+each.uniqueNo;
        if(eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject=todoList[objectTodoIndex];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }else{
        todoObject.isChecked=true;
    }
}

function onDelete(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteIndex=todoList.findIndex(function(each){
        let eachTodoId="todo"+each.uniqueNo;

        if(eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteIndex,1);
}

function createAndAppend(todo){
    let checkboxId="checkbox"+todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;
    let todoId="todo"+todo.uniqueNo;

    let listElement = document.createElement("li");
    listElement.classList.add("list-container");
    listElement.id=todoId;
    todoItemsContainer.appendChild(listElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick=function(){
        onStatusChange(checkboxId,labelId,todoId);
    }
    inputElement.checked=todo.isChecked;
    listElement.appendChild(inputElement);

    

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    listElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");  
    labelElement.setAttribute("for", checkboxId);
    labelElement.id=labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if(todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    listElement.appendChild(deleteIconContainer);

    let deleteButton = document.createElement("i");
    deleteButton.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteButton.onclick=function(){
        onDelete(todoId);
    }
    deleteIconContainer.appendChild(deleteButton);

}

function onAddItem(){
    let count=todoList.length;
    let userInput=document.getElementById("todoUserInput");
    let userInputValue=userInput.value;
    count=count+1;
    let newItem={
        text: userInputValue,
        uniqueNo: count,
        isChecked:false
    };
    todoList.push(newItem);
    createAndAppend(newItem);
    userInput.value="";

    if(userInputValue===""){
        alert ("Enter Valid Input");
        return;
    }
}
function getItemOfTodoListFromLocalStoarge(){
    let getStringfyItem=localStorage.getItem("todoList");
    let parsedTodo=JSON.parse(getStringfyItem);

    if(parsedTodo===null){
        return[];
    }else{
        return parsedTodo;
    }
}

addButton.onclick=function(){
    onAddItem();
};

savingButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
};

for (let todo of todoList){
    createAndAppend(todo);
}