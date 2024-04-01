$(function () {


  // =====================================
  // rank-5
  // =====================================
  var chart = {
    series: [
      { name: "순위 :", data: [1,2,6,7,9]},
    ],

    chart: {
      type: "bar",
      height: 300,
      offsetX: -15,
      toolbar: { show: true },
      foreColor: "#adb0bb",
      fontFamily: 'inherit',
      sparkline: { enabled: false },
    },


    colors: ["#c6c8ca"],


    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      },
    },
    markers: { size: 0 },

    dataLabels: {
      enabled: false,
    },


    legend: {
      show: false,
    },


    grid: {
      borderColor: "rgba(0,0,0,0.0)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    xaxis: {
      type: "category",
      categories: ["2019", "2020", "2021", "2022", "2023"],
      labels: {
        style: { cssClass: "grey--text lighten-2--text fill-color" },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: 12,
      tickAmount: 4,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 3,
      lineCap: "butt",
      colors: ["transparent"],
    },


    tooltip: { theme: "light" },

    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
            }
          },
        }
      }
    ]


  };

  var chart = new ApexCharts(document.querySelector("#rank-5"), chart);
  chart.render();


  // =====================================
  // Breakup
  // =====================================
  var record = {
    color: "#adb5bd",
    series: [3, 1, 6],
    labels: ["승", "무", "패"],
    chart: {
      width: 180,
      type: "donut",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ["#0067ac", "#c6c8ca", "#ee3224"],

    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  var chart = new ApexCharts(document.querySelector("#record"), record);
  chart.render();



  // =====================================
  // Earning
  // =====================================
    var rank = {
      chart: {
        id: "sparkline3",
        type: "area",
        height: 100,
        sparkline: {
          enabled: true,
        },
        group: "sparklines",
        fontFamily: "Plus Jakarta Sans', sans-serif",
        foreColor: "#adb0bb",
      },
      series: [
        {
          name: ["rank"],
          color: "#49BEFF",
          data: [1, 3, 6, 8, 10],
        },
      ],
      stroke: {
        curve: "straight",
        width: 2,
      },
      fill: {
        colors: ["#f3feff"],
        type: "solid",
        opacity: 0.00,
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["2019","2020","2021","2022","2023"], // x축 라벨 값 배열
        labels: {
          show: true
        }
      },
      yaxis: {
        reversed: true, // 그래프 반전
        min: 0, // y축 최소값 설정
        max: 10, // y축 최대값 설정
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: true,
          position: "right",
        },
        x: {
          show: false,
        },
      },
  };

  new ApexCharts(document.querySelector("#rank"), rank).render();


})



