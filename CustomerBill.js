function generateBill() {
    const orderId = document.getElementById("OIDText").value;
    const customerName = document.getElementById("name").value;
    const telephoneNumber = document.getElementById("TeleNum").value;
    const itemCode = document.getElementById("ItemCodeText").value;
    const price = parseFloat(document.getElementById("PriceText").value);
    const discount = parseFloat(document.getElementById("DiscountText").value);
    const quantity = parseInt(document.getElementById("QTYText").value);
    const total = parseFloat(document.getElementById("TotalFeild").value);

    const dataArray = [
        {
            itemCode: itemCode,
            customerName:customerName,
            quantity: quantity,
            price: price.toFixed(2),
            discount: discount.toFixed(2),
            total: total.toFixed(2)
        }
    ];

    var Monthly = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Bill_" + orderId + ".pdf",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "img/logo.png",
            type: 'PNG',
            width: 40,
            height: 40,
            margin: {
                top: -10,
                left: 0
            }
        },
        stamp: {
            inAllPages: true,
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG',
            width: 20,
            height: 20,
            margin: {
                top: 0,
                left: 0
            }
        },
        business: {
            name: "j&k Burgers",
            address: "No 300, Main Street, Athurugiriya, Colombo",
            phone: "(+94) 0740726297",
            email: "JKBurgers@gmail.com",
            website: "www.J&KBurgers.com"
        },
        invoice: {
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                { title: "Item Code" },
                { title: "Customer Name" },
                { title: "Quantity" },
                { title: "Price" },
                { title: "Discount" },
                { title: "Total" }
            ],
            table: dataArray.map((rowData) => ([
                rowData.itemCode,
                rowData.customerName,
                rowData.quantity,
                rowData.price,
                rowData.discount,
                rowData.total
            ])),
            additionalRows: [
                {
                    col1: 'Customer Name:',
                    col2: customerName || 'N/A', // Default to 'N/A' if empty
                    col3: '',
                    style: { fontSize: 12 }
                },
                {
                    col1: 'Telephone Number:',
                    col2: telephoneNumber || 'N/A', // Default to 'N/A' if empty
                    col3: '',
                    style: { fontSize: 12 }
                },
                {
                    col1: 'Order ID:',
                    col2: orderId || 'N/A', // Default to 'N/A' if empty
                    col3: '',
                    style: { fontSize: 12 }
                },
                {
                    col1: 'Total Amount:',
                    col2: total.toFixed(2),
                    col3: 'ALL',
                    style: { fontSize: 14, fontWeight: 'bold' }
                }
            ],
        },
        footer: {
            text: "Thank you for your purchase. The bill is created on a computer and is valid without a signature and stamp."
        },
        pageEnable: true,
        pageLabel: "Page "
    };

    // Create the PDF
    jsPDFInvoiceTemplate.default(Monthly);

    // Log the object for debugging
    console.log("PDF Object created");
}
