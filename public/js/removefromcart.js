function removeFromCart(element){
    const id = element.id;
    const div = document.getElementById("c"+id)
    const title = document.getElementById("t"+id)

    $.ajax({
        url: "/removeFromCart",
        type: "POST",
        data: {
          title: title
        },
        success: (r) => {
          if (r.response == "added") {
            div.outerHTML="";
            alert("REMOVED")
          }
          if (r.response == "unauthorized") {
            alert("UNAUTHORIZED")
          }
        }
      });
}