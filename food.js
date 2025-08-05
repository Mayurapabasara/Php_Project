const items = {
  "Golk Resort": 11000,
  "Blue Lagoon": 9500,
  "Sunset Villa": 12000,
  "Lakeview Inn": 10500,
  "Rice & Curry": 11000,
  "Burger": 9000,
  "Pasta": 9500,
  "Tea": 3000,
  "Coffee": 4000,
  "Soft Drink": 3500,
  "Juice": 4500,
  "Ice Cream": 3000,
  "Cake": 3200,
  "Pudding": 2900,
  "Fruit Salad": 3100
};

function updateSelection() {
  const hotel = document.getElementById("hotel-select").value;
  const food = document.getElementById("food-select").value;
  const beverage = document.getElementById("beverage-select").value;
  const dessert = document.getElementById("dessert-select").value;

  const selectedList = document.getElementById("selected-list");
  selectedList.innerHTML = "";

  let total = 0;

  const selections = [hotel, food, beverage, dessert];

  selections.forEach((item) => {
    if (item) {
      const price = items[item] || 0;
      total += price;

      const div = document.createElement("div");
      div.className = "selected-item";
      div.innerHTML = `<h4>${item}</h4><p>RS.${price.toLocaleString()}/=</p>`;
      selectedList.appendChild(div);
    }
  });

  document.getElementById("total").value = "RS." + total.toLocaleString() + "/=";
}

document.getElementById("hotel-select").addEventListener("change", updateSelection);
document.getElementById("food-select").addEventListener("change", updateSelection);
document.getElementById("beverage-select").addEventListener("change", updateSelection);
document.getElementById("dessert-select").addEventListener("change", updateSelection);



/*e bill*/
// Sample selected items and prices
// Sample price list for items
const itemPrices = {
  hotel: {
    "Golk Resort": 1000,
    "Blue Lagoon": 1200,
    "Sunset Villa": 950,
    "Lakeview Inn": 1100
  },
  food: {
    "Rice & Curry": 350,
    "Burger": 500,
    "Pasta": 600
  },
  beverage: {
    "Tea": 100,
    "Coffee": 150,
    "Soft Drink": 120,
    "Juice": 200
  },
  dessert: {
    "Ice Cream": 250,
    "Cake": 300,
    "Pudding": 280,
    "Fruit Salad": 220
  }
};

document.getElementById("submit-btn").addEventListener("click", () => {
  const hotel = document.getElementById("hotel-select").value;
  const food = document.getElementById("food-select").value;
  const beverage = document.getElementById("beverage-select").value;
  const dessert = document.getElementById("dessert-select").value;

  const customerName = document.getElementById("customer-name").value || "Guest";
  const paymentMethod = document.getElementById("payment-method").value || "Not Specified";

  // Calculate prices
  const hotelPrice = itemPrices.hotel[hotel] || 0;
  const foodPrice = itemPrices.food[food] || 0;
  const beveragePrice = itemPrices.beverage[beverage] || 0;
  const dessertPrice = itemPrices.dessert[dessert] || 0;

  const subtotal = hotelPrice + foodPrice + beveragePrice + dessertPrice;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;

  // Set values in the bill
  document.getElementById("bill-customer-name").innerText = customerName;
  document.getElementById("bill-order-id").innerText = "ORD" + Math.floor(Math.random() * 10000);
  document.getElementById("bill-date").innerText = new Date().toLocaleString();
  document.getElementById("bill-payment-method").innerText = paymentMethod;

  document.getElementById("item-hotel").innerText = hotel;
  document.getElementById("item-food").innerText = food;
  document.getElementById("item-beverage").innerText = beverage;
  document.getElementById("item-dessert").innerText = dessert;

  document.getElementById("price-hotel").innerText = hotelPrice.toFixed(2);
  document.getElementById("price-food").innerText = foodPrice.toFixed(2);
  document.getElementById("price-beverage").innerText = beveragePrice.toFixed(2);
  document.getElementById("price-dessert").innerText = dessertPrice.toFixed(2);

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = tax.toFixed(2);
  document.getElementById("total").innerText = grandTotal.toFixed(2);

  // Show the bill
  document.querySelector(".ebill").style.display = "block";
});

// Print function
document.getElementById("print-btn").addEventListener("click", () => {
  window.print();
});
