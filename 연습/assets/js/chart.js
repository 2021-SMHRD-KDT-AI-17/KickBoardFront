
// 도넛 차트
  var ctx = document.getElementById('doughnutChart').getContext('2d');
  var donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['승', '패', '무'],
      datasets: [{
        label: '# of Votes',
        data: [1, 3, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
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


  