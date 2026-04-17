document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  const loggedInUser = localStorage.getItem("loggedInUser");
  const cameFromLogout = sessionStorage.getItem("fromLogout");

  // Clear logout flag
  sessionStorage.removeItem("fromLogout");

  // ✅ Register form handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "/frontend/screens/login/login.html";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  });
});
