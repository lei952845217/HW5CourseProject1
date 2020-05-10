//1. - home, lists all your Notes
//2. - add, lets you add a Note
// 3. - lets you delete a note.

// define an array to hold our data.  Later this should be stored on the sever
Notes = [];
// save typing time, make up 3 for testing
// Notes.push(new Note("Eat Lunch", "Make a pizza", 2));
// Notes.push(new Note("Homework", "Get Prog209 HW done early", 1));
// Notes.push(new Note("Play vid game", "kill thousands of zombies", 3));
changeName = '';
// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    // update the li's on our homepage
    let listUl = document.getElementById("listUl");
    UpdateDisplay(listUl);  // call shared code with delete and home

    // sometimes you want data to be current as you switch from one page to another
    // to do that we get a DOM event  "pagebeforeshow"

    // this will refresh the data each time you navigate back to the Home page
    $(document).on('pagebeforeshow', '#Home', function () {
        let listUl = document.getElementById("listUl");
        UpdateDisplay(listUl);
    }
    );

    // this will refresh the data each time you navigate back to the Delete page
    $(document).on('pagebeforeshow', '#Delete', function () {
        let deleteListUl = document.getElementById("deleteListUl");
        UpdateDisplay(deleteListUl);   // call shared code with delete and home
        document.getElementById("deleteItem").value = "";  // clear this text box
    }
    );


     // this will clear the text boxes  each time you navigate back to the Add page
     $(document).on('pagebeforeshow', '#Add', function () {
        document.getElementById("type").value = ""; 
        document.getElementById("name").value = ""; 
        document.getElementById("qty").value  = ""; 
    }
    );

     $(document).on('pagebeforeshow', '#Change', function () {
        document.getElementById("changeQty").value = ""; 
    }
    );

    // add a button event for adding new notes on Add page
    document.getElementById("newNote").addEventListener("click", function () {
        // use constructor, build new object and put it in array
        Notes.push( new Note( document.getElementById("type").value, 
        document.getElementById("name").value,
        document.getElementById("qty").value ) );
     });

     // add a button even for deleting a note on Delete page
     document.getElementById("delete").addEventListener("click", function () {
        let which = document.getElementById("deleteItem").value;
        let found = false;
        for(var i = 0; i < Notes.length; i++) // find the match
        {
            if(Notes[i].name === which){
                Notes.splice(i,1);  // remove object from array
                found = true;
            }
        }
        if(!found){
            document.getElementById("deleteItem").value = "Sorry, could not find";
        }

     });

     document.getElementById("change").addEventListener("click", function () {
        let qty = document.getElementById("changeQty").value;
        let found = false;
        for(var i = 0; i < Notes.length; i++) // find the match
        {
            if(Notes[i].name === changeName){
                Notes.push( new Note(Notes[i].type, Notes[i].name, qty));
                Notes.splice(i,1);  // remove object from array
                found = true;
            }
        }
        if(!found){
            document.getElementById("deleteItem").value = "Sorry, could not find";
        }

     });

});  // end of code that must wait for document to load before running

// our constructor
function Note(pType, pName, pQty) {
    this.type= pType;
    this.name = pName;
    this.qty = pQty;
  }
function changeQtyName(name) {
    changeName = name;
}

// this function is shared by Home and Delete page to add li's to which ever ul is passed in
 function UpdateDisplay(whichElement) {
    whichElement.innerHTML = "";
    // sort by priority
    Notes.sort(function(a, b) {
        return (a.type) - (b.type);
    });
    Notes.forEach(function(item, index) {
        var li = document.createElement('li');
        whichElement.appendChild(li);
        li.innerHTML=li.innerHTML + item.type + ":  " + item.name + " *   " + item.qty + "   <a href='#Change' onclick=\"changeQtyName('" + item.name + "')\">Change Qty</a>";
    }); // build one li for each item in array
 }


