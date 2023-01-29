var vehicleObjects = new Map();
var selectedVehicleObjectId = null;
// LIST or ARRAY
// DELETE EXAMPLE
//let arr = [1, 2, 3, 4]
//arr.remove(1)
//let arr = [{fleet: "dssd", id: "1"}, {fleet: "1112", id: "2"}]
//arr.remove(vechicleObject)
// EDIT EXAMPLE
// for(let i; i < arr.length: i++) {
//   if(a == vehicleObject) {
//      a["fleet"] = newName
//      arr[i] = a
//   }
// }

// MAP or JSON or OBJECT or DICTIONARY
// var vehicleObjects = {
//    name1 : {fleet: "dssd", id: "1"}
//    name2 : {fleet: "dssd", id: "2"}
// }
// EDIT
// vehicleObject["fleet"] = newName
// vehicleObjects["name1"] = vehicleObject
// DELETE
// delete vehicleObjects["name1"]

function editModalEvents() {
  $("button#close-edit-modal").click(function () {
    $("#edit-vehicle-modal").hide();
  });
  $("#edit-properties-btn").click(function () {
    if (selectedVehicleObjectId != null) {
      let name = $(`input#edit-value-name`).val();
      let vStatus = ($(`input#edit-value-vStatus`).val().toLowerCase() === 'true');
      let newVehicleObject = {};
      newVehicleObject.name = name;
      newVehicleObject.vStatus = vStatus;
      vehicleObjects[selectedVehicleObjectId] = newVehicleObject;
      console.log("New object appended: ", newVehicleObject, vehicleObjects);
      $(`tr#vehicle-row-${selectedVehicleObjectId}`).remove();
      //empty table $(`tbody#vehicle-table-body`).html("");
      //for loop on the vehicleObjects map recreate table again

      let rowHtmlStr = `
          <tr id="vehicle-row-${selectedVehicleObjectId}">
            <td > ${newVehicleObject.name} </td>
            <td >
                <input type="checkbox" id="vehicle-status-${newVehicleObject.name}" >
            </td> 
            <td> <button id="vehicle-view-${newVehicleObject.name}">View </button>
            <td> <button id="vehicle-edit-${newVehicleObject.name}">Edit </button>
            <td> <button id="vehicle-delete-${newVehicleObject.name}">Delete </button>
          </tr>`;
      $("#vehicle-table-body").append(rowHtmlStr);
      linkCheckBox(newVehicleObject);
      $("div#edit-vehicle-modal").hide();
      $(`input#edit-value-name`).val("");
      $(`input#edit-value-vStatus`).prop("checked", false);
      linkCheckBox(newVehicleObject);
      perRowViewPropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
      perRowEditPropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);
      perRowDeletePropertiesClickEvent(selectedVehicleObjectId, newVehicleObject);

    } else {
      alert("I couldn't find the object");
    }
  });
}

function addModalEvents() {
  $("button#close-add-modal").click(function () {
    $("#add-vehicle-modal").hide();
  });

  $("button#new-vehicle-input").click(function () {
    $("#add-vehicle-modal").show();
  });

  $("button#add-properties-btn").click(function () {
    createRowObjectEvent();
    $("div#add-vehicle-modal").hide();
  });
}

function viewModalEvents() {
  $("button#close-view-modal").click(function () {
    $("div#view-vehicle-modal").hide();
  });
}

function deleteModalEvents() {
  $(`button#close-delete-modal`).click(function () {
    $("div#delete-vehicle-modal").hide();
  });
  $(`button#delete-vehicle-btn`).click(function () {
    console.log("Trying to delete object with ID: ", selectedVehicleObjectId);
    if (selectedVehicleObjectId != null) {
      // DELETE LOGIC
      vehicleObjects.delete(selectedVehicleObjectId);
      $(`tr#vehicle-row-${selectedVehicleObjectId}`).remove();
      $("#delete-vehicle-modal").hide();
    } else {
      alert("Cannot find object to delete.");
    }
  });
}

function perRowViewPropertiesClickEvent(vehicleId, vehicleObject) {
  $(`button#vehicle-view-${vehicleObject.name}`).click(function () {
    console.log(`opening vehicle row `, vehicleObject);

    $("#view-vehicle-modal").show();
    $("ul#view-modal-vehicle-property-list").empty();
    for (const [key, value] of Object.entries(vehicleObject)) {
      $("ul#view-modal-vehicle-property-list").append(`
      <li> <strong> ${key} : </strong> <span> 
      ${value}
      </span> </li>
      `);
    }
  });
}

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
      //converts the object into a map to do a forloop
      $("ul#edit-modal-vehicle-property-list").append(`
      <li> <strong> ${key} : </strong> <span> 
      <input id="edit-value-${key}"
      type="text"
      placeholder="Enter ${key}"
      class="align-self-center"
      value=${value}
    /> </span> </li>
      `);
    });
    selectedVehicleObjectId = vehicleId;
  });
}

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

function perRowDeletePropertiesClickEvent(vehicleId, vehicleObject) {
  $(`button#vehicle-delete-${vehicleObject.name}`).click(function () {
    console.log(`Showing delete vehicle modal `, vehicleObject);
    $("span#delete-vehicle-name").html(vehicleObject["name"]);
    selectedVehicleObjectId = vehicleId;
    $("#delete-vehicle-modal").show();
  });
}

function linkCheckBox(vehicleObject) {
  $(`input#vehicle-status-${vehicleObject.name}`).prop(
    "checked",
    vehicleObject.vStatus
  );
}

function createRowObjectEvent() {
  let vehicleObject = {};
  let name = $("input#add-vehicle-name").val();
  let vStatus = $("input#add-vehicle-status").is(":checked");
  let vehicleId = name.toLowerCase();
  vehicleObject.name = name;
  vehicleObject.vStatus = vStatus;
  console.log(vehicleObject);

  let rowHtmlStr = `
      <tr id="vehicle-row-${vehicleId}">
        <td > ${vehicleObject.name} </td>
        <td >
            <input type="checkbox" id="vehicle-status-${vehicleObject.name}" >
        </td> 
        <td> <button id="vehicle-view-${vehicleObject.name}">View </button>
        <td> <button id="vehicle-edit-${vehicleObject.name}">Edit </button>
        <td> <button id="vehicle-delete-${vehicleObject.name}">Delete </button>
      </tr>`;
  $("#vehicle-table-body").append(rowHtmlStr);
  vehicleObjects.set(vehicleId, { name, vStatus });
  console.log(vehicleObjects);
  linkCheckBox(vehicleObject);
  perRowViewPropertiesClickEvent(vehicleId, vehicleObject);
  perRowEditPropertiesClickEvent(vehicleId, vehicleObject);
  perRowDeletePropertiesClickEvent(vehicleId, vehicleObject);
  console.log("Map of vehicle objects", vehicleObjects);
}

function init() {
  console.log("Initializing Events / Asynchrnous operations");
  addModalEvents();
  editModalEvents();
  deleteModalEvents();
  viewModalEvents();
}

$(document).ready(() => {
  console.log("Website Ready");
  init();
});
