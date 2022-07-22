
const todoInput=document.querySelector(".todo-input")
const addBtn=document.querySelector(".add-todo")
const todoList=document.querySelector(".todolist")
const filterOption=document.querySelector(".filter-todos")
document.addEventListener("DOMContentLoaded",getLocalTodos)

//add to list

function addTodo(e){

    e.preventDefault();

    const todoDiv=document.createElement("div");

    todoDiv.classList.add("todo")

    const newTOdo=`
    <li>${todoInput.value}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span>
    `;

    todoDiv.innerHTML=newTOdo;

    todoList.append(todoDiv)

    saveLocalTodo(todoInput.value)

    todoInput.value=""


}

addBtn.addEventListener("click" , addTodo)


//check or remove task

function checkRemove(e){

    const classList=[...e.target.classList]

    const item=e.target.parentElement.parentElement

    if(classList[1]==="fa-check-square"){

        item.classList.toggle("completed")

    }
    else if(classList[1]==="fa-trash-alt"){

        removeLocalTodo(item) 

        item.remove()

    }
}

todoList.addEventListener("click" ,checkRemove)


//filter tasks

function filterTodos(e){

    const option=e.target.value

    const tasks=[...todoList.childNodes]


    if(option==="all"){
        tasks.forEach(task=>{task.style.display="flex"})
    }


    else if(option==="completed"){

        tasks.forEach(task=>{
            if(task.classList.contains("completed")){
                task.style.display="flex"
            }
            else{task.style.display="none"}
        })
    }

    else if(option==="uncompleted"){

        tasks.forEach(task=>{
            if(!task.classList.contains("completed")){
                task.style.display="flex"
            }
            else{task.style.display="none"}
        })
    }
}

filterOption.addEventListener("click" , filterTodos)


//local storage


function saveLocalTodo(task){

    const saved=localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]

    saved.push(task)

    localStorage.setItem("todos",JSON.stringify(saved))

}

function getLocalTodos(){

    const saved=localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]


    saved.forEach(todo=>{

        const todoDiv=document.createElement("div");

        todoDiv.classList.add("todo")

        const newTOdo=`
        <li>${todo}</li>
        <span><i class="far fa-check-square"></i></span>
        <span><i class="far fa-trash-alt"></i></span>
        `;

        todoDiv.innerHTML=newTOdo;

        todoList.append(todoDiv)
    })

}


function removeLocalTodo(item){
     

    const saved=localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]

    const filterd=saved.filter(taskName=>taskName!==item.children[0].innerText)

    localStorage.setItem("todos",JSON.stringify(filterd))


}

