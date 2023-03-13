const populateViewModal = (vehicleId, vehicleObject) => {
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
    } else if (key === "workOrders") {
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
    vehicleObject["workOrders"].entries(),
    Object.entries(vehicleObject["workOrders"])
  );
  for (const [workOrderId, workOrderObject] of vehicleObject[
    "workOrders"
  ].entries()) {
    console.log("Creating work order row: ", workOrderId, workOrderObject);
    $("tbody#work-order-table-body").append(`
        <tr> 
          <td>${workOrderId}</td>
          <td>${workOrderObject["description"]}</td>
          <td>${workOrderObject["actionRequired"]}</td>
        </tr>
      `);
  }
  $("div#view-vehicle-modal-footer").empty(); 
  let rowHtmlStr = `
    <button class="btn btn-danger btn-xs" id="vehicle-delete-${vehicleId}">Delete </button>
    <button class="btn btn-info btn-xs" id="vehicle-edit-${vehicleId}">Edit Vehicle</button>
    <button class="btn btn-info btn-xs" id="open-work-order-modal-btn">Add Work Order</button>
    <button
              id="close-view-modal-btn"
              type="button"
              class="btn btn-xs btn-link text-right font-weight-light"
            >Close</button> `;
  $("div#view-vehicle-modal-footer").html(rowHtmlStr);
  $(`button#vehicle-delete-${vehicleId}`).click(() => {
    console.log(`Showing delete vehicle modal `, vehicleObject);
    $("span#delete-vehicle-name").html(vehicleObject["name"]);
    selectedVehicleObjectId = vehicleId;
    $("#delete-vehicle-modal").show().dimBackground();
    $("#view-vehicle-modal").hide().undim();
  });
  $(`button#vehicle-edit-${vehicleId}`).click(() => {
    $("#view-vehicle-modal").hide().undim();
    $("#edit-vehicle-modal").show().dimBackground();
    perRowEditPropertiesClickEvent(vehicleId, vehicleObject)
    console.log(
      `opening vehicle edit `,
      vehicleObject,
      Object.entries(vehicleObject)
    );
  });
  $("button#open-work-order-modal-btn").click(() => {
    console.log("opening work order modal");
    $("#view-fleet-modal").hide().undim();
    $("#view-vehicle-modal").hide().undim();
    $("#work-order-modal").show().dimBackground();
  });
  $("button#close-view-modal-btn").click(() => {
    $("#view-vehicle-modal").hide().undim();
  });
}

const perRowViewPropertiesClickEvent = (vehicleId, vehicleObject) => {
  $(`button#vehicle-view-${vehicleObject.name}`).click(() => {
    populateViewModal(vehicleId, vehicleObject);
  });
  selectedVehicleObjectId = vehicleId;
}
