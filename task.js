document.addEventListener('DOMContentLoaded', () => {
  const historyEl = document.getElementById('reflectionHistory');
  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];

  reflections.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `[${item.date}] (${item.emotion}) ${item.text}`;
    historyEl.appendChild(li);
  });
});

function submitReflection() {
  const text = document.getElementById('reflectionInput').value.trim();
  const emotion = document.getElementById('emotionSelect').value;

  if (!text) {
    alert('Please enter your reflection.');
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const newEntry = { date, emotion, text };

  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];
  reflections.push(newEntry);
  localStorage.setItem('reflections', JSON.stringify(reflections));

  alert('Reflection submitted!');
  window.location.reload(); // reload to refresh the history list
}
