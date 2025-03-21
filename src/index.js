document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const sortAscBtn = document.querySelector("#sort-asc");
  const sortDescBtn = document.querySelector("#sort-desc");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskInput = document.querySelector("#new-task-description").value.trim();
    const priority = document.querySelector("#task-priority").value;
    const dueDate = document.querySelector("#task-due-date").value;
    const assignee = document.querySelector("#task-assignee").value.trim();

    if (!taskInput) return; 

    const taskItem = document.createElement("li");
    taskItem.classList.add(priority); 

    taskItem.innerHTML = `
      <span><strong>${taskInput}</strong> (${priority.toUpperCase()})</span>
      <span>🗓 Due: ${dueDate || "No date"}</span>
      <span>👤 Assigned to: ${assignee || "Unassigned"}</span>
      <button class="edit">Edit</button>
      <button class="delete">X</button>
    `;

    taskItem.querySelector(".delete").addEventListener("click", () => {
      taskItem.remove();
    });

    taskItem.querySelector(".edit").addEventListener("click", () => {
      const newText = prompt("Edit task:", taskInput);
      if (newText) {
        taskItem.querySelector("span strong").textContent = newText;
      }
    });

    taskList.appendChild(taskItem);
    form.reset(); 
  });

  function sortTasks(order) {
    let tasks = [...taskList.children];
    tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return order === "asc"
        ? priorityOrder[a.classList[0]] - priorityOrder[b.classList[0]]
        : priorityOrder[b.classList[0]] - priorityOrder[a.classList[0]];
    });
    taskList.innerHTML = "";
      tasks.forEach(task => taskList.appendChild(task));
    }

  sortAscBtn.addEventListener("click", () => sortTasks("asc"));
  sortDescBtn.addEventListener("click", () => sortTasks("desc"));
});