
Notes = [];

changeName = '';

document.addEventListener("DOMContentLoaded", function (event) {

    
    let listUl = document.getElementById("listUl");
    UpdateDisplay(listUl);  
    

    
    $(document).on('pagebeforeshow', '#Home', function () {
        let listUl = document.getElementById("listUl");
        UpdateDisplay(listUl);
    }
    );

    
    $(document).on('pagebeforeshow', '#Delete', function () {
        let deleteListUl = document.getElementById("deleteListUl");
        UpdateDisplay(deleteListUl);   
        document.getElementById("deleteItem").value = "";  
    }
    );


     
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


    document.getElementById("newNote").addEventListener("click", function () {
   
        Notes.push( new Note( document.getElementById("type").value, 
        document.getElementById("name").value,
        document.getElementById("qty").value ) );
     });

    
     document.getElementById("delete").addEventListener("click", function () {
        let which = document.getElementById("deleteItem").value;
        let found = false;
        for(var i = 0; i < Notes.length; i++) 
        {
            if(Notes[i].name === which){
                Notes.splice(i,1);  
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
        for(var i = 0; i < Notes.length; i++) 
        {
            if(Notes[i].name === changeName){
                Notes.push( new Note(Notes[i].type, Notes[i].name, qty));
                Notes.splice(i,1);  
                found = true;
            }
        }
        if(!found){
            document.getElementById("deleteItem").value = "Sorry, could not find";
        }

     });

});  


function Note(pType, pName, pQty) {
    this.type= pType;
    this.name = pName;
    this.qty = pQty;
  }
function changeQtyName(name) {
    changeName = name;
}


 function UpdateDisplay(whichElement) {
    whichElement.innerHTML = "";
    
    Notes.sort(function(a, b) {
        return (a.type) - (b.type);
    });
    Notes.forEach(function(item, index) {
        var li = document.createElement('li');
        whichElement.appendChild(li);
        li.innerHTML=li.innerHTML + item.type + ":  " + item.name + " *   " + item.qty + "   <a href='#Change' onclick=\"changeQtyName('" + item.name + "')\">Change Qty</a>";
    }); 
 }


