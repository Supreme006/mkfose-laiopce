async function addToCart() {
  const title = document.getElementById("title");

    $.ajax({
        url: '/addToCart',
        type: "POST",
        data: {
            "title": title
        },
        success: (r) => {
            if (r == "added") {
                alert("ADDED TO CART")
            }
            if (r == "unauthorized") {
                alert("UNAUTHORIZED")
            }
        }
 })
}
