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
    previewBox.classList.add("CSV-preview");
    previewBox.id="CSVRawText";
    previewBox.innerText="     No data selected";
    //previewBox.innerHTML='<pre id="CSVRawText" >No data selected.</pre>';
    
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
    const CSVprev = document.getElementById('CSVRawText');
    CSVprev.replaceChildren();
    lines > CSVData.dataAsLines.length ? CSVData.dataAsLines.length : lines;
    //CSVprev.textContent = CSVData.rawData;
    let list = document.createElement("ol");
    let curLine;
    let skipLines=5;
    for (curLine=0; curLine<lines; curLine++){
      let li = document.createElement("li");
      if (curLine<skipLines){
        li.value='-';
        li.id="skipped";
      } else {
       li.value=curLine-skipLines+1;
      }

      li.innerText=CSVData.dataAsLines[curLine];
      list.appendChild(li);
    }
    CSVprev.appendChild(list);
  }