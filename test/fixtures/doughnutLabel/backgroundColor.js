module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'doughnut',
    data: {
      labels: ['Data1', 'Data2', 'Data3', 'Data4'],
      datasets: [{
        data: [102, 200, 80, 55],
      }],
    },
    options: {
      events: [],
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'doughnutLabel',
              backgroundColor: 'red',
              borderWidth: 0,
              content: 't'
            },
          ]
        }
      }
    }
  },
  options: {
    canvas: {
      height: 256,
      width: 512
    }
  }
};