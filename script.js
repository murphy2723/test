
// Simpan data pengguna di localStorage
function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (username && password) {
    if (localStorage.getItem(username)) {
      alert("Nama pengguna sudah terdaftar.");
    } else {
      const userData = {
        username: username,
        password: password,
        name: username,
        photo: null,
      };
      localStorage.setItem(username, JSON.stringify(userData));
      alert("Pendaftaran berhasil!");
      sessionStorage.setItem("currentUser", username);
      showChat();
    }
  } else {
    alert("Harap isi semua kolom.");
  }
}

// Logout
function logout() {
  sessionStorage.removeItem("currentUser");
  showRegister();
}

// Kirim pesan
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  const messagesDiv = document.getElementById("messages");

  if (message) {
    const newMessage = document.createElement("div");
    const currentUser = getCurrentUser();
    newMessage.textContent = `${currentUser.name}: ${message}`;
    messagesDiv.appendChild(newMessage);
    messageInput.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Tampilkan halaman profil
function showProfile() {
  const currentUser = getCurrentUser();
  document.getElementById("profile-name").value = currentUser.name;
  document.getElementById("profile").style.display = "block";
  document.getElementById("chat").style.display = "none";
}

// Simpan perubahan profil
function updateProfile() {
  const newName = document.getElementById("profile-name").value;
  const photoInput = document.getElementById("profile-photo");
  const currentUser = getCurrentUser();

  if (newName) currentUser.name = newName;
  if (photoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      currentUser.photo = reader.result;
      saveCurrentUser(currentUser);
      alert("Profil diperbarui!");
      showChat();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveCurrentUser(currentUser);
    alert("Profil diperbarui!");
    showChat();
  }
}

// Navigasi antar halaman
function showRegister() {
  document.getElementById("register").style.display = "block";
  document.getElementById("chat").style.display = "none";
  document.getElementById("profile").style.display = "none";
}

function showChat() {
  document.getElementById("register").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("profile").style.display = "none";
}

// Helper
function getCurrentUser() {
  const username = sessionStorage.getItem("currentUser");
  return JSON.parse(localStorage.getItem(username));
}

function saveCurrentUser(userData) {
  const username = sessionStorage.getItem("currentUser");
  localStorage.setItem(username, JSON.stringify(userData));
}
    