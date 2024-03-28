const sample=(i)=>{
    if (i==1){console.log(1);}
    else if(i==2){console.log(2);}
  }
  const tb=document.getElementById("contents");
  let email_text="sample@naver.com";
  let joindate_text="2024-03-27";
  let isBlockChat_text;
  let isUserBan_text;
  let isUserBanCause_text;
  const testbutton=document.getElementById("testjs");
  testbutton.addEventListener('click',()=>{
    tb.innerHTML="";
    for(let i=0; i<=2;i++){
              if(i%2==0){isBlockChat_text="N"; isUserBan_text="N"; isUserBanCause_text="N";}
              else {isBlockChat_text="Y"; isUserBan_text="Y"; isUserBanCause_text="인터뷰 게시판 욕설 사용";}
              let tr=tb.appendChild(document.createElement("tr"));
              let email=tr.appendChild(document.createElement("td"));
              let joindate=tr.appendChild(document.createElement("td"));
              let isBlockChat=tr.appendChild(document.createElement("td"));
              let chatBlockButton=tr.appendChild(document.createElement("td")).appendChild(document.createElement("button"));
              let isUserBan=tr.appendChild(document.createElement("td"));
              let td=tr.appendChild(document.createElement("td"));
              td.style.columnSpan=2;
              let div=td.appendChild(document.createElement("div"));
              div.className="input-group";
              let banCause=div.appendChild(document.createElement("input"));
              banCause.type="text";
              banCause.className="form-control";
              let banButton=div.appendChild(document.createElement("button"));
              banButton.className="btn btn-primary";
              email.innerText=email_text+`${i}번`;
              joindate.innerText=joindate_text;
              chatBlockButton.className="btn btn-primary";
              isBlockChat.innerText=isBlockChat_text;
              isUserBan.innerText=isUserBan_text;
              banCause.value=isUserBanCause_text;
              if(isBlockChat.innerText=="N"){
                chatBlockButton.innerText="채팅금지";
              }else{
                chatBlockButton.innerText="채팅허용";
              }
              if(isUserBan.innerText=="Y"){
                banButton.innerText="정지해제";
                banCause.disabled=true;
              }else{
                banButton.innerText="정지";
              }
            }
  })
