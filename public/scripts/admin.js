/*
    AJAX
    Async JavaScript and Xml

    url: http://restclass.azurewebsites.net
    http verbs (request methods):
          GET : get info (CANNOT SEND DATA)
        POST : create/send data
          PUT : update some exisiting elelment or icon
        PATCH : update part of an existing element or icon
       DELETE : remove an existing element or icon

*/

//Object constructor or item
function Item(code, title, price, category, image) {
    this.code = code;
    this.title = title;
    this.price = price;
    this.category = category;
    this.image = image;
    this.user = "Kenny";
}


function register() {
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var category = $("#txtCategory").val();
    var image = $("#txtImage").val();

    var item = new Item(code, title, price, category, image);
    console.log(item);
    console.log(JSON.stringify(item));

    // create the AJAX request
    $.ajax({
        url: "http://localhost:8080/api/items",
        type: "POST",
        data: JSON.stringify(item),//specify the object that you want to send JSON of Xml
        contentType: "application/json",
        success: function(response){
            console.log("Yea", response);
        },
        error: function(errorDetails){
            console.log("Failure", errorDetails);
        }
    });
}

function init() {
    // hook events
    $("#btnSave").click(register);
    //load data
}


window.onload = init;