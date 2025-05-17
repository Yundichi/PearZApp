function login() {
  const name = document.getElementById("username").value.trim();
  const avatar = document.getElementById("avatar").value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  const user = {
    name: name,
    avatar: avatar
  };

  localStorage.setItem("peerzUser", JSON.stringify(user));
  window.location.href = "index.html";
}
