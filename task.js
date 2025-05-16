
document.addEventListener('DOMContentLoaded', () => {
  fetch('tasks.json')
    .then(res => res.json())
    .then(data => {
      const taskList = document.getElementById('tasks');
      data.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} (${task.category}) - ${task.status}`;
        taskList.appendChild(li);
      });
    });
});

function submitReflection() {
  const text = document.getElementById('reflectionText').value;
  if (!text) {
    alert("Please enter your reflection.");
    return;
  }
  alert("Reflection submitted! (Will be saved to localStorage or backend in the future.)");
  document.getElementById('reflectionText').value = '';
}
