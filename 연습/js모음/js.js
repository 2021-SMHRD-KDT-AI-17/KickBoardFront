// 팀 분석
  document.addEventListener("DOMContentLoaded", function() {
    // 선택 옵션 변경 이벤트 리스너 추가
    document.querySelector('.form-select').addEventListener('change', function(event) {
      // 선택된 값 확인
      var selectedValue = event.target.value;

      // 선택된 값에 따라 다른 화면 표시
      var chartDiv = document.getElementById('chart');
      if (selectedValue === '1') {
        // 최근 전적 화면 표시
        chartDiv.innerHTML = '<p>최근 전적 화면</p>';
      } else if (selectedValue === '2') {
        // 선호 구단 1 화면 표시
        chartDiv.innerHTML = '<p>선호 구단 1 화면</p>';
      } else if (selectedValue === '3') {
        // 선호 구단 2 화면 표시
        chartDiv.innerHTML = '<p>선호 구단 2 화면</p>';
      }
      // 필요한 만큼 조건 추가
    });
  });
// 선수 분석
  function showPlayerInfo(selectElement) {
    var playerInfoDiv = document.getElementById('playerInfo');
    var selectedValue = selectElement.value;

    // 선택된 값에 따라 해당하는 선수 정보 표시
    if (selectedValue === 'default') {
      playerInfoDiv.innerHTML = '<p>기본 선수 정보</p>';
    } else if (selectedValue === 'player1') {
      playerInfoDiv.innerHTML = '<p>선호 선수 1 정보</p>';
    } else if (selectedValue === 'player2') {
      playerInfoDiv.innerHTML = '<p>선호 선수 2 정보</p>';
    }
    // 필요한 만큼 조건 추가
  }
    
  
  
    //팀 차트
    //포메이션
    
    
    // 메인 선수 차트
    // Chart.js를 사용하여 Polar area 그래프 생성
    var ctx = document.getElementById('player-chart').getContext('2d');
    var playerChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['슈팅', '패스', '드리블', '수비', '체력'],
            datasets: [{
                label: '선수 능력',
                data: [80, 70, 90, 60, 85],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });





  