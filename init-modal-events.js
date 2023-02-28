function welcomeModalEvents() {
  $("button#welcome-modal-btn").click(function () {
    $("#welcome-modal").hide();
  });
}

function editModalEvents() {
  $("button#close-edit-modal").click(function () {
    $("#edit-vehicle-modal").hide();
  });
  $("#edit-properties-btn").click(function () {
    if (selectedVehicleObjectId != null) {
      let name = $(`input#edit-value-name`).val();
      let vStatus = $(`input#edit-value-vStatus`).prop("checked");
      let newVehicleObject = {};
      newVehicleObject.name = name;
      newVehicleObject.vStatus = vStatus;
      newVehicleObject.workOrders =
        vehicleObjects[selectedVehicleObjectId]["workOrders"];
      vehicleObjects[selectedVehicleObjectId] = newVehicleObject;
      console.log("New object appended: ", newVehicleObject, vehicleObjects);

      let rowHtmlStr = `
              <tr id="vehicle-row-${selectedVehicleObjectId}">
                <td > ${newVehicleObject.name} </td>
                <td >
                    <input type="checkbox" id="vehicle-status-${newVehicleObject.name}" >
                </td> 
                <td> <button id="vehicle-view-${newVehicleObject.name}">View </button>
                <td> <button id="vehicle-edit-${newVehicleObject.name}">Edit </button>
                <td> <button id="vehicle-delete-${newVehicleObject.name}">Delete </button>
              </tr>`;

      $(`tr#vehicle-row-${selectedVehicleObjectId}`).replaceWith(rowHtmlStr);
      linkCheckBox(newVehicleObject);
      $("div#edit-vehicle-modal").hide();
      $(`input#edit-value-name`).val("");
      $(`input#edit-value-vStatus`).prop("checked", false);
      linkCheckBox(newVehicleObject);
      perRowViewPropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
      perRowEditPropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
      perRowDeletePropertiesClickEvent(
        selectedVehicleObjectId,
        newVehicleObject
      );
    } else {
      alert("I couldn't find the object");
    }
  });
}

function addModalEvents() {
  $("button#close-add-modal").click(function () {
    $("#add-vehicle-modal").hide();
  });

  $("button#new-vehicle-input").click(function () {
    $("#add-vehicle-modal").show();
  });

  $("button#add-properties-btn").click(function () {
    createRowObjectEvent();
    $("div#add-vehicle-modal").hide();
  });
}

function viewModalEvents() {
  $("button#close-view-modal-btn").click(function () {
    $("#view-vehicle-modal").hide();
  });
}

function deleteModalEvents() {
  $(`button#close-delete-modal`).click(function () {
    $("div#delete-vehicle-modal").hide();
  });
  $(`button#delete-vehicle-btn`).click(function () {
    console.log("Trying to delete object with ID: ", selectedVehicleObjectId);
    if (selectedVehicleObjectId != null) {
      // DELETE LOGIC
      vehicleObjects.delete(selectedVehicleObjectId);
      $(`tr#vehicle-row-${selectedVehicleObjectId}`).remove();
      $("#delete-vehicle-modal").hide();
    } else {
      alert("Cannot find object to delete.");
    }
  });
}

function workOrderModalEvents() {
  $("button#open-work-order-modal").click(function () {
    $("#work-order-modal").show();
    $("#view-vehicle-modal").hide();
  });
  $("button#close-work-order-modal").click(function () {
    $("#work-order-modal").hide();
  });
  $("button#create-work-order-btn").click(createWorkOrder);
}

function init() {
  console.log("Initializing Events / Asynchrnous operations");
  addModalEvents();
  editModalEvents();
  deleteModalEvents();
  viewModalEvents();
  welcomeModalEvents();
  workOrderModalEvents();
  $("#welcome-modal").show();
}
