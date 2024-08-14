// Set the Simple checkbox to be checked by default
document.getElementById("checkButton__Simple").checked = true;

// Convert input text to lowercase and filter out special characters
document.getElementById("textareaInput").addEventListener("input", function() {
    this.value = this.value.toLowerCase().replace(/[^a-z0-9\s]/g, '');
});

// Function to handle checkbox changes
function handleCheckboxChange() {
    const aesCheckbox = document.getElementById("checkButton__Aes");
    const simpleCheckbox = document.getElementById("checkButton__Simple");

    if (this === aesCheckbox) {
        simpleCheckbox.checked = false;
    } else if (this === simpleCheckbox) {
        aesCheckbox.checked = false;
    }

    if (!aesCheckbox.checked && !simpleCheckbox.checked) {
        simpleCheckbox.checked = true; // Check Simple by default
    }
}

// Add event listeners to the checkboxes
document.getElementById("checkButton__Aes").addEventListener("change", handleCheckboxChange);
document.getElementById("checkButton__Simple").addEventListener("change", handleCheckboxChange);

// Encrypt functionality
document.getElementById("encryptButton").onclick = function() {
    const inputText = document.getElementById("textareaInput").value;

    if (inputText.trim() === "" || inputText.trim().length < 2) {
        wrongSound();
        return;
    }

    let encryptedText;

    if (document.getElementById("checkButton__Aes").checked) {
        encryptedText = CryptoJS.AES.encrypt(inputText, "me_llamo_luis").toString();
    } else {
        encryptedText = encryptation(inputText);
    }

    document.getElementById("textareaOutput").value = encryptedText;
};

// Decrypt functionality
document.getElementById("decryptButton").onclick = function() {
    const encryptedText = document.getElementById("textareaOutput").value;

    if (encryptedText.trim() === "") {
        wrongSound();
        return;
    }

    let decryptedText;

    if (document.getElementById("checkButton__Aes").checked) {
        const bytes = CryptoJS.AES.decrypt(encryptedText, "me_llamo_luis");
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else {
        decryptedText = decryptation(encryptedText);
    }

    if (decryptedText.trim() !== "") {
        document.getElementById("textareaOutput").value = decryptedText;
    }
};

// Function for simple encryption
function encryptation(stringEncrypt) {
    let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncrypt = stringEncrypt.toLowerCase();
    for (let i = 0; i < matrixCode.length; i++) {
        stringEncrypt = stringEncrypt.replaceAll(matrixCode[i][0], matrixCode[i][1]);
    }
    return stringEncrypt;
}

// Function for simple decryption
function decryptation(stringDecrypt) {
    let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDecrypt = stringDecrypt.toLowerCase();
    for (let i = 0; i < matrixCode.length; i++) {
        stringDecrypt = stringDecrypt.replaceAll(matrixCode[i][1], matrixCode[i][0]);
    }
    return stringDecrypt;
}

// Clear text fields function
document.getElementById("cleanButton").addEventListener("click", clean);
function clean() {
    document.getElementById("textareaOutput").value = "";
    document.getElementById("textareaInput").value = "";
}

// Copy text to clipboard function
document.getElementById("copyButton").addEventListener("click", copy);
function copy() {
    const OutText = document.getElementById("textareaOutput").value;
    navigator.clipboard.writeText(OutText).then(() => {
        console.log("Text copied to clipboard");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}

// Play sound function
function playSound() {
    var sound = document.getElementById("sound__Button");
    sound.currentTime = 0;
    sound.play();
}

// Play error sound function
function wrongSound() {
    var sound = document.getElementById("sound__Wrong");
    sound.currentTime = 0;
    sound.play();
}

// Theme toggle functionality
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('light');
});

// Translations object for multilingual support
const translations = {
    en: {
        title: "Text encryptor",
        alert: "Only lowercase letters are accepted without accents or special characters.",
        encryptButton: "Encrypt",
        decryptButton: "Decrypt",
        copyButton: "Copy",
        cleanButton: "Clean Text",
        aes__label: "Maximum encryption",
        simple__label: "Simple encryption",
        footer__text: "By:",
        textareaInput: "Type your message here",
        textareaOutput: "Encrypted message",
        tooltip: {
            aes: "Advanced encryption using AES (Advanced Encryption Standard).",
            simple: "Simple encryption based on character substitutions."
        }
    },
    es: {
        title: "Encriptador de texto",
        alert: "Solo se aceptan letras minúsculas sin acentos ni caracteres especiales.",
        encryptButton: "Encriptar",
        decryptButton: "Desencriptar",
        copyButton: "Copiar",
        cleanButton: "Limpiar texto",
        aes__label: "Encriptación máxima",
        simple__label: "Encriptación simple",
        footer__text: "Por:",
        textareaInput: "Escribe tu mensaje aquí",
        textareaOutput: "Mensaje encriptado",
        tooltip: {
            aes: "Encriptación avanzada que utiliza AES (Advanced Encryption Standard).",
            simple: "Encriptación simple basada en sustituciones de caracteres."
        }
    }
};

// Initialize with Spanish as the default language
let currentLanguage = 'es';
updateLanguage();

// Function to update the language
function updateLanguage() {
    const translation = translations[currentLanguage];

    document.querySelector(".header__title").textContent = translation.title;
    document.querySelector(".alert").textContent = translation.alert;
    document.getElementById("encryptButton").textContent = translation.encryptButton;
    document.getElementById("decryptButton").textContent = translation.decryptButton;
    document.getElementById("copyButton").textContent = translation.copyButton;
    document.getElementById("cleanButton").textContent = translation.cleanButton;
    document.querySelector(".aes__label").textContent = translation.aes__label;
    document.querySelector(".simple__label").textContent = translation.simple__label;
    document.querySelector(".footer__text").textContent = translation.footer__text;
    document.getElementById("textareaInput").placeholder = translation.textareaInput; 
    document.getElementById("textareaOutput").placeholder = translation.textareaOutput; 

    // Update tooltips
    document.querySelector('.aes__label').title = translation.tooltip.aes;
    document.querySelector('.simple__label').title = translation.tooltip.simple;
}

// Change language on toggle click
document.getElementById("language-toggle").addEventListener("change", () => {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateLanguage();
});
