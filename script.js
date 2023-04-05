const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

const addItem = function (e) {
  e.preventDefault();

  const text = this.querySelector('[name="item"]').value;
  const item = {
    text,
    done: false,
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

displayList(items, itemsList);

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleChecked);
