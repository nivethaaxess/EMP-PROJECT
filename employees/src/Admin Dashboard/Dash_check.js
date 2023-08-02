import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Dash_check = () => {
  const [barChartsOptions, setBarChartsOptions] = useState({
    chart: {
      stacked: true,
      toolbar: {
        show: false, // Set show property to false to hide the toolbar/menu button
      },
    },
    xaxis: {
      categories: [
        'AWS',
        'BOOTSTRAP',
        'CSS',
        'GCB',
        'HTML',
        
      ],
      type: 'category',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    legend: {
      show: true,
    },
    yaxis: {
      show: false, // Set show property to false to hide the y-axis labels
    },
    colors: ['rgba(64,246,168,1)', 'rgb(37,30,145)', 'rgba(227,46,230,1)'],
    dataLabels: {
      position: 'top', // Display series values above the bars (upper chart)
      style: {
        colors: ['#333'], // Color of the series values
      },
    },
  });

  const [barChartsSeries, setBarChartsSeries] = useState([
    { name: 'series x', data: [2, 5, 3, 4, 1] },
    { name: 'series y', data: [10, 3, 1, 2, 10] },
    { name: 'series z', data: [10, 3, 1, 2, 10] },
    // { name: 'series x'},
    // { name: 'series y'},
    // { name: 'series z'},
  ]);

  return (
    <div>
      <ReactApexChart
        options={barChartsOptions}
        series={barChartsSeries}
        type="bar"
        height={200}
        width={1000}
      />
    </div>
  );
};

export default Dash_check;
