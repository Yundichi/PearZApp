function submitReflection() {
  const text = document.getElementById("reflectionText").value.trim();
  const emotion = document.getElementById("emotionSelect").value;

  if (!text || !emotion) {
    alert("请填写反思内容并选择一个情绪。");
    return;
  }

  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const newReflection = {
    text: text,
    emotion: emotion,
    date: today
  };

  let reflections = JSON.parse(localStorage.getItem("reflections")) || [];
  reflections.push(newReflection);
  localStorage.setItem("reflections", JSON.stringify(reflections));

  document.getElementById("reflectionText").value = "";
  document.getElementById("emotionSelect").value = "";
  document.getElementById("submittedNote").style.display = "block";
}
