$(function () {


  // =====================================
  // rank-5
  // =====================================
  var options = {
    series: [{
      data: [10,2,1, 4, 5, 6, 12]
    }],
    chart: {
      type: 'line',
      height: 300
    },
    stroke: {
      curve: 'straight',
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: '최근 7년 구단 순위',
      align: 'left'
    },
    markers: {
      hover: {
        sizeOffset: 4
      }
    },
    xaxis: {
      categories: ['2017','2018','2019', '2020', '2021', '2022', '2023'],
    },
    yaxis: {
      min: 1,
      max: 12,
      reversed: true,
      labels: {
        formatter: function(value) {
          return Math.round(value);
        }
      },
      show: false // y축 라벨 숨기기
    },
    grid: {
      show: false // 눈금선 숨기기
    },
    markers:{
      show: true, // 마커 보이기
      size: 5 // 마커 크기 설정
    },
    toolbar: {
      show: false // 툴바 숨기기
    }
  };
  
  var chart = new ApexCharts(document.querySelector("#rank-5"), options);
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


  // 평균 차트
var options = {
  series: [{
    name: 'Series 1',
    data: [15, 20, 10, 25, 30, 5, 28, 12] // 출전경기수, 득점, 슈팅, 도움, 패스 성공률, 드리블, 태클, 인터셉트
  }],
  chart: {
    height: 350,
    type: 'radar',
  },
  xaxis: {
    categories: ['출전경기수', '득점', '슈팅', '도움', '패스 성공률', '드리블', '태클', '인터셉트']
  },
  yaxis: {
    min: 0,
    max: 30,
    tickAmount: 6, // 수정된 부분
    labels: {
      formatter: function(val) {
        return val.toFixed(0); // 소수점 제거
      }
    }
  },
  colors: ['#0067ac'] // 그래프 선의 색상
};

var chart = new ApexCharts(document.querySelector("#player-avg"), options);
chart.render();


// 세부 차트
var options = {
  series: [{
    data: [65, 68, 70, 72, 75, 78, 80, 82, 85, 88]
  }],
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['득점', '도움', '슈팅', '유효 슈팅', '드리블', '키패스', '패스 성공률', '키패스', '태클', '인터셉트', '클리어링']
  },
  colors: ['#ee3224'] // 그래프 선의 색상
};

var chart = new ApexCharts(document.querySelector("#player-data"), options);
chart.render();

})



