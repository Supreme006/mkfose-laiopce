const colors = [];
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
    sizes.push(selected_size)
    id.classList.add("sizeS2")
  }
}

function color(element){

  const selected_color = element.classList[1] || element.classList[0];

  const id = document.getElementById(selected_color)
  if(colors.includes(selected_color)){
    removeFromArray(colors, selected_color)
    id.classList.remove("colorCentarSelected")
    id.classList.add("colorCentarWite")
  } else {
    colors.push(selected_color)
    id.classList.add("colorCentarSelected")
  }
}

async function addToCart() {
  const title = document.getElementById("title").textContent;
  // const price = document.getElementById("price").innerText;
  // const value = document.getElementById("value").innerText;
  // const s_description = document.getElementById("s_description")
  const s = [];
  const c = [];
  sizes.forEach(siz => {
    s.push(`\"${siz}\"`)
  })
  colors.forEach(col => {
    s.push(`\"${col}\"`)
  })
  $.ajax({
    url: "/addToCart",
    type: "POST",
    data: {
      title: title,
      sizes: s,
      colors: c
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
