const correctUsername = "Cashier";const correctPassword = "Cashier1234";
const adminUsername = "Admin";
const adminPassword = "Admin1234";
let FinalPrice;
let DiscountPrs;
let newusername="";
let newpassword="";

let SearchCashierBox=document.getElementById("SearchCashierBox");
let toastBoxSearch=document.getElementById("toastBoxSearch");
let toastBox=document.getElementById("toastBox");
let toastBoxOrder=document.getElementById("toastBoxOrder");
let successMsg= '<img src="img/righticon.png" > Cashier Added Successfully';
let cart='<img src="img/righticon.png" > Add To Cart Successfully';
let noItem='<img src="img/xmark.png" >Check the Phone Number ';
let CashierNo='<img src="img/xmark.png" >Cashier Not Found ';
let already='<img src="img/xmark.png" >Cashier Already Exisits ';
function showToast(msg) {
   
let toastBox=document.getElementById("toastBox");
let toastBoxOrder=document.getElementById("toastBoxOrder");
let toastBoxSearch=document.getElementById("toastBoxSearch");
let SearchCashierBox=document.getElementById("SearchCashierBox");

 let toast= document.createElement('div');
 toast.classList.add('toast');
 toast.innerHTML=msg;

 if(toastBoxSearch && msg.includes('Check')){
    toast.classList.add('Check');
toastBoxSearch.appendChild(toast);
 }else if(SearchCashierBox && msg.includes('Cashier')){
    toast.classList.add('Cashier')
    SearchCashierBox.appendChild(toast);
 }
 else if(toastBox && msg.includes('Cashier')){
    toast.classList.add('Cashier')
    toastBox.appendChild(toast);
 }
 else if (toastBox ) {
    toastBox.appendChild(toast);
} else if (toastBoxOrder) {
    toastBoxOrder.appendChild(toast);
} else {
    console.error('Neither toastBox nor toastBoxOrder elements found!');
}

 setTimeout(()=>{
    toast.remove();

 },6000)

}

function addCashier(){
    console.log("Button clicked"); 
    newusername=document.getElementById("CashierNameTxt").value.trim();
    newpassword=document.getElementById("CashierPasswordTxt").value.trim();

    if (newusername === "" || newpassword === "") {
        console.log("Username or password cannot be empty.");
        return;
    }

    // Retrieve existing cashiers or initialize with an empty array
    let cashiers = JSON.parse(localStorage.getItem('cashiers')) || [];

    // Check if username already exists
    const existingCashier = cashiers.find(cashier => cashier.username === newusername);
    if (existingCashier) {
        showToast(already)
        console.log("Cashier username already exists.");
        return;
    }

    // Add new cashier to the list
    cashiers.push({ username: newusername, password: newpassword });

    // Save updated array back to localStorage
    localStorage.setItem('cashiers', JSON.stringify(cashiers));

    console.log("Cashier Added Successfully");
    console.log("Username:", newusername);
    console.log("Password:", newpassword);
    showToast(successMsg);
}
// Function to store data and handle login
function storeData(event) {
    event.preventDefault();
    console.log("Button clicked"); // Debugging line

    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;

    const cashiers = JSON.parse(localStorage.getItem('cashiers')) || [];

    const isCashier = cashiers.some(cashier => cashier.username === username && cashier.password === password);

    if (username === correctUsername && password === correctPassword) {
       
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        window.location.href = "page2.html";

    } 
    else if (isCashier) {
        console.log("Cashier credentials match.");
        window.location.href = "page2.html";
    } 
    else if (username === adminUsername && password === adminPassword) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        window.location.href = "Admin.html";
    } 
    else {
        let errorMessage = document.getElementById('error-message');
        errorMessage.style.display = "block";
    }
}

function getCredentials() {
    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');
    console.log('Username:', storedUsername);
    console.log('Password:', storedPassword);
}

getCredentials();

function searchCashier(){
    let searchValue = document.getElementById("SearchCashierTxt").value.trim().toLowerCase();
    let cashiers = JSON.parse(localStorage.getItem('cashiers')) || [];

    let name="";
    let password="";
    console.log("Stored Cashiers:", cashiers);
    console.log("Search Value:", searchValue);

    let foundCashier = cashiers.find(cashier => {
        let storedUsername = cashier.username.trim().toLowerCase();
        console.log(`Comparing stored username: "${storedUsername}" with search value: "${searchValue}"`);
        name=cashier.username;
        password=cashier.password;
        return storedUsername === searchValue;
    });

    if (foundCashier) {

        console.log("Cashier found:", foundCashier);
        document.getElementById("CashierNameSearchTxt").value=name;
        document.getElementById("CashierPasswordSearchTxt").value=password;
        
    }else{
        showToast(CashierNo);
        console.log("Cashier not found");
    }
}
    function updateCashier(){
       
        const oldName = document.getElementById("SearchCashierTxt").value.trim();
        const newName = document.getElementById("CashierNameSearchTxt").value.trim(); // Assuming you have a separate input for new name
        const newPassword = document.getElementById("CashierPasswordSearchTxt").value.trim();
    
        const cashiers = JSON.parse(localStorage.getItem('cashiers')) || [];
        const Index = cashiers.findIndex(cashier => cashier.username.trim().toLowerCase() === oldName.toLowerCase());
    
        if (Index !== -1) {
            if (newName !== "" && newPassword !== "") {
                cashiers[Index].username = newName;
                cashiers[Index].password = newPassword;
                localStorage.setItem('cashiers', JSON.stringify(cashiers));
    
               showAlert("Cashier details updated successfully!");
                console.log("Cashier updated:", cashiers[itemIndex]);
            } else {
                showAlert("New username and password cannot be empty.");
                alert("New username and password cannot be empty.");
            }
        } else {
           
            alert("Cashier not found.");
        }

    }  

    function deleteCashier() {
        const oldName = document.getElementById("SearchCashierTxt").value.trim();
        
    
        const cashiers = JSON.parse(localStorage.getItem('cashiers')) || [];
        const Index = cashiers.findIndex(cashier => cashier.username.trim().toLowerCase() === oldName.toLowerCase());
    
        if (Index !== -1) {
            
            cashiers.splice(Index, 1);
                localStorage.setItem('cashiers', JSON.stringify(cashiers));
                showAlert("Cashier deleted successfully.");
            
                console.log("Cashier deleted:", oldName);
        } else {
            alert("Cashier not Deleted.");
        }
    }

    
    let OIDCounter = parseInt(localStorage.getItem('OIDCounter')) || 1000;



function Calc() {
     
    showToast(cart);
    let OIDCounter = parseInt(localStorage.getItem('OIDCounter')) || 1000;
    let Tot;
    localStorage.setItem('OIDCounter', OIDCounter);

    let Qty = parseFloat(document.getElementById("QTYText").value);
    let ItemCode = document.getElementById("ItemCodeText").value;
    if (DiscountPrs && DiscountPrs > 0 && Qty) {
        let dis = (FinalPrice * Qty * DiscountPrs) / 100;
        Tot = (FinalPrice * Qty) - dis;
    } else if (DiscountPrs === 0 && Qty) {
        Tot = FinalPrice * Qty;
    } else {
        console.log("Invalid input or discount");
        return;
    }

    document.getElementById("TotalFeild").value = Tot.toFixed(2);
    console.log(Tot);

    let Customername = document.getElementById("name").value;
    localStorage.setItem('Customername', Customername);
    
    let TelephoneNum = document.getElementById("TeleNum").value;
    localStorage.setItem('TelephoneNum', TelephoneNum);
   
    let Itemcode=document.getElementById("ItemCodeText").value;
    localStorage.setItem('Itemcode',Itemcode);

    let price=document.getElementById("PriceText").value;
    localStorage.setItem(' price', price);

    let dis=document.getElementById("DiscountText").value;
    localStorage.setItem(' dis', dis);

    
        localStorage.setItem('Tot', Tot.toFixed(2));

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        orderID: OIDCounter,
        orderQty: Qty,
        total: Tot.toFixed(2),
        telephone: TelephoneNum,
        customerName: Customername,
        priceF:price,
        disP:dis,
        itemcode:Itemcode,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    updateItemQuantity(ItemCode, Qty);
   
    localStorage.setItem('OIDCounter', OIDCounter);
    document.getElementById("name").value = Customername;
    document.getElementById("TeleNum").value = TelephoneNum;
    localStorage.setItem('customerInfo', JSON.stringify({
        customerName: Customername,
        telephone: TelephoneNum
    }));
    
  //  generatePDF() ;
}
function updateItemQuantity(itemCode, qtyOrdered) {
    // Fetch existing data from local storage
    let burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    let submarineData = JSON.parse(localStorage.getItem('SubmarineData')) || [];
    let friesData = JSON.parse(localStorage.getItem('FriesData')) || [];
    let pastaData=JSON.parse(localStorage.getItem('PastaData')) || [];
       let ChickenData=JSON.parse(localStorage.getItem('ChickenData')) || [];
    let BeveargesData=JSON.parse(localStorage.getItem('Beverages')) || [];
    // Function to update quantity
    function updateData(data) {
        let item = data.find(item => item.itemCode === itemCode);
        if (item) {
            if (item.Qty >= qtyOrdered) {
                item.Qty -= qtyOrdered;
                console.log(`Updated quantity for ${item.itemName}: ${item.Qty}`);
            } else {
                console.log(`Not enough stock for ${item.itemName}. Available: ${item.Qty}`);
            }
        }
    }

    // Update the data arrays
    updateData(burgerData);
    updateData(submarineData);
    updateData(friesData);
    updateData(pastaData);
    updateData(ChickenData);
    updateData(BeveargesData);

    // Save updated data back to local storage
    localStorage.setItem('burgerData', JSON.stringify(burgerData));
    localStorage.setItem('SubmarineData', JSON.stringify(submarineData));
    localStorage.setItem('FriesData', JSON.stringify(friesData));
    localStorage.setItem('PastaData', JSON.stringify(pastaData));
    localStorage.setItem('ChickenData', JSON.stringify(ChickenData));
    localStorage.setItem('Beverages', JSON.stringify(BeveargesData));
}

function getDetailsCustomer() {
    let searchValue = document.getElementById("SearchFeild").value;
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let customerOrders = orders.filter(order => order.telephone === searchValue);

    if (customerOrders.length > 0) {
        document.getElementById("NameSearchField").value = customerOrders[0].customerName;
        displayOrderDetails(searchValue);
       // displayOrderResults(customerOrders);
    } else {
        showToast(noItem);
        console.log("No customer found with the given telephone number");
    }
}

function displayOrderDetails(telephone) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let customerOrders = orders.filter(order => order.telephone === telephone);
    let table = document.getElementById("CustomerDetails");
    let SubTotal=0;
    
    // Clear previous rows
    table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

    // Populate table with customer orders
    customerOrders.forEach(order => {
        let row = table.insertRow();
        row.insertCell(0).textContent = order.orderID;
        row.insertCell(1).textContent = order.orderQty;
        row.insertCell(2).textContent = order.total;
        row.insertCell(3).textContent = order.date;
        
        SubTotal += parseFloat(order.total) || 0;
    });
    document.getElementById("SubTotTxt").value = SubTotal.toFixed(2);
    let CustomerName=customerOrders[0].customerName;
    let BestCustArray = JSON.parse(localStorage.getItem('BestCustArray')) || [];
    let bestCustomer = {
        name: CustomerName,
        subTotal: SubTotal.toFixed(2),
        telephone:telephone
    };

  
    BestCustArray.push(bestCustomer);

    
    localStorage.setItem('BestCustArray', JSON.stringify(BestCustArray));
}

    


function itemview(orderID) {
    // Implement the view more functionality
    console.log(`View more details for order ID: ${orderID}`);
}

function resetOIDCounter() {
    OIDCounter = 1000; // Reset to initial value
    localStorage.setItem('OIDCounter', OIDCounter);
    document.getElementById("OIDText").value = OIDCounter; // Update the OID field if necessary
    console.log("OIDCounter reset to", OIDCounter);
}

// Define the array with the given data
const initialBurgerData = [
    { itemCode: "B1001", itemName: "Classic Burger (Large)", price: "750.00", discount: 0,Qty:50 },
    { itemCode: "B1002", itemName: "Classic Burger (Regular)", price: "1500.00", discount: "15%" ,Qty:50},
    { itemCode: "B1003", itemName: "Turkey Burger", price: "1600.00", discount: 0 ,Qty:50},
    { itemCode: "B1004", itemName: "Chicken Burger (Large)", price: "1400.00", discount: 0,Qty:50 },
    { itemCode: "B1005", itemName: "Chicken Burger (Regular)", price: "800.00", discount: "20%",Qty:50 },
    { itemCode: "B1006", itemName: "Cheese Burger (Large)", price: "1000.00", discount: 0,Qty:50 },
    { itemCode: "B1007", itemName: "Cheese Burger (Regular)", price: "600.00", discount:0 ,Qty:50},
    { itemCode: "B1008", itemName: "Bacon Burger", price: "650.00", discount: "15%",Qty:50 },
    { itemCode: "B1009", itemName: "Shawarma Burger", price: "800.00", discount: 0,Qty:50 },
    { itemCode: "B1010", itemName: "Olive Burger", price: "1800.00", discount: 0,Qty:50 },
    { itemCode: "B1012", itemName: "Double-Cheese Burger", price: "1250.00", discount: "20%",Qty:50 },
    { itemCode: "B1013", itemName: "Crispy Chicken Burger (Regular)", price: "1200.00", discount: 0,Qty:50 },
    { itemCode: "B1014", itemName: "Crispy Chicken Burger (Large)", price: "1600.00", discount: 10,Qty:50 },
    { itemCode: "B1015", itemName: "Paneer Burger ", price: "900.00", discount: 0,Qty:50 }
];

const initialSubmarineData = [
    { itemCode: "B1016", itemName: "Crispy Chicken Submarine (Large)", price: "2000.00", discount: 0,Qty:50  },
    { itemCode: "B1017", itemName: "Crispy Chicken Submarine (Regular)", price: "1500.00", discount: 0,Qty:50  },
    { itemCode: "B1018", itemName: "Chicken Submarine (Large)", price: "1800.00", discount: "3%",Qty:50  },
    { itemCode: "B1019", itemName: "Chicken Submarine (Regular)", price: "1400.00", discount: 0,Qty:50  },
    { itemCode: "B1020", itemName: "Grinder Submarine", price: "2300.00", discount: 0,Qty:50  },
    { itemCode: "B1021", itemName: "Cheese Submarine", price: "2200.00", discount: 0,Qty:50  },
    { itemCode: "B1022", itemName: "Double Cheese n Chicken Submarine", price: "1900.00", discount:"16%",Qty:50  },
    { itemCode: "B1023", itemName: "Special Horgie Submarine", price: "2800.00", discount: 0 ,Qty:50 },
    { itemCode: "B1024", itemName: "MOS Special Submarine", price: "3000.00", discount: 0,Qty:50  },
  
];
const initialFriesData = [
    { itemCode: "B1025", itemName: "Steak Fries (Large)", price: "1200.00", discount: 0 ,Qty:50 },
    { itemCode: "B1026", itemName: "Steak Fries (Medium)", price: "600.00", discount: 0 ,Qty:50 },
    { itemCode: "B1027", itemName: "French Fries (Large)", price: "800.00", discount: 0,Qty:50  },
    { itemCode: "B1028", itemName: "French Fries (Medium)", price: "650.00", discount: 0 ,Qty:50 },
    { itemCode: "B1029", itemName: "French Fries (Small)", price: "450.00", discount: 0 ,Qty:50 },
    { itemCode: "B1030", itemName: "Sweet Potato Fries (Large)", price: "600.00", discount: 0,Qty:50  }
   
  
];
const initialPastaData = [
    { itemCode: "B1031", itemName: "Chicken n Cheese Pasta", price: "1600.00", discount:"15%",Qty:50 },
    { itemCode: "B1032", itemName: "Chicken Penne Pasta", price: "1700.00", discount: 0 ,Qty:50 },
    { itemCode: "B1033", itemName: "Ground Turkey Pasta Bake", price: "2900.00", discount:"10%" ,Qty:50  },
    { itemCode: "B1034", itemName: "Creamy Shrimp Pasta", price: "2000.00", discount: 0 ,Qty:50 },
    { itemCode: "B1035", itemName: "Lemon Butter Pasta", price: "1950.00", discount: 0 ,Qty:50 },
    { itemCode: "B1036", itemName: "Tagliatelle Pasta", price: "2400.00", discount:"1%",Qty:50  },
    { itemCode: "B1037", itemName: "Baked Ravioli", price: "2000.00", discount: "1%",Qty:50  },
   
  
];

const initialChickenData = [
    { itemCode: "B1038", itemName: "Fried Chicken (Small)", price: "1200.00", discount:0,Qty:50 },
    { itemCode: "B1039", itemName: "Fried Chicken (Regular)", price: "2300.00", discount:"10%" ,Qty:50 },
    { itemCode: "B1040", itemName: "Fried Chicken (Large)", price: "3100.00", discount:"5%" ,Qty:50  },
    { itemCode: "B1041", itemName: "Hot Wings (Large)", price: "2400.00", discount: 0 ,Qty:50 },
    { itemCode: "B1042", itemName: "Devilled Chicken (Large)", price: "900.00", discount: 0 ,Qty:50 },
    { itemCode: "B1043", itemName: "BBQ Chicken (Regular)", price: "2100.00", discount:0,Qty:50  },
     
  
];
const initialBeverages = [
    { itemCode: "B1044", itemName: "Pepsi (330ml)", price: "990.00", discount:"5%",Qty:50 },
    { itemCode: "B1045", itemName: "Coca-Cola (330ml)", price: "1230.00", discount:0 ,Qty:50 },
    { itemCode: "B1046", itemName: "Sprite (330ml)", price: "1500.00", discount:"3%" ,Qty:50  },
    { itemCode: "B1047", itemName: "Mirinda (330ml)", price: "850.00", discount:"7%",Qty:50 }
   
];

if (!localStorage.getItem('Beverages')) {
    localStorage.setItem('Beverages', JSON.stringify(initialBeverages));
}

if (!localStorage.getItem('ChickenData')) {
    localStorage.setItem('ChickenData', JSON.stringify(initialChickenData));
}

if (!localStorage.getItem('PastaData')) {
    localStorage.setItem('PastaData', JSON.stringify(initialPastaData));
}

if (!localStorage.getItem('FriesData')) {
    localStorage.setItem('FriesData', JSON.stringify(initialFriesData));
}

