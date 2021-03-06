function readCSV(filename) {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById('CSVRawText').textContent = reader.result;
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsText(filename);
    };

