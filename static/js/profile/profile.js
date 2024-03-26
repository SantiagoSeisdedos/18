const formLogout = document.querySelector("form");
const spans = document.querySelectorAll("span");

window.addEventListener("load", async () => {
  try {
    const response = await fetch("/api/users/current");
    console.log("response", response);

    if (response.status === 403) {
      throw new Error("Unauthorized");
    }

    const result = await response.json();
    const user = result.data; // Cambiado de result.payload a result.data
    function mostrarMensajeLogin() {
      Swal.fire({
          icon: 'warning',
          title: 'Debes estar logueado',
          text: 'Debes iniciar sesión para acceder a esta página.',
          confirmButtonText: 'OK',
          showCancelButton: false
      }).then((result) => {
          if (result.isConfirmed) {
              // Redirigir al usuario a la página de inicio de sesión
              window.location.href = '/login';
          }
      });
  }
  user ? null : mostrarMensajeLogin();

    spans[0].innerHTML = user.name;
    spans[1].innerHTML = user.lastName;
    spans[2].innerHTML = user.email;

    const ul = document.getElementById("profileUL");
    const liLogout = document.createElement("li");
    ul?.appendChild(liLogout);
    const aLogout = document.createElement("a");
    liLogout.appendChild(aLogout);
    aLogout.innerHTML = "Logout";
    aLogout.href = "#";
    aLogout.addEventListener("click", logout);
  } catch (error) {
    if (error.message === "Unauthorized") {
      alert("No autorizado!");
      return (window.location.href = "/login");
    } else {
      console.log("profile catch", error);
    }
  }
});

const logout = async (event) => {
  try {
    const response = await fetch("/api/sessions/current", {
      method: "DELETE",
    });

    if (response.status === 200) {
      alert("Logout successful!");
      window.location.href = "/login";
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  } catch (error) {
    console.error("profile catch", error);
    alert(error.message);
  }
};
