document.addEventListener("DOMContentLoaded", function () {
  fetch("laptop.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("productContainer");
      const searchInput = document.getElementById("searchInput");

      function displayProducts(products) {
        container.innerHTML = "";
        if (products.length === 0) {
          container.innerHTML = "<p>Aucun PC trouvé.</p>";
          return;
        }

        products.forEach(pc => {
          const productEl = document.createElement("div");
          productEl.className = "product";

          const images = pc.images.map(src => `<img src="${src}" alt="${pc.name}">`).join("");
          const gallery = `<div class="image-gallery">${images}</div>`;

          productEl.innerHTML = `
            ${gallery}
            <h2>${pc.name}</h2>
            <p>${pc.description}</p>
            <a class="buy-button" href="${pc.link}" target="_blank">Acheter maintenant</a>
          `;

          container.appendChild(productEl);
        });
      }

      displayProducts(data);

      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const filtered = data.filter(pc => pc.name.toLowerCase().includes(query));
        displayProducts(filtered);
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier JSON :", error);
    });
});
