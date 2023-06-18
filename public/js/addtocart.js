let color;
const sizes = [];

function removeFromArray(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
      arr.splice(index, 1);
  }
  return arr;
}

function size(element){
  const selected_size = element.className
  const id = document.getElementById(selected_size)
  if(sizes.includes(selected_size)){
    removeFromArray(sizes, selected_size)
    id.classList.remove("sizeS2")
  } else {
    sizes.push(`\"${selected_size}\"`)
    id.classList.add("sizeS2")
  }
}

async function red() {
  if (!color) {
    color = "red";
    const element = document.getElementById("red")
    element.classList.remove("colorCentarWite")
    element.classList.add("colorCentarSelected")
  } else {
    const element = document.getElementById(color)
    const element2 = document.getElementById("red")
    element.classList.remove("colorCentarSelected")
    element.classList.add("colorCentarWite")
    element2.classList.remove("colorCentarWite")
    element2.classList.add("colorCentarSelected")
    color = "red"
  }
}

async function pink() {
  if (!color) {
    color = "pink";
    const element = document.getElementById("pink")
    element.classList.remove("colorCentarWite")
    element.classList.add("colorCentarSelected")
  } else {
    const element = document.getElementById(color)
    const element2 = document.getElementById("pink")
    element.classList.remove("colorCentarSelected")
    element.classList.add("colorCentarWite")
    element2.classList.remove("colorCentarWite")
    element2.classList.add("colorCentarSelected")
    color = "pink"
  }
}

async function black() {
  if (!color) {
    color = "black";
    const element = document.getElementById("black")
    element.classList.remove("colorCentarWite")
    element.classList.add("colorCentarSelected")
  } else {
    const element = document.getElementById(color)
    const element2 = document.getElementById("black")
    element.classList.remove("colorCentarSelected")
    element.classList.add("colorCentarWite")
    element2.classList.remove("colorCentarWite")
    element2.classList.add("colorCentarSelected")
    color = "black"
  }
}

async function grey() {
  if (!color) {
    color = "grey";
    const element = document.getElementById("grey")
    element.classList.remove("colorCentarWite")
    element.classList.add("colorCentarSelected")
  } else {
    const element = document.getElementById(color)
    const element2 = document.getElementById("grey")
    element.classList.remove("colorCentarSelected")
    element.classList.add("colorCentarWite")
    element2.classList.remove("colorCentarWite")
    element2.classList.add("colorCentarSelected")
    color = "grey"
  }
}

async function addToCart() {
  const title = document.getElementById("title").textContent;
  // const price = document.getElementById("price").innerText;
  // const value = document.getElementById("value").innerText;
  // const s_description = document.getElementById("s_description")
  $.ajax({
    url: "/addToCart",
    type: "POST",
    data: {
      title: title
    },
    success: (r) => {

      if (r.response == "added") {
        alert("ADDED TO CART")
      }
      if (r.response == "unauthorized") {
        alert("UNAUTHORIZED")
      }
    }
  });
}
