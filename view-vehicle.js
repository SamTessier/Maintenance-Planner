function populateViewModal(vehicleId, vehicleObject) {
    console.log(
      `opening vehicle row `,
      vehicleObject,
      Object.entries(vehicleObject["workOrders"])
    );
  
    $("#view-vehicle-modal").show().dimBackground();
    $("ul#view-modal-vehicle-property-list").empty();
  
    for (const [key, value] of Object.entries(vehicleObject)) {
      let displayKey = key;
      let newValue = value;
      if (key === "vStatus") {
        displayKey = "Status";
        if (value.toString() === "true") {
          newValue = "In Service";
        } else if (value.toString() === "false") {
          newValue = "Out of Service";
        }
      } else if (key === "name") {
        displayKey = "Vehicle";
      }else if (key === "workOrders") {
        displayKey = "Work Orders";
        if (vehicleObject["workOrders"].size > 0) {
          newValue = "!Open Work Orders!";
        } else {
          newValue = "No Work Orders Open";
        }
      }
      
      

      $("ul#view-modal-vehicle-property-list").append(`
        <li>
          <strong> ${displayKey} : </strong>
          <span>  ${newValue} </span> 
        </li>
      `);
    }
  
    $("tbody#work-order-table-body").html("");
    console.log(
      "Iterating WorkOrders: ",
      vehicleObject["workOrders"],
      vehicleObject["workOrders"].entries()
    );
    for (const [workOrderId, workOrderObject] of Object.entries(
      vehicleObject["workOrders"]
    )) {
      console.log("Creating work order row: ", workOrderId, workOrderObject);
      $("tbody#work-order-table-body").append(`
        <tr> 
          <td>${workOrderId}</td>
          <td>${workOrderObject["description"]}</td>
          <td>${workOrderObject["actionRequired"]}</td>
        </tr>
      `);
    }
  }
  

function perRowViewPropertiesClickEvent(vehicleId, vehicleObject) {
  $(`button#vehicle-view-${vehicleObject.name}`).click(function(){
    populateViewModal(vehicleId, vehicleObject);
  });
  selectedVehicleObjectId = vehicleId;
}

