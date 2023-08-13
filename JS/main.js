const myFormEl = document.querySelector("#My-form");
const textEl = document.querySelector("#List-text");
const out1 = document.querySelector("#list-pending");
const errorEl = document.querySelector("#Error");

// This function handles the form submission event
function handleForm(event) {
  event.preventDefault();

  const formText = textEl.value.trim();

  // Check if the input text is less than 3 characters
  if (formText.length < 3) {
    errorEl.textContent = "Please enter 3 or more characters";
    return;
  }

  // Clear the error element
  errorEl.textContent = "";

  // Create a new item container (div) to hold the list item and remove button
  const newItemContainer = document.createElement("div");
  const newItem = document.createElement("p");
  const removeButton = document.createElement("button");

  newItem.textContent = formText;

  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    newItemContainer.remove();
    updateLocalStorage();
  });

  newItemContainer.appendChild(newItem);
  newItemContainer.appendChild(removeButton);
  out1.appendChild(newItemContainer);

  // Clear the input field
  textEl.value = "";

  // Update the local storage after adding a new item
  updateLocalStorage();
}

// This function updates the data stored in local storage
function updateLocalStorage() {
  const listItems = Array.from(out1.children).map((itemContainer) => {
    return itemContainer.querySelector("p").textContent;
  });

  localStorage.setItem("listItems", JSON.stringify(listItems));
}

// This function loads items from local storage and adds them to the list on page load
function loadFromLocalStorage() {
  const storedItems = localStorage.getItem("listItems");
  if (storedItems) {
    const itemsArray = JSON.parse(storedItems);
    itemsArray.forEach((itemText) => {
      const newItemContainer = document.createElement("div");
      const newItem = document.createElement("p");
      const removeButton = document.createElement("button");

      newItem.textContent = itemText;

      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        newItemContainer.remove();
        updateLocalStorage();
      });

      newItemContainer.appendChild(newItem);
      newItemContainer.appendChild(removeButton);
      out1.appendChild(newItemContainer);
    });
  }
}

// Load from local storage on page load
loadFromLocalStorage();

// Add a submit event listener to the form element to call the handleForm function
myFormEl.addEventListener("submit", handleForm);
