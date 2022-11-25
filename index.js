let dummyVehicleList = [
  {
    id: "1",
    myfleet: "Vehicle #1",
    status: true,
  },
  {
    id: "2",
    myfleet: "Vehicle #2",
    status: false,
  },
];

$(document).ready(function () {
  console.log("Website Ready");
  init();
});

function init() {
  console.log("Calling Init");
  fillVehicleTable();
}

function fillVehicleTable() {
  console.log("Calling FillVT");

  dummyVehicleList.forEach(vehicleObject => {
    // Template literals
    $("#vehicle-table-body").append(`
    <tr id="vehicle-row-${vehicleObject.id}">
        <td scope="row"> ${vehicleObject.myfleet} </td>
        <td> 
            <input type="checkbox" class="" id="vehicle-status-${vehicleObject.id}">
        </td>
    </tr`);

    $(`tr#vehicle-row-${vehicleObject.id}`).click(function() {
        console.log(`opening vehicle row -${vehicleObject.myfleet}`);
       
        $("#view-vehicle").modal("show");

        $("p#vehicle-name").html(vehicleObject.myfleet);
        $("p#vehicle-status").html(vehicleObject.status);
        
    })
    
    $(`input#vehicle-status-${vehicleObject.id}`).prop("checked", vehicleObject.status);
  

});

  
}
