var icon = document.getElementById('icon');
var isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme")) || false;

function setTheme(theme) {
  document.body.classList.toggle('dark_theme', theme);
  if (theme) {
    icon.src = "/images/icon-sun.svg";
  } else {
    icon.src = "/images/icon-moon.svg";
  }
}

icon.onclick = function() {
  isDarkTheme = !isDarkTheme;
  setTheme(isDarkTheme);
  localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
};

// Set the initial theme
setTheme(isDarkTheme);

// Rest of your code...



//Todo

let form = document.querySelector("form");
let text = document.getElementById("text");
let todoCon = document.querySelector(".todo-con");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

if (todos.length > 0) {
    todos.forEach((element) => {
        addTodo(element);
    });
}

function addTodo(elem) {
    let todoColl = document.createElement("div");
    todoColl.classList.add("todocoll");
    let todoText = text.value;
    if (elem) {
        todoText = elem.text;
    }
    if (todoText) {
        todoColl.innerHTML = `
            <div class="todo-li">
                <div class="check ${elem && elem.complete ? "active-check" : ""}">
                    <img src="/images/icon-check.svg" alt="">
                </div>
                <p class="ptag ${elem && elem.complete ? "complete" : ""}">${todoText}</p>
                <button class="close">
                    <img src="/images/icon-cross.svg" alt="">
                </button>
            </div>
            <div class="hr"></div>`;
        todoCon.appendChild(todoColl);
        updateLocalStorage();
    }
    let close = todoColl.querySelector(".close");
    close.addEventListener("click", () => {
        todoColl.remove();
        updateLocalStorage();
    });
    let check = todoColl.querySelector(".check");
    check.addEventListener('click', () => {
        check.classList.toggle("active-check");
        todoColl.children[0].children[1].classList.add("complete");
        updateLocalStorage();
    });
    text.value = "";
}

function updateLocalStorage() {
    let ptag = document.querySelectorAll(".ptag");
    let arr = [];
    ptag.forEach((element) => {
        arr.push({
            text: element.innerText,
            complete: element.classList.contains("complete"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(arr));
}

let info = document.querySelectorAll(".choice p");
let todoli = document.querySelectorAll(".todocoll");

info.forEach((element) => {
    element.addEventListener("click", () => {
        info.forEach((item) => {
            item.classList.remove("active");
        });
        element.classList.add("active");
        if (element.innerText == "Active") {
            todoli.forEach((elem) => {
                if (!elem.children[0].children[1].classList.contains("complete")) {
                    elem.style.display = "block";
                } else {
                    elem.style.display = "none";
                }
            });
        } else if (element.innerText == "Completed") {
            todoli.forEach((elem) => {
                if (elem.children[0].children[1].classList.contains("complete")) {
                    elem.style.display = "block";
                } else {
                    elem.style.display = "none";
                }
            });
        } else {
            todoli.forEach((elem) => {
                elem.style.display = "block";
            });
        }
    });
});

let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    todoli.forEach((elem) => {
        if (elem.children[0].children[1].classList.contains("complete")) {
            elem.remove();
            updateLocalStorage();
        }
    });
});

let left = document.querySelector(".left");
function setItems() {
    let activeTodo = document.querySelectorAll(".todo-li .active-check");
    let diff = todoli.length - activeTodo.length;
    left.innerText = `${diff} items left`;
}
setItems();
