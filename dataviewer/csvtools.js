class CSVReader{
  filename;
  rawData;
  fileLoaded = false;
  
  LoadData(filename){
    this.filename=filename;
    this.ReadCSV(this.filename);
  }
  
  async ReadCSV(filename) {
    this.filename=filename;
        const sleep = function (ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        let reader = new FileReader();
        let that=this;
        reader.onload = function () {
            that.rawData = reader.result;
            that.fileLoaded=true;
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsText(filename);
        while (this.fileLoaded === false) {
          await sleep(100);
        }
    }
}
