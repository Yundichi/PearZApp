document.addEventListener('DOMContentLoaded', () => {
  fetch('growth.json')
    .then(res => res.json())
    .then(data => {
      // Positive Points
      document.getElementById('positivePoints').textContent = data.positiveEmotionPoints;

      // Task Completion Rate
      const rate = Math.round(100 * data.taskCompletion.completed / data.taskCompletion.total);
      document.getElementById('taskRate').textContent = rate + '%';

      // Reflections
      const list = document.getElementById('reflectionList');
      data.reflections.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `[${r.date}] (${r.emotion}) ${r.text}`;
        list.appendChild(li);
      });

      // Radar Chart
      const radarCtx = document.getElementById('radarChart').getContext('2d');
      new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: Object.keys(data.characterStrengthRadar),
          datasets: [{
            label: 'Character Strengths',
            data: Object.values(data.characterStrengthRadar),
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
          }]
        }
      });

      // Emotion Frequency Chart
      const emotionCtx = document.getElementById('emotionChart').getContext('2d');
      new Chart(emotionCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(data.emotionFrequency),
          datasets: [{
            label: 'Emotion Frequency',
            data: Object.values(data.emotionFrequency),
            backgroundColor: 'rgba(153,102,255,0.5)'
          }]
        }
      });
    });
});
