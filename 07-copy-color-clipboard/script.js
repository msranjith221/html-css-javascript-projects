const generateBtn = document.getElementById("generate-btn");
const colorContainer = document.querySelector(".color-container");

generateBtn.addEventListener("click", generateColor);

colorContainer.addEventListener("click", function (e) {
   
    if (e.target.classList.contains("fa-copy")) {
        const hexValue = e.target.parentElement.previousElementSibling.textContent;
        // console.log(hexValue);
        // console.log(e.target.parentElement.previousElementSibling.textContent);

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".fa-copy")))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    // console.log(element);
    element.classList.remove("fas", "fa-copy");
    element.previousElementSibling.classList.remove("far", "fa-square");
    element.classList.add("fas", "fa-check-square");

    element.style.color = "#046e16";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check-square");
        element.classList.add("far", "fa-copy");
        element.previousElementSibling.classList.add("far", "fa-square");
        element.style.color = "";
    }, 1500);
}

function generateColor() {
    Array.from(colorContainer.children).forEach((colorSquare) => {
    if(colorSquare.lastElementChild.lastElementChild.lastElementChild.classList.contains("far"))
    {
        colorSquare.lastElementChild.lastElementChild.lastElementChild.classList.remove("far");
        colorSquare.lastElementChild.lastElementChild.lastElementChild.classList.add("fas");
    }
        // Array.from(colorSquare.children).forEach((divColor) => {
        //     console.log(divColor);
        // });
  });
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updateColorDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Math.ceil()

function updateColorDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-square");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexVlaue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexVlaue.textContent = color;
    });
}

