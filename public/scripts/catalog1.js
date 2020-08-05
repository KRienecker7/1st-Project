var catalog = [];
var categories = [];

function fetchData() {
    $.ajax({
        url: 'http://restclass.azurewebsites.net/api/points',
        type: 'GET',
        success: function (allItems) {
            // travel allItems
            // check if the item belong to me
            // if so, push to catalog array
            for (let i = 0; i < allItems.length; i++) {
                var item = allItems[i];
                if (item.user === "Sergio") {
                    catalog.push(item);

                    //if(!categories.includes(item.category)){ // Will not work on IE (use polly fill)
                    if (categories.indexOf(item.category) == -1) {
                        categories.push(item.category);
                    }
                }
            }

            displayCatalog();
            displayCategories();
        },
        error: function (details) {
            console.error("Error getting data", details);
        }
    });
}

function displayCategories() {
    for (let i = 0; i < categories.length; i++) {
        var cat = categories[i];

        var syntax = `<li onclick="search('${cat}')" class="list-group-item list-group-item-action">${cat}</li>`;
        $("#categories").append(syntax);
    }
}

function displayCatalog() {
    for (let i = 0; i < catalog.length; i++) {
        var item = catalog[i];
        displayItem(item);
    }
}

function displayItem(item) {
    // display on html
    var syntax =
        `<div class="item">
         <img src="${item.image}">
         <div class="info">
             <label class="code">${item.code}</label>
             <label class="title">${item.title}</label>
             <label class="price">$ ${item.price}</label>

             <button class="btn btn-info btn-sm">Add</button>
         </div>
     </div>`;

    $("#catalog-container").append(syntax);
}

function search(text) {
    $("#catalog-container").html('');
    for (let i = 0; i < catalog.length; i++) {
        var item = catalog[i];

        if (item.title.toLowerCase().includes(text.toLowerCase()) 
        || item.category.toLowerCase().includes(text.toLowerCase())
        || item.code.toLowerCase().includes(text.toLowerCase()) ){
            displayItem(item); 
        }
    }
}

function init() {
    console.log("Catalog working!");
    // hook events
    $("#btnSearch").click(function() {
        var text = $("#txtSearch").val();
        search(text);
    });

    // load data/settings
    fetchData();
}



window.onload = init;

/*
    code
    title
    price
    imageUrl
    quantity
    category
 */
