function myFunction() {
    document.getElementById("appText").innerHTML = `<p>Select local CSV File:</p>
    <input id="csv" type="file" accept=".csv">
    <div>
    <button onClick="loadCSV_buttonCLick()">Submit</button>
    </div>
    <div class="code">
    <pre id="CSVRawText" >No data selected.</pre>
      </div>`;
    
  }
  function myFunction2() {
    let a = document.getElementById("sideBarButton");
    document.getElementById("appText").innerHTML = "And cool!";
  }

  function loadCSV_buttonCLick(){
    let fileInput = document.getElementById("csv");
    fileInput.addEventListener('change', readCSV(fileInput.files[0]));
  }