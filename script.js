const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function populateList(items = [], itemsList) {
  if (!items.length) {
    itemsList.innerHTML = "<li>Loading Storage...</li>";
    return;
  }

  itemsList.innerHTML = items
    .map((plate, i) => {
      return `
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
    })
    .join("");
}

// 🔥 render on page load
populateList(items, itemsList);

const handalSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const itemValue = formData.get("item").trim();

  if (!itemValue) return;

  items.push({
    text: itemValue,
    done: false,
  });

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
  form.reset();
};

function toggleDone(e) {
  const checkbox = e.target.closest("li")?.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  const index = checkbox.dataset.index;
  items[index].done = !items[index].done;

  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}


addItems.addEventListener("submit", handalSubmit);
itemsList.addEventListener("click", toggleDone);
