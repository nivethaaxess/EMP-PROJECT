import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import './Admin_Dash.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';






function Admin_Dash() {

  const checkFunction = (event) => {
    console.log('EVENT', event)
  }
  const [level,setLevel] = useState([]);
  const [clickedValue, setClickedValue] = useState('');
  const [tableData, setTableData] = useState(false);
  const [chartData, setChartData] = useState({
    series: [{
      name: ''
    }],
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

          
            if (config.dataPointIndex !== undefined) {
             

              const clickedSkill = chartContext.w.globals.labels[config.dataPointIndex];
              console.log('clickedSkill:', clickedSkill);

              const clickedLabel = chartContext.w.globals.seriesNames[config.seriesIndex];
              console.log('clickedLabel:', clickedLabel);

              
              chartFilterData(clickedSkill,clickedLabel);
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
            fontSize: '14px',
            
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
        // console.log('VALUE==>>>', val.data)

        const skills = val.data.skills;
        const sortedSkills = skills.map(skill => skill.toUpperCase()).sort();
        const basicData = val.data.levels.find(item => item.level === 'basic');
        // console.log('basicData==>>>', basicData.level)

        const intermediateData = val.data.levels.find(item => item.level === 'intermediate');
        const advanceData = val.data.levels.find(item => item.level === 'advance');

        const Basiccount = val.data.counts
        // console.log('Basiccount==>>>', Basiccount);


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

        // console.log('Basic Counts:', basicCounts);




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

        // console.log('intermediateCounts Counts:', intermediateCounts);


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

        // console.log('advanceCounts Counts:', advanceCounts);




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
          },
          events: {
            click: function (event, chartContext, config) {
              const clickedCategory = chartData.options.xaxis.categories[config.dataPointIndex];
              const clickedSeries = chartData.series[config.seriesIndex].name;
              setClickedValue(clickedSeries);
            },
          }

        })

        

      })
      .catch(err => console.log('err=>>>', err))
  }, []);


    const chartFilterData = (skill,level) =>{
      console.log('skill PROCESS ====>>>>',skill)
      console.log('level PROCESS ====>>>.',level)

      const data = {
        skill: skill,
        level: level
      }

      axios.post('http://localhost:3007/api/table/data',data)
      .then(val=>{
        console.log('val===>>>>',val)

        const filterData = val.data.val
        console.log('filterData===>>>',filterData)

        setLevel(filterData);
        setTableData(true);
      
      })
      .catch(err=>console.log('err===>>>>',err))
    }


    const styles = {
      stickyHeaderCell: {
        position: 'sticky',
        top: 0,
        background: '#f7f7f7', // Optional: add a background color for the fixed header
        zIndex: 1, // Ensure the header stays above the table body
      },
    };



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
            height={250}
          width={900}
          />
          <Box sx={{ display: 'flex', marginTop: '-15px' , width:'80%'}}>
            <RemoveRedEyeIcon sx={{marginLeft:'52px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'90px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'85px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'85px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'84px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'84px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'86px'}}/>
            <RemoveRedEyeIcon sx={{marginLeft:'86px'}}/>
          </Box>


          <Box >

{
  tableData ? 
  <Box sx={{display:'flex',justifyContent:'center'}}>
  <TableContainer sx={{ maxWidth: 700, maxHeight: 400 }}>
    <Box sx={{ overflow: 'auto', maxHeight: 200 }}>
  <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table" >
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={styles.stickyHeaderCell}>EMAIL ID</TableCell>
        <TableCell align="center" sx={styles.stickyHeaderCell}>NAME</TableCell>
        <TableCell align="center" sx={styles.stickyHeaderCell}>EXPERIENCE</TableCell>
        <TableCell align="center" sx={styles.stickyHeaderCell}>LEVEL</TableCell>
        <TableCell align="center" sx={styles.stickyHeaderCell}>SKILL</TableCell>
      </TableRow>
    </TableHead>
    <TableBody >
      {level?.map((row,i) => (
        <TableRow
          key={row.i}
          // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="center" component="th" scope="row">
            {row.Emp_ID}
          </TableCell>
          <TableCell align="center">{row.Name}</TableCell>
          <TableCell align="center">{row.exp}</TableCell>
          <TableCell align="center">{row.level}</TableCell>
          <TableCell align="center">{row.skill}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </Box>
</TableContainer> 
</Box>
: null  

}

</Box>

         
        </Box>
        
      </Box>
     
    </Box>
  );
}

export default Admin_Dash;
