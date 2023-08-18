import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Admin_dash_check.css';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Admin_dash_check() {
  const [rawData, setRawData] = useState([]);
  const [uniqueTopics, setUniqueTopics] = useState([]);
  const [levels, setLevels] = useState([]);
  const [data, setData] = useState([]);
  const [dateTernory,setdateTernory] = useState(false)

  useEffect(() => {
    // Simulating API fetch
    // Replace this with your actual API call
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3007/api/Dashboard_check');
        const data = await response.json();
        const getData = data.val;
        console.log('getData=>>>', getData);
        setRawData(getData); // Set fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rawData.length > 0) {
      const topics = Array.from(new Set(rawData.map((item) => item.topic_name)));
      setUniqueTopics(topics);
      const lvls = Array.from(new Set(rawData.map((item) => item.level)));
      setLevels(lvls);
    }
  }, [rawData]);

  const levelColors = {
    BASIC: '#e32ee6',
    ADVANCE: '#40f6a8',
    INTERMEDIATE: '#9c27b0',
    OTHERS: '#FFC300'
    // Add more level colors as needed
  };

  const getChartData = () => {
    const seriesData = levels.map((level) => {
      const levelCounts = uniqueTopics.map((topic) => {
        const topicData = rawData.find((item) => item.topic_name === topic && item.level === level);
        return topicData ? topicData.user_count : 0;
      });

      return {
        name: level,
        data: levelCounts,
      };
    });

    const categories = uniqueTopics;

    return {
      series: seriesData,
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false // Hide the toolbar/menu button
          },
          events: {
            click: function (event, chartContext, config) {


              if (config.dataPointIndex !== undefined) {


                const clickedSkill = chartContext.w.globals.labels[config.dataPointIndex];
                console.log('clickedSkill:', clickedSkill);

                const clickedLabel = chartContext.w.globals.seriesNames[config.seriesIndex];
                console.log('clickedLabel:', clickedLabel);




                chartFilterData(clickedSkill, clickedLabel);
              }
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          type: 'categories',
          categories,
        },
        legend: {
          show: false // Hide the legend
        },
        fill: {
          opacity: 1,
          colors: Object.values(levelColors) // Set colors for levels
        },
        title: {
          // text: Object.keys(levelColors).map((level) => (
          //   <span style={{ color: levelColors[level], marginRight: '10px' }}>{level}</span>
          // )).join(''), // Display level names with colors
          align: 'center',
          style: {
            fontSize: '14px'
          },
          margin: 0
        },
      }
    };
  };



  const chartData = getChartData();

  const chartFilterData = (skill, level) => {
    console.log('skill, level====>>>', skill, level);
    const data = {
      skill, level
    }
    axios.post('http://localhost:3007/api/table_data', data)
      .then((response) => {
        console.log('response', response)
        const getData = response.data.data;
        console.log('getData', getData)
        setData(getData)
        setdateTernory(true)
      }).catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div className='main_container'>
      <div className='first_row_grid'>
        <div className='first_grid' >
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            // onClick={handleDataPointClick}
            height={350}
          // events={{
          //   dataPointSelection: handleDataPointClick
          // }}
          />
        <div>
    {
      dateTernory ?

      <div>
                <TableContainer component={Paper} sx={{ width: '60%', margin: 'auto' }}>
        <Table sx={{ maxHeight: '400px' }}>

          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Topic Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Level</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Completed Subtopics</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody sx={{ Height: '10px', overflow: 'auto' }}>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.topic_name}</TableCell>
                <TableCell align="center">{item.level}</TableCell>
                <TableCell align="center">{item.completed_subtopics}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>

        :

        ''
    }
 
    </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_dash_check;
