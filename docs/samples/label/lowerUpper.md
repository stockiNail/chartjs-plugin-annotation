# Lower and upper bounds labels

```js chart-editor
// <block:setup:3>
const DATA_COUNT = 8;
const MIN = 10;
const MAX = 100;

Utils.srand(8);

const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push('' + i);
}

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: labels,
  datasets: [{
    data: Utils.numbers(numberCfg)
  }, {
    data: Utils.numbers(numberCfg)
  }, {
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'label',
  content: (ctx) => 'Lower bound: ' + minValue(ctx).toFixed(3),
  position: {
    x: 'start',
    y: 'end'
  },
  xScaleID: 'x',
  xValue: 2,
  yScaleID: 'y',
  yValue: minValue
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'label',
  content: (ctx) => 'Upper bound: ' + maxValue(ctx).toFixed(3),
  position: {
    x: 'start',
    y: 'start'
  },
  xScaleID: 'x',
  xValue: 2,
  yScaleID: 'y',
  yValue: maxValue
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        stacked: true
      }
    },
    plugins: {
      annotation: {
        annotations: {
          annotation1,
          annotation2
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:4>
function minValue(ctx) {
  const dataset = ctx.chart.data.datasets[0];
  const min = dataset.data.reduce((max, point) => Math.min(point, max), Infinity);
  return isFinite(min) ? min : 0;
}

function maxValue(ctx) {
  const datasets = ctx.chart.data.datasets;
  const count = datasets[0].data.length;
  let max = 0;
  for (let i = 0; i < count; i++) {
    let sum = 0;
    for (const dataset of datasets) {
      sum += dataset.data[i];
    }
    max = Math.max(max, sum);
  }
  return max;
}
// </block:utils>

var actions = [
  {
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));
      });
      chart.update();
    }
  },
  {
    name: 'Add data',
    handler: function(chart) {
      chart.data.labels.push(chart.data.labels.length);
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.push(Utils.rand(MIN, MAX));
      });
      chart.update();
    }
  },
  {
    name: 'Remove data',
    handler: function(chart) {
      chart.data.labels.shift();
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.shift();
      });
      chart.update();
    }
  },
  {
    name: 'Cycle x-position',
    handler: function(chart) {
      const annotations = chart.options.plugins.annotation.annotations;
      if (annotations.annotation1.position.x === 'start') {
        annotations.annotation1.position.x = 'end';
        annotations.annotation2.position.x = 'end';
      } else if (annotations.annotation1.position.x === 'center') {
        annotations.annotation1.position.x = 'start';
        annotations.annotation2.position.x = 'start';
      } else {
        annotations.annotation1.position.x = 'center';
        annotations.annotation2.position.x = 'center';
      }
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```