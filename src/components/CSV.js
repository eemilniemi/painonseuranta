import react from 'react';
import {CSVLink} from 'react-csv';
import * as Papa from 'papaparse';

const CSVImport = (props) => {
    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const importedData = results.data;
            localStorage.setItem('weightData', JSON.stringify(importedData));
            props.setWeightData({
                labels: importedData.map((data) => data.date),
                datasets: [{
                  label:"Paino",
                  data: importedData.map((data)=> data.weight),
                }]
              })
            }
            
            
        });
      };
      return (
        <div>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
            style={{ display: "block", margin: "10px auto" }}
          />
        </div>
      );
  };

const ExportCSVButton = () => {
  
    const filename = 'weightdata'
  
    const dataString = localStorage.getItem('weightData')
    const data = dataString ? JSON.parse(dataString) : [];
    
    return(
      <button>
        <CSVLink data={data} filename={filename} className="csv-link">
        Export to csv
        </CSVLink>
      </button>
  
    )
  }

  export  {ExportCSVButton, CSVImport};