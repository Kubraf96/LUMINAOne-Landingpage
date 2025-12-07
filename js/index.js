//Når hele vinduet (siden) er loadet, kaldes funktionen initApp
window.addEventListener("load", initApp);

// Et tomt array, som senere vil blive fyldt med produktdata fra JSON-filen
let allProductImages = [];

// gør initApp asynkron, så vi kan "vente" på getProducts
async function initApp() {
  //vent på at produkterne er hentet, før vi bruger allProductImages
  await getProducts();

  // Finder produktbilledet i DOM'en og sætter det til det første billede i allProductImages
  const img = document.querySelector('.product-image');

  // lille sikkerhed, hvis noget går galt
  if (!img || allProductImages.length === 0) return;

  img.src = allProductImages[0].imageUrl;

  // Finder alle elementer med klassen "product-color" fra HTML'en
  const elements = document.querySelectorAll('.product-color');

  // Tilføjer et klik-event til hver farveknap
  elements.forEach(element => {
    element.addEventListener('click', e => {

     // Går igennem alle klasser på det klikede element
      e.currentTarget.classList.forEach((className) => {

        // Finder det objekt i allProductImages, hvor id matcher klassens navn
        const obj = allProductImages.find(x => x.id === className);

        // Hvis der findes et matchende produkt-objekt
        if (obj) {
          // Skifter billedets source til det nye billede fra JSON'en
          img.src = obj.imageUrl;
              const label = document.querySelector('.product-color-label');
        if (label) {
          label.textContent = obj.name;
        }
        }
      });
    });
  });
}

async function getProducts() {
  // Henter JSON-filen med produktdata
  const response = await fetch("./js/data/products.json");
  // Konverterer svaret til JavaScript-objekter
  const jsonResponse = await response.json();
  // Lagrer produkterne i allProductImages, så de kan bruges i resten af koden
  allProductImages = jsonResponse.luminaProducts;
}