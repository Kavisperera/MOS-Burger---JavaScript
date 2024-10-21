
function copyTableDataToArray() {
    let table = document.getElementById("CustomerDetailsReport").getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');
    let dataArray = [];

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let rowData = {
            orderID: cells[0].textContent,
            total: cells[3].textContent,
            date: cells[4].textContent
        };
        dataArray.push(rowData);
    }

    return dataArray;
}

// Define the Monthly object
let currentMonthValue = new Date().getMonth() + 1; // Months are zero-indexed
let currentYear = new Date().getFullYear();
let currentdate = new Date().getDate();

function generateReport() {
    let dataArray = copyTableDataToArray(); 
    var Monthly = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save, // Use OutputType from jsPDFInvoiceTemplate
        returnJsPDFDocObject: true,
        fileName: "Monthly Sales Report",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "img/logo.png",
            type: 'PNG', // Optional, when src = data:uri (nodejs case)
            width: 40, // Aspect ratio = width/height
            height: 40,
            margin: {
                top: -10, // Negative or positive num, from the current position
                left: 0 // Negative or positive num, from the current position
            }
        },
        stamp: {
            inAllPages: true, // By default = false, just in the last page
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG', // Optional, when src = data:uri (nodejs case)
            width: 20, // Aspect ratio = width/height
            height: 20,
            margin: {
                top: 0, // Negative or positive num, from the current position
                left: 0 // Negative or positive num, from the current position
            }
        },
        business: {
            name: "J&K Burgers",
            address: "No 115,New City,Halphathota,Baddegama",
            phone: "(+94) 0740726297",
            email: "JKBurgers@gmail.com",
            website: "www.S&DBurgers.com",
        },
        invoice: {
            label: "Monthly Sales Report: ",
             num:1,// Ensure this variable is defined elsewhere in your code
            invDate: `From: 1/${currentMonthValue}/${currentYear}`, // Template literals for dynamic values
            invGenDate: `To: ${currentdate}/${currentMonthValue}/${currentYear}`, // Template literals for dynamic values
            headerBorder: true,
            tableBodyBorder: true,
            header: [
                { title: "#" },
                { title: "Order ID" },
                { title: "Order Date" },
                { title: "Total" }
            ],
            table: dataArray.map((rowData, index) => ([
                index + 1, // Index for row number
                rowData.orderID,
                rowData.date, // Using the 'date' property from dataArray
                rowData.total // Using the 'total' property from dataArray
            ])),
            additionalRows: [
                {
                    col1: 'Total:',
                    col2: '145,250.50',
                    col3: 'ALL',
                    style: { fontSize: 14 } // Optional, default 12
                },
                {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: { fontSize: 10 } // Optional, default 12
                },
                {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
                    style: { fontSize: 10 } // Optional, default 12
                }
            ],
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    // Create the PDF
    jsPDFInvoiceTemplate.default(Monthly);

    // Log the object for debugging
    console.log("PDF Object created");
}

