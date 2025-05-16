
document.addEventListener("DOMContentLoaded", function() {
    const summary = localStorage.getItem("growthSummary") || "You completed 3 tasks this week and submitted 2 reflections.";
    const reflections = JSON.parse(localStorage.getItem("reflections")) || [
        "I learned to be more mindful during the group task.",
        "Today I handled stress better than before."
    ];

    document.getElementById("summary-text").textContent = summary;

    const list = document.getElementById("reflection-list");
    reflections.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        list.appendChild(li);
    });
});
