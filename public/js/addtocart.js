async function addToCart() {
  const title = document.getElementById("title");

    $.ajax({
        url: 'http://41.216.188.63:2357/addToCart',
        type: "POST",
        dataType: 'json',
        cache : false,
    processData: false,
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
