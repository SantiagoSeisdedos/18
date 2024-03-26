window.addEventListener("load", async () => {
    try {
      const response = await fetch("/api/users/current");
  
      // if (response.status === 403) {
      //   throw new Error("Unauthorized");
      // }
  
      function createNavItem(link, buttonText) {
        const navItem = document.createElement("a");
        const button = document.createElement("button");
        navItem.href = link;
        navItem.target = "_self";
        button.innerHTML = buttonText;
        //navItem.className = "navItems";
        navItem.appendChild(button);
        return navItem;
    }
    
    const navBar = document.getElementById("navxd");
    const perfil = createNavItem("/profile", "Perfil");
    const signUp = createNavItem("/register", "Sign Up");
    const signIn = createNavItem("/login", "Sign In");
    const products = createNavItem("/products", "Products");
    const realTimeProducts = createNavItem("/realTimeProducts", "Ir a Real Time Products");
    const chat = createNavItem("/chat", "Ir al chat");
  
      const result = await response.json();
      const user = result.data; // Cambiado de result.payload a result.data
  
      user ? navBar.appendChild(perfil) : navBar.appendChild(signIn);
      user ?  navBar.appendChild(realTimeProducts) : navBar.appendChild(signUp);
  
      navBar.appendChild(products)
      navBar.appendChild(chat)
  
    } catch (error) {
      if (error.message === "Unauthorized") {
        alert("No autorizado!");
        return (window.location.href = "/login");
      } else {
        console.log("profile catch", error);
      }
    }
  });