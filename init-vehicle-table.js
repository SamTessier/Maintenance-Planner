// function updateVehicleRow(vehicleObject) {
//   for (const [key, value] of Object.entries(vehicleObject)) {
//     let newValue = $(`#edit-value-${key}`).val();
//     vehicleObject[key] = newValue;
//   }

//   let row = $(`#vehicle-row-${vehicleObject}`);
//   row.empty();
//   row.append(`
//       <td > ${vehicleObject.name} </td>
//       <td >
//           <input type="checkbox" id="vehicle-status-${vehicleObject.name}" >
//       </td>
//       <td> <button id="vehicle-view-${vehicleObject.name}">View</button> </td>
//       <td> <button id="vehicle-edit-${vehicleObject.name}">Edit</button> </td>
//       <td> <button id="vehicle-delete-${vehicleObject.name}">Delete</button> </td>
//   `);
//   linkCheckBox(vehicleObject);
//   perRowViewPropertiesClickEvent(vehicleObject);
//   perRowEditPropertiesClickEvent(vehicleObject);
//   perRowDeletePropertiesClickEvent(vehicleObject);
//   vehicleObjects.set(vehicleObject);
// }

function createRowObjectEvent() {
  let vehicleObject = {};
  let name = $("input#add-vehicle-name").val();
  let vStatus = $("input#add-vehicle-status").is(":checked");
  let vehicleId = name.toLowerCase();
  vehicleObject.name = name;
  vehicleObject.vStatus = vStatus;
  vehicleObject.workOrders = new Map();
  let vehicleJson = JSON.stringify(vehicleObject);
  console.log("JSON below");
  console.log(vehicleJson);

  let idList = Array.from(vehicleObjects.keys());
  let doesIdExists = idList.includes(vehicleId);
  if (doesIdExists == true) {
    alert("Repeated Vehicle Name");
    return;
  }

  let rowHtmlStr = `
      <tr id="vehicle-row-${vehicleId}">
        <td > ${vehicleObject.name} </td>
        <td >
            <input type="checkbox" id="vehicle-status-${vehicleObject.name}" >
        </td> 
        <td> <button class="btn btn-secondary btn-xs" id="vehicle-view-${vehicleObject.name}">View </button>
        <!-- <td> <button class="btn btn-secondary btn-xs" id="vehicle-edit-${vehicleObject.name}">Edit </button>
        <td> <button class="btn btn-secondary btn-xs" id="vehicle-delete-${vehicleObject.name}">Delete </button> --!>
      </tr>`;
  $("#vehicle-table-body").append(rowHtmlStr);

  vehicleObjects.set(vehicleId, vehicleObject);

  console.log("Creating new object: ", vehicleObjects);
  linkCheckBox(vehicleObject);
  perRowViewPropertiesClickEvent(vehicleId, vehicleObject);
  perRowEditPropertiesClickEvent(vehicleId, vehicleObject);
  perRowDeletePropertiesClickEvent(vehicleId, vehicleObject);
  console.log("Map of vehicle objects", vehicleObjects);
}

$(document).ready(() => {
  console.log("Website Ready");
  init();
});

// how to create a vehicle
// vehicleId = "n1"
// vehicleObjects.set(vehicleId, {
//   "name": "n1",
//   "vStatus": true
// })

// how to create a workOrder
//get reference to the existing vehicle
// let modifiedVehicle = vehicleObjects.get("n1")
// let workOrders = new Map();
// workOrder.set("workOrder1", {
//   'Name': "w1"
// })
// workOrder.set("workOrder2", {
//   'Name': "w2"
// })
// modifiedVehicle["workOrder"] = workOrders

// vehicleObjects.set(vehicleId, modifiedVehicle)
