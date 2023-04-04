const createWorkOrder = () => {
  vehicleId = selectedVehicleObjectId;
  if (!vehicleId) {
    alert("Please select a vehicle before creating a work order");
    return;
  }
  let description = $("input#work-order-job-description").val();
  let actionRequired = $("input#work-order-action-required").val();
  let actionDescription = $("input#work-order-action-required-description").val();
  let workOrderObject = {
    description: description,
    actionRequired: actionRequired,
    actionDescription: actionDescription,
  };
  let vehicleObject = vehicleObjects.get(vehicleId);
  let workOrderId = description
    .replace(/^\s+|\s+$/gm, "")
    .toLowerCase()
    .slice(0, 4);
  vehicleObject["workOrders"].set(workOrderId, workOrderObject);
  vehicleObjects.set(vehicleId, vehicleObject);
  $("input#work-order-job-description").val("");
  $("input#work-order-action-required").val("");
  $("#work-order-modal").hide().undim();
  populateViewModal(vehicleId, vehicleObject);
};


