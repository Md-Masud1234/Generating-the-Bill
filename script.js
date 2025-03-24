function addProduct() {
    let table = document.getElementById("productTable");
    let row = table.insertRow(-1);
    
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    cell1.innerHTML = `<input type='text' placeholder='Product Name'>`;
    cell2.innerHTML = `<input type='number' placeholder='Quantity' oninput='updateTotalPrice(this)'>`;
    cell3.innerHTML = `<input type='number' placeholder='Unit Price' oninput='updateTotalPrice(this)'>`;
    cell4.innerHTML = `<span class='totalPrice'></span>`;
}

function updateTotalPrice(input) {
    let row = input.parentElement.parentElement;
    let quantity = row.cells[1].querySelector("input").value;
    let unitPrice = row.cells[2].querySelector("input").value;
    let totalPrice = row.cells[3].querySelector(".totalPrice");
    
    totalPrice.innerText = quantity && unitPrice ? `$${quantity * unitPrice}` : "";
}

function generateBill() {
    document.getElementById("displayBuyerName").innerText = document.getElementById("buyerName").value;
    document.getElementById("displayBuyerAddress").innerText = document.getElementById("buyerAddress").value;
    document.getElementById("displayBuyerContact").innerText = document.getElementById("buyerContact").value;
    document.getElementById("displayBuyerEmail").innerText = document.getElementById("buyerEmail").value;
    
    let billTable = document.getElementById("billProductTable");
    billTable.innerHTML = `<tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total Price</th>
    </tr>`;
    
    let productRows = document.querySelectorAll("#productTable tr");
    let subtotal = 0;
    for (let i = 1; i < productRows.length; i++) {
        let cols = productRows[i].cells;
        let name = cols[0].querySelector("input").value;
        let quantity = cols[1].querySelector("input").value;
        let unitPrice = cols[2].querySelector("input").value;
        let totalPrice = quantity * unitPrice;
        
        if (name && quantity && unitPrice) {
            let newRow = billTable.insertRow(-1);
            newRow.innerHTML = `<td>${name}</td><td>${quantity}</td><td>$${unitPrice}</td><td>$${totalPrice}</td>`;
            subtotal += totalPrice;
        }
    }
    
    document.getElementById("subtotal").innerText = `$${subtotal}`;
    document.getElementById("finalTotal").innerText = `$${subtotal}`;
    
    document.getElementById("displayTransactionId").innerText = document.getElementById("transactionId").value;
    document.getElementById("displayPurchaseDate").innerText = document.getElementById("purchaseDate").value;
    document.getElementById("displayPaymentMethod").innerText = document.getElementById("paymentMethod").value;
    
    document.getElementById("bill").style.display = "block";
    document.getElementById("billButtons").style.display = "block";
}

function printBill() {
    window.print();
}

function downloadPDF() {
    const bill = document.getElementById("bill");
    const opt = {
        margin: 10,
        filename: 'bill.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(bill).set(opt).save();
}