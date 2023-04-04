const perRowDeletePropertiesClickEvent = (vehicleId, vehicleObject) => {
    $(`button#vehicle-delete-${vehicleId}`).click(() => {
      console.log(`Showing delete vehicle modal `, vehicleObject);
      $("span#delete-vehicle-name").html(vehicleObject["name"]);
      selectedVehicleObjectId = vehicleId;
      $("#delete-vehicle-modal").show().dimBackground();
    });
  }


  //  ADD ICONS INDICATING STATUS AND ACTION REQUIRED
  // TURN VIEW BUTTON INTO VEHICLE NAME
  // VIEW BUTTON ON RIGHT, STATUS AND ACTION ICONS ON LEFT 
  // CREATE VIEW MY WORK ORDERS BUTTON AND MODAL FOR HOME SCREEN
  