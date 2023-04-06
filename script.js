var items = [
	{
		id: 1,
		name: "@WhiskyVegas",
		type: "Bourbon",
		barrel: "OLS-B-1",
		age: "6yrs 1mo",
		proof: "119.34",
		finish: "Oloroso",
		mashbill: "60/36/4",
		source: "MGP",
		distilled: "",
		bottled: "",
		price: "",
		state: "NV",
		retail: "",
		image: ""
	},
	{
		id: 2,
		name: "Alec Bradley",
		type: "Bourbon",
		barrel: "RIO-289",
		age: "6yrs 4mos",
		proof: "116.62",
		finish: "None",
		mashbill: "75/21/4",
		source: "MGP",
		distilled: "",
		bottled: "",
		price: "",
		state: "DC",
		retail: "",
		image: ""
	},
	{
		id: 3,
		name: "Allocated Liquor",
		type: "Bourbon",
		barrel: "I21-06",
		age: "4yrs 4mos",
		proof: "116.6",
		finish: "None",
		mashbill: "",
		source: "MGP",
		distilled: "",
		bottled: "",
		price: "$79.95",
		state: "CA",
		retail: "Top Bourbon",
		image: ""
	},
	{
		id: 4,
		name: "Bar Keeper",
		type: "Bourbon",
		barrel: "IRT-42-A",
		age: "5yrs",
		proof: "120.76",
		finish: "None",
		mashbill: "60/36/4",
		source: "MGP",
		distilled: "",
		bottled: "",
		price: "",
		state: "CA",
		retail: "",
		image: ""
	},
	{
		id: 5,
		name: "Barrels & Brews",
		type: "Bourbon",
		barrel: "IRT-06",
		age: "5yrs 6mos",
		proof: "117.98",
		finish: "None",
		mashbill: "60/36/4",
		source: "MGP",
		distilled: "",
		bottled: "",
		price: "",
		state: "TN",
		retail: "",
		image: ""
	},
];

var itemList = document.getElementById("item-list");

for (var i = 0; i < items.length; i++) {
	var item = items[i];
	var itemDiv = document.createElement("div");
	itemDiv.classList.add("card");
	itemDiv.innerHTML = `
		<h2>${item.name}</h2>
		<p>${item.barrel}<br>
		${item.type}<br>
		${item.finish}</p>
		<a href="javascript:viewItemDetails(${item.id})">View Details</a>
	`;
	//<button onclick="viewItemDetails(${item.id})">View Details</button>
	itemList.appendChild(itemDiv);
}

function viewItemDetails(itemId) {
	window.location.href = "details.html?id=" + itemId;
}

function filterItems() {
	var typeFilter = document.getElementById("type-filter").value;
	var finishFilter = document.getElementById("finish-filter").value;
  
	if (typeFilter === "" && finishFilter === "") {
	  // Show all items if no filters are selected
	  showAllItems();
	} else if (typeFilter !== "" && finishFilter === "") {
	  // Filter items based on selected type
	  var filteredItems = items.filter(function(item) {
		return item.type === typeFilter;
	  });
	  updateItemList(filteredItems);
	} else if (typeFilter === "" && finishFilter !== "") {
	  // Filter items based on selected finish
	  var filteredItems = items.filter(function(item) {
		return item.finish === finishFilter;
	  });
	  updateItemList(filteredItems);
	} else {
	  // Filter items based on both type and finish
	  var filteredItems = items.filter(function(item) {
		return item.type === typeFilter && item.finish === finishFilter;
	  });
	  updateItemList(filteredItems);
	}
  }
  

function showAllItems() {
	updateItemList(items);
}

function updateItemList(updatedItems) {
	var itemList = document.getElementById("item-list");
	itemList.innerHTML = "";

	for (var i = 0; i < updatedItems.length; i++) {
		var item = updatedItems[i];
		var itemDiv = document.createElement("div");
		itemDiv.classList.add("card");
		itemDiv.innerHTML = `
			<h2>${item.name}</h2>
			<p>${item.barrel}<br>
			${item.type}<br>
			${item.finish}</p>
			<a href="javascript:viewItemDetails(${item.id})">View Details</a>
		`;
		itemList.appendChild(itemDiv);
	}
}