function welcomeModalEvents() {
  $("button#welcome-modal-btn").click(function () {
    $("#welcome-modal").hide().undim();
  });
}

function myFleetModalEvents() {
  $("button#open-view-fleet-modal").click(function () {
    $("#view-fleet-modal").show().dimBackground();
  });
  $("button#close-fleet-modal-btn").click(function () {
    $("#view-fleet-modal").hide().undim();
  });
}

function editModalEvents() {
  $("button#close-edit-modal").click(function () {
    $("#edit-vehicle-modal").hide().undim();
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
    $("#add-vehicle-modal").hide().undim();
  });

  $("button#new-vehicle-input").click(function () {
    $("#view-fleet-modal").hide().undim();
    $("#add-vehicle-modal").show().dimBackground();
  });

  $("button#add-properties-btn").click(function () {
    createRowObjectEvent();
    $("#add-vehicle-modal").hide().undim();
    $("#view-fleet-modal").show().dimBackground();
  });
}

function viewModalEvents() {
  $("button#close-view-modal-btn").click(function () {
    $("#view-vehicle-modal").hide().undim();
  });
}

function deleteModalEvents() {
  $(`button#close-delete-modal`).click(function () {
    $("div#delete-vehicle-modal").hide().undim();
  });
  $(`button#delete-vehicle-btn`).click(function () {
    console.log("Trying to delete object with ID: ", selectedVehicleObjectId);
    if (selectedVehicleObjectId != null) {
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
    $("#work-order-modal").show().dimBackground();
    $("#view-fleet-modal").hide().undim();
    $("#view-vehicle-modal").hide().undim();
  });
  $("button#close-work-order-modal").click(function () {
    $("#work-order-modal").hide().undim();
  });
  $("button#create-work-order-btn").click(function () {
    createWorkOrder();
    $("#work-order-modal").hide().undim();
  });
}

function init() {
  console.log("Initializing Events / Asynchrnous operations");
  addModalEvents();
  editModalEvents();
  deleteModalEvents();
  viewModalEvents();
  welcomeModalEvents();
  workOrderModalEvents();
  myFleetModalEvents();
  $("#welcome-modal").show().dimBackground();
}
