var items = [];

function loadItems() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var rows = this.responseText.split("\n");
        for (var i = 1; i < rows.length; i++) {
          var cols = rows[i].split(",");
          if (cols.length == 5) {
            var item = {
              id: cols[0],
              barrel: cols[1],
              name: cols[2],
              age: cols[4],
              proof: cols[5],
              type: cols[6],
              finish: cols[7],
              mashbill: cols[8],
              source: cols[9],
              distilled: cols[10],
              bottled: cols[11],
              price: cols[12],
              state: cols[13],
              retail: cols[14]
            };
            items.push(item);
          }
        }
        renderList(); // Call renderList() after items have been loaded
      }
    };
    xhttp.open("GET", "items.csv", true);
    xhttp.send();
  }  