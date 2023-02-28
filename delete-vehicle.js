function perRowDeletePropertiesClickEvent(vehicleId, vehicleObject) {
    $(`button#vehicle-delete-${vehicleObject.name}`).click(function () {
      console.log(`Showing delete vehicle modal `, vehicleObject);
      $("span#delete-vehicle-name").html(vehicleObject["name"]);
      selectedVehicleObjectId = vehicleId;
      $("#delete-vehicle-modal").show();
    });
  }