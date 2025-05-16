function detectEmotion(text) {
    const emotions = {
        joy: ["happy", "joy", "excited", "grateful"],
        stress: ["tired", "stressed", "anxious", "overwhelmed"],
        calm: ["peaceful", "calm", "relaxed", "mindful"],
        sadness: ["sad", "down", "lonely", "discouraged"]
    };

    for (const [emotion, keywords] of Object.entries(emotions)) {
        for (const word of keywords) {
            if (text.toLowerCase().includes(word)) {
                return emotion;
            }
        }
    }
    return "neutral";
}

function getCurrentWeekNumber() {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = ((now - oneJan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7);
}

document.addEventListener("DOMContentLoaded", function () {
    const summary = localStorage.getItem("growthSummary") || "You completed 3 tasks this week and submitted 2 reflections.";
    const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    document.getElementById("summary-text").textContent = summary;

    const list = document.getElementById("reflection-list");
    reflections.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        list.appendChild(li);
    });

    const currentWeek = getCurrentWeekNumber();
    const lastWeek = parseInt(localStorage.getItem("lastUpdatedWeek")) || 0;
    if (currentWeek !== lastWeek) {
        localStorage.setItem("growthPoints", 0);
        localStorage.setItem("lastUpdatedWeek", currentWeek);
    }

    const points = parseInt(localStorage.getItem("growthPoints")) || 0;
    document.getElementById("points").textContent = points;

    if (reflections.length >= 3) {
        let feedback = "";
        if (reflections.length >= 10) {
            feedback = "You're truly building a mindful habit. Incredible progress!";
        } else if (reflections.length >= 6) {
            feedback = "Your reflections are becoming deeper. Keep going!";
        } else {
            feedback = "You've shown great consistency. Keep it up!";
        }
        document.getElementById("feedback").textContent = feedback;
    }

    const emotionData = JSON.parse(localStorage.getItem("emotionData")) || [];
    const emotionCounts = { joy: 0, stress: 0, calm: 0, sadness: 0, neutral: 0 };
    emotionData.forEach(e => {
        if (emotionCounts[e] !== undefined) emotionCounts[e]++;
    });

    const emotionCtx = document.getElementById("emotionChart").getContext("2d");
    new Chart(emotionCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(emotionCounts),
            datasets: [{
                label: 'Emotion Frequency',
                data: Object.values(emotionCounts),
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(201, 203, 207, 0.6)'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
});

function addReflection() {
    const newText = document.getElementById("new-reflection").value.trim();
    if (newText === "") {
        alert("Please enter some reflection text.");
        return;
    }

    const emotion = detectEmotion(newText);
    let emotionData = JSON.parse(localStorage.getItem("emotionData")) || [];
    emotionData.push(emotion);
    localStorage.setItem("emotionData", JSON.stringify(emotionData));

    let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    reflections.unshift(newText);
    localStorage.setItem("reflections", JSON.stringify(reflections));

    document.getElementById("new-reflection").value = "";

    let points = parseInt(localStorage.getItem("growthPoints")) || 0;
    points += 1;
    localStorage.setItem("growthPoints", points);
    document.getElementById("points").textContent = points;

    const list = document.getElementById("reflection-list");
    const li = document.createElement("li");
    li.textContent = newText;
    list.insertBefore(li, list.firstChild);
}

window.addReflection = addReflection;
