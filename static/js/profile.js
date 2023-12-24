const formLogout = document.querySelector("form");

formLogout?.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/sessions/current", {
      method: "DELETE",
    });

    console.log("response", response);
    if (response.status === 204) {
      console.log("Logout successful!");
      window.location.href = "/login";
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  } catch (error) {
    console.error("profile catch", error);
    alert(error.message);
  }
});
