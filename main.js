let dark_btn = document.querySelector(".Dark");
let x = dark_btn.innerHTML;

const backButton = document.querySelector(".back-container");
const main = document.querySelector("main");
const searchResult = document.querySelector(".search-result");
const cardsContainer = document.querySelector(".crads-box");

const root = document.querySelector(":root");

let flag = false;

dark_btn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  if (flag == false) {
    dark_btn.innerHTML = "";
    dark_btn.innerHTML = `<i class='bx bx-sun'></i> Light Mode`;
    root.style.setProperty("--text-main-color", "#ffffff");
    root.style.setProperty("--main--bg-color", "#0000");
    root.style.setProperty("--card-bg-color", "#333");
    flag = true;
    console.log("from black to light");
  } else {
    dark_btn.innerHTML = "";
    dark_btn.innerHTML = x;
    root.style.setProperty("--text-main-color", "#333");
    root.style.setProperty("--card-bg-color", "#fff");
    root.style.setProperty("--main--bg-color", "#f1f1f1");
    flag = false;
  }
});

cardsContainer.addEventListener("click", (e) => {
  const clicked = e.target;
  if (!clicked.closest(".card")) return;
  main.classList.toggle("hidden");
  searchResult.classList.toggle("hidden");
});
// Access the CSS variable value
