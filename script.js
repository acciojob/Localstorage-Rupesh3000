const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

// 🔥 remove placeholder immediately
itemsList.innerHTML = "";

const items = JSON.parse(localStorage.getItem("items")) || [];

function populateList(items = [], itemsList) {
  itemsList.innerHTML = "";

  items.forEach((plate, i) => {
    itemsList.innerHTML += `
      <li>
        <input
          type="checkbox"
          data-index="${i}"
          id="item${i}"
          ${plate.done ? "checked" : ""}
        />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  });
}

populateList(items, itemsList);

function handalSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const text = formData.get("item").trim();

  if (!text) return;

  items.push({ text, done: false });
  localStorage.setItem("items", JSON.stringify(items));

  populateList(items, itemsList);
  e.target.reset();
}

function toggleDone(e) {
  if (!e.target.matches("input[type='checkbox']")) return;

  const index = e.target.dataset.index;
  items[index].done = !items[index].done;

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", handalSubmit);
itemsList.addEventListener("click", toggleDone);
