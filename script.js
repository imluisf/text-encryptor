// Set the AES checkbox to be checked by default
document.getElementById("checkButton__Aes").checked = true;

// Convert input text to lowercase and filter out special characters
document.getElementById("textareaInput").addEventListener("input", function() {
    // Convert to lowercase and remove non-alphanumeric characters
    this.value = this.value.toLowerCase().replace(/[^a-z0-9\s]/g, '');
});

// Function to handle checkbox changes
function handleCheckboxChange() {
    const aesCheckbox = document.getElementById("checkButton__Aes");
    const simpleCheckbox = document.getElementById("checkButton__Simple");

    // If one checkbox is checked, uncheck the other
    if (this === aesCheckbox) {
        simpleCheckbox.checked = false;
    } else if (this === simpleCheckbox) {
        aesCheckbox.checked = false;
    }

    // Ensure at least one checkbox is checked
    if (!aesCheckbox.checked && !simpleCheckbox.checked) {
        aesCheckbox.checked = true; // Check AES by default
    }
}

// Add event listeners to the checkboxes
document.getElementById("checkButton__Aes").addEventListener("change", handleCheckboxChange);
document.getElementById("checkButton__Simple").addEventListener("change", handleCheckboxChange);

// Encrypt functionality
document.getElementById("encryptButton").onclick = function() {
    const inputText = document.getElementById("textareaInput").value;

    // Check if input text is empty or too short
    if (inputText.trim() === "" || inputText.trim().length < 3) {
        wrongSound(); // Play error sound
        return; // Stop the function if the textarea is empty
    }

    let encryptedText;

    // Encrypt based on the selected checkbox
    if (document.getElementById("checkButton__Aes").checked) {
        encryptedText = CryptoJS.AES.encrypt(inputText, "me_llamo_luis").toString();
    } else {
        encryptedText = encryptation(inputText);
    }

    // Display encrypted text in the output textarea
    document.getElementById("textareaOutput").value = encryptedText;
};

// Decrypt functionality
document.getElementById("decryptButton").onclick = function() {
    const encryptedText = document.getElementById("textareaOutput").value;

    // Check if encrypted text is empty
    if (encryptedText.trim() === "") {
        wrongSound(); // Play error sound
        return; // Stop the function if the textarea is empty
    }

    let decryptedText;

    // Decrypt based on the selected checkbox
    if (document.getElementById("checkButton__Aes").checked) {
        const bytes = CryptoJS.AES.decrypt(encryptedText, "me_llamo_luis");
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else {
        decryptedText = decryptation(encryptedText);
    }

    // Update the output textarea only if there is decrypted text
    if (decryptedText.trim() !== "") {
        document.getElementById("textareaOutput").value = decryptedText; // Show decrypted text
    }
};

// Function for simple encryption
function encryptation(stringEncrypt) {
    // Define the encryption matrix
    let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncrypt = stringEncrypt.toLowerCase();
    // Replace characters based on the matrix
    for (let i = 0; i < matrixCode.length; i++) {
        stringEncrypt = stringEncrypt.replaceAll(matrixCode[i][0], matrixCode[i][1]);
    }
    return stringEncrypt;
}

// Function for simple decryption
function decryptation(stringDecrypt) {
    // Define the decryption matrix
    let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDecrypt = stringDecrypt.toLowerCase();
    // Replace characters based on the matrix
    for (let i = 0; i < matrixCode.length; i++) {
        stringDecrypt = stringDecrypt.replaceAll(matrixCode[i][1], matrixCode[i][0]);
    }
    return stringDecrypt;
}

// Clear text fields function
document.getElementById("cleanButton").addEventListener("click", clean);
function clean() {
    document.getElementById("textareaOutput").value = ""; // Clear output textarea
    document.getElementById("textareaInput").value = ""; // Clear input textarea
}

// Copy text to clipboard function
document.getElementById("copyButton").addEventListener("click", copy);
function copy() {
    const OutText = document.getElementById("textareaOutput").value;
    navigator.clipboard.writeText(OutText).then(() => {
        console.log("Text copied to clipboard"); // Log success
    }).catch(err => {
        console.error("Error copying text: ", err); // Log error
    });
}

// Play sound function
function playSound() {
    var sound = document.getElementById("sound__Button");
    sound.currentTime = 0; // Reset sound
    sound.play(); // Play sound
}

// Play error sound function
function wrongSound() {
    var sound = document.getElementById("sound__Wrong");
    sound.currentTime = 0; // Reset sound
    sound.play(); // Play error sound
}

// Theme toggle functionality
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('light'); // Toggle light theme
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
    }
};

// Initialize with Spanish as the default language
let currentLanguage = 'es'; // Set default language to Spanish
updateLanguage(); // Update the interface on load

// Function to update the language
function updateLanguage() {
    const translation = translations[currentLanguage];

    // Update text content based on the selected language
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
}

// Change language on toggle click
document.getElementById("language-toggle").addEventListener("change", () => {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es'; // Toggle language
    updateLanguage(); // Update the interface with the new language
});
