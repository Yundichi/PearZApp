// 保存目标到 localStorage
function saveGoal(goal) {
    const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];
    existingGoals.push(goal);
    localStorage.setItem("goals", JSON.stringify(existingGoals));
}

// 提交表单时触发
document.addEventListener("DOMContentLoaded", function () {
    const goalForm = document.getElementById("goalForm");
    const goalTypeSelector = document.getElementById("goalType");

    goalForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const goalText = document.getElementById("goalInput").value.trim();
        const goalType = goalTypeSelector.value;
        if (goalText !== "") {
            const newGoal = {
                text: goalText,
                type: goalType,
                date: new Date().toLocaleDateString()
            };
            saveGoal(newGoal);
            displayGoals();
            updateAvatarMessage(goalType);
            document.getElementById("goalInput").value = "";
        }
    });

    goalTypeSelector.addEventListener("change", function () {
        updateAvatarMessage(this.value);
    });

    displayGoals(); // 初始加载历史目标
    updateAvatarMessage(goalTypeSelector.value); // 初始加载引导语
});

// 根据目标类型更新avatar引导语
function updateAvatarMessage(goalType) {
    const messageEl = document.getElementById('avatarMessage');
    switch (goalType) {
        case 'academic':
            messageEl.textContent = "Focus sharpens your mind. Let's plan how you'll achieve your academic goals!";
            break;
        case 'emotional':
            messageEl.textContent = "Understanding emotions is the first step to healing. How would you like to grow emotionally?";
            break;
        case 'relationship':
            messageEl.textContent = "Strong relationships build strong character. Let’s work on connecting better.";
            break;
        case 'self':
            messageEl.textContent = "Self-reflection is your superpower. What’s one small step you’ll take for yourself today?";
            break;
        default:
            messageEl.textContent = "Ready to set a meaningful goal? I’m here to help!";
    }
}

// 展示历史目标
function displayGoals() {
    const goalHistory = document.getElementById('goalHistory');
    goalHistory.innerHTML = "";
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];

    storedGoals.slice().reverse().forEach((goal, index) => {
        const div = document.createElement('div');
        div.className = "goal-card";
        div.innerHTML = `
            <strong>${goal.type.toUpperCase()}</strong> - ${goal.text}<br>
            <small>Set on: ${goal.date}</small>
        `;
        goalHistory.appendChild(div);
    });
}
