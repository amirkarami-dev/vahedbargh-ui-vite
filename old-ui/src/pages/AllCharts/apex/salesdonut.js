import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesDonut = () => {
    const options = {
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
          },
        },
      },
      colors: ['#626ed4', '#02a499', '#f8b425'],
    };
  
    const series = [15, 40, 45];
    const labels = [1, 2, 3];
  
    return (
        <ReactApexChart options={options} series={series} type="donut" height="220" />
    );
  };
  
  export default SalesDonut;