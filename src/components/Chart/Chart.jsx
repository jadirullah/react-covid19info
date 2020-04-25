import React, {useState, useEffect} from 'react';

import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';


const Chart = ({data : {confirmed, recovered, deaths}, country }) =>{

    const [dailyData, setDailyData] = useState([]);


    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        };

        fetchMyAPI();
    }, []);


    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Ter-infeksi', 'Sembuh', 'Meninggal'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
    );
 

    const LineChart = (
        dailyData.length ? (
            <Line 
                data={{ 
                    labels : dailyData.map(({date}) => date),
                    datasets : [{
                        data:dailyData.map(({ confirmed }) => confirmed),
                        label: 'Ter-infkesi',
                        borderColor :'#3333ff',
                        fill: true,
                    },{
                        data:dailyData.map(({ deaths }) => deaths),
                        label: 'Meninggal',
                        borderColor :'red',
                        backgroundColor :'rgba(255,0,0,0.5)',
                        fill: true, 
                    },{
                        data:dailyData.map(({ recovered }) => recovered),
                        label: 'Sembuh',
                        borderColor :'green',
                        backgroundColor :'rgba(0,255,0,0.5)',
                        fill: true, 
                    }],
                }}
            /> ) : null
    
    );


    return (
        <div className={styles.container}>
            
             {country ? barChart : LineChart}
        </div>
    )
}


export default Chart;