import { logger } from "../../src/utils/logger.js";

const formEdit = document.querySelector("form");
const inputs = document.querySelectorAll("input");

window.addEventListener("load", async (event) => {
  try {
    const response = await fetch("/api/users/current");
    if (response.status === 403) {
      alert("necesitas loguearte para modificar tus datos!");
      return (window.location.href = "/login");
    }

    const result = await response.json();
    const user = result.payload;

    inputs[0].value = user.name;
    inputs[1].value = user.lastName;
    inputs[2].value = user.email;
  } catch (error) {
    logger.info(error);
    alert("Error loading /edit");
  }
});

formEdit?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEdit);
  formData.append("email", inputs[2].value);

  const body = new URLSearchParams(formData);

  const response = await fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (response.status === 200) {
    window.location.href = "/profile";
  } else {
    const error = await response.json();
    alert(error.message);
  }
});
