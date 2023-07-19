import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import './Admin_Dash.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';




function Admin_Dash() {
 
  const checkFunction = (event) => {
    console.log('EVENT', event)
  }
  const [data, setData] = useState(['HTML', '  CSS', 'JAVA SCRIPT', 'REACT JS', 'NODE JS', 'SQL', 'WEB CONCEPTS']);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'BASIC',
        data: [19, 17, 15, 15, 21, 14, 15],
      },
      {
        name: 'INTERMEDIATE',
        data: [9, 17, 15, 15, 21, 14, 15],
      },
      {
        name: 'ADVANCE',
        data: [13, 17, 15, 15, 21, 14, 15],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false, // Set show property to false to hide the toolbar/menu button
        },
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',

        events: {
          click: function (event, chartContext, config) {


            const clickedCategory = chartData.options.xaxis.categories[config.dataPointIndex];

            console.log('Clicked on category:', clickedCategory);


            const clickedSeries = chartData.series[config.seriesIndex]?.name;

            console.log('Series:', clickedSeries);
            if (config.dataPointIndex !== undefined) {
              const clickedCategory = chartData.options.xaxis.categories[config.dataPointIndex];

              console.log('Clicked on category:', clickedCategory);

              const clickedLabel = chartContext.w.globals.labels;
              console.log('Clicked on x-axis label:', clickedLabel);
              console.log('config.dataPointIndex ', config);
              console.log('chartContext.w.globals.labels', chartContext.w.globals.labels);
            }
          }
        }

      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: ['HTML', 'CSS', 'JAVA SCRIPT', 'REACT JS', 'NODE JS', 'SQL', 'WEB CONCEPTS'],
        labels: {
          style: {
            fontWeight: '700',
            fontSize: '14px'

          }
        },
        options: {
          plugins: {
            legend: {
              events: {
                custom: function (event, { ctx, dataPointIndex, seriesIndex }) {
                  const clickedCategory = ctx.w.config.xaxis.categories[dataPointIndex];
                  console.log('Clicked category---------:', clickedCategory);
                },
              },
            }
          }
        }

      },


      yaxis: {
        chart: {
         toolbar:{
           tools:{
            download: String,
            selection: true,
           }
         },
        },
        show: false,
        labels: {
          style: {

            fontWeight: '700',
            fontSize: '14px'
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        labels: {
          style: {
            fontWeight: '700',
            fontSize: '14px'
          },
        },
        containerMargin: {
          top: 80,
        },
      },
      colors: ['rgba(64,246,168,1)', 'rgb(37,30,145)', 'rgba(227,46,230,1)'],
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const clickedLabel = chartContext.w.config.xaxis.categories[config.dataPointIndex];
          console.log('Clicked on x-axis label:', clickedLabel);
        },
      },
    },
  });



  const chartContainerStyle = {
    marginTop: '20px',
  };

  return (
    <Box className='main_container'>
      <Box className='first_row_grid'>
        <Box className='first_grid'>
          <ReactApexChart
            style={chartContainerStyle}
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={300}
          />
          <Box sx={{ display: 'flex' , marginTop:'-15px' }}>
            <Button size="small"  sx={{ marginLeft: '65px',padding:'-10px'}}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '115px' }}>VIEW</Button>
            <Button size="small"  sx={{ marginLeft: '110px' }}>VIEW</Button>
            <Button size="small"  sx={{ marginLeft: '116px' }}>VIEW</Button>
            <Button size="small"  sx={{ marginLeft: '115px' }}>VIEW</Button>
            <Button size="small"  sx={{ marginLeft: '117px' }}>VIEW</Button>
            <Button size="small"  sx={{ marginLeft: '110px' }}>VIEW</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Admin_Dash;
