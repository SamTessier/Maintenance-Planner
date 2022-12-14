// {
//   id: "1",
//   myfleet: "Vehicle #1",
//   status: true,
// },



const vehicleList = [


  {
    ""
  }

];

// function perRowClickEvent(vehicleObject) {
//   $("#vehicle-row").click(() => {
//     console.log(`opening vehicle row -${vehicleObject.myfleet}`);

//     $("#view-vehicle").modal("show");
//     $("p#vehicle-name").html(vehicleObject.myfleet);
//     $("p#vehicle-status").html(vehicleObject.status);
//   });
// }


// function createRowObject(vehicleObject) {
//   let myTable = `
//   <tr id="vehicle-row-${vehicleObject.id}">
//         <td scope="row"> ${vehicleObject.myfleet} </td>
//         <td>
//             <input type="checkbox" id="vehicle-status-${vehicleObject.status}">
//         </td> </tr>`;
// }

$("#add-btn").click(function () {
  console.log("Adding Vehicle");
  $("td.my-fleet").append($("#exampleInputVehicle").val());
  $("#exampleModal").modal("hide");
});






// // HW
// // Inside the modal, create an edit button, setting a click event
// // When you click on the edit button it will close the current popup (.modal("hide");) and open another one (.modal("show");) with 2 text inputs (vehicle name, checkbox)
// // Fill the values of the inputs with the vehicleObject properties (.val("value"))

// function perRowSetCheckbox(vehicleObject) {
//   $(`input#vehicle-status-${vehicleObject.id}`).prop(
//     "checked",
//     vehicleObject.status
//   );
// }

function fillVehicleTable() {
  console.log("Calling FillVT modified");

  for (let i = 0; i < myTable.length; i++) {
    let vehicleObject = myTable[i];
    createRowObject(vehicleObject);
    // perRowClickEvent(vehicleObject);
    // perRowSetCheckbox(vehicleObject);
  }
}



function init() {
  console.log("Calling Init");
  // fillVehicleTable();
}

$(document).ready(() => {
  console.log("Website Ready");
  init();
});
