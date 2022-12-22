const vehicleObjects = [

  {
    id: "1",
    myfleet: "Golf",
    status: true,
  },

  {
    id: "2",
    myfleet: "911T",
    status: false,
  },
];


function closeModal() {
  console.log("calling closemodal");
  $("button#close-modal").click(function () {
    $(this).hide("#edit-vehicle-modal");
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

    $("p#vehicle-status").html(vehicleObject.status);

    for (const [key, value] of Object.entries(vehicleObject)) {
      $("ul#vehicle-property-list").append(`
      <li> <strong> ${key} : </strong> <span> ${value} </span> </li>
      `);
    }
    $("button#close-view-modal").click(function () {
      $("#view-vehicle-modal").hide();
    });
  });
}

function perRowEditPropertiesClickEvent(vehicleObject) {
  $(`button#vehicle-edit-${vehicleObject.id}`).click(function () {
    console.log(`opening vehicle edit `, vehicleObject);

    $("#edit-vehicle-modal").show();
    $("button#close-edit-modal").click(function () {
      $("#edit-vehicle-modal").hide();
    });
  });
}

function fillVehicleTable() {
  console.log("Calling FillVT modified");

  for (let index = 0; index < vehicleObjects.length; index++) {
    let vehicleObject = vehicleObjects[index];
    createRowObject(vehicleObject);
    linkCheckBox(vehicleObject);
    perRowViewPropertiesClickEvent(vehicleObject);
    perRowEditPropertiesClickEvent(vehicleObject);
    perRowSetCheckbox(vehicleObject);
  }
}

function linkCheckBox(vehicleObject) {
  $(`input#vehicle-status-${vehicleObject.id}`).prop(
    "checked",
    vehicleObject.status
  );
}

function createRowObject(vehicleObject) {
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
}

function init() {
  console.log("Calling Init");
  fillVehicleTable();
}


$(document).ready(() => {
  console.log("Website Ready");
  init();

  $("#add-btn").click(function () {
    console.log("Add button clicked");
    $("td.myfleet").append($("#exampleInputVehicle").val());
    $("#exampleModal").hide();
  });
});