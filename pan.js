//cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let panierFixe = document.querySelector('#panierFixe');
let numberOfItemsInCart = 0;


//pour ajouter
cartIcon.onclick = () => {

    cart.classList.add("active");
}
// pour le panier fixe
panierFixe.onclick = () => {

    cart.classList.add("active");
}


//fonction pour fermer
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//cart sur le quel on boss
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);

} else {
    ready();
}

//la fonction pour marquer
function ready() {
    //suprimer des element de la cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //ajouter une cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //bouton achat
    document.getElementsByClassName('bnt-bay')[0].addEventListener('click', bayButtonclicked);
}

//quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();


}

// boutton acheter
function bayButtonclicked() {
    window.location.href = "#achatForm";
    // alert('votre commade est faite');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    showBuyForm()
    updatetotal();
}

// Fonction pour afficher le formulaire
function showBuyForm() {
    // Afficher le formulaire en modifiant le style
    var achatForm = document.getElementById('achatForm');
    achatForm.style.display = "flex";
}
//suprimer des element de la cart
function removeCartItem(event) {
    var buttonCliked = event.target;
    buttonCliked.parentElement.remove();
    numberOfItemsInCart--;
    updateCartIcon();
    updatetotal();
}

// conteur
function updateCartIcon() {
    var cartIcon = document.querySelector('#cart-icon');
    let panierFixe = document.querySelector('#panierFixe');
    panierFixe.innerHTML = ` <i class='bx bx-cart-alt'></i><span class="item-count">${numberOfItemsInCart}</span>`;
    cartIcon.innerHTML = ` <span class="item-count">${numberOfItemsInCart}</span>`;
}

//ajouter a la cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduit = button.parentElement;
    var title = shopProduit.getElementsByClassName('product-title')[0].innerText
    var prix = shopProduit.getElementsByClassName('prix')[0].innerText
    var produtImg = shopProduit.getElementsByClassName('product-img')[0].src
    // aadProductToCart(title, prix, produtImg);

    // Vérifie si le produit est déjà dans le panier
    if (!isProductInCart(title)) {
        aadProductToCart(title, prix, produtImg);
        updatetotal();

        numberOfItemsInCart++;
        updateCartIcon();
        updatetotal();
    }
    else {
        alert("Vous avez déjà ajouté ce produit dans votre panier");
    }
}

// Fonction pour vérifier si le produit est déjà dans le panier
function isProductInCart(title) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-produit-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            return true;
        }
    }

    return false;
}

