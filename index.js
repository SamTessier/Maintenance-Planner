var vehicleObjects = [
  // {
  //   id: "1",
  //   myfleet: "Golf",
  //   status: true,
  // },
  // {
  //   id: "2",
  //   myfleet: "911T",
  //   status: false,
  // },
];

function editModalEvents() {
  $("button#close-edit-modal").click(function () {
    $("#edit-vehicle-modal").hide();
  });
}

function viewModalEvents() {
  $("button#close-view-modal").click(function () {
    $("#view-vehicle-modal").hide();
  });
}

function perRowSetCheckbox(vehicleObject) {
  $(`input#vehicle-status-${vehicleObject.id}`).prop(
    "checked",
    vehicleObject.status
  );
}

function perRowViewPropertiesClickEvent(vehicleObject) {
  $(`button#vehicle-view-${vehicleObject.id}`).click(function () {
    console.log(`opening vehicle row `, vehicleObject);

    $("#view-vehicle-modal").show();

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

    for (const [key, value] of Object.entries(vehicleObject)) {
      $("ul#edit-modal-vehicle-property-list").append(`
      <li> <strong> ${key} : </strong> <span> 
      <input id="edit-value-${key}"
      type="text"
      placeholder="Enter ${key}"
      class="align-self-center"
      value=${value}
    /> </span> </li>
      `);
    }
  });
}

// function fillVehicleTable() {
//   console.log("Calling FillVT modified");

//   for (let index = 0; index < vehicleObjects.length; index++) {
//     let vehicleObject = vehicleObjects[index];

//     linkCheckBox(vehicleObject);
//     perRowViewPropertiesClickEvent(vehicleObject);
//     perRowEditPropertiesClickEvent(vehicleObject);
//     perRowSetCheckbox(vehicleObject);
//   }
// }

function linkCheckBox(vehicleObject) {
  $(`input#vehicle-status-${vehicleObject.id}`).prop(
    "checked",
    vehicleObject.status
  );
}

function createRowObjectEvent() {
  $("#new-vehicle-input").click(function () {
    console.log("Add button clicked");
    let vehicleObject = {
      id: "",
      myfleet: "",
      status: "",
    };

    vehicleObject.id = prompt("Please enter ID");
    vehicleObject.myfleet = prompt("Please enter Vehicle Name");
    let strStatus = prompt("Please enter Status (y/n)"); //returns a string.
    vehicleObject.status = strStatus.toLowerCase() == "y" ? true : false;

    vehicleObjects.push(vehicleObject);

    let rowHtmlStr = `
      <tr id="vehicle-row-${vehicleObject.id}">
        <td > ${vehicleObject.myfleet} </td>
        <td >
            <input type="checkbox" id="vehicle-status-${vehicleObject.id}" >
        </td> 
        <td> <button id="vehicle-view-${vehicleObject.id}">View </button>
        <td> <button id="vehicle-edit-${vehicleObject.id}">Edit </button>
      </tr>`;
    $("#vehicle-table-body").append(rowHtmlStr);

    linkCheckBox(vehicleObject);
    perRowViewPropertiesClickEvent(vehicleObject);
    perRowEditPropertiesClickEvent(vehicleObject);
    perRowSetCheckbox(vehicleObject);

    console.log("Array list objects", vehicleObjects)
  });
}

function init() {
  console.log("Initializing Events / Asynchrnous operations");
  editModalEvents();
  viewModalEvents();
  createRowObjectEvent();

  // fillVehicleTable();
}

$(document).ready(() => {
  console.log("Website Ready");
  init();
});


// save into array
// once you edit, find obj based on id, delete it, insert in place

function findNReplace(objIdToReplace, newId, newName, newStatus){
  vehicleObjects.forEach(function(objAtIndex, index) {
    if (objAtIndex["id"] == objIdToReplace){
      vehicleObjects[index] = {
        id: newId,
        myfleet: newName,
        status: newStatus,

      }
    }
  });

  deleteHTMLTableRows();
  renderTableRows();
}