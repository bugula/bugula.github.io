import items from './releases.mjs';
console.log('items =>', items);

var itemList = document.getElementById("item-list");

items.sort((a, b) => a.name.localeCompare(b.name));

for (var i = 0; i < items.length; i++) {
	var item = items[i];
	var itemDiv = document.createElement("div");
	itemDiv.classList.add("card");
	itemDiv.innerHTML = `
    <h2>${item.name}</h2>
	<div class="card-content">
	<div class="card-image">
        ${item.image ? `<img src="images/${item.image}" width="100" height="100">` : ""}
    </div>
	<div class="card-text">
    ${item.barrel}<br>
    ${item.type}<br>
    ${item.finish}
	</div>
	</div>
    <a href="javascript:viewItemDetails(${item.id})">View Details</a>
	</div>
	`;
	itemList.appendChild(itemDiv);

	// Add click event listener to the card element
	itemDiv.addEventListener("click", function() {
		viewItemDetails(item.id);
	});
}

function filterItems() {
	var finishFilter = document.getElementById("finish-filter").value;
  
	if (finishFilter === "") {
	  // Show all items if no filters are selected
	  showAllItems();
	} else {
	  // Filter items based on selected finish
	  var filteredItems = items.filter(function (item) {
		return item.finish.toLowerCase().indexOf(finishFilter.toLowerCase()) !== -1;
	  });
	  updateItemList(filteredItems);
	}
}

function filterItemsByType(type) {
	var filteredItems;
	if (type === '') {
	  filteredItems = items;
	} else {
	  filteredItems = items.filter(function(item) {
		return item.type === type;
	  });
	}
	updateItemList(filteredItems);
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
			<div class="card-content">
			<div class="card-image">
        		${item.image ? `<img src="images/${item.image}" width="100" height="100">` : ""}
    		</div>
			<div class="card-text">
    			${item.barrel}<br>
    			${item.type}<br>
    			${item.finish}
			</div>
			</div>
    		<a href="javascript:viewItemDetails(${item.id})">View Details</a>
			</div>
			`;
		itemList.appendChild(itemDiv);
	  }
}


// GENERATE LINK TO DETAILS PAGE
function viewItemDetails(itemId) {
	window.location.href = "details.html?id=" + itemId;
}