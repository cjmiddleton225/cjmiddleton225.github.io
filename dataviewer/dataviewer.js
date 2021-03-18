let CSVData = new CSVReader();
let importSettings = {};
importSettings.previewLines=10;

function LoadDataApp() {
    let appText = document.getElementById("appText");
    appText.replaceChildren(); // clears the window
    let inputText = document.createElement("p");
    inputText.appendChild(document.createTextNode("Select local text file:"));
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
    let importSettingsLine = document.createElement("pre");
    //<input type="text" id="fname" name="fname">
    let skipLinesTextBox=document.createElement("input");
    skipLinesTextBox.type="number";
    skipLinesTextBox.defaultValue=CSVData.skipLines.toString();
    skipLinesTextBox.min=0;
    skipLinesTextBox.max=1000;
    importSettings.skipLinesTextBox=skipLinesTextBox;
    skipLinesTextBox.addEventListener("change", importSettingsUpdated);
    
    let delimiterTextBox=document.createElement("input");
    delimiterTextBox.type="text";
    delimiterTextBox.defaultValue=CSVData.delimiter;
    delimiterTextBox.size=5;
    importSettings.delimiterTextBox=delimiterTextBox;
    delimiterTextBox.addEventListener("change", importSettingsUpdated);
    
    let areHeadersCheckBox=document.createElement("input");
    areHeadersCheckBox.type="checkbox";
    areHeadersCheckBox.defaultChecked=true;
    importSettings.areHeadersCheckBox=areHeadersCheckBox;
    areHeadersCheckBox.addEventListener("change", importSettingsUpdated);
    //areHeadersCheckBox.onchange=importSettingsUpdated();
    
    importSettingsLine.append("Lines to skip: ");
    importSettingsLine.appendChild(skipLinesTextBox);
    importSettingsLine.append("  Delimiter: ");
    importSettingsLine.appendChild(delimiterTextBox);
    importSettingsLine.append("  Are headers? ");
    importSettingsLine.appendChild(areHeadersCheckBox);
    
    let previewBox = document.createElement("div");
    previewBox.classList.add("CSV-preview");
    previewBox.id="CSVRawText";
    previewBox.innerText="No data selected - Load file, or drag and drop!";
    //previewBox.innerHTML='<pre id="CSVRawText" >No data selected.</pre>';
    
    appText.appendChild(inputText);
    appText.appendChild(input);
    loadCSVDiv.appendChild(loadCSVButton);
    appText.appendChild(loadCSVDiv);
    appText.appendChild(importSettingsLine);
    appText.appendChild(previewBox);
    
    let CSVTable={};
    CSVTable.row=[];
    CSVTable.div = document.createElement("div");
    CSVTable.div.classList.add("data-table");
    CSVTable.h2 = document.createElement("h2");
    CSVTable.h2.innerText="Imported data: ";
    CSVTable.div.appendChild(CSVTable.h2);
    CSVTable.table = document.createElement("table");
    CSVTable.header = document.createElement("tr");
    CSVTable.header.innerHTML = "<th>Data 1</th> <th>Data 2</th> <th>Data 3</th>";
    CSVTable.row[0] = document.createElement("tr");
    CSVTable.row[0].innerHTML = "<td>-</td> <td>-</td> <td>-</td>";
    CSVTable.div.appendChild(CSVTable.table);
    CSVTable.table.appendChild(CSVTable.header);
    CSVTable.table.appendChild(CSVTable.row[0]);
    
    appText.appendChild(CSVTable.div);
    
    
}
  
  function myFunction2() {
    let a = document.getElementById("sideBarButton");
    document.getElementById("appText").innerHTML = "And cool!";
  }

  async function loadCSV_buttonClick(){
    let fileInput = document.getElementById("csv");
    await CSVData.ReadCSV(fileInput.files[0]);
    updateCSVPreview(importSettings.previewLines);
  }
  
  function importSettingsUpdated(){
    // get all settings
    CSVData.areHeaders=importSettings.areHeadersCheckBox.checked;
    CSVData.skipLines=parseInt(importSettings.skipLinesTextBox.value);
    CSVData.delimiter=importSettings.delimiterTextBox.value;
    updateCSVPreview(importSettings.previewLines);
  }
  
  function updateCSVPreview(lines){
    if (CSVData.fileLoaded===false){
      return;
    }
    const CSVprev = document.getElementById('CSVRawText');
    CSVprev.replaceChildren();
    lines > CSVData.dataAsLines.length ? CSVData.dataAsLines.length : lines;
    //CSVprev.textContent = CSVData.rawData;
    let list = document.createElement("ol");
    let curLine;
    for (curLine=0; curLine<lines; curLine++){
      let li = document.createElement("li");
      if (curLine<CSVData.skipLines){
        li.value='-';
        li.id="skipped";
        li.innerHTML=CSVData.dataAsLines[curLine];
      } else {
        if (CSVData.areHeaders && curLine==CSVData.skipLines){
        li.id="header";
        }
       li.value=curLine-CSVData.skipLines+1;
      let re = new RegExp(CSVData.delimiter, "g");
      let highlightedDelimiter = "<mark>"+importSettings.delimiterTextBox.value+"</mark>";
       li.innerHTML=CSVData.dataAsLines[curLine].replace(re,highlightedDelimiter);
      }
      list.appendChild(li);
    
    CSVprev.appendChild(list);
    }
  }
  
 // function updateCSVtable(line){
    
//  }