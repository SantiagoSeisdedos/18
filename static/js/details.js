document.addEventListener("DOMContentLoaded", () => {
    // Este código se ejecutará después de que se haya cargado completamente el HTML
  
    // Obtener la URL actual del navegador
    const url = window.location.href;
  
    // Obtener la ID de la URL
    const id = url.split('/').pop(); // Suponiendo que la ID está al final de la URL después de la última barra '/'
  
    console.log('ID obtenida de la URL:', id);
  
    const api = `/api/products/${id}`;
  
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(product => {
        console.log('Producto obtenido:', product);
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productCategory').textContent = product.category;
        document.getElementById('productCode').textContent = product.code;
        document.getElementById('productStock').textContent = product.stock;
         const imageElement = document.getElementById('image');
         console.log(imageElement);
         if (imageElement) {
           imageElement.src = `/${product.thumbnail[0]}`;
        } else {
           console.error('No se encontró el elemento con ID "image" en el HTML');
         }
        
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
      });
  
  });

  