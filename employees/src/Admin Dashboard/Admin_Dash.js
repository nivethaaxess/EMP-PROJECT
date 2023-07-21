import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import './Admin_Dash.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';




function Admin_Dash() {

  const checkFunction = (event) => {
    console.log('EVENT', event)
  }
  const [data, setData] = useState(['HTML', '  CSS', 'JAVA SCRIPT', 'REACT JS', 'NODE JS', 'SQL', 'WEB CONCEPTS']);
  const [chartData, setChartData] = useState({
    series: [],
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
        categories: [],
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
          toolbar: {
            tools: {
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


  useEffect(() => {
    const name = {
      val: 'done'
    }
    axios.get('http://localhost:3007/api/Dashboard')
      .then(val => {
        const { categories, seriesData } = val.data;
        console.log('VALUE==>>>', val.data)

        const skills = val.data.skills;
        const sortedSkills = skills.map(skill => skill.toUpperCase()).sort();
        const basicData = val.data.levels.find(item => item.level === 'basic');
        console.log('basicData==>>>', basicData.level)

        const intermediateData = val.data.levels.find(item => item.level === 'intermediate');
        const advanceData = val.data.levels.find(item => item.level === 'advance');

        const Basiccount = val.data.counts
        console.log('Basiccount==>>>', Basiccount);


        const getBasicCounts = (data) => {
          // Initialize an array to store the basic counts
          const basicCounts = [];

          // Loop through the array and extract the counts for 'basic' level by skill
          data.forEach((item) => {
            if (item.level === 'basic') {
              basicCounts.push(item.count);
            }
          });

          return basicCounts;
        };

        // Call the function to get the basic counts
        const basicCounts = getBasicCounts(Basiccount);

        console.log('Basic Counts:', basicCounts);




        const getIntermediateCounts = (data) => {
          // Initialize an array to store the basic counts
          const intermediateCounts = [];

          // Loop through the array and extract the counts for 'basic' level by skill
          data.forEach((item) => {
            if (item.level === 'intermediate') {
              intermediateCounts.push(item.count);
            }
          });

          return intermediateCounts;
        };

        // Call the function to get the basic counts
        const intermediateCounts = getIntermediateCounts(Basiccount);

        console.log('intermediateCounts Counts:', intermediateCounts);


        const getAdvanceCounts = (data) => {
          // Initialize an array to store the basic counts
          const advanceCounts = [];

          // Loop through the array and extract the counts for 'basic' level by skill
          data.forEach((item) => {
            if (item.level === "advance") {
              advanceCounts.push(item.count);
            }
          });

          return advanceCounts;
        };

        // Call the function to get the basic counts
        const advanceCounts = getAdvanceCounts(Basiccount);

        console.log('advanceCounts Counts:', advanceCounts);




        setChartData({
          ...chartData,
          series: [
            {
              name: basicData.level,
              data: basicCounts,
            },
            {
              name: intermediateData.level,
              data: intermediateCounts,
            },
            {
              name: advanceData.level,
              data: advanceCounts,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: sortedSkills
            }
          }

        })


      })
      .catch(err => console.log('err=>>>', err))
  }, []);






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
          // width={900}
          />
          <Box sx={{ display: 'flex', marginTop: '-15px' }}>
            <Button size="small" sx={{ marginLeft: '65px', padding: '-10px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '85px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '85px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '100px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '89px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '90px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '90px' }}>VIEW</Button>
            <Button size="small" sx={{ marginLeft: '90px' }}>VIEW</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Admin_Dash;
