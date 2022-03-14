//select items
const form = document.querySelector(".grocery-form");
const clickMsg = document.querySelector(".alert");
const input = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const sbmtBtn = document.querySelector(".submit-btn");

let editElement;
let editFlag = false;
let editID = "";
//event listeners
form.addEventListener("submit", addItem);
//functions
function addItem(event) {
  event.preventDefault();
  const valInput = input.value;
  const id = new Date().getTime().toString();

  if (valInput !== "" && editFlag === false) {
    const elmnt = document.createElement("article");
    const atr = document.createAttribute("data-id");
    atr.value = id;
    elmnt.setAttributeNode(atr);
    elmnt.classList.add("grocery-item");
    elmnt.innerHTML = `
                        <p class="title">${valInput}</p>
                          <div class="btn-container">
                          <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                        `;
    const deleteBtn = elmnt.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = elmnt.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    list.appendChild(elmnt);
    dsplTxtMssg("Item Added To The List", "success");
    list.classList.add("show-container");
  } else if (valInput !== "" && editFlag === true) {
    dsplTxtMssg("Value Changed");
  } else {
    dsplTxtMssg("Please Enter Value", "danger");
  }
}

function dsplTxtMssg(text, clss = "success") {
  clickMsg.textContent = text;
  clickMsg.classList.add(`alert-${clss}`);

  setTimeout(() => {
    clickMsg.textContent = "";
    clickMsg.classList.remove(`alert-${clss}`);
  }, 2000);

  setBackToDefault();
  localStorage.removeItem("list");
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

//edit item

function editItem(event) {
  const element = event.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = event.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  sbmtBtn.textContent = "edit";
}

function setBackToDefault() {
  input.value = "";
  editFlag = false;
  editID = "";
  sbmtBtn.textContent = "submit";
}
//local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
//setup items
function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
