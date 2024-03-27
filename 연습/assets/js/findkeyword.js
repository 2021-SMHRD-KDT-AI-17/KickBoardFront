const interviewee=document.getElementsByName("interviewee")[0];
const writerSuggestion=document.getElementById("suggest");
//https://skyjwoo.tistory.com/entry/%EC%9B%B9-%EA%B2%80%EC%83%89%EC%96%B4-%EC%B6%94%EC%B2%9C-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0
style="display: none;"
interviewee.addEventListener("keyup",()=>{
    console.log("호출!");
    const suggestionBox = document.querySelector("#suggest");

    writerSuggestion.classList.remove('invisible');
    writerSuggestion.innerHTML="";

    const suggestedItems = document.createElement('div')
    suggestedItems.id = "suggested_items"
    suggestionBox.appendChild(suggestedItems);

    // 실험데이터
    var items=['고현우','현우고','조영훈','정두연','유승주'];
    for(var i in items){
        var player_content = document.createTextNode(items[i]);
        var suggestedItem = document.createElement('div')
        suggestedItem.className = "item"
  
        suggestedItem.addEventListener('click', function(e){
          document.getElementById("name").value = this.textContent.split(' ')[0];
        });
        suggestedItem.appendChild(player_content);
        suggestedItems.appendChild(suggestedItem);
    }
})