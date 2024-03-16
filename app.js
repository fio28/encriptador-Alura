// Elementos del DOM
const elements = {
  spanAd: document.getElementById("spanAd"),
  imgAd: document.getElementById("imgAd"),
  initialTextElement: document.getElementById("initialText"),
  elementsInformation: document.getElementById("elementsInformation"),
  elementsDecryptor: document.getElementById("elementsDecryptor"),
  encryptedTextElement: document.getElementById("encrypted"),
};

// Definición de claves para encriptar y desencriptar
const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const reverseKeys = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

// Función para encriptar y desencriptar texto
const encryptText = (text) =>
  text.replace(
    new RegExp(Object.keys(keys).join("|"), "g"),
    (match) => keys[match]
  );

const decryptText = (text) =>
  text.replace(
    new RegExp(Object.keys(reverseKeys).join("|"), "g"),
    (match) => reverseKeys[match]
  );

const placeholderShake = () => {
  elements.initialTextElement.setAttribute(
    "placeholder",
    "No deje vacío por favor"
  );
  
  setTimeout(() => {
    elements.initialTextElement.classList.remove("shake-placeholder");
    setTimeout(() => {
      elements.initialTextElement.classList.remove(
        "shake-placeholder-color-orange"
      );
      elements.initialTextElement.setAttribute(
        "placeholder",
        "Ingrese el texto aquí"
      );
    }, 1100);
  }, 500);
};

document.addEventListener("DOMContentLoaded", function () {
  elements.initialTextElement.focus();
});

elements.initialTextElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
  }
});

elements.initialTextElement.addEventListener("input", function () {
  let valor = elements.initialTextElement.value;
  if (/[^a-z\s¡!¿?]/g.test(valor)) {

    valor = valor.replace(/[^a-z\s¡!¿?]/g, ""); 
  } 

  elements.initialTextElement.value = valor;
});

const encryptorText = () => {
  if (elements.initialTextElement.value.trim() !== "") {
    elements.elementsInformation.style.display = "none";
    elements.elementsDecryptor.style.display = "flex";
    elements.encryptedTextElement.innerHTML = encryptText(
      elements.initialTextElement.value.toString()
    );
    elements.initialTextElement.value = ""; 
    scrollToElement();
  } else {
    placeholderShake();
  }
};

const decryptorText = () => {
  if (elements.initialTextElement.value.trim() !== "") {
    elements.encryptedTextElement.innerHTML = decryptText(
      elements.initialTextElement.value.toString()
    );
    elements.elementsInformation.style.display = "none";
    elements.elementsDecryptor.style.display = "flex";
    elements.initialTextElement.value = ""; 

    scrollToElement();
  } else {
    
    placeholderShake();
  }
};

function copyText() {
  const textareaEncrypted = document.getElementById("encrypted");
  const buttonCopy = document.getElementById("copy");
  let elementsInformation = document.getElementById("elementsInformation");
  let elementsDecryptor = document.getElementById("elementsDecryptor");

  let copiedText = navigator.clipboard
  .writeText(textareaEncrypted.value)
  .then(() => {
    buttonCopy.innerText = "";
    buttonCopy.disabled = true;
    buttonCopy.classList.add("verde");

    setTimeout(function () {
      buttonCopy.classList.remove("verde");
      buttonCopy.innerText = "Copiar";
      buttonCopy.disabled = false;
      elementsInformation.style.display = "block";
      elementsDecryptor.style.display = "none";
      
    }, 1500);
  })
}
