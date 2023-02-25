module.exports = {
  tolerance: 0.0080,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10,
          ticks: {
            display: false
          }
        },
        y: {
          display: true,
          min: -10,
          max: 10,
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            point1: {
              type: 'point',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              xAdjust: 30,
              yAdjust: 40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center1: {
              type: 'label',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              content: 'x: +30, y: +40',
              position: 'start'
            },
            pointCenter1: {
              type: 'point',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              backgroundColor: 'black',
              radius: 3
            },
            point2: {
              type: 'point',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              xAdjust: 30,
              yAdjust: -40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center2: {
              type: 'label',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              content: 'x: +30, y: -40',
              position: {
                x: 'start',
                y: 'end'
              }
            },
            pointCenter2: {
              type: 'point',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              backgroundColor: 'black',
              radius: 3
            },
            point3: {
              type: 'point',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              xAdjust: -30,
              yAdjust: -40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center3: {
              type: 'label',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              content: 'x: -30, y: -40',
              position: 'end'
            },
            pointCenter3: {
              type: 'point',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              backgroundColor: 'black',
              radius: 3
            },
            point4: {
              type: 'point',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              xAdjust: -30,
              yAdjust: 40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center4: {
              type: 'label',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              content: 'x: -30, y: +40',
              position: {
                x: 'end',
                y: 'start'
              }
            },
            pointCenter4: {
              type: 'point',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              backgroundColor: 'black',
              radius: 3
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
