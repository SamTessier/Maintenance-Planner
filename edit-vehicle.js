const perRowEditPropertiesClickEvent = (vehicleId, vehicleObject) => {
  selectedVehicleObjectId = vehicleId;
  $("div#edit-modal-vehicle-property-list").html("");
  console.log(
    `opening vehicle edit `,
    vehicleObject,
    Object.entries(vehicleObject)
  );
  $("div#view-modal-vehicle-property-list").empty();
  Object.entries(vehicleObject).forEach(([key, value]) => {
    let displayKey = key;
    if (key === "name") {
      displayKey = "Vehicle Name";
    } else if (key === "year") {
      displayKey = "Year";
    } else if (key === "make") {
      displayKey = "Make";
    } else if (key === "model") {
      displayKey = "Model";
    } else if (key === "licensePlate") {
      displayKey = "License Plate";
    } else if (key === "vStatus") {
      displayKey = "Is the Vehicle In Service?";
    }
    if (key == "workOrders") {
      console.log("Not editing workorders");
    } else if (key == "vStatus") {
      $("div#edit-modal-vehicle-property-list").append(`
      
        <br /> ${displayKey}<br />
          <input id="edit-value-${key}"
          type="checkbox"
          class="align-right"
          ${value ? "checked" : ""}l; 
        />
      `);
    } else {
      $("div#edit-modal-vehicle-property-list").append(`         
          <br />${displayKey}<br />         
          <input id="edit-value-${key}"
          type="text"
          placeholder="Enter ${key}"
          class="align-right"
          value="${value}"
        />       
      `);
    }
  });
};

const editVehicleObject = () => {
  if (selectedVehicleObjectId != null) {
    let name = $(`input#edit-value-name`).val();
    let vStatus = $(`input#edit-value-vStatus`).prop("checked");
    let newVehicleObject = {};
    if (
      selectedVehicleObjectId in vehicleObjects &&
      "workOrders" in vehicleObjects[selectedVehicleObjectId]
    ) {
      newVehicleObject.workOrders =
        vehicleObjects[selectedVehicleObjectId].workOrders;
    } else {
      newVehicleObject.workOrders = [];
    }
    newVehicleObject.name = name;
    newVehicleObject.vStatus = vStatus;
    vehicleObjects[selectedVehicleObjectId] = newVehicleObject;
    console.log("New object appended: ", newVehicleObject, vehicleObjects);
    let rowHtmlStr = `
            <tr id="vehicle-row-${selectedVehicleObjectId}">
              <td > ${newVehicleObject.name} </td>
              <td >
                  <input type="checkbox" id="vehicle-status-${newVehicleObject.name}" >
              </td> 
              <td> <button id="vehicle-view-${newVehicleObject.name}">View </button>
              <!-- <td> <button id="vehicle-edit-${newVehicleObject.name}">Edit </button>
              <td> <button id="vehicle-delete-${newVehicleObject.name}">Delete </button> -->
            </tr>`;
    $(`tr#vehicle-row-${selectedVehicleObjectId}`).replaceWith(rowHtmlStr);
    linkCheckBox(newVehicleObject);
    $("#edit-vehicle-modal").hide().undim();
    $(`input#edit-value-name`).val("");
    $(`input#edit-value-vStatus`).prop("checked", false);
    linkCheckBox(newVehicleObject);
    perRowViewPropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
    perRowEditPropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
    perRowDeletePropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
  }
};