if (!localStorage.getItem('SubmarineData')) {
    localStorage.setItem('SubmarineData', JSON.stringify(initialSubmarineData));
}
// Store initial data in localStorage if not already present
if (!localStorage.getItem('burgerData')) {
    localStorage.setItem('burgerData', JSON.stringify(initialBurgerData));
}
function displayBeveragesData(){
    const beveragesData = JSON.parse(localStorage.getItem('Beverages')) || [];
    const beveragesTableBody = document.getElementById("BeveragesTableBody");

   beveragesTableBody.innerHTML = "";
   beveragesData.forEach(( beverage, index) => {
        const row =    beveragesTableBody.insertRow();
        row.insertCell(0).textContent = beverage.itemCode;
        row.insertCell(1).textContent = beverage.itemName;
        row.insertCell(2).textContent = beverage.price;
        row.insertCell(3).textContent = beverage.Qty;
        if( beverage.discount==0){
            row.insertCell(4).textContent = '-';
        }else{
            row.insertCell(4).textContent =  beverage.discount;
        }
       
        const editCell = row.insertCell(5);
        editCell.innerHTML = `<button class="edit-button" onclick="editBeverage(${index})">Edit</button>`;
        const buyCell = row.insertCell(6);
        buyCell.innerHTML = `<button class="buy-button" onclick="buyItem('${beverage.itemCode}', '${beverage.price}', '${beverage.discount}')">Buy Now</button>`;
        const deleteCell = row.insertCell(7);
        deleteCell.innerHTML = `<button class="delete-button" onclick="deleteBeverage(${index})">Delete</button>`;
    });

}
if(document.getElementById("BeveragesTableBody") !=null){displayBeveragesData();}

function displayChickenData(){
    const chickenData = JSON.parse(localStorage.getItem('ChickenData')) || [];
    const chickenTableBody = document.getElementById("ChickenTableBody");

   chickenTableBody.innerHTML = "";
    chickenData.forEach((chicken, index) => {
        const row =   chickenTableBody.insertRow();
        row.insertCell(0).textContent =chicken.itemCode;
        row.insertCell(1).textContent =chicken.itemName;
        row.insertCell(2).textContent =chicken.price;
        row.insertCell(3).textContent =chicken.Qty;
        if(chicken.discount==0){
            row.insertCell(4).textContent = '-';
        }else{
            row.insertCell(4).textContent = chicken.discount;
        }
       
        const editCell = row.insertCell(5);
        editCell.innerHTML = `<button class="edit-button" onclick="editChicken(${index})">Edit</button>`;
        const buyCell = row.insertCell(6);
        buyCell.innerHTML = `<button class="buy-button" onclick="buyItem('${chicken.itemCode}', '${chicken.price}', '${chicken.discount}')">Buy Now</button>`;
        const deleteCell = row.insertCell(7);
        deleteCell.innerHTML = `<button class="delete-button" onclick=" deleteChicken(${index})">Delete</button>`;
    });

}
if(document.getElementById("ChickenTableBody") !=null){displayChickenData();}

function displayPastaData(){
    const pastaData = JSON.parse(localStorage.getItem('PastaData')) || [];
    const pastaTableBody = document.getElementById("PastaTableBody");

    pastaTableBody.innerHTML = "";
    pastaData.forEach((pasta, index) => {
        const row =   pastaTableBody.insertRow();
        row.insertCell(0).textContent =pasta.itemCode;
        row.insertCell(1).textContent =pasta.itemName;
        row.insertCell(2).textContent =pasta.price;
        row.insertCell(3).textContent =pasta.Qty;
        if(pasta.discount==0){
            row.insertCell(4).textContent = '-';
        }else{
            row.insertCell(4).textContent = pasta.discount;
        }
       
        const editCell = row.insertCell(5);
        editCell.innerHTML = `<button class="edit-button" onclick="editPasta(${index})">Edit</button>`;
        const buyCell = row.insertCell(6);
        buyCell.innerHTML = `<button class="buy-button" onclick="buyItem('${pasta.itemCode}', '${pasta.price}', '${pasta.discount}')">Buy Now</button>`;
        const deleteCell = row.insertCell(7);
        deleteCell.innerHTML = `<button class="delete-button" onclick=" deletePasta(${index})">Delete</button>`;
    });

}
if(document.getElementById("PastaTableBody") !=null){displayPastaData();}

function displayFriesData(){
    const friesData = JSON.parse(localStorage.getItem('FriesData')) || [];
    const friesTableBody = document.getElementById("FriesTableBody");

     friesTableBody.innerHTML = "";
    friesData.forEach((fry, index) => {
        const row =  friesTableBody.insertRow();
        row.insertCell(0).textContent = fry.itemCode;
        row.insertCell(1).textContent = fry.itemName;
        row.insertCell(2).textContent = fry.price;
        row.insertCell(3).textContent = fry.Qty;
        if(fry.discount==0){
            row.insertCell(4).textContent = '-';
        }else{
            row.insertCell(4).textContent = fry.discount;
        }
       
        const editCell = row.insertCell(5);
        editCell.innerHTML = `<button class="edit-button" onclick="editFry(${index})">Edit</button>`;
        const buyCell = row.insertCell(6);
        buyCell.innerHTML = `<button class="buy-button" onclick="buyItem('${fry.itemCode}', '${fry.price}', '${fry.discount}')">Buy Now</button>`;
        const deleteCell = row.insertCell(7);
        deleteCell.innerHTML = `<button class="delete-button" onclick=" deleteFry(${index})">Delete</button>`;
    });

}
if(document.getElementById("FriesTableBody") !=null){displayFriesData();}

function displaySubmarineData(){
    const submarineData = JSON.parse(localStorage.getItem('SubmarineData')) || [];
    const submarineTableBody = document.getElementById("SubmarineTableBody");

    submarineTableBody.innerHTML = "";
    submarineData.forEach((submarine, index) => {
        const row = submarineTableBody.insertRow();
        row.insertCell(0).textContent = submarine.itemCode;
        row.insertCell(1).textContent = submarine.itemName;
        row.insertCell(2).textContent = submarine.price;
        row.insertCell(3).textContent = submarine.Qty;
        if(submarine.discount==0){
            row.insertCell(4).textContent = '-';
        }else{
            row.insertCell(4).textContent = submarine.discount;
        }
       
        const editCell = row.insertCell(5);
        editCell.innerHTML = `<button class="edit-button" onclick="editSubmarine(${index})">Edit</button>`;
        const buyCell = row.insertCell(6);
        buyCell.innerHTML = `<button class="buy-button" onclick="buyItem('${submarine.itemCode}', '${submarine.price}', '${submarine.discount}')">BuyNow</button>`;
        const deleteCell = row.insertCell(7);
        deleteCell.innerHTML = `<button class="delete-button" onclick=" deleteSubmarine(${index})">Delete</button>`;
    });

}
if(document.getElementById("SubmarineTableBody") !=null){displaySubmarineData();}

