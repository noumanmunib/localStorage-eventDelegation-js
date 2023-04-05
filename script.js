const addItems = document.querySelector(".add-items");
const removeItems = document.querySelector(".remove-items");
const clearAllBtn = document.querySelector(".clear-all");
const itemsList = document.querySelector(".plates");

const items = JSON.parse(localStorage.getItem("items")) || [];

const addItem = function (e) {
  e.preventDefault();

  const text = this.querySelector('[name="item"]').value;
  const item = {
    text,
    done: false, // NOT checked initially
  };
  items.push(item);
  displayList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
  // console.log(items);
};

const displayList = function (items = [], itemsList) {
  const html = items
    .map((item, i) => {
      return `
            <li>
              <input type="checkbox" data-index=${i} id="item${i}" ${
        item.done ? "checked" : ""
      }></input>
              <label for="item${i}">${item.text}</label>
              </li>
          `;
    })
    .join("");
  itemsList.innerHTML = html;
};

const toggleChecked = function (e) {
  if (!e.target.matches("input")) return; // Skip it if NO input!
  // console.log(e.target);
  const el = e.target;
  // console.log(el.dataset.index);
  const index = el.dataset.index;

  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  displayList(items, itemsList);
};

const removeItem = function (e) {
  e.preventDefault();

  const checkedItems = items.filter((checkedItem) => checkedItem.done === true);
  checkedItems.forEach((checkedItem) => {
    const index = items.indexOf(checkedItem);
    items.splice(index, 1);
  });

  localStorage.setItem("items", JSON.stringify(items));
  displayList(items, itemsList);
};

const clearAll = function (e) {
  e.preventDefault();

  items.splice(0, items.length);

  localStorage.setItem("items", JSON.stringify(items));
  displayList(items, itemsList);
};

// Another method to clear the items list:
// const clearAll = function (e) {
//   items.length = 0; // set the items array to empty

//   localStorage.removeItem("items"); // remove the items from localStorage
//   displayList(items, itemsList);
// };

displayList(items, itemsList);

addItems.addEventListener("submit", addItem);
removeItems.addEventListener("submit", removeItem);
clearAllBtn.addEventListener("click", clearAll);
itemsList.addEventListener("click", toggleChecked);
