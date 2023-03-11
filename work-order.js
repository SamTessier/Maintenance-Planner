function createWorkOrder() {
  vehicleId = selectedVehicleObjectId;
  if (!vehicleId) {
    alert("Please select a vehicle before creating a work order");
    return;
  }
  let description = $("input#work-order-job-description").val();
  let actionRequired = $("input#work-order-action-required").val();

  let workOrderObject = {
    description: description,
    actionRequired: actionRequired,
  };

  let vehicleObject = vehicleObjects.get(vehicleId);
  let workOrderId = description.replace(/^\s+|\s+$/gm, '').toLowerCase().slice(0, 4); //Delete empty spaces, lowercase, take first 5 characters (index 0 to 4)
  vehicleObject["workOrders"].set(workOrderId, workOrderObject);

  vehicleObjects.set(vehicleId, vehicleObject);

  // Hide modal and clear input values
  $("input#work-order-job-description").val("");
  $("input#work-order-action-required").val("");

  $("#work-order-modal").hide().undim();
  $("#view-vehicle-modal").show().dimBackground();

  populateViewModal(vehicleId, vehicleObject);
}
