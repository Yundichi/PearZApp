<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login - PearZ</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="login-page">
    <h1>Welcome to PearZ</h1>
    <input type="text" id="username" placeholder="Enter your name" />
    <select id="avatar">
      <option value="wukong">Wukong</option>
      <option value="fox">Fox</option>
      <option value="cat">Cat</option>
      <option value="raccoon">Raccoon</option>
      <option value="lami">Lami</option>
    </select>
    <button onclick="login()">Enter</button>
  </div>
  <script src="login.js"></script>
</body>
</html>
