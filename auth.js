// ==================== AUTH ====================
const USERS = {
  "admin": "admin",
  "teacher": "admin"
};

function checkAuth() {
  return sessionStorage.getItem("astar_user");
}

function login(username, password) {
  if (USERS[username] && USERS[username] === password) {
    sessionStorage.setItem("astar_user", username);
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem("astar_user");
  window.location.reload();
}
