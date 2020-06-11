
let url = ''
getAllStationsAndDisplayThem()
getNearByStations()


function getMatchedClassNameFromHtmlTag(tag, className, handleData){
    if(tag.className){
      tagClassesArray = tag.className.split(" ")
      $.each(tagClassesArray, (i, classN)=>{
        if(classN == className){
          handleData(classN)
        }
      })
    }
}
function convertHtmlTagsIntoJsonObjects(tagsArray, handleData){
    let tagObjects =[]
    $.each(tagsArray, (i, tag)=>{
        tagObjects.push ({
        //"id_tag":tag.getAttribute('data-id'),
        "name_tag":tag.innerText
      })
    })
     handleData(tagObjects);
}
function ajaxRequest(method, url, handelData){
  $.ajax({
    type:method,


    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa("cts token here"))
    },
    url:url,
    success: handelData

    
  })
}
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
function getNearByStations(){
    navigator.geolocation.getCurrentPosition(function(data){
        let coords = data.coords
        let latitude = coords.latitude
        let longitude = coords.longitude
        url = "https://api.cts-strasbourg.eu/v1/siri/2.0/stoppoints-discovery?longitude="+longitude+"&latitude="+latitude+"&distance=1000"
        ajaxRequest("get", url, function(data){
          let stations  = data['StopPointsDelivery']['AnnotatedStopPointRef']
          stations = filterDuplicatedStations(stations)

          stations.sort(function(a, b){
            let distanceA = distance(latitude, longitude, a.Location.Latitude, a.Location.Longitude)
            let distanceB = distance(latitude, longitude, b.Location.Latitude, b.Location.Longitude)
            if(distanceA < distanceB){
              return -1

            }else{
              return 1
            }
          })
          for(element in stations ){
            station = stations[element]
            let distanceA = distance(latitude, longitude, station.Location.Latitude, station.Location.Longitude)
            $("#h1").append("<li class='list-group-item stationNearBy' data-codeSMS="+ station.Extension.LogicalStopCode +"  data-toggle='modal' data-target='#exampleModal'>"+ station.StopName + "&nbsp <span class='badge badge-secondary'> "+ Math.round( distanceA * 1000 )+"M </span></li>")

          }
            //$(".stationNearBy").bind("click", showOneStationInformation)
            $(".stationNearBy").bind("click", updateSelectedStationTimtTableEvery)

        })
    })  

}
function updateSelectedStationTimtTableEvery(){
              codeSMS = $(this).data("codesms")
              console.log(codeSMS)
              showOneStationInformation(codeSMS)
              let stationReloadInterval = setInterval(() => {
                $("#text_reload_time_table").css("display", "none")
                $("#auto_load_indication_anime").css("display", "block")
                showOneStationInformation(codeSMS )
              }, 10000);
              $(".closeModal").on("click", function(){
                clearInterval(stationReloadInterval);
                $("#modalBody").empty()
                $("#modalBody").append(`<p style='margin:0 auto;width:5px'><img style="width:50px;" src='loading_gif.gif' /></p>`)
              })
}
function filterDuplicatedStations(stations){
  let stationsArrayWithoutDuplicat = []
      $.each(stations, function(key, station){
        stationsArrayWithoutDuplicat[station.Extension.LogicalStopCode] = station
      })
      console.log("filtered stations",stationsArrayWithoutDuplicat)
      return stationsArrayWithoutDuplicat;
}
function searchStation(stations){
      let keyword = $("#station_search").val()
      let filteredStations = []
        filteredStations = stations.filter((v , i)=>{
        if(v.StopName.match(new RegExp(keyword, "i")) != null){
          return 1
        }else{
          return 0
        }
        
      })
        return filteredStations
}
function displayStations(stations){
  $("#h").html('')
  for(element in stations ){
      station = stations[element]
      $("#h").append("<li class='list-group-item station' data-codeSMS="+ station.Extension.LogicalStopCode +" data-toggle='modal' data-target='#exampleModal'>"+station.StopName +"</li>")
    }
    $(".station").bind("click", updateSelectedStationTimtTableEvery)
}
function getAllStationsAndDisplayThem(){
    url = "https://api.cts-strasbourg.eu/v1/siri/2.0/stoppoints-discovery"

    ajaxRequest("get", url, function(data){
    let stations  = data['StopPointsDelivery']['AnnotatedStopPointRef']
    //console.log("stations",  stations)
    stations.map((val, index) => console.log("stationVal", val))

    stations = filterDuplicatedStations(stations)
      $("#station_search").on("keyup", function(){
        let filteredStations = searchStation(stations)
        displayStations(filteredStations)
      })
      displayStations(stations)
    })

}
function getLinesData(handleData){
    let LinesRefrenceTextAndColor = []
    ajaxRequest("get", "https://api.cts-strasbourg.eu/v1/siri/2.0/lines-discovery", function(data){
        $.each(data.LinesDelivery.AnnotatedLineRef, (i, value)=>{
            LinesRefrenceTextAndColor[value.LineRef] = {
                    "RouteColor":value.Extension.RouteColor,
                    "RouteTextColor":value.Extension.RouteTextColor
                }
        })
        handleData(LinesRefrenceTextAndColor)
    })
}
 function showOneStationInformation(codeSMS ){
       url = "https://api.cts-strasbourg.eu/v1/siri/2.0/stop-monitoring?MonitoringRef="+codeSMS+"&MaximumStopVisits=0"
       $("#modalBody").data( "LogicalStopCode", codeSMS );
       $("#bt_reload_timetable").data( "codesms", codeSMS );
       let vehiculeType = ''

       getLinesData((LinesRefrenceTextAndColor)=>{
         
        ajaxRequest("get", url, function(data){
          $("#auto_load_indication_anime").css("display", "none")
          $("#text_reload_time_table").css("display", "block")
          $("#modalBody").empty()
           let counter = 0;
           let bg = ''
           $.each(data.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit, function(i, value){
               if(counter % 2 == 0 )
                bg = '#0099dc'
                else
                bg = '#01b0db'
               if(value.MonitoredVehicleJourney.VehicleMode == 'tram')
               vehiculeType = "fas fa-tram"
               else 
               vehiculeType = "fas fa-bus"
               let routeTextColor = LinesRefrenceTextAndColor[value.MonitoredVehicleJourney.LineRef].RouteTextColor
               let routeColor = LinesRefrenceTextAndColor[value.MonitoredVehicleJourney.LineRef].RouteColor
               var date2 = new Date(data.ServiceDelivery.ResponseTimestamp);
               var date1 = new Date(value.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime);
               var timeDiff = Math.abs(date2.getTime() - date1.getTime());
               var diffDays = Math.trunc((timeDiff / 1000) /60);
               console.log(bg)
               $("#modalBody").append(`
              <div class='row p-0 m-0' style='background-color:${bg}; color:#fff;'>
                <div class='col-10 m-0 p-1 row' style="border:1px solid #028bc5; display:flex ">
                <p class='p-0' style='text-shadow: 2px 2px 2px #000; text-align:center; width:35px; height:25px;background-color:gray ;border:#fff solid .5px;'> ${value.MonitoredVehicleJourney.VehicleMode}</p>
                  <p class='p-0' style='text-shadow: 2px 2px 2px #000; margin-right:3px; text-align:center; width:25px; height:25px;background-color:#${routeColor};border:#fff solid .5px;'> ${value.MonitoredVehicleJourney.LineRef}</p>
                  <p class='' style="text-shadow: 2px 2px 2px #000; ">${value.MonitoredVehicleJourney.DestinationName}</p>
                </div>
              <div class='col-2 p-0 m-0 ' style="border:1px solid #028bc5; text-shadow: 2px 2px 2px #000; text-align:center;">${diffDays}mn</div>
              </div>`)
           counter++
           })
        })
       })

       

}
$(".closeModal").on("click", function(){
  clearInterval();
  
})
$("#bt_reload_timetable").on("click", function(){
  codeSMS = $(this).data("codesms")
  $("#text_reload_time_table").css("display", "none")
  $("#auto_load_indication_anime").css("display", "block")
  showOneStationInformation(codeSMS )
})
