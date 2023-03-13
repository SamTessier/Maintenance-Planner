const welcomeModalEvents = () => {
  $("button#welcome-modal-btn").click(() => {
    $("#welcome-modal").hide().undim();
  });
};

const myFleetModalEvents = () => {
  $("button#open-view-fleet-modal").click(() => {
    if (vehicleObjects.size === 0) {
      $("#add-vehicle-modal").show().dimBackground();
    } else {
      $("#view-fleet-modal").show().dimBackground();
    }
  });
  $("button#close-fleet-modal-btn").click(() => {
    $("#view-fleet-modal").hide().undim();
  });
};

const editModalEvents = () => {
  $("button#close-edit-modal").click(() => {
    $("#edit-vehicle-modal").hide().undim();
  });
  $("#edit-properties-btn").click(() => {
    editVehicleObject();
  });
};

const addModalEvents = () => {
  $("button#close-add-modal").click(() => {
    $("#add-vehicle-modal").hide().undim();
  });
  $("button#new-vehicle-input").click(() => {
    $("#view-fleet-modal").hide().undim();
    $("#add-vehicle-modal").show().dimBackground();
  });
  $("button#add-properties-btn").click(() => {
    createRowObjectEvent();
    $("#add-vehicle-modal").hide().undim();
    $("#view-fleet-modal").show().dimBackground();
  });
};

const viewModalEvents = () => {
  $("button#close-view-modal-btn").click(() => {
    $("#view-vehicle-modal").hide().undim();
  });
};

const deleteModalEvents = () => {
  $(`button#delete-vehicle-btn`).click(() => {
    console.log("Trying to delete object with ID: ", selectedVehicleObjectId);
    if (selectedVehicleObjectId != null) {
      vehicleObjects.delete(selectedVehicleObjectId);
      $(`tr#vehicle-row-${selectedVehicleObjectId}`).remove();
      $("#delete-vehicle-modal").hide().undim();
    } else {
      alert("Cannot find object to delete.");
    }
  });
  $("button#close-delete-modal").click(() => {
    $("div#delete-vehicle-modal").hide().undim();
  });
};

const workOrderModalEvents = () => {
  $("button#close-work-order-modal").click(() => {
    $("#work-order-modal").hide().undim();
  });
  $("button#create-work-order-btn").click(() => {
    createWorkOrder();
    $("#work-order-modal").hide().undim();
  });
};

const init = () => {
  console.log("Initializing Events / Asynchrnous operations");
  addModalEvents();
  editModalEvents();
  deleteModalEvents();
  viewModalEvents();
  welcomeModalEvents();
  workOrderModalEvents();
  myFleetModalEvents();
  editVehicleObject();
  $("#welcome-modal").show().dimBackground();
};
