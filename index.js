let vehiceMap = new Map();

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
}

function perRowViewPropertiesClickEvent(vehicleObject) {
  $(`button#vehicle-view-${vehicleObject.id}`).click(function () {
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

function perRowEditPropertiesClickEvent(vehicleObject) {
  $(`button#vehicle-edit-${vehicleObject.id}`).click(function () {
    console.log(`opening vehicle edit `, vehicleObject);

    $("#edit-vehicle-modal").show();
    $("ul#edit-modal-vehicle-property-list").empty();
    vehicleObject.forEach((value, key) => {
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
    editVehiclePropertiesEvent(vehicleObject);
  });
}

function editVehiclePropertiesEvent(vehicleObject) {
  $("#edit-properties-btn").click(function () {
    let newVehicleObject = new Map();
    vehicleObject.forEach((value, key) => {
      let newValue = $(`#edit-value-${key}`).val();
      newVehicleObject.set(key, newValue);
    });
    updateVehicleRow(newVehicleObject);
    $("#edit-vehicle-modal").hide();
  });
}


function updateVehicleRow(vehicleObject) {
  for (const [key, value] of Object.entries(vehicleObject)) {
    let newValue = $(`#edit-value-${key}`).val();
    vehicleObject[key] = newValue;
  }

  let row = $(`#vehicle-row-${vehicleObject.id}`);
  row.empty();
  row.append(`
      <td > ${vehicleObject.myfleet} </td>
      <td >
          <input type="checkbox" id="vehicle-status-${vehicleObject.id}" >
      </td> 
      <td> <button id="vehicle-view-${vehicleObject.id}">View</button> </td>
      <td> <button id="vehicle-edit-${vehicleObject.id}">Edit</button> </td>
      <td> <button id="vehicle-delete-${vehicleObject.id}">Delete</button> </td>
  `);
  linkCheckBox(vehicleObject);
  perRowViewPropertiesClickEvent(vehicleObject);
  perRowEditPropertiesClickEvent(vehicleObject);
  perRowDeletePropertiesClickEvent(vehicleObject);
  // update the map
  vehicleObjects.set(vehicleObject.id, vehicleObject);
}



function perRowDeletePropertiesClickEvent(vehicleObject) {
  $(`button#vehicle-delete-${vehicleObject.id}`).click(function () {
    console.log(`deleting vehicle `, vehicleObject);
    $("span#delete-vehicle-name").html(vehicleObject["myfleet"]);
    $("#delete-vehicle-modal").show();
    deleteVehicleObjectEvent(vehicleObject);
  });
}

function deleteVehicleObjectEvent(vehicleObject) {
  $(`#delete-vehicle-btn`).click(function () {
    vehicleObjects = vehicleObjects.map((obj) => {
      if (obj !== vehicleObject) {
        return obj;
      }
    });
    $(`#vehicle-row-${vehicleObject.id}`).remove();
    $("#delete-vehicle-modal").hide();
    console.log("Vehicle Deleted");
  });
}



function linkCheckBox(vehicleObject) {
  $(`input#vehicle-status-${vehicleObject.id}`).prop(
    "checked",
    vehicleObject.vStatus
  );
}

function createRowObjectEvent() {
  let vehicleObject = {};
  let id = $("input#add-vehicle-id").val();
  let myfleet = $("input#add-vehicle-name").val();
  let vStatus = $("input#add-vehicle-status").is(":checked");
  vehicleObject.id = id;
  vehicleObject.myfleet = myfleet;
  vehicleObject.vStatus = vStatus;
  console.log(vehicleObject);

  let rowHtmlStr = `
      <tr id="vehicle-row-${vehicleObject.id}">
        <td > ${vehicleObject.myfleet} </td>
        <td >
            <input type="checkbox" id="vehicle-status-${vehicleObject.id}" >
        </td> 
        <td> <button id="vehicle-view-${vehicleObject.id}">View </button>
        <td> <button id="vehicle-edit-${vehicleObject.id}">Edit </button>
        <td> <button id="vehicle-delete-${vehicleObject.id}">Delete </button>
      </tr>`;
  $("#vehicle-table-body").append(rowHtmlStr);
  vehicleMap.set(id, vehicleObject);
  linkCheckBox(vehicleObject);
  perRowViewPropertiesClickEvent(vehicleObject);
  perRowEditPropertiesClickEvent(vehicleObject);
  perRowDeletePropertiesClickEvent(vehicleObject);
  console.log("Map of vehicle objects", vehicleMap);
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

