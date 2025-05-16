document.addEventListener('DOMContentLoaded', () => {
    loadGoals();
});

function addGoal() {
    const input = document.getElementById("goalInput");
    const goalText = input.value.trim();
    if (!goalText) return;

    const goalType = classifyGoal(goalText);
    const goal = {
        text: goalText,
        type: goalType,
        date: new Date().toLocaleDateString(),
        completed: false
    };

    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(goal);
    localStorage.setItem("goals", JSON.stringify(goals));

    input.value = "";
    displayGoals();
    updateAvatarMessage(goalType);
}

function classifyGoal(text) {
    const academicKeywords = ["math", "test", "score", "study", "read", "exam"];
    const socialKeywords = ["friend", "talk", "relationship", "help", "teacher"];
    const selfKeywords = ["sleep", "emotion", "feel", "mental", "confidence", "calm"];

    const lowered = text.toLowerCase();
    if (academicKeywords.some(k => lowered.includes(k))) return "Academic";
    if (socialKeywords.some(k => lowered.includes(k))) return "Relationship";
    if (selfKeywords.some(k => lowered.includes(k))) return "Self";
    return "General";
}
