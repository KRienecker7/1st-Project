var catalog = [];
var categories = [];


function fetchData(){
    $.ajax({
        url: "http://restclass.azurewebsites.net/api/points",
        type: "GET", 
        success: function(allItems) {
            // travel allItems
            // check if item belongs to me
            // if so push to catalog array
            for (let i=0; i< allItems.length; i++){
                var item = allItems[i];
                if(item.user ==="Kenny"){
                    catalog.push(item);
                    /**
                     * if array does not contain category
                     *          add the category
                     */
                  //  if(!categories.includes(item.category))  //will not work on Internet Explorer (use polly fill)
                  if(categories.indexOf(item.category) ==-1){
                    categories.push(item.category);
                  }
                }
            }

            displayCatalog();
            displayCategories();
        },
        error: function(details){
            console.error("Error getting data", details);
            }
        });
        //will do any instructions from here
     }

     function displayCategories(){
         // travel the categories array
         //get each category 
         //create syntax for li <li>farf</li>
         //append the syntax to #categories

         for(let i=0; i< categories.length; i++){
             var cat = categories[i];

             var syntax = `<li onclick="search('${cat}')" class="list-group-item list-group-item-action">${cat}</li>`;
             $("#categories").append(syntax);
         }
     }

     //<li onlcik="search('coding')">


function displayCatalog(){
    //travel the array of items
    //get each tiem
    //display the item on html

    for(let i=0; i < catalog.length; i++){
        var item = catalog[i];
        displayItem(item);
    }
}

function displayItem(item) {
    //display on html
    var syntax = 
    `<div class="item">
        <img src="${item.image}">
        <div class="info">
            <label class="code">${item.code}</label>
            <label class="title">${item.title}</label>
            <label class="price">$${item.price}</label>

            <button class="btn btn-info btn-sm">Add</button>
        </div>
    </div>`;

    $("#catalog-container").append(syntax);
}

function search (text) {
    
    console.log(text);


    //clear prev results
    //travel array again
    //get each item
    //if the item title contains text OR the category contains the text OR the code contains the text
    //display the item
    $("#catalog-container").html(' ');
    for(let i=0; i< catalog.length; i++){
        var item = catalog[i];

        if(item.title.toLowerCase().includes(text.toLowerCase())
        || item.category.toLowerCase().includes(text.toLowerCase())
        || item.code.toLowerCase().includes(text.toLowerCase()) ){
            displayItem(item);
        }
    }

}

function init() {
    console.log("Catalog working!");
    //hook events
    $("#btnSearch").click(function() {
        var text = $("#txtSearch").val();
        search(text);
    });

    //load data/settings
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