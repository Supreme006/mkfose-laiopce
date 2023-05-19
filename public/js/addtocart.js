async function addToCart() {
  const title = document.getElementById("title");

  $.ajax({
    url: "/addToCart",
    type: "POST",
    Headers: "accept/json",
    cache: false,
    processData: false,
    data: {
      title: title,
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
