document.addEventListener("DOMContentLoaded", function () {
  const emotionData = JSON.parse(localStorage.getItem("emotionData")) || [];

  // 初始化情绪计数器
  const emotionCounts = {
    joy: 0,
    stress: 0,
    calm: 0,
    sadness: 0,
    neutral: 0
  };

  // 统计每种情绪的出现频率
  emotionData.forEach(e => {
    if (emotionCounts[e] !== undefined) {
      emotionCounts[e]++;
    }
  });

  // 获取 canvas 上下文并绘制图表
  const ctx = document.getElementById('emotionChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(emotionCounts),
      datasets: [{
        label: 'Emotion Frequency',
        data: Object.values(emotionCounts),
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',   // joy
          'rgba(255, 99, 132, 0.6)',   // stress
          'rgba(54, 162, 235, 0.6)',   // calm
          'rgba(153, 102, 255, 0.6)',  // sadness
          'rgba(201, 203, 207, 0.6)'   // neutral
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
