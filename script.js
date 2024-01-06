let customerBalances = {};
let serialNumberToNameMap = {};
let currentPage = 1;
const customersPerPage = 50;
let totalCustomers = 0;
let jsonData = [];

// Fetching customer data
fetch('customers.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data; // Store the data in jsonData for pagination
        totalCustomers = data.length;

        // Initialize customerBalances and serialNumberToNameMap
        data.forEach(customer => {
            const nameKey = customer['Name'].replace(/\s/g, '') + "BitcoinBalance";
            customerBalances[nameKey] = customer['BTC wallet (?)'];
            serialNumberToNameMap[customer['Serial No']] = nameKey;
        });

        showCustomers(); // Show initial customers for pagination
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });

function showCustomers() {
    const tableBody = document.querySelector('.table-responsive .table tbody');
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * customersPerPage;
    const end = start + customersPerPage;
    const paginatedItems = jsonData.slice(start, end);

    paginatedItems.forEach((customer, index) => {
        const row = document.createElement('tr');
        row.className = (start + index) % 2 === 0 ? 'table-light' : 'table-secondary';

        row.innerHTML = `
            <td scope="row">${customer['Serial No']}</td>
            <td>${customer['Name']}</td>
            <td>${customer['Mail Address']}</td>
            <td><p id="${customer['Name'].replace(/\s/g, '')}BitcoinBalance">${customer['BTC wallet (?)']}</p></td>`;

        tableBody.appendChild(row);
    });

    document.getElementById('totalPagesNum').textContent = Math.ceil(totalCustomers / customersPerPage);
    document.getElementById('currentPageNum').textContent = currentPage;
}

function changePage(newPage) {
    if (newPage < 1 || newPage > Math.ceil(totalCustomers / customersPerPage)) {
        return; // Do nothing if the page number is out of range
    }
    currentPage = newPage;
    showCustomers();
}
    function sendMoney() {
      var enterName = document.getElementById("enterName").value.replace(/\s/g, '');
      var enterSerialNumber = document.getElementById("enterSerialNumber").value.trim();
      var enterAmount = parseInt(document.getElementById("enterAmount").value);
      var myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText);
   
      if (enterAmount > myAccountBalance) {
          alert("Insufficient Balance.");
          return;
      }
   
      var recipientId = '';
      if (enterName) {
          recipientId = enterName + "BitcoinBalance";
      } else if (enterSerialNumber && serialNumberToNameMap.hasOwnProperty(enterSerialNumber)) {
          recipientId = serialNumberToNameMap[enterSerialNumber];
      }
   
      if (!recipientId || !customerBalances.hasOwnProperty(recipientId)) {
          alert("Customer not found.");
          return;
      }
   
      // Update balances
      customerBalances[recipientId] += enterAmount;
      myAccountBalance -= enterAmount;
   
      document.getElementById("myAccountBalance").innerText = myAccountBalance;
      if (document.getElementById(recipientId)) {
          document.getElementById(recipientId).innerHTML = customerBalances[recipientId];
      }
   
      alert(`Transaction Successful !! ${enterAmount} ₿ sent to ${enterName || enterSerialNumber}`);
   
      // Transaction history
      var createPTag = document.createElement("li");
      var textNode = document.createTextNode(`${enterAmount} ₿ Transferred Successfully to ${enterName || enterSerialNumber} on ${Date()}.`);
      createPTag.appendChild(textNode);
      var element = document.getElementById("transaction-history-body");
      element.insertBefore(createPTag, element.firstChild);
   }

    function donate(){
      var person = alert("Thank you for your kind gesture. You are a true treasure to me :) or you can just do it : bc1qhjqqeanujzl7wva3kv2t0wqa0dde84t97tmuhn");
   }


   function searchCustomers() {
      const searchValue = document.getElementById('searchInput').value.toLowerCase();
      const filteredCustomers = jsonData.filter(customer => {
          return customer['Name'].toLowerCase().includes(searchValue) ||
                 customer['Serial No'].toLowerCase().includes(searchValue) ||
                 customer['Mail Address'].toLowerCase().includes(searchValue);
      });
  
      displayCustomers(filteredCustomers); // Function to display the filtered results
  }
  
  function displayCustomers(customers) {
      const tableBody = document.querySelector('.table-responsive .table tbody');
      tableBody.innerHTML = '';
  
      customers.forEach((customer, index) => {
          const row = document.createElement('tr');
          row.className = index % 2 === 0 ? 'table-light' : 'table-secondary';
  
          row.innerHTML = `
              <td scope="row">${customer['Serial No']}</td>
              <td>${customer['Name']}</td>
              <td>${customer['Mail Address']}</td>
              <td><p id="${customer['Name'].replace(/\s/g, '')}BitcoinBalance">${customer['BTC wallet (?)']}</p></td>`;
  
          tableBody.appendChild(row);
      });
  }

  function resetSearch() {
   document.getElementById('searchInput').value = '';
   showCustomers(); // Function to display all customers
}
