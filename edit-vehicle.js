
function perRowEditPropertiesClickEvent(vehicleId) {
  selectedVehicleObjectId = vehicleId;
  $(`button#vehicle-edit-${vehicleId}`).click(function () {
    $("#view-vehicle-modal").hide().undim();
    $("#edit-vehicle-modal").show().dimBackground();
    $("ul#edit-modal-vehicle-property-list").html("");
    console.log(
      `opening vehicle edit `,
      vehicleObject,
      Object.entries(vehicleObject)
    );
    $("ul#view-modal-vehicle-property-list").empty();
    Object.entries(vehicleObject).forEach(([key, value]) => {
      let displayKey = key;
      if (key === "vStatus") {
        displayKey = "New Status";
      } else if (key === "name") {
        displayKey = "New Vehicle";
      };

        if (key == "vStatus") {
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
          value="${value}"
        /> 
        </span> 
        </li>
      `);
      }
    
    });
    
  });
}
