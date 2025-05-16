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
