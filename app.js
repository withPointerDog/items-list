// ****** select items **********
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
// ****** event listeners **********
form.addEventListener("submit", addItem);
// ****** functions **********
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
}
// ****** local storage **********

// ****** setup items **********