function editBeverage(index) {
    const beverageData = JSON.parse(localStorage.getItem('Beverages')) || [];
    const item = beverageData [index];
    
    // Redirect to the update page with the item data
    window.location.href = `Update.html?itemCode=${encodeURIComponent(item.itemCode)}&price=${encodeURIComponent(item.price)}&discount=${encodeURIComponent(item.discount)}`;
}
function editChicken(index) {
    const chickenData = JSON.parse(localStorage.getItem('ChickenData')) || [];
    const item = chickenData [index];
    
    // Redirect to the update page with the item data
    window.location.href = `Update.html?itemCode=${encodeURIComponent(item.itemCode)}&price=${encodeURIComponent(item.price)}&discount=${encodeURIComponent(item.discount)}`;
}
function editPasta(index) {
    const pastaData = JSON.parse(localStorage.getItem('PastaData')) || [];
    const item = pastaData [index];
    
    // Redirect to the update page with the item data
    window.location.href = `Update.html?itemCode=${encodeURIComponent(item.itemCode)}&price=${encodeURIComponent(item.price)}&discount=${encodeURIComponent(item.discount)}`;
}
function editFry(index) {
    const friesData = JSON.parse(localStorage.getItem('FriesData')) || [];
    const item = friesData[index];
    
    // Redirect to the update page with the item data
    window.location.href = `Update.html?itemCode=${encodeURIComponent(item.itemCode)}&price=${encodeURIComponent(item.price)}&discount=${encodeURIComponent(item.discount)}`;
}
function editSubmarine(index) {
    const submarineData = JSON.parse(localStorage.getItem('SubmarineData')) || [];
    const item = submarineData[index];
    
    // Redirect to the update page with the item data
    window.location.href = `Update.html?itemCode=${encodeURIComponent(item.itemCode)}&price=${encodeURIComponent(item.price)}&discount=${encodeURIComponent(item.discount)}`;
}
function deleteBeverage(index) {
    const   BeverageData= JSON.parse(localStorage.getItem('Beverages')) || [];
     
     if (index > -1 && index <  BeverageData.length) {
          BeverageData.splice(index, 1); // Remove the item at the specified index
         localStorage.setItem('Beverages', JSON.stringify(BeverageData));
         displayBeveragesData();// Refresh the table to reflect the changes
         alert("Item deleted successfully.");
     } else {
         alert("Invalid item index.");
     }
 }
function deleteChicken(index) {
    const chickenData= JSON.parse(localStorage.getItem('ChickenData')) || [];
     
     if (index > -1 && index < chickenData.length) {
         chickenData.splice(index, 1); // Remove the item at the specified index
         localStorage.setItem('ChickenData', JSON.stringify(pastaData));
         displayChickenData(); // Refresh the table to reflect the changes
         alert("Item deleted successfully.");
     } else {
         alert("Invalid item index.");
     }
 }
function deleteSubmarine(index) {
    const submarineData = JSON.parse(localStorage.getItem('SubmarineData')) || [];
    
    if (index > -1 && index < submarineData.length) {
        submarineData.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('SubmarineData', JSON.stringify(submarineData));
        displaySubmarineData(); // Refresh the table to reflect the changes
        alert("Item deleted successfully.");
    } else {
        alert("Invalid item index.");
    }
}

function deleteChicken(index) {
    const chickenData= JSON.parse(localStorage.getItem('ChickenData')) || [];
     
     if (index > -1 && index < chickenData.length) {
         chickenData.splice(index, 1); // Remove the item at the specified index
         localStorage.setItem('ChickenData', JSON.stringify(chickenData));
         displayChickenData(); // Refresh the table to reflect the changes
         alert("Item deleted successfully.");
     } else {
         alert("Invalid item index.");
     }
 }
function deleteFry(index) {
    const friesData= JSON.parse(localStorage.getItem('FriesData')) || [];
     
     if (index > -1 && index < friesData.length) {
         friesData.splice(index, 1); // Remove the item at the specified index
         localStorage.setItem('FriesData', JSON.stringify(friesData));
         displayFriesData(); // Refresh the table to reflect the changes
         alert("Item deleted successfully.");
     } else {
         alert("Invalid item index.");
     }
 }
 function deletePasta(index) {
    const pastaData= JSON.parse(localStorage.getItem('PastaData')) || [];
     
     if (index > -1 && index < pastaData.length) {
         pastaData.splice(index, 1); // Remove the item at the specified index
         localStorage.setItem('PastaData', JSON.stringify(pastaData));
         displayPastaData(); // Refresh the table to reflect the changes
         alert("Item deleted successfully.");
     } else {
         alert("Invalid item index.");
     }
 }
// Function to display data in a table
function displayBurgerData() {
    const burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    const tableBody = document.getElementById("burgerTableBody");

    tableBody.innerHTML = "";
    burgerData.forEach((burger, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = burger.itemCode;
        row.insertCell(1).textContent = burger.itemName;
        row.insertCell(2).textContent = burger.price;
        row.insertCell(3).textContent = burger.Qty;
        if(burger.discount==0){
            row.insertCell(4).textContent = '-';
        }else{
            row.insertCell(4).textContent = burger.discount;
        }
       
        const editCell = row.insertCell(5);
        editCell.innerHTML = `<button class="edit-button" onclick="editItem(${index})">Edit</button>`;
        const buyCell = row.insertCell(6);
        buyCell.innerHTML = `<button class="buy-button" onclick="buyItem('${burger.itemCode}', '${burger.price}', '${burger.discount}')">Buy Now</button>`;
        const deleteCell = row.insertCell(7);
        deleteCell.innerHTML = `<button class="delete-button" onclick="deleteItem(${index})">Delete</button>`;
    });
}
// document.addEventListener('DOMContentLoaded', function() {
//     displayBurgerData();
// });
if(document.getElementById("burgerTableBody") !=null){displayBurgerData();}

