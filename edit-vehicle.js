function perRowEditPropertiesClickEvent(vehicleId, vehicleObject) {
    $(`button#vehicle-edit-${vehicleObject.name}`).click(function () {
      $("#edit-vehicle-modal").show();
      $("ul#edit-modal-vehicle-property-list").html("");
      console.log(
        `opening vehicle edit `,
        vehicleObject,
        Object.entries(vehicleObject)
      );
      Object.entries(vehicleObject).forEach(([key, value]) => {
        let displayKey = key;
        if (key === "vStatus") {
          displayKey = "New Status";
        } else if (key === "name") {
          displayKey = "New Vehicle";
        }
  
        if (key === "vStatus") {
          $("ul#edit-modal-vehicle-property-list").append(`
        <li> 
          <strong> ${displayKey} : </strong> 
          <input id="edit-value-${key}"
          type="checkbox" 
          class="align-self-center"
          ${value ? "checked" : ""}
        /> 
        </li>
      `);
        } else {
          $("ul#edit-modal-vehicle-property-list").append(`
        <li> 
          <strong> ${displayKey} : </strong> 
          <span> 
          <input id="edit-value-${key}"
          type="text"
          placeholder="Enter ${key}"
          class="align-self-center"
          value=${value}
        /> 
        </span> 
        </li>
      `);
        }
      });
      selectedVehicleObjectId = vehicleId;
    });
  }