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

  // ==== Task Interactions ====

  // 初始化任务列表
  const taskList = document.getElementById('task-list');
  const tasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      taskList.appendChild(li);
    });
  }

  renderTasks();  // 初次加载渲染

  // 添加新任务
  window.addTask = function () {
    const input = document.getElementById('task-input');
    const newTask = input.value.trim();
    if (newTask === '') {
      alert('Please enter a task!');
      return;
    }
    tasks.unshift(newTask);
    localStorage.setItem('completedTasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
  };

const taskItems = document.querySelectorAll('#task-list li');
taskItems.forEach(item => {
  item.addEventListener('click', () => {
    const emotionData = JSON.parse(localStorage.getItem('emotionData')) || [];
    emotionData.push("joy");
    localStorage.setItem('emotionData', JSON.stringify(emotionData));
    alert("Great job! You've earned a joy point!");
  });
});

});
