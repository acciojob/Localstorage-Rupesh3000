const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

// ALWAYS start with empty list (kills placeholder)
itemsList.innerHTML = "";

const items = JSON.parse(localStorage.getItem("items")) || [];

function populateList(items, platesList) {
  platesList.innerHTML = items.map((plate, i) => `
    <li>
      <input
        type="checkbox"
        data-index="${i}"
        id="item${i}"
        ${plate.done ? "checked" : ""}
      />
      <label for="item${i}">${plate.text}</label>
    </li>
  `).join("");
}

// render on load
populateList(items, itemsList);

function handleSubmit(e) {
  e.preventDefault();

  const text = e.target.item.value.trim();
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

addItems.addEventListener("submit", handleSubmit);
itemsList.addEventListener("click", toggleDone);
