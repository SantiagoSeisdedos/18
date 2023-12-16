const productList = document.querySelector("ul");
const validMemberMessage = document.getElementById("validMemberMessage");
const initialize = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lastAttemptedUsername = urlParams.get("lastAttemptedUsername");
  if (lastAttemptedUsername) {
    validMemberMessage.textContent = `Intentaste iniciar sesión como: ${lastAttemptedUsername}. Intenta con tu nombre, o uno de los siguientes: "admin", "santi", "jose", "tutor", "marian", "Jose Mariano"`;
  }

  const response = await fetch("/api/products");
  const products = await response.json();

  console.log("products", products);

  // productList.innerHTML = "";
  // for (const product of products.payload) {
  //   const li = document.createElement("li");
  //   li.innerHTML = `${product?.title}: ${product?.price}`;
  //   productList?.appendChild(li);
  // }
};

initialize();
