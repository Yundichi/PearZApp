<script>
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("peerzUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // 显示欢迎语
  document.querySelector(".hero h1").innerText = `Welcome back, ${user.name}!`;

  // 显示头像
  const avatarImg = document.getElementById("ai-avatar").querySelector("img");
  avatarImg.src = `avatar_${user.avatar}.png`;

  // 加载任务数据
  fetch("userdata.json")
    .then((res) => res.json())
    .then((data) => {
      const userData = data.users.find(u => u.name.toLowerCase() === user.name.toLowerCase());

      if (userData) {
        // 显示 character strength
        const dailyBox = document.querySelector(".daily-tasks");
        const strength = document.createElement("div");
        strength.className = "task";
        strength.innerHTML = `Today’s Strength: <strong>${userData.strength}</strong>`;
        dailyBox.insertBefore(strength, dailyBox.children[1]);

        // 显示 daily tasks
        const dailyTaskList = userData.dailyTasks.map(task => `<div class="task">• ${task}</div>`).join("");
        dailyBox.innerHTML += dailyTaskList;

        // 显示 gov tasks
        const govBox = document.querySelector(".gov-tasks");
        const govTaskList = userData.govTasks.map(task => `<div class="task">• ${task}</div>`).join("");
        govBox.innerHTML += govTaskList;
      }
    });
});
</script>
