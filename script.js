
let parent = document.getElementById("parent");
let list = document.getElementById("list");
let btn = document.getElementById("btn");


let lists = JSON.parse(localStorage.getItem("lists")) || [
  {
    listName: "Note 1",
    isDone: false,
  },
  {
    listName: "Note 2",
    isDone: false,
  },
  {
    listName: "Note 3",
    isDone: false,
  },
  {
    listName: "Note 4",
    isDone: true,
  },
];


function saveData() {
  localStorage.setItem("lists", JSON.stringify(lists));
}

let renderData = () => {
  parent.innerHTML = "";

  lists.map((item, index) => {
    let div = document.createElement("div");
    div.className = "todo";

    div.innerHTML = `
  <div class="todo-left">
            <input type="checkbox" ${item.isDone === true ? "checked" : ""} 
            onchange="toggleDone(${index})"/>
            <span class="${item.isDone ? "text-line" : ""}">${item.listName}</span>
          </div>
          <div class="icons">
            <span onclick="editList(${index})">✏️</span>
            <span onclick="deleteData(${index})">🗑</span>
          </div>
  `;

    parent.appendChild(div);
  });
};

renderData();

btn.onclick = () => {
  if (list.value.length > 0) {
    lists.push({
      listName: list.value,
      isDone: false,
    });

    saveData()
    renderData();
    list.value = "";
  }
};

function deleteData(index) {
  lists.splice(index, 1);

  saveData();
  renderData();
}

function editList(index) {
  let newName = prompt("O'zgartirish", lists[index].listName);

  lists[index].listName = newName;

  saveData(); 
  renderData();
}


function toggleDone(index) {
  lists[index].isDone = !lists[index].isDone;

  saveData();
  renderData();
}