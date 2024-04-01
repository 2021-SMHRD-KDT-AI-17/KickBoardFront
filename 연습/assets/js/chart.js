
// 도넛 차트
  var ctx = document.getElementById('doughnutChart').getContext('2d');
  var donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['승','무','패'],
      datasets: [{
        data: [1, 3, 7],
        backgroundColor: [
          'rgba(0, 103, 172, 0.8)',
          'rgba(198, 200, 202, 0.8)',
          'rgba(238, 50, 36, 0.8)'
        ],
        borderColor: [
          'rgba(0, 103, 172, 1)',
          'rgba(198, 200, 202, 1)',
          'rgba(238, 50, 36, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, // 카드 바디의 크기를 초과하지 않도록 설정
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      }
    }
  });


  