let color;
let size;

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

async function selectXS() {
  if (!size) {
    size = "xs";
    const element = document.getElementById("xs")
    element.classList.add("sizeXS2")
  } else {
    const element = document.getElementById(size)
    const element2 = document.getElementById("xs")
    element.classList.remove("size" + size.toUpperCase() + "2")
    element2.classList.add("sizeXS2")
    size = "xs"
  }
}

async function selectS() {
  if (!size) {
    size = "s";
    const element = document.getElementById("s")
    element.classList.add("sizeS2")
  } else {
    const element = document.getElementById(size)
    const element2 = document.getElementById("s")
    element.classList.remove("size" + size.toUpperCase() + "2")
    element2.classList.add("sizeS2")
    size = "s"
  }
}

async function selectM() {
  if (!size) {
    size = "m";
    const element = document.getElementById("m")
    element.classList.add("sizeM2")
  } else {
    const element = document.getElementById(size)
    const element2 = document.getElementById("m")
    element.classList.remove("size" + size.toUpperCase() + "2")
    element2.classList.add("sizeM2")
    size = "m"
  }
}

async function selectL() {
  if (!size) {
    size = "l";
    const element = document.getElementById("l")
    element.classList.add("sizeL2")
  } else {
    const element = document.getElementById(size)
    const element2 = document.getElementById("l")
    element.classList.remove("size" + size.toUpperCase() + "2")
    element2.classList.add("sizeL2")
    size = "l"
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
