// DOM(Document Object Model) / HTML elements
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword() {
    const length = Number(lengthSlider.value);
    const useUppercase = uppercaseCheckbox.checked;
    const useLowercase = lowercaseCheckbox.checked;
    const useNumbers = numbersCheckbox.checked;
    const useSymbols = symbolsCheckbox.checked;

    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        alert("Please select at least one char type.");
        return;
    }

    const newPassword = createRandomPassword(
        length,
        useUppercase,
        useLowercase,
        useNumbers,
        useSymbols
    );

    passwordInput.value = newPassword;
    updateStrengthMeter(newPassword);
}

function updateStrengthMeter(password) {
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strengthScore = 0;

    strengthScore += Math.min(passwordLength * 2, 40);

    if (hasUppercase) strengthScore += 15;
    if (hasLowercase) strengthScore += 15;
    if (hasNumbers) strengthScore += 15;
    if (hasSymbols) strengthScore += 15;

    if (passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }

    const safeScore = Math.max(5, Math.min(100, strengthScore));
    strengthBar.style.width = safeScore + "%";

    let strengthLabelText = "";
    let barColor = "";

    if (strengthScore < 40) {
        //weak password
        barColor = "#ac8383";
        strengthLabelText = "Weak";
    } else if (strengthScore < 70) {
        // Medium password
        barColor = "#d88f66";
        strengthLabelText = "Medium";
    } else {
        // Strong password
        barColor = "#558066";
        strengthLabelText = "Strong";
    }

    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strengthLabelText;
}

function createRandomPassword(
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols
) {
    let allCharacters = "";

    if (useUppercase) allCharacters += uppercaseLetters;
    if (useLowercase) allCharacters += lowercaseLetters;
    if (useNumbers) allCharacters += numberCharacters;
    if (useSymbols) allCharacters += symbolCharacters;

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

// console.log(allCharacters.length);
// const x = Math.random();
// console.log(x);
// console.log(x * allCharacters.length);
// console.log(Math.floor(x * allCharacters.length));

    return password;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
    if (!passwordInput.value) return;

    navigator.clipboard
        .writeText(passwordInput.value)
        .then(() => showCopySuccess()) 
        .catch((error) => console.log("Could not copy:", error));
});

function showCopySuccess() {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#0f4927ff";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    }, 1500);
}