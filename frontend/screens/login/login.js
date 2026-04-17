document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const rememberMe = document.getElementById("rememberMe");

  const loggedInUser = localStorage.getItem("loggedInUser");
  const cameFromLogout = sessionStorage.getItem("fromLogout");

 
  // Clear logout flag
  sessionStorage.removeItem("fromLogout");

  // ✅ Auto-fill if "Remember Me" checked
  const savedUser = localStorage.getItem("rememberedUser");
  if (savedUser) {
    document.getElementById("username").value = savedUser;
    rememberMe.checked = true;
  }

  // ✅ Login form submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);

        if (rememberMe.checked) {
          localStorage.setItem("rememberedUser", username);
        } else {
          localStorage.removeItem("rememberedUser");
        }

        window.location.href = "/frontend/screens/homepage/homepage.html";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  });
});
