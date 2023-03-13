const perRowDeletePropertiesClickEvent = (vehicleId, vehicleObject) => {
    $(`button#vehicle-delete-${vehicleId}`).click(() => {
      console.log(`Showing delete vehicle modal `, vehicleObject);
      $("span#delete-vehicle-name").html(vehicleObject["name"]);
      selectedVehicleObjectId = vehicleId;
      $("#delete-vehicle-modal").show().dimBackground();
    });
  }