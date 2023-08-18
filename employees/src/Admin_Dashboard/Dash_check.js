import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import './Dash_check.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Admin_Dash() {
  const [dataset, setDataset] = useState([]);
  const [tableData, settableData] = useState([]);
  const [ternoryCheck, setTernoryCheck] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3007/api/Dashboard_check')
      .then(response => {
        const data1 = response.data.val;
        console.log('data1===>>>>',data1)

        const transformedData = data1.reduce((acc, item) => {
          const existingTopic = acc.find(topic => topic.topic === item.topic_name);

          if (existingTopic) {
            existingTopic[item.level.toLowerCase()] = (existingTopic[item.level.toLowerCase()] || 0) + item.user_count;
          } else {
            const newTopic = { topic: item.topic_name };
            newTopic[item.level.toLowerCase()] = item.user_count;
            acc.push(newTopic);
          }

          return acc;
        }, []);

        setDataset(transformedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const handleBarClick = (data1, index) => {
    // Access the data associated with the clicked bar
    console.log('Clicked Data:', data1.activeLabel);
    const data = {
      data: data1.activeLabel
    }

    axios.post('http://localhost:3007/api/Dashboard/tableData', data)
      .then(val => {
        console.log('VAL===>>>>', val.data.val)

        const receiveData = val.data.val

        const groupedData = {};
        receiveData.forEach(item => {
          const key = `${item.email}-${item.topic_name}`;
          if (!groupedData[key]) {
            groupedData[key] = {
              email: item.email,
              topic_name: item.topic_name,
              levels: [],
              completed_subtopics: []
            };
          }
          groupedData[key].levels.push(item.level);
          groupedData[key].completed_subtopics.push(item.completed_subtopics);
        });

        const formattedData = Object.values(groupedData);
        console.log('groupedData===>>>>', groupedData)
        console.log('formattedData===>>>>', formattedData)
        settableData(formattedData)
        setTernoryCheck(true)


      })
      .catch(err => console.log('Err==>>>', err))
    // This is backend query
    // SELECT u.email, t.topic_name, lv.level, CONCAT('[', GROUP_CONCAT(DISTINCT st.subTopic_name ORDER BY st.subTopic_name ASC SEPARATOR ', '), ']') AS completed_subtopics FROM status s JOIN sub_topics st ON s.subTopic_id = st.subTopic_id JOIN topics t ON st.topic_id = t.topic_id JOIN levels lv ON s.level = lv.level_id JOIN user u ON s.user_id = u.user_id WHERE t.topic_name = 'HTML' GROUP BY u.email, t.topic_name, lv.level

  };


  return (
    <Box className='main_container_2'>
      <Box className='first_row_grid_2'>
        <Box className='first_grid_2'>
          <BarChart
            width={1050}
            height={300}
            data={dataset}
            margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
            onClick={(val) => handleBarClick(val)}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='topic' tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey='basic' fill='rgba(64, 246, 168, 1)'>
              {dataset.map((entry, index) => (
                <span
                  key={`label-${index}`}
                  value={entry.basic}
                  fontSize={12}
                  fill='rgba(64, 246, 168, 1)'
                >
                  {entry.basic}
                </span>
              ))}
            </Bar>
            <Bar dataKey='advance' fill='rgb(37, 30, 145)'>
              {dataset.map((entry, index) => (
                <span
                  key={`label-${index}`}
                  value={entry.advance}
                  fontSize={12}
                  fill='rgb(37, 30, 145)'
                >
                  {entry.advance}
                </span>
              ))}
            </Bar>
            <Bar dataKey='intermediate' fill='rgba(227, 46, 230, 1)'>
              {dataset.map((entry, index) => (
                <span
                  key={`label-${index}`}
                  value={entry.intermediate}
                  fontSize={12}
                  fill='rgba(227, 46, 230, 1)'
                >
                  {entry.intermediate}
                </span>
              ))}
            </Bar>
            <Bar dataKey='others' fill='rgb(254, 176, 25)'>
              {dataset.map((entry, index) => (
                <span
                  key={`label-${index}`}
                  value={entry.others}
                  fontSize={12}
                  fill='rgb(254, 176, 25)'
                >
                  {entry.others}
                </span>
              ))}
            </Bar>

          </BarChart>
          <Box>
            {
              ternoryCheck ? (
                <div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, border: '1px solid black' }} align="center">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Email</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Topic Name</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Levels</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Completed Subtopics</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData?.map(item => (
                          <TableRow key={`${item.email}-${item.topic_name}`}>
                            <TableCell style={{ border: '1px solid black' }}>{item.email}</TableCell>
                            <TableCell style={{ border: '1px solid black' }}>{item.topic_name}</TableCell>
                            <TableCell style={{ border: '1px solid black' }}>{item.levels?.join(', ')}</TableCell>
                            <TableCell style={{ border: '1px solid black' }}>
                              {item.completed_subtopics?.map((subtopics, index) => (
                                <div key={index}>
                                  {index === 0 ? '' : ', '}
                                  {subtopics}
                                </div>
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                ''
              )
            }

          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Admin_Dash;
