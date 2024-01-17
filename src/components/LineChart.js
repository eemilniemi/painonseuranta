import React, { useRef } from 'react';
import  {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import 'chartjs-adapter-moment';


const LineChart  = ({chartData}) => {    

    const options = {
        scales: {
            x: {
              type:'time',
                time:{
                    parser: 'DD-MM-YYYY',
                    unit: 'day',
                    tooltipFormat: 'DD-MM-YYYY',
                    displayFormats: {
                        day: 'DD-MM-YYYY',
                      },
                },
              title: {
                display: true,
                text: 'Päivämäärä',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Paino',
              },
            },
          },
      };
      
    return(
        <div style = {{width: '99%'}}>
            <Line data={chartData} options={options}></Line>
        </div>
    );
};

export default LineChart