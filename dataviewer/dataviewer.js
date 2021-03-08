let CSVData = new CSVReader();

function LoadDataApp() {
    let appText = document.getElementById("appText");
    appText.replaceChildren(); // clears the window
    let inputText = document.createElement("p");
    inputText.appendChild(document.createTextNode("Select local CSV file:"));
    let input=document.createElement("input");
    input.id="csv";
    input.type="file";
    input.accept=".csv";
    let loadCSVDiv = document.createElement("div");
    let loadCSVButton = document.createElement("button");
    loadCSVButton.onclick=function () {
                loadCSV_buttonClick();
            };
    loadCSVButton.innerText="Submit";
    
    let previewBox = document.createElement("div");
    previewBox.classList.add("code");
    previewBox.innerHTML='<pre id="CSVRawText" >No data selected.</pre>';
    
    appText.appendChild(inputText);
    appText.appendChild(input);
    loadCSVDiv.appendChild(loadCSVButton);
    appText.appendChild(loadCSVDiv);
    appText.appendChild(previewBox);
    
  }
  function myFunction2() {
    let a = document.getElementById("sideBarButton");
    document.getElementById("appText").innerHTML = "And cool!";
  }

  async function loadCSV_buttonClick(){
    let fileInput = document.getElementById("csv");
    await CSVData.ReadCSV(fileInput.files[0]);
    updateCSVPreview(10);
  }
  
  function updateCSVPreview(lines){
    document.getElementById('CSVRawText').textContent = CSVData.rawData;
  }
  