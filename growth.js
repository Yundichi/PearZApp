// ===== Emotion Detection Function =====
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

// ===== Get Current Week Number =====
function getCurrentWeekNumber() {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = ((now - oneJan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7);
}

// ===== On Load Operations =====
document.addEventListener("DOMContentLoaded", function () {
    const summary = localStorage.getItem("growthSummary") || "You completed 0 reflections.";
    const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    document.getElementById("summary-text").textContent = summary;

    // Render reflection history
    const list = document.getElementById("reflection-list");
    reflections.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        list.appendChild(li);
    });

    // Reset growth points if week has changed
    const currentWeek = getCurrentWeekNumber();
    const lastWeek = parseInt(localStorage.getItem("lastUpdatedWeek")) || 0;
    if (currentWeek !== lastWeek) {
        localStorage.setItem("growthPoints", 0);
        localStorage.setItem("positiveEmotionPoints", 0);
        localStorage.setItem("lastUpdatedWeek", currentWeek);
    }

    const points = parseInt(localStorage.getItem("growthPoints")) || 0;
    document.getElementById("points").textContent = points;

    const positivePoints = parseInt(localStorage.getItem("positiveEmotionPoints")) || 0;
    document.getElementById("positivePoints").textContent = positivePoints;

    // InnerAI Encouragement
    if (reflections.length >= 3) {
        let feedback = "";
        if (reflections.length >= 10) {
            feedback = "You're truly building a mindful habit. Incredible progress!";
        } else if (reflections.length >= 6) {
            feedback = "Your reflections are becoming deeper. Keep going!";
        } else {
            feedback = "Great start! Keep reflecting daily.";
        }
        document.getElementById("feedback").textContent = feedback;
    }

    // Reflection Trend Line Chart
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    const today = new Date();
    for (let i = 0; i < reflections.length; i++) {
        const dayIndex = i % 7;
        dayCounts[dayIndex]++;
    }

    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
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

    // Emotion Frequency Bar Chart
    const emotionData = JSON.parse(localStorage.getItem("emotionData")) || [];
    const emotionCounts = {
        joy: 0, stress: 0, calm: 0, sadness: 0, neutral: 0
    };

    emotionData.forEach(e => {
        if (emotionCounts[e] !== undefined) {
            emotionCounts[e]++;
        }
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
                    'rgba(255, 206, 86, 0.6)',  // joy
                    'rgba(255, 99, 132, 0.6)',  // stress
                    'rgba(54, 162, 235, 0.6)',  // calm
                    'rgba(153, 102, 255, 0.6)', // sadness
                    'rgba(201, 203, 207, 0.6)'  // neutral
                ]
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
});

// ===== Add Reflection and Emotion =====
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

    // === Update positive emotion points ===
    const positiveEmotions = ["joy", "calm"];
    if (positiveEmotions.includes(emotion)) {
        let positivePoints = parseInt(localStorage.getItem("positiveEmotionPoints")) || 0;
        positivePoints += 1;
        localStorage.setItem("positiveEmotionPoints", positivePoints);
        document.getElementById("positivePoints").textContent = positivePoints;
    }

    let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    reflections.unshift(newText);
    localStorage.setItem("reflections", JSON.stringify(reflections));

    // Clear input
    document.getElementById("new-reflection").value = "";

    // Update points
    let points = parseInt(localStorage.getItem("growthPoints")) || 0;
    points += 1;
    localStorage.setItem("growthPoints", points);
    document.getElementById("points").textContent = points;

    // Insert to page immediately
    const list = document.getElementById("reflection-list");
    const li = document.createElement("li");
    li.textContent = newText;
    list.insertBefore(li, list.firstChild);
}

window.addReflection = addReflection;

            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    });

    // Render Emotion Frequency Bar Chart
    const emotionData = JSON.parse(localStorage.getItem("emotionData")) || [];
    const emotionCounts = {
        joy: 0, stress: 0, calm: 0, sadness: 0, neutral: 0
    };
    emotionData.forEach(e => {
        if (emotionCounts[e] !== undefined) {
            emotionCounts[e]++;
        }
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
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// ===== Add Reflection and Emotion =====
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

    // Update positiveEmotionPoints if emotion is positive
    const positiveEmotions = ["joy", "calm"];
    if (positiveEmotions.includes(emotion)) {
        let positivePoints = parseInt(localStorage.getItem("positiveEmotionPoints")) || 0;
        positivePoints += 1;
        localStorage.setItem("positiveEmotionPoints", positivePoints);
        document.getElementById("positivePoints").textContent = positivePoints;
    }

    let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    reflections.unshift(newText);
    localStorage.setItem("reflections", JSON.stringify(reflections));

    // Clear input
    document.getElementById("new-reflection").value = "";

    // Update points
    let points = parseInt(localStorage.getItem("growthPoints")) || 0;
    points += 1;
    localStorage.setItem("growthPoints", points);
    document.getElementById("points").textContent = points;

    // Insert to page immediately
    const list = document.getElementById("reflection-list");
    const li = document.createElement("li");
    li.textContent = newText;
    list.insertBefore(li, list.firstChild);
}

// Bind to global scope
window.addReflection = addReflection;
