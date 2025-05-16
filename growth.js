document.addEventListener('DOMContentLoaded', () => {
  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];

  // 显示历史反思
  const historyEl = document.getElementById('growthHistory');
  reflections.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `[${item.date}] (${item.emotion}) ${item.text}`;
    historyEl.appendChild(li);
  });

  // 统计情绪频率
  const emotionCounts = {};
  let positivePoints = 0;
  reflections.forEach(({ emotion }) => {
    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    if (emotion === 'joy' || emotion === 'calm') {
      positivePoints += 1;
    }
  });

  document.getElementById('positivePoints').textContent = positivePoints;

  // 柱状图：情绪分布
  const ctx = document.getElementById('emotionChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(emotionCounts),
      datasets: [{
        label: 'Emotion Frequency',
        data: Object.values(emotionCounts),
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  // 雷达图：模拟品格强项（演示用）
  const strengthLabels = ['Curiosity', 'Kindness', 'Persistence', 'Creativity', 'Gratitude'];
  const radarData = strengthLabels.map(() => Math.floor(Math.random() * 5 + 1));

  const radar = document.getElementById('strengthChart').getContext('2d');
  new Chart(radar, {
    type: 'radar',
    data: {
      labels: strengthLabels,
      datasets: [{
        label: 'Character Strengths',
        data: radarData,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: { r: { beginAtZero: true, max: 5 } }
    }
  });
});
