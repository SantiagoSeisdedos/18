const formRegister = document.querySelector("form");

formRegister?.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(formRegister)),
    });
    if (response.status === 201 || response.status === 200) {
      window.location.href = "/profile";
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
    alert("User created successfully");
  } catch (error) {
    alert(error.message || error);
  }
});