//pour ajouter un produits
function aadProductToCart(title, prix, produtImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-produit-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("Vous avez déjà ajouté ce produit dans votre panier");
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartBoxContent = `
        <img src="${produtImg}" alt="" class="cart-img">
        <div class="daitail-box">
            <div class="cart-produit-title">${title}</div>
            <div class="cart-prix">${prix}</div>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" onclick="decreaseQuantity(this)">-</button>
                <input type="number" value="1" class="cart-quantity" readonly>
                <button class="quantity-btn increase" onclick="increaseQuantity(this)">+</button>
            </div>
           <!-- <input type="number" value="1" class="cart-quantity">-->
        </div>
        <!-- supprimer -->
        <i class=' bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;

    cartItems.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);

    updatetotal();
}


//mettre a jours la somme total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var prixElement = cartBox.getElementsByClassName('cart-prix')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var prix = parseFloat(prixElement.innerText.replace("Fcfa", ""));

        var quantity = quantityElement.value;
        total = total + (prix * quantity);
    }
    //la somme des prix
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-prix')[0].innerText = total + 'Fcfa';

}
//le coeur
document.addEventListener('DOMContentLoaded', function () {
    var likeButtons = document.querySelectorAll('.coeur');

    likeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Vérifiez si le cœur est déjà cliqué
            if (button.classList.contains('add-like')) {
                // Si oui, retirez la classe 'add-like' pour annuler le clic
                button.classList.remove('add-like');
                // Mettez à jour la couleur du cœur
                button.style.color = 'red'; // Couleur initiale des cœurs
            } else {
                // Si non, ajoutez la classe 'add-like' pour indiquer le clic
                button.classList.add('add-like');
                // Mettez à jour la couleur du cœur
                button.style.color = 'blue'; // Nouvelle couleur des cœurs lorsqu'ils sont cliqués
            }
        });
    });

    //pour alterner les images
    const images = document.querySelectorAll('.liq');
    let index = 0;

    function displayNextImage() {
    images[index].style.display = 'none';
    index = (index + 1) % images.length;
    images[index].style.display = 'block';
}

    setInterval(displayNextImage, 3000); // Change l'image toutes les 3 secondes    
});

// ...

function decreaseQuantity(button) {
    var quantityInput = button.nextElementSibling;
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
        updatetotal();
    }
}

function increaseQuantity(button) {
    var quantityInput = button.previousElementSibling;
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updatetotal();
}


// ...bar de recherche
function search() {
    var searchTerm = document.getElementById("search-input").value.toLowerCase(); // Convertir le terme de recherche en minuscules pour la correspondance insensible à la casse
    var productBoxes = document.querySelectorAll('.product-box');

    // Parcourir tous les éléments de produit et les afficher ou les masquer en fonction de la correspondance du terme de recherche
    productBoxes.forEach(function (box) {
        var productTitle = box.querySelector('.product-title').innerText.toLowerCase();

        if (productTitle.includes(searchTerm)) {
            // Afficher l'élément si le terme de recherche correspond
            box.style.display = 'block';
        } else {
            // Masquer l'élément s'il ne correspond pas
            box.style.display = 'none';
        }
    });

    alert("Vous avez recherché : " + searchTerm);
    // Ajoutez ici le code pour effectuer la recherche réelle
}


//foncion pour eviter des nombre dans le nom
function validateInput(input) {
    var inputValue = input.value;
    if (/[^a-zA-Z]/.test(inputValue)) {
        alert("Veuillez saisir uniquement des lettres.");
        input.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }
}



// Fonctions de Partage pour chaque réseau social
function shareOnWhatsapp() {
    window.open('https://web.whatsapp.com/' + encodeURIComponent(window.location.href), '_blank');
}


let achatForm = document.getElementById('achatForm');
let nom = document.getElementsByClassName("nom")[0];
let prenom = document.getElementsByClassName("pre")[0];
let tel = document.getElementsByClassName("tel")[0];
let adresse = document.getElementsByClassName("adresse")[0];

achatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();

    // Vérifier si le panier est vide
    if (numberOfItemsInCart === 0) {
        alert("Votre panier est vide. Veuillez ajouter des produits avant de passer une commande.");
        return;
    }

    // Valider le formulaire (ajoutez votre logique de validation ici)

    if (nom.value === "") {
        alert("Veuillez saisir votre nom.");
        e.preventDefault();
    }

    if (tel.value === "") {
        alert("Veuillez saisir votre numéro de téléphone.");
        e.preventDefault();
    }

    if (adresse.value === "") {
        alert("Veuillez saisir votre adresse.");
        e.preventDefault();
    }

    // Validation pour s'assurer que le numéro de téléphone ne contient que des chiffres
    if (/[^0-9]/.test(tel.value)) {
        alert("Veuillez saisir uniquement des chiffres pour le numéro de téléphone.");
        e.preventDefault();
        return;
    }

    // Effectuer l'action d'achat (simulée par une alerte dans cet exemple)
    alert("Achat effectué!\nNom: " + nom.value + "\nPrénom: " + prenom.value + "\nTél: " + tel.value + "\nAdresse: " + adresse.value);

    // Réinitialiser le compteur à zéro
    numberOfItemsInCart = 0;
    updateCartIcon();

    // Réinitialiser le formulaire
    achatForm.reset();

});


//validation formulaire
function checkInputs() {
    var prenomValue = prenom.value.trim();
    var nomValue = nom.value.trim();
    var telValue = tel.value.trim();
    var adresseValue = adresse.value.trim();

    if (prenomValue === "") {
        alert("Le prénom doit être rempli");
        return false;
    }
    if (nomValue === "") {
        alert("Le nom doit être rempli");
        return false;
    }
    if (telValue === "") {
        alert("Le numero de telephone doit être rempli");
        return false;
    }
    if (adresseValue === "") {
        alert("Le adresse doit être rempli");
        return false;
    }

}

// fonction pour le boutton voir plus

document.getElementById('showMoreBtn').addEventListener('click', function () {
    // Récupérer tous les produits cachés
    var hiddenProducts = document.querySelectorAll('.product-box.hidden');

    // Parcourir les produits cachés et les afficher
    hiddenProducts.forEach(function (product) {
        product.classList.remove('hidden');
    });

    // Cacher le bouton "Voir plus" une fois que tous les produits sont affichés
    this.style.display = 'none';
});


//  slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

const showSlide = (n) => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

const nextSlide = () => showSlide(currentSlide + 1);

const prevSlide = () => showSlide(currentSlide - 1);

const startSlideShow = () => slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

const stopSlideShow = () => clearInterval(slideInterval);

document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

// Pause the slideshow when the mouse is over the slider
document.querySelector('.slider-container').addEventListener('mouseenter', stopSlideShow);

// Restart the slide show when the mouse leaves the slider
document.querySelector('.slider-container').addEventListener('mouseleave', startSlideShow);

// Show the first slide and start the slide show when the page loads
showSlide(currentSlide);
startSlideShow();







