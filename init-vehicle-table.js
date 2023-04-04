const createRowObjectEvent = () => {
  let vehicleObject = {};
  let name = $("input#add-vehicle-name").val();
  let licensePlate = $("input#add-vehicle-license-plate").val();
  let make = $("input#add-vehicle-make").val();
  let model = $("input#add-vehicle-model").val();
  let year = $("input#add-vehicle-year").val();
  let vStatus = $("input#add-vehicle-status").is(":checked");
  let vehicleId = name.toLowerCase();
  vehicleObject.name = name;
  vehicleObject.vStatus = vStatus;
  vehicleObject.licensePlate = licensePlate;
  vehicleObject.make = make;
  vehicleObject.model = model;
  vehicleObject.year = year;
  vehicleObject.workOrders = new Map();
  let idList = Array.from(vehicleObjects.keys());
  let doesIdExists = idList.includes(vehicleId);
  if (doesIdExists == true) {
    alert("Repeated Vehicle Name");
    return;
  }
  let rowHtmlStr = `
      <tr align="center" id="vehicle-row-${vehicleId}">
        
        <td align="right">
            <input type="checkbox" id="vehicle-status-${vehicleObject.name}" >
        </td> 
        <td align="center"> <button class="btn btn-secondary btn-xs vehicle-name-btn" id="vehicle-view-${vehicleObject.name}">${vehicleObject.name}</button>
      </tr>`;
  $("#vehicle-table-body").append(rowHtmlStr);
  vehicleObjects.set(vehicleId, vehicleObject);
  console.log("Creating new object: ", vehicleObjects);
  linkCheckBox(vehicleObject);
  perRowViewPropertiesClickEvent(vehicleId, vehicleObject);
  perRowEditPropertiesClickEvent(vehicleId, vehicleObject);
  perRowDeletePropertiesClickEvent(vehicleId, vehicleObject);
  console.log("Map of vehicle objects", vehicleObjects);
  $("input#add-vehicle-name").val("");
  $("input#add-vehicle-status").val(null);
  $("input#add-vehicle-license-plate").val("");
  $("input#add-vehicle-make").val("");
  $("input#add-vehicle-model").val("");
  $("input#add-vehicle-year").val("");
};

$(document).ready(() => {
  console.log("Website Ready");
  init();
});
