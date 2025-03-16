document.addEventListener("DOMContentLoaded", () => {
  // your code here
    const form = document.querySelector("#create-task-form");
    const taskList = document.querySelector("#tasks");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const taskInput = document.querySelector("#new-task-description");
      const task = taskInput.value.trim();
  
      if (!task) return; 
  
      const taskItem = document.createElement("li");
      
      const taskText = document.createElement("span");
      taskText.textContent = task;
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent;
        
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
          taskText.textContent = editInput.value.trim() || taskText.textContent;
          taskItem.replaceChild(taskText, editInput);
          taskItem.replaceChild(editBtn, saveBtn);
        });
  
        taskItem.replaceChild(editInput, taskText);
        taskItem.replaceChild(saveBtn, editBtn);
      });
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.addEventListener("click", () => taskItem.remove());
  
      taskItem.appendChild(taskText);
      taskItem.appendChild(editBtn);
      taskItem.appendChild(removeBtn);
      taskList.appendChild(taskItem);
  
      taskInput.value = "";
    });
  });
  