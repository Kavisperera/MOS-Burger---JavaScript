function getTableData() {
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    console.log("Table Data:", tableData); // Verify the structure of data
    return tableData; 
}

function generatePDF() {
    const tableData = getTableData();

    if (!Array.isArray(tableData) || tableData.length === 0) {
        console.error("No valid table data available.");
        return;
    }

    tableData.forEach(item => {
        console.log("Item Data:", item); // Log to ensure all fields are present
    });

    const firstItem = tableData[0] || {};
    const orderId = String(firstItem.orderID || 'N/A');
    const customerName = firstItem.customerName || 'N/A';
    const telephoneNumber = firstItem.telephoneNumber || 'N/A';

    const total = tableData.reduce((sum, item) => {
        const itemTotal = parseFloat(item.total) || 0;
        return sum + itemTotal;
    }, 0);

    const netTotal = total;

    const table = tableData.map(item => [
        item.itemCode || 'N/A',
        item.orderQty || '0',
        (item.price !== undefined && item.price !== null ? parseFloat(item.price).toFixed(2) : '0.00'),
        (item.discount !== undefined && item.discount !== null ? parseFloat(item.discount).toFixed(2) : '0.00'),
        (item.total !== undefined && item.total !== null ? parseFloat(item.total).toFixed(2) : '0.00'),
      
    ]);

    console.log("Prepared Table Data:", table); // Log the prepared table data

    const prop = {
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
            margin: { top: -10, left: 0 }
        },
        stamp: {
            inAllPages: true,
            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
            type: 'JPG',
            width: 20,
            height: 20,
            margin: { top: 0, left: 0 }
        },
        business: {
            name: "j&k Burgers",
            address: "No 300, Main Street, Athurugiriya, Colombo",
            phone: "(+94) 0740726297",
            email: "JKBurgers@gmail.com",
            website: "www.J&KBurgers.com"
        },
        contact: {
            label: `Bill for:  ${customerName}\nOrder ID: ${orderId}\nNet Total: ${netTotal.toFixed(2)}\n `
        },
        invoice: {
            invDate: new Date().toLocaleDateString(),
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                { title: "Item Code" },
                { title: "Quantity" },
                { title: "Price" },
                { title: "Discount" },
                { title: "Total" },
               
            ],
            table: table,
            additionalRows: [
               
                
                {
                    col1: 'Order ID:',
                    col2: orderId,
                    col3: '',
                    style: { fontSize: 12 }
                },
                {
                    col1: 'Total Amount:',
                    col2: netTotal.toFixed(2),
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
    jsPDFInvoiceTemplate.default(prop);

    console.log("PDF Object created");
}
