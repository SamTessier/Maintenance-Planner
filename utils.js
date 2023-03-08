function linkCheckBox(vehicleObject) {
  $(`input#vehicle-status-${vehicleObject.name}`).prop(
    "checked",
    vehicleObject.vStatus
  );
}


