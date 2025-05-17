document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("pearzUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // 欢迎语
  document.querySelector(".hero h1").innerText = `Welcome back, ${user.name}!`;

  // 显示头像
  const avatarImg = document.getElementById("ai-avatar").querySelector("img");
  avatarImg.src = `avatar_${user.avatar}.png`;

  // 加载任务
  fetch("userdata.json")
    .then(res => res.json())
    .then(data => {
      const userData = data.users.find(u => u.name.toLowerCase() === user.name.toLowerCase());
      if (userData) {
        // 显示 Strength
        const dailyBox = document.querySelector(".daily-tasks");
        const strength = document.createElement("div");
        strength.className = "task";
        strength.innerHTML = `Today’s Strength: <strong>${userData.strength}</strong>`;
        dailyBox.insertBefore(strength, dailyBox.children[1]);

        // Daily tasks
        const dailyTaskList = userData.dailyTasks.map(task => `<div class="task">${task}</div>`).join("");
        dailyBox.innerHTML += dailyTaskList;

        // Gov tasks
        const govBox = document.querySelector(".gov-tasks");
        const govTaskList = userData.govTasks.map(task => `<div class="task">${task}</div>`).join("");
        govBox.innerHTML += govTaskList;

        setTimeout(addCheckFunctionality, 300);
      }
    });

  // 初始化积分
  const currentPoints = parseInt(localStorage.getItem("growthPoints") || "0");
  updatePointsDisplay(currentPoints);
});

// 切换头像
function updateAvatar() {
  const avatar = document.getElementById("avatar").value;
  const avatarImg = document.getElementById("ai-avatar").querySelector("img");
  avatarImg.src = `avatar_${avatar}.png`;

  let user = JSON.parse(localStorage.getItem("pearzUser"));
  user.avatar = avatar;
  localStorage.setItem("pearzUser", JSON.stringify(user));
}

// 退出按钮
const logoutBtn = document.createElement("button");
logoutBtn.innerText = "Logout";
logoutBtn.className = "btn";
logoutBtn.style.position = "absolute";
logoutBtn.style.top = "10px";
logoutBtn.style.left = "20px";
logoutBtn.onclick = () => {
  localStorage.removeItem("pearzUser");
  window.location.href = "login.html";
};
document.body.appendChild(logoutBtn);

// 打勾功能
function addCheckFunctionality() {
  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach(task => {
    if (!task.classList.contains("checked")) {
      const checkBtn = document.createElement("button");
      checkBtn.innerText = "✓";
      checkBtn.className = "btn";
      checkBtn.style.marginLeft = "10px";
      checkBtn.style.backgroundColor = "#33cc33";
      checkBtn.style.fontSize = "0.8em";
      checkBtn.onclick = () => {
        task.classList.add("checked");
        checkBtn.innerText = "✓ Done";
        checkBtn.disabled = true;
        addGrowthPoints(10);
      };
      task.appendChild(checkBtn);
    }
  });
}

// 积分模块
function addGrowthPoints(points) {
  let current = parseInt(localStorage.getItem("growthPoints") || "0");
  current += points;
  localStorage.setItem("growthPoints", current.toString());
  updatePointsDisplay(current);
}

function updatePointsDisplay(points) {
  let scoreBoard = document.getElementById("score");
  if (!scoreBoard) {
    scoreBoard = document.createElement("div");
    scoreBoard.id = "score";
    scoreBoard.style.position = "absolute";
    scoreBoard.style.top = "10px";
    scoreBoard.style.right = "20px";
    scoreBoard.style.color = "#ffffcc";
    scoreBoard.style.fontWeight = "bold";
    document.body.appendChild(scoreBoard);
  }
  scoreBoard.innerText = `Growth Points: ${points}`;
}
