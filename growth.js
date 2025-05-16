function detectEmotion(text) {
    const emotionMap = {
        joy: ["happy", "joy", "excited", "grateful"],
        calm: ["calm", "relaxed", "peaceful"],
        sad: ["sad", "down", "upset"],
        angry: ["angry", "mad", "frustrated"]
    };
    text = text.toLowerCase();
    for (const [emotion, keywords] of Object.entries(emotionMap)) {
        if (keywords.some(word => text.includes(word))) return emotion;
    }
    return "neutral";
}

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

    document.getElementById("new-reflection").value = "";
    renderReflections();
    renderEmotionChart();
}

function renderReflections() {
    const reflections = JSON.parse(localStorage.getItem("reflections")) || [];
    const list = document.getElementById("reflection-list");
    list.innerHTML = "";
    reflections.forEach(reflection => {
        const li = document.createElement("li");
        li.textContent = reflection;
        list.appendChild(li);
    });
}

function renderEmotionChart() {
    const data = JSON.parse(localStorage.getItem("emotionData")) || [];
    const counts = {};
    data.forEach(emotion => counts[emotion] = (counts[emotion] || 0) + 1);

    const ctx = document.getElementById("emotionChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: "Emotion Frequency",
                data: Object.values(counts)
            }]
        }
    });
}

window.onload = () => {
    renderReflections();
    renderEmotionChart();
    const pos = parseInt(localStorage.getItem("positiveEmotionPoints")) || 0;
    document.getElementById("positivePoints").textContent = pos;
};