// Function to update an item
function updateItem() {
    const itemCode = document.getElementById("updateItemCode").value;
    const newPrice = document.getElementById("updatePrice").value;
    const newDiscount = document.getElementById("updateDiscount").value;

    const burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    const itemIndex = burgerData.findIndex(burger => burger.itemCode === itemCode);
   
    const submarineData=JSON.parse(localStorage.getItem('SubmarineData')) || [];
    const SubIndex = submarineData.findIndex(submarine => submarine.itemCode === itemCode);

    const friesDta =JSON.parse(localStorage.getItem('FriesData')) || [];
    const FryIndex= friesDta.findIndex(fry => fry.itemCode === itemCode);

    const pastaData =JSON.parse(localStorage.getItem('PastaData')) || [];
    const PastaIndex= pastaData.findIndex(pasta => pasta.itemCode === itemCode);
    
    
    
    const chickenData =JSON.parse(localStorage.getItem('ChickenData')) || [];
    const ChickenIndex= chickenData.findIndex(chicken => chicken.itemCode === itemCode);
   
    const  BeverageData =JSON.parse(localStorage.getItem('Beverages')) || [];
    const  BeverageIndex= BeverageData.findIndex(Beverage => Beverage.itemCode === itemCode);
   
    if (itemIndex !== -1) {
        burgerData[itemIndex].price = newPrice;
        burgerData[itemIndex].discount = newDiscount || "-";
        localStorage.setItem('burgerData', JSON.stringify(burgerData));
      
        //displayBurgerData();
        alert("Wade goda");
        // document.getElementById("message").innerHTML=(" Contagulations You Won 😃")   
    console.log("Hii");
    }    else if (SubIndex !== -1) {
        submarineData[SubIndex].price = newPrice;
        submarineData[SubIndex].discount = newDiscount || "-";
        localStorage.setItem('SubmarineData', JSON.stringify(submarineData));
      
        //displayBurgerData();
        alert("Wade hri");
        // document.getElementById("message").innerHTML=(" Contagulations You Won 😃")   
    console.log("Hii");
    }else if (FryIndex !== -1) {
        friesDta[FryIndex].price = newPrice;
        friesDta[FryIndex].discount = newDiscount || "-";
        localStorage.setItem('FriesData', JSON.stringify(friesDta));
      
        //displayBurgerData();
        alert("Wade hri");
        // document.getElementById("message").innerHTML=(" Contagulations You Won 😃")   
    console.log("Hii");
    } else if (PastaIndex !== -1) {
        pastaData[PastaIndex].price = newPrice;
        pastaData[PastaIndex].discount = newDiscount || "-";
        localStorage.setItem('PastaData', JSON.stringify(pastaData));
      
        //displayBurgerData();
        alert("Wade hri");
        // document.getElementById("message").innerHTML=(" Contagulations You Won 😃")   
    console.log("Hii");
   
} else if (ChickenIndex !== -1) {
    chickenData[ChickenIndex].price = newPrice;
    chickenData[ChickenIndex].discount = newDiscount || "-";
    localStorage.setItem('ChickenData', JSON.stringify(chickenData));
  
    //displayBurgerData();
    alert("Wade hri");
    // document.getElementById("message").innerHTML=(" Contagulations You Won 😃")   
console.log("Hii");
} else if (BeverageIndex !== -1) {
    BeverageData[BeverageIndex].price = newPrice;
    BeverageData[BeverageIndex].discount = newDiscount || "-";
    localStorage.setItem('Beverages', JSON.stringify(BeverageData));
  
    //displayBurgerData();
    alert("Wade hri");
    // document.getElementById("message").innerHTML=(" Contagulations You Won 😃")   
console.log("Hii");
}else {
alert("Item not found");
}
}

// Function to add a new item

function addBeverage(){
    const itemCode = document.getElementById("addItemCodeBeverage").value;
    const itemName = document.getElementById("addItemNameBeverage").value;
    const price = document.getElementById("addPriceBeverage").value;
    const discount = document.getElementById("addDiscountBeverage").value;

    const BeverageData= JSON.parse(localStorage.getItem('Beverages')) || [];
    const newItem = { itemCode, itemName, price, discount: discount || "-" };
      BeverageData.push(newItem);
    localStorage.setItem('Beverages', JSON.stringify(BeverageData));
	 displayBeveragesData();
}
function addChicken(){
    const itemCode = document.getElementById("addItemCodeChicken").value;
    const itemName = document.getElementById("addItemNameChicken").value;
    const price = document.getElementById("addPriceChicken").value;
    const discount = document.getElementById("addDiscountChicken").value;

    const chickenData= JSON.parse(localStorage.getItem('ChickenData')) || [];
    const newItem = { itemCode, itemName, price, discount: discount || "-" };
     chickenData.push(newItem);
    localStorage.setItem('ChickenData', JSON.stringify(chickenData));
    displayChickenData();
}
function addItem() {
    const itemCode = document.getElementById("addItemCode").value;
    const itemName = document.getElementById("addItemName").value;
    const price = document.getElementById("addPrice").value;
    const discount = document.getElementById("addDiscount").value;

    const burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    const newItem = { itemCode, itemName, price, discount: discount || "-" };
    burgerData.push(newItem);
    localStorage.setItem('burgerData', JSON.stringify(burgerData));
    displayBurgerData();
}
function addSubmarine(){
    const itemCode = document.getElementById("addItemCodeSub").value;
    const itemName = document.getElementById("addItemNameSub").value;
    const price = document.getElementById("addPriceSub").value;
    const discount = document.getElementById("addDiscountSub").value;

    const submarineData = JSON.parse(localStorage.getItem('SubmarineData')) || [];
    const newItem = { itemCode, itemName, price, discount: discount || "-" };
    submarineData.push(newItem);
    localStorage.setItem('SubmarineData', JSON.stringify(submarineData));
    displaySubmarineData();
}
function addFries(){
    const itemCode = document.getElementById("addItemCodeFry").value;
    const itemName = document.getElementById("addItemNameFry").value;
    const price = document.getElementById("addPriceFry").value;
    const discount = document.getElementById("addDiscountFry").value;

    const friesData= JSON.parse(localStorage.getItem('FriesData')) || [];
    const newItem = { itemCode, itemName, price, discount: discount || "-" };
    friesData.push(newItem);
    localStorage.setItem('FriesData', JSON.stringify(friesData));
    displayFriesData();
}
function addPasta(){
    const itemCode = document.getElementById("addItemCodePasta").value;
    const itemName = document.getElementById("addItemNamePasta").value;
    const price = document.getElementById("addPricePasta").value;
    const discount = document.getElementById("addDiscountPasta").value;

    const pastaData= JSON.parse(localStorage.getItem('PastaData')) || [];
    const newItem = { itemCode, itemName, price, discount: discount || "-" };
    pastaData.push(newItem);
    localStorage.setItem('PastaData', JSON.stringify(pastaData));
  displayPastaData();
}

// Function to populate update form with existing item data for editing
function editItem(index) {
    const burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    const item = burgerData[index];
    
    // Redirect to the update page with the item data
    window.location.href = `Update.html?itemCode=${encodeURIComponent(item.itemCode)}&price=${encodeURIComponent(item.price)}&discount=${encodeURIComponent(item.discount)}`;
}

// Display burger data on page load
// window.onload = function() {
//     displayBurgerData();
// };
function buyItem(itemCode, price, discount) {
    window.location.href = `PlaceOrderUI.html?itemCode=${encodeURIComponent(itemCode)}&price=${encodeURIComponent(price)}&discount=${encodeURIComponent(discount)}`;

    
}
// function removeOrder(orderID) {
//     let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
//     // Check if there are any orders
//     if (orders.length === 0) {
//         console.log('No orders found');
//         return;
//     }
    
//     // Filter out the order with the specified orderID
//     const newOrders = orders.filter(order => order.orderID !== orderID);
    
//     // Save the updated orders back to localStorage
//     localStorage.setItem('orders', JSON.stringify(newOrders));
    
//     console.log('Order removed successfully');
// }
// removeOrder(1000); 
function deleteItem(index) {
    const burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    
    if (index > -1 && index < burgerData.length) {
        burgerData.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('burgerData', JSON.stringify(burgerData));
        displayBurgerData(); // Refresh the table to reflect the changes
        alert("Item deleted successfully.");
    } else {
        alert("Invalid item index.");
    }
}
// Function to open the modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}
function openSubmaine() {
    document.getElementById("mySub").style.display = "block";
}
function closeSubmarine() {
    document.getElementById("mySub").style.display = "none";
}
function openFry() {
    document.getElementById("myFry").style.display = "block";
}
function closeFry() {
    document.getElementById("myFry").style.display = "none";
}

function openPasta() {
    document.getElementById("myPasta").style.display = "block";
}
function closePasta() {
    document.getElementById("myPasta").style.display = "none";
}
function openChicken() {
    document.getElementById("myChicken").style.display = "block";
}
function closeChicken() {
    document.getElementById("myChicken").style.display = "none";
}
function openBeverages() {
    document.getElementById("myBeverages").style.display = "block";
}
function closeBeverages() {
    document.getElementById("myBeverages").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeModal();
    }
};
function UpdateDisplayDetails(){
    let searchValue = document.getElementById("SearchFeild").value;
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let customerOrders = orders.filter(order => order.telephone === searchValue);

    if (customerOrders.length > 0) {
       document.getElementById("OIDTextUpdate").value=customerOrders[0].orderID;
       document.getElementById("nameUpdate").value=customerOrders[0].customerName;
       document.getElementById("TeleNumUpdate").value=customerOrders[0]. telephone;
       document.getElementById("ItemCodeTextUpdate").value=customerOrders[0].itemcode ;
       document.getElementById("PriceTextUpdate").value=customerOrders[0]. priceF;
       document.getElementById("DiscountTextUpdate").value=customerOrders[0]. disP;
       document.getElementById("QTYTextUpdate").value=customerOrders[0]. orderQty;
       document.getElementById("TotalFeildUpdate").value=customerOrders[0]. total;

     
      

    } else {
        showToast(noItem);
        console.log("No customer found with the given telephone number");
    }


}

function setUpdate(){
    const OID=document.getElementById("OIDTextUpdate").value;
    const newName=document.getElementById("nameUpdate").value;
    const newTeleNum=document.getElementById("TeleNumUpdate").value;

    const orderData=JSON.parse(localStorage.getItem('orders')) || [];
    
 const Index = orderData.findIndex(data => data.orderID == OID);
 if (Index !== -1) {
     orderData[Index].customerName = newName;
     orderData[Index].telephone = newTeleNum;
     localStorage.setItem('orders', JSON.stringify(orderData));
   
     showAlert("Order details updated successfully!");
     console.log("Order updated:", orderData[Index]);
   
 } else {
     alert("Item not found");
 }

}
function showAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}
function SearchFoods(){
    // const burgerData = JSON.parse(localStorage.getItem('burgerData')) || [];
    // let searchFood = document.getElementById("SearchFoodTxt").value.trim().toLowerCase();
    // let Foods = burgerData.filter(food => food.itemName.toLowerCase().includes(searchFood));
    // if (Foods.length > 0) {
    //     displaySearchResults(Foods);
    // } else {
    //     alert("No matching food items found.");
    // }
    const query = document.getElementById('SearchFoodTxt').value.toLowerCase();

    // Get all rows in the table body
    const rows = document.querySelectorAll('#burgerTableBody tr');
    const rowsSub = document.querySelectorAll('#SubmarineTableBody tr');
    const rowsFry = document.querySelectorAll('#FriesTableBody tr');
    const rowsPasta = document.querySelectorAll('#PastaTableBody tr');
    const rowsChicken = document.querySelectorAll('#ChickenTableBody tr');
    const rowsBevarage = document.querySelectorAll('#BeveragesTableBody tr');
    // Loop through all rows
    rows.forEach(row => {
        // Get the item name from the current row
        const itemName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Show or hide row based on search query
        if (itemName.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    rowsSub.forEach(rowSub => {
        // Get the item name from the current row
        const itemName = rowSub.querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Show or hide row based on search query
        if (itemName.includes(query)) {
            rowSub.style.display = '';
        } else {
            rowSub.style.display = 'none';
        }
    });
    rowsFry.forEach(rowFry => {
        // Get the item name from the current row
        const itemName = rowFry.querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Show or hide row based on search query
        if (itemName.includes(query)) {
            rowFry.style.display = '';
        } else {
            rowFry.style.display = 'none';
        }
    });

    rowsPasta.forEach(rowPasta => {
        // Get the item name from the current row
        const itemName = rowPasta.querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Show or hide row based on search query
        if (itemName.includes(query)) {
            rowPasta.style.display = '';
        } else {
            rowPasta.style.display = 'none';
        }
    });
    rowsChicken.forEach(rowChicken => {
        // Get the item name from the current row
        const itemName = rowChicken.querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Show or hide row based on search query
        if (itemName.includes(query)) {
            rowChicken.style.display = '';
        } else {
            rowChicken.style.display = 'none';
        }
    });
    rowsBevarage.forEach(rowBevarage => {
        // Get the item name from the current row
        const itemName = rowBevarage .querySelector('td:nth-child(2)').textContent.toLowerCase();

        // Show or hide row based on search query
        if (itemName.includes(query)) {
            rowBevarage .style.display = '';
        } else {
            rowBevarage .style.display = 'none';
        }
    });
}
// function displaySearchResults(results) {
//     const resultsTableBody = document.getElementById("searchResultsTableBody");
    
//     // Clear previous results
//     resultsTableBody.innerHTML = "";

//     // Populate table with search results
//     results.forEach(food => {
//         const row = resultsTableBody.insertRow();
//         row.insertCell(0).textContent = food.itemCode;
//         row.insertCell(1).textContent = food.itemName;
//         row.insertCell(2).textContent = food.price;
//         row.insertCell(3).textContent = food.discount || '-';
//     });
// }

  if(document.getElementById("TbodyView") !=null){ViewOrders();}


function ViewOrders(){
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
   // let customerOrders = orders.filter(order => order.telephone === telephone);
   // let table = document.getElementById("CustomerDetails");
   let table = document.getElementById("CustomerDetailsView").getElementsByTagName('tbody')[0];
    
    // Clear previous rows
    table.querySelectorAll('tr').forEach(row => row.remove());
    console.log(JSON.parse(localStorage.getItem('orders')));

    // Populate table with customer orders
    orders.forEach(order => {
        let row = table.insertRow();
        row.insertCell(0).textContent = order.orderID;
        row.insertCell(1).textContent = order.customerName;
        row.insertCell(2).textContent = order.orderQty;
        row.insertCell(3).textContent = order.total;
        row.insertCell(4).textContent = order.date;
        
       
    });
   

}

if(document.getElementById("TbodyReport") !=null){getReportPage();}

function getReportPage(){
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    // let customerOrders = orders.filter(order => order.telephone === telephone);
    // let table = document.getElementById("CustomerDetails");
    let table = document.getElementById("CustomerDetailsReport").getElementsByTagName('tbody')[0];
     
     // Clear previous rows
     table.querySelectorAll('tr').forEach(row => row.remove());
     console.log(JSON.parse(localStorage.getItem('orders')));
 
     // Populate table with customer orders
     orders.forEach(order => {
         let row = table.insertRow();
         row.insertCell(0).textContent = order.orderID;
         row.insertCell(1).textContent = order.customerName;
         row.insertCell(2).textContent = order.orderQty;
         row.insertCell(3).textContent = order.total;
         row.insertCell(4).textContent = order.date;
         
        
     });
}
function FindBestCustomer(){

    console.log("Button Clicked");
    let BestCust=JSON.parse(localStorage.getItem('BestCustArray')) || [];

   
    let highestTotal=0;
    let BestCustomer=null;
    let TeleNum=0;

    BestCust.forEach(customer =>{
        let subtotal=parseFloat(customer.subTotal)||0;
        if(subtotal>highestTotal){
            highestTotal=subtotal;
            BestCustomer=customer.name;
            TeleNum=customer.telephone;
        }
    });
    if (BestCustomer) {
        console.log("Best Customer:", BestCustomer);
        document.getElementById("BestCustomerTxt").value=BestCustomer;
        document.getElementById("TelephoneNumberTxt").value=  TeleNum;
        document.getElementById("AmountTxt").value="Rs."+highestTotal.toFixed(2);
    } else {
        console.log("No best customer found.");
    }

}

function getBill(){
    let telephoneNum = encodeURIComponent(document.getElementById("TeleNum").value);
    
    window.location.href = `Search.html?telephoneNum=${telephoneNum}`;

}


function SetBill(){
    let OIDCounter = parseInt(localStorage.getItem('OIDCounter')) || 0;
    OIDCounter++;
    localStorage.setItem('OIDCounter', OIDCounter);
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let telephone = document.getElementById("SearchFeild").value; // Assuming telephone is obtained this way
    let customerOrders = orders.filter(order => order.telephone === telephone);
    let table = document.getElementById("CustomerDetails");
    let SubTotal = 0;

    // Clear previous rows
    table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

    // Populate table with customer orders
    let tableData = []; // Array to store table data
    let customerName = ""; 
    customerOrders.forEach(order => {
        let row = table.insertRow();
        row.insertCell(0).textContent = order.orderID;
        row.insertCell(1).textContent = order.orderQty;
        row.insertCell(2).textContent = order.total;
        row.insertCell(3).textContent = order.date;

        // Collect row data into an array
       

        SubTotal += parseFloat(order.total) || 0;
        tableData.push({
            orderID: order.orderID,
            orderQty: order.orderQty,
            total: order.total,
            date: order.date,
            itemCode: order.itemcode || 'N/A', // Add itemCode if available
           // Add quantity if available
            price: order.priceF || '0.00', // Add price if available
            discount: order.disP || '0.00', // Add discount if available
            telephone: telephone,
            customerName: order.customerName,
            SubTot:SubTotal
                    });
    });

    // Store the table data in local storage
    localStorage.setItem('tableData', JSON.stringify(tableData));
   
    generatePDF();
    clearFields(); 
  
}
function clearFields() {
    console.log('Clear Fields function called');
    
   
    if (localStorage.getItem('customerInfo')) {
        console.log('customerInfo exists, removing...');
        localStorage.removeItem('customerInfo');
    } else {
        console.log('No customerInfo found in localStorage.');
    }
    localStorage.removeItem('customerInfo');
   
}
// Function to handle radio button change
function handleRoleChange() {
    const messageElement = document.getElementById('role-message');
    const selectedRole = document.querySelector('input[name="role"]:checked').value;

    if (selectedRole === 'cashier') {
        messageElement.textContent = 'Username: Cashier | Password:Cashier1234';
    
    } else if (selectedRole === 'admin') {
        messageElement.textContent = 'Username: Admin | Password:Admin1234';
    }
}

// Add event listeners to radio buttons
document.querySelectorAll('input[name="role"]').forEach(radio => {
    radio.addEventListener('change', handleRoleChange);
});

// Initialize message on page load
handleRoleChange();
