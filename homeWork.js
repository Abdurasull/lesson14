// const elSelect = document.querySelector(".js-bg-select");
// const elSelectLanguage = document.querySelector(".js-language-select");
// let bgColorObj = {
//     "dark": "black",
//     "light": "white" 
// }
// elSelect.addEventListener("change", function(evt){
//     let value = evt.target.value;
//     document.body.style.background = bgColorObj[value];
// })

// let languages = {
//     "en":{
//         title: "Hello"
//     },
//     "uz":{
//         title: "Salom"
//     }
// }

// let defaultLanguageApp = "en"

// elSelectLanguage.value = "en";

// const changeLanguage = (language) => {
//     jsTitle.textContent = languages[language || defaultLanguageApp].title;
// }
// elSelectLanguage.addEventListener("change", function(evt){
//     let val = evt.target.value;
//     changeLanguage(val)
// })
// changeLanguage();

const elForm = document.querySelector(".js-form");
const elInput = elForm.querySelector(".js-todo-title");
const elTodoList = document.querySelector(".js-todo-list");
const elTodoTemp = document.querySelector(".js-todo-temp").content;
const elComplatedBtn = document.querySelector(".Complated");
const elNoComplateBtn = document.querySelector(".No_complated");
const elAllComplatedBtn = document.querySelector(".All_complated");

let todos = [];
// hamma todolestlarni chiqarish uchun function
function todosRender(arr){
    let docFragment = document.createDocumentFragment();
    elTodoList.innerHTML = '';
    arr.forEach((todo) => {
        let clone = elTodoTemp.cloneNode(true);
        clone.querySelector(".js-todo-title").textContent = todo.todoTitle;
        clone.querySelector(".js-todo-del-btn").dataset.id = todo.id;
        clone.querySelector(".js-checkbox").dataset.id = todo.id;
        // Agar bajarilgan bo`lsa checked ni true ga o`zgartiramiz
        if(todo.isComplate){
            clone.querySelector(".js-checkbox").checked =true;
        }
        clone.querySelector(".js-todo-edit-btn").dataset.id = todo.id;
        docFragment.append(clone)
    });

    elTodoList.append(docFragment)
}
// faqat bilgilanganlarini chiqarish uchun function
function todosRenderComplated(arr){
    let docFragment = document.createDocumentFragment();
    elTodoList.innerHTML = '';
    arr.forEach((todo) => {
        let clone = elTodoTemp.cloneNode(true);
        if(todo.isComplate){    
            clone.querySelector(".js-todo-title").textContent = todo.todoTitle;
            clone.querySelector(".js-todo-del-btn").dataset.id = todo.id;
            clone.querySelector(".js-checkbox").dataset.id = todo.id;
            clone.querySelector(".js-checkbox").checked =true;
            clone.querySelector(".js-todo-edit-btn").dataset.id = todo.id;
            docFragment.append(clone);
        }
    });

    elTodoList.append(docFragment)
}
// Faqat bilgilanmaganlarini chiqarish function
function todosRenderComplatedNot(arr){
    let docFragment = document.createDocumentFragment();
    elTodoList.innerHTML = '';
    arr.forEach((el) => {
        let clone = elTodoTemp.cloneNode(true);
        if(!el.isComplate){
            clone.querySelector(".js-todo-title").textContent = el.todoTitle;
            clone.querySelector(".js-todo-del-btn").dataset.id = el.id;
            clone.querySelector(".js-checkbox").dataset.id = el.id;
            clone.querySelector(".js-todo-edit-btn").dataset.id = el.id;
            docFragment.append(clone);
        }
    })

    elTodoList.append(docFragment);

}
elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    let todoTitle = elInput.value;
    if(!todoTitle) return alert("Qiymat kiritish majburiy !");
    let newTodo = {
        id: todos.length + 1,
        isComplate: false,
        todoTitle,
    };
    todos.push(newTodo);
    elInput.value = '';
    elInput.focus();
    todosRender(todos);
});
window.addEventListener("click", function(evt){
    if(evt.target.matches(".js-todo-del-btn")){
        let id = evt.target.dataset.id;
        console.log(evt.target.dataset);
        let idx = todos.findIndex((todo) => todo.id == id);
        todos.splice(idx, 1);
        todosRender(todos)
    }
    if(evt.target.matches(".js-todo-edit-btn")){
        let id = evt.target.dataset.id;
        console.log(evt.target.dataset);
        let idx = todos.findIndex((todo) => todo.id == id);
        let newVal = prompt("Yangi qiymat kiriting !", todos[idx].todoTitle)
        todos[idx].todoTitle = newVal;
        todosRender(todos);
    }
    if(evt.target.matches(".js-checkbox")){
        console.log(todos)
        todos = todos.map((el) => el.id == evt.target.dataset.id ? {...el, isComplate: !el.isComplate} : el);
    }
});
// faqat bilgilanganmaganlarini chiqarish uchun
elNoComplateBtn.addEventListener("click", (evt) => {    
    todosRenderComplatedNot(todos);
}); 
// faqat bilgilanganlarini chiqarish uchun
elComplatedBtn.addEventListener("click", (evt) => {
    todosRenderComplated(todos);
});

elAllComplatedBtn.addEventListener("click", (evt) => {
    todosRender(todos);
});
// fetch("https://jsonplaceholder.typicode.com/users/1").then((res) => {
//     return res.json()
// }).then((val) => console.log(val))