document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("pearzUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("goal-text").innerText = "Go 1: Practice Gratitude + Focus";

  const practices = ["Deep Breathing", "Mindful Walking", "Emotion Matching"];
  const list = document.getElementById("practice-list");
  practices.forEach(item => {
    const li = document.createElement("li");
    li.innerText = "☐ " + item;
    list.appendChild(li);
  });
});

function setNewGoal() {
  document.getElementById("goal-text").innerText = "Go 2: Help someone today with kindness.";
}
