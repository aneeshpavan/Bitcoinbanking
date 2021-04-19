let myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText);

function sendMoney(){
   var enterName = document.getElementById("enterName").value;
   var enterAmount = parseInt(document.getElementById("enterAmount").value);

   if (enterAmount > 500000) {
      alert("Insufficient Balance.")
   } else {
      var findUserBankAccount = enterName + "BitcoinBalance";
      var finalAmount = parseInt(document.getElementById(findUserBankAccount).innerHTML) + enterAmount;
      var myAccountBalance = parseInt(document.getElementById("myAccountBalance").innerText) - enterAmount
      document.getElementById("myAccountBalance").innerText = myAccountBalance
      document.getElementById(findUserBankAccount).innerHTML = finalAmount;
      alert(`Transaction Successful !!  
      ${enterAmount} ₿ sent to ${enterName}`)

      // transaction history 
      var createPTag = document.createElement("li");
      var textNode = document.createTextNode(`${enterAmount} ₿ Transferred Successfully to ${enterName} on ${Date()}.`);
      createPTag.appendChild(textNode);
      var element = document.getElementById("transaction-history-body");
      element.insertBefore(createPTag, element.firstChild);
   }
}

function donate(){
   var person = alert("Thank you for your kind gesture. You are a true treasure to me :) or you can just do it : bc1qhjqqeanujzl7wva3kv2t0wqa0dde84t97tmuhn");
}