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

// Add this to your JavaScript code
function filterByFinish() {
	var selectedFinish = document.getElementById("finish-filter").value;
	var filteredItems = items.filter(item => item.finish === selectedFinish || selectedFinish === "");
	itemList.innerHTML = "";
	filteredItems.forEach(item => {
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
	  `;
	  itemList.appendChild(itemDiv);
  
	  itemDiv.addEventListener("click", function() {
		viewItemDetails(item.id);
	  });
	});
  }
  
  function getFinishOptions() {
	var finishes = new Set(items.map(item => item.finish));
	var options = "";
	finishes.forEach(finish => {
	  options += `<option value="${finish}">${finish}</option>`;
	});
	return options;
  }
  

// GENERATE LINK TO DETAILS PAGE
function viewItemDetails(itemId) {
	window.location.href = "details.html?id=" + itemId;
}