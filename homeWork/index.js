
const elRow = document.querySelector(".row");
const elForm = document.querySelector(".js-form");
const elInput = elForm.querySelector(".js-todo-title");
const elBtn = elForm.querySelector(".js-submitter");
const elTemplate = document.querySelector(".js-template").content;

// Barcha userlarni chiqarish
function AllUsers(users) {
    let docFragment = document.createDocumentFragment();
    users.forEach((el) => {
        let clone = elTemplate.cloneNode(true);
        clone.querySelector(".card-title").textContent = el.name;
        clone.querySelector(".card-text").textContent = el.email;
        docFragment.append(clone);
    })
    elRow.append(docFragment);
}

// userlarni search qilish
function searchUser(users, user) {
    let docFragment = document.createDocumentFragment();
    let newUsers = users.filter((el) => el.name.toUpperCase().includes(user.toUpperCase()));
    elRow.textContent = '';
    newUsers.forEach((el) => {
        let clone = elTemplate.cloneNode(true);
        clone.querySelector(".card-title").textContent = el.name;
        clone.querySelector(".card-text").textContent = el.email;
        docFragment.append(clone);
    })
    elRow.append(docFragment);
}

AllUsers(users);

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if(elInput.value) searchUser(users, elInput.value);
    else alert("Iltimos izlanadigan so`zni kiriting!");
})