function getCurrentWeekNumber() {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = ((now - oneJan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7);
}

document.addEventListener("DOMContentLoaded", function() {

    
    const summary = localStorage.getItem("growthSummary") || "You completed 3 tasks this week and submitted 2 reflections.";
    const reflections = JSON.parse(localStorage.getItem("reflections")) || [
        "I learned to be more mindful during the group task.",
        "Today I handled stress better than before."
    ];

    // 每周一自动清零积分
const currentWeek = getCurrentWeekNumber();
const lastWeek = parseInt(localStorage.getItem("lastUpdatedWeek")) || 0;

if (currentWeek !== lastWeek) {
    localStorage.setItem("growthPoints", 0);
    localStorage.setItem("lastUpdatedWeek", currentWeek);
}    
    
    const points = parseInt(localStorage.getItem("growthPoints")) || 0;
document.getElementById("points").textContent = points;
    
    
    document.getElementById("summary-text").textContent = summary;

    const list = document.getElementById("reflection-list");
    reflections.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        list.appendChild(li);
    });

// InnerAI 鼓励提示逻辑
if (reflections.length >= 3) {
    let feedback = "";

    if (reflections.length >= 10) {
        feedback = "You're truly building a mindful habit. Incredible progress!";
    } else if (reflections.length >= 6) {
        feedback = "Your reflections are becoming deeper. Keep going!";
    } else {
        feedback = "You’ve shown great consistency. Keep it up!";
    }

    document.getElementById("feedback").textContent = feedback;
}
});



function addReflection() {
    const newText = document.getElementById("new-reflection").value.trim();
    if (newText === "") {
        alert("Please enter some reflection text.");
        return;
    }

    let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    reflections.unshift(newText);  // 插入最前面
    localStorage.setItem("reflections", JSON.stringify(reflections));

    // 清空输入框
    document.getElementById("new-reflection").value = "";

// 增加积分
let points = parseInt(localStorage.getItem("growthPoints")) || 0;
points += 1;
localStorage.setItem("growthPoints", points);
document.getElementById("points").textContent = points;
    

    // 更新页面上的反思列表
    const list = document.getElementById("reflection-list");
    const li = document.createElement("li");
    li.textContent = newText;
    list.insertBefore(li, list.firstChild); // 插入到最前
}
// 分析过去一周的反思数量
const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const today = new Date();
const dayCounts = [0, 0, 0, 0, 0, 0, 0];

// 模拟把每条反思分配给最近 7 天（此处先均匀假设）
for (let i = 0; i < reflections.length; i++) {
    const dayIndex = i % 7;
    dayCounts[dayIndex]++;
}

// 绘制图表
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Reflections This Week',
            data: dayCounts,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                precision: 0
            }
        }
    }
});
