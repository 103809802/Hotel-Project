document.addEventListener("DOMContentLoaded", function() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<h2>Welcome back, ${user}!</h2>`
    );
  } else {
    window.location.href = "login.html";
  }
});
