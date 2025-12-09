//Når hele vinduet (siden) er loadet, kaldes funktionen initApp
window.addEventListener("load", initApp);

// Et tomt array, som senere vil blive fyldt med produktdata fra JSON-filen
let allProductImages = [];

// gør initApp asynkron, så vi kan "vente" på getProducts
async function initApp() {
  //vent på at produkterne er hentet, før vi bruger allProductImages
  await getProducts();

  // Sørge for at ændre billeder når man vælger en ny produkt farve
  setProductChangeEventListeners();

  // Tilføjer event listener til "Add to Cart" knappen
  //finder knappen og modal'en i DOM'en
  const productBtn = document.getElementsByClassName('product-btn')[0];

  console.log(productBtn);
  
  //finder modal'en i DOM'en
  const modal = document.getElementsByClassName('add-to-cart__modal')[0];
  const cancelBtn = document.getElementsByClassName('add-to-cart__modal__cancel')[0];

  console.log(modal)

  //tilføjer event listener til knappen
  productBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    modal.classList.add('add-to-cart__modal--show');
    modal.classList.remove('add-to-cart__modal--hide');
  });

  // Sikre at den ikke lukker modalen når du klikker inden i den, ved at stoppe event
  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Lukker for modalen ved cancel
  cancelBtn.addEventListener('click', (e) => {
    modal.classList.add('add-to-cart__modal--hide');
    modal.classList.remove('add-to-cart__modal--show');
  })

  // Sikre at vi lukker modalen når der blevet klikket hvor som helst andet i bodyen 
  const body = document.body;
  body.addEventListener('click', (e) => {
    modal.classList.add('add-to-cart__modal--hide');
    modal.classList.remove('add-to-cart__modal--show');
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

// Funktion til at sætte event listeners på add to cart modal
function setAddToCartModalEventListeners() {
  // Tilføjer event listener til "Add to Cart" knappen
  //finder knappen og modal'en i DOM'en
  const productBtn = document.getElementsByClassName('product-btn')[0];

  console.log(productBtn);
  
  //finder modal'en i DOM'en
  const modal = document.getElementsByClassName('add-to-cart__modal')[0];
  const cancelBtn = document.getElementsByClassName('add-to-cart__modal__cancel')[0];

  //tilføjer event listener til knappen
  productBtn.addEventListener('click', (e) => {
    console.log('..')
    modal.style.display = "block";
  });

  // Sikre at den ikke lukker modalen når du klikker inden i den, ved at stoppe event
  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Lukker for modalen ved cancel
  cancelBtn.addEventListener('click', (e) => {
      modal.style.display = "none";
  })

  // Sikre at vi lukker modalen når der blevet klikket hvor som helst andet i bodyen 
  const body = document.body;
  body.addEventListener('click', (e) => {
      modal.style.display = "none";
  });

}

function setProductChangeEventListeners() {
  // Finder produktbilledet i DOM'en og sætter det til det første billede i allProductImages
  const img = document.querySelector('.product-image');

  // lille sikkerhed, hvis den ikke kan finde billederne eller DOM elementet så kører resten af koden ikke
  if (!img || allProductImages.length === 0) {
    return;
  }

  img.src = allProductImages[0].imageUrl;

  // Finder alle elementer med klassen "product-color" fra HTML'en
  const elements = document.querySelectorAll('.product-color');

  // Tilføjer et klik-event til hver farveknap
  elements.forEach(element => {
    element.addEventListener('click', e => {
      // Går igennem alle klasser på det klikkede element
        e.currentTarget.classList.forEach((className) => {

          // Finder det objekt i allProductImages, hvor id matcher klassens navn
          const obj = allProductImages.find(x => x.id === className);

          // Hvis der findes et matchende produkt-objekt
          if (obj) {
            // Skifter billedets source til det nye billede fra JSON'en
            img.src = obj.imageUrl;
            // Opdaterer farvelabelen med det nye farvenavn
                const label = document.querySelector('.product-color-label');
          if (label) {
            label.textContent = obj.name;
          }
        }
      });
    });
  });
}
