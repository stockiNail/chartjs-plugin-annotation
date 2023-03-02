module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    data: {
      datasets: [{
        data: [0, 0, 0, 0, 0, 0]
      }]
    },
    options: {
      scales: {
        x: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: true,
          stack: 'demo',
          stackWeight: 2,
          min: 0,
          max: 10
        },
        y2: {
          type: 'category',
          display: true,
          labels: ['ON', 'OFF'],
          offset: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 1,
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            centered: {
              type: 'arc',
              backgroundColor: 'rgba(159, 226, 191, 0.5)',
              cutout: 5,
              radius: 15
            },
            xMissing: {
              type: 'arc',
              yValue: 8,
              backgroundColor: 'rgba(255, 191, 0, 0.5)',
              cutout: 5,
              radius: 15
            },
            yMissing: {
              type: 'arc',
              xValue: 'June',
              backgroundColor: 'rgba(222, 49, 99, 0.5)',
              cutout: 5,
              radius: 15
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
