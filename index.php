<!DOCTYPE HTML>
<html>
  <head>
    <?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    ?> 
    <script src="jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="bootstrap.min.css" >
    <link rel="stylesheet" href="fontawesome.css">
    <script src="popper.min.js" ></script>
    <script src="bootstrap.min.js"></script>
    <link rel="stylesheet" href="style.css">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Using public transportation (CTS) in strasbourg is so easy now with our 
service you can get on right now, all the timing of strasbourg public transportation is click away from you.">
  <meta name="keywords" content="CTS,STRASBOURG,TRAM,BUS,TRANSPORTATION">    
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
    <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
   integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
   crossorigin=""></script>
  <title>Strasbourg cts yaz-fr.com</title>
  </head>
  <body class="border">
         <h1>Strasbourg cts </h1>
    <header>
    </nav>
    <!---- tabs -->

    <ul  class="nav nav-pills mb-3 navbar-fixed-top" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Nearby Station</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">All Stations</a>
      </li>

     

    </ul>
    <!---- tabs -->
    </nav>
    </header>

    <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div class="card" style="width: 100%;">
            <div id="nearByStations" class="card-header" >
              <h3>Nearby stations</h3>
            </div>
            <ul id="h1" class="list-group list-group-flush" style="height:300px;">

            </ul>
            </div>
            </div>
            <!---- Nearby stations -->

            <!---- All stations -->
              <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <div class="card" style="width: 100%;">
              <div id="allStations" class="card-header">
                <h3>All stations</h3>
              </div>
              <input id="station_search" class="form-control form-control-lg" type="text" placeholder="Search station">
              <ul id="h" class="list-group list-group-flush" style="height:500px;">
              </ul>
            </div>
              </div>
            </div>
            <!---- All stations -->
    </div>
  </body>
</html>




<script>

</script>


<!-- Modal -->
<div class="modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div style="width:100%" class="modal-dialog p-0 m-0 " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close closeModal" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <button style="border-radius: 0 !important;" id="bt_reload_timetable" type="button" class="btn btn-danger">        
        <span style="display:none" id="auto_load_indication_anime">
          <img style="width:20px;padding-right:5px;" src="ajaxloader.gif" />
          <i>Updating time table</i>
        </span>
        <span id='text_reload_time_table'>Reload time Table</span>
        </button>
      <div id="modalBody" class="modal-body p-0"  >
        <p style='margin:0 auto;width:5px'><img style="width:50px;" src='loading_gif.gif' /></p>
      </div>
      <div style="background-color:#0099DC" class="modal-footer">
        <button  type="button" class="btn btn-secondary closeModal" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!----  modal -->

<script src="myJsFunction.js"></script>

<script>

</script>