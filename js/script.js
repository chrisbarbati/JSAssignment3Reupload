//Captures userinput
const taskInput = document.querySelector("input");
const list = document.getElementById("list");

//captures section for checkbox
const div = document.getElementById("tasks");

//submit button
const button = document.querySelector("button");

//Make a new list to hold each task item
const listOfTasks = [];


//Adding rotating colour to H1
const textContainer = document.querySelector('h1');
        
        let hue = 0;
  
        setInterval(() => {
            hue = (hue + 1) % 360;
            const color = `hsl(${hue}, 100%, 50%)`;
            textContainer.style.color = color;
        }, 50);

//delete button for tasks
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete Selected Tasks";
deleteButton.addEventListener("click", deleteTask);
deleteButton.style.backgroundColor = "red";


//Locate it at the top of the list of tasks
const sectionList = document.querySelector(".sectionlist");
const tasksElement = document.querySelector("#tasks");
sectionList.insertBefore(deleteButton, tasksElement);

//List of Tasks
button.addEventListener("click", addTask);

//Function to add a task
function addTask() {
  const deleteMessage = document.getElementById('delete-message');
  
  // Check if there are any checked items in the list
  const hasCheckedItems = listOfTasks.some(task => task.checkBox.checked);

  if (hasCheckedItems) {
    // Show the delete message and return without adding new tasks
    deleteMessage.style.display = 'block';
    return;
  }
  // If there are no checked items, hide the delete message and proceed to add new tasks
  deleteMessage.style.display = 'none';


  if (taskInput.value.trim() !== "") {
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    const label = document.createElement("label");
    label.style.fontFamily = "sans-serif";
    label.style.fontSize = "25px";
    label.style.paddingLeft = "1%";
    label.style.color = "blue";
    label.textContent = taskInput.value.trim();

    // Attach the event listener to the checkbox
    checkBox.addEventListener('change', (event) => {
      const checkbox = event.target;
      const listItem = checkbox.parentElement;

      if (checkbox.checked) {
        // If the checkbox is checked, apply the 'checked' class to add line-through style
        listItem.classList.add('checked');
        // Move the checked item to the bottom of the list in the DOM
        list.appendChild(listItem);
         // Play the 'ding' sound when the item is checked
         const dingSound = document.getElementById('ding-sound');
         dingSound.currentTime = 0; // Reset the audio to the beginning
         dingSound.play();
      } else {
      // If the checkbox is checked, apply the 'checked' class to add line-through style
      listItem.classList.remove('checked');
       // Remove the listItem from the DOM after the fading effect is complete
       setTimeout(() => {
         todoList.removeChild(listItem);
       }, 500); // 500ms is the duration of the fade animation
      }
    });

    listOfTasks.push({ label, checkBox });
  }
 

  generateTaskList();
}

//Generates the list in the DOM
function generateTaskList() {
  list.textContent = "";

  listOfTasks.forEach(function (item, index) {
    const newTask = document.createElement("li");
      
    const labelSpan = document.createElement("span");
    labelSpan.style.fontFamily = "sans-serif";
    labelSpan.style.fontSize = "25px";
    labelSpan.style.paddingLeft = "1%";
    labelSpan.style.color = "blue";

    if (index === listOfTasks.length - 1) {
      animateText(item.label.textContent, labelSpan);
    } else {
      labelSpan.textContent = item.label.textContent;
    }


    newTask.appendChild(item.checkBox);
    newTask.appendChild(labelSpan);

    
    list.insertBefore(newTask, list.firstElementChild);
    list.append(newTask);
  });
}

//animates labels letters individually 
function animateText(text, element) {
  let index = 0;
  const animationInterval = setInterval(function () {
    element.textContent += text[index];
    index++;
    if (index >= text.length) {
      clearInterval(animationInterval);
    }
  }, 150);
}

//Deletes any tasks that have the checkbox selected
function deleteTask() {
  const deleteMessage = document.getElementById('delete-message');
  // If there are no checked items, hide the delete message and proceed to add new tasks
  deleteMessage.style.display = 'none';
  console.log("list of tasks length " + listOfTasks.length);

  for(index = 0; index < listOfTasks.length; index++){

    if (listOfTasks[index].checkBox.checked) {
        //console.log("test");
        listOfTasks.splice(index, 1);
        index--;
      }
      console.log(index);

  }

  console.log("list of tasks end " + listOfTasks.length);
  generateTaskList();

}
