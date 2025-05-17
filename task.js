document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("pearzUser"));

  if (!user) {
    console.warn("No pearzUser found in localStorage. Showing default content.");
    user = { name: "Guest", avatar: "wukong" }; // fallback guest
  }

  // 设置默认 Go 目标
  const goalText = document.getElementById("goal-text");
  if (goalText) {
    goalText.innerText = "Go 1: Practice Gratitude + Focus";
  }

  // 注入练习任务
  const practices = ["Deep Breathing", "Mindful Walking", "Emotion Matching"];
  const list = document.getElementById("practice-list");
  if (list) {
    practices.forEach(item => {
      const li = document.createElement("li");
      li.innerText = "☐ " + item;
      list.appendChild(li);
    });
  }

  // 控制台提示
  console.log(`Task page loaded for ${user.name}`);
});

// 点击按钮切换目标
function setNewGoal() {
  const goalText = document.getElementById("goal-text");
  if (goalText) {
    goalText.innerText = "Go 2: Help someone today with kindness.";
    console.log("Goal updated to Go 2");
  }
}
