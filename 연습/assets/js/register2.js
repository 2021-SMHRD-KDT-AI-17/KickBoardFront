$(document).ready(function() {
    // 선호 구단 선택 시
    $('#teamselect').change(function() {
      var selectedTeam = $('#teamselect option:selected').text();
      $('#selTeam').val(selectedTeam);
    });
  
    // 선수 추가 버튼 클릭 시
    $('#addPlayerBtn').click(function() {
      var playerName = $('#playerselect').val();
      if (playerName) {
        var currentPlayers = $('#selPlayer').val();
        if (currentPlayers) {
          currentPlayers += ', ' + playerName;
        } else {
          currentPlayers = playerName;
        }
        $('#selPlayer').val(currentPlayers);
        $('#playerselect').val('');
      }
    });
  });
  $(document).ready(function() {
    // 삭제 아이콘 클릭 시
    $(document).on('click', '.ti-xbox-x', function() {
      $(this).parent().next('input').val(''); // 해당 선수 이름을 삭제
    });
  });
  
  