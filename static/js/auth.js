const form = document.querySelector("form");
  
form.addEventListener("submit", (event) => {
  // Ensures that inputs have values
  const inputs = document.querySelectorAll(".form-control");

  for (let input of inputs) {
    if (input.value === "") {
      event.preventDefault();
      input.setAttribute("required", "required");
      break;
    }
  }
});
