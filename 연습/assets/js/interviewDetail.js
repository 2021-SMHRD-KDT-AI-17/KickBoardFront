const r_tr = document.getElementsByClassName("r_tr");
const r_idx = document.getElementsByClassName("req_idx");
const r_title = document.getElementsByClassName("req_title");
const r_writer = document.getElementsByClassName("req_writer");
const r_viewee = document.getElementsByClassName("req_viewee");
const r_likes = document.getElementsByClassName("req_likes");
const r_at = document.getElementsByClassName("req_at");
document.getElementById("");
let req_IdxList = [];
let req_TitleList = [];
let req_WriterList = [];
let req_VieweeList = [];
let req_LikesList = [];
let req_AtList = [];
//버튼
const atags = document.querySelectorAll('a[class="enum"]');
atags[0].className = "invisible";
atags[1].className = "active";
// console.log(atags);

let req_pageNow = 1; //전체 페이지
let active_page = 1; //현재 선택 페이징
let req_lastIdx; //페이징 할 글 끝 IDX
let req_firstIdx;
const post_perpage = 10; //페이지 당 인터뷰글 수
const idx_count = 5; //아래 버튼 수

//버튼 이벤트 등록
for (var i = 0; i < atags.length; i++) {
    if (i > 0 && i < atags.length - 1) {
        var idx = Number(atags[i].innerText);
        listChange(i, idx);
    } else {
        if (i == 0)
            atags[i].addEventListener('click', () => pre_post("pre"));
        else
            atags[i].addEventListener('click', () => pre_post("post"));
    }
}

//그 외 글10개
getList(true, false, "");
//클로저 적용
function listChange(i, idx) {
    //즉시실행함수
    (() => {
        atags[i].addEventListener('click', () => {
            if (active_page != idx) {
                console.log(idx);
                atags[active_page].classList.remove('active');
                atags[idx].className = "active";
                active_page = idx;
                showReqList((idx - 1) * post_perpage);
            }
        });
    })();
}
function pre_post(option) {
    let is_ajaxSucces;
    if (option == "post") {
        // console.log("post");
        req_pageNow++;
        
        is_ajaxSucces=getList(false, false, req_lastIdx);
        if(is_ajaxSucces==true) atags[0].classList.remove('invisible');
    } else if (option == "pre" && req_pageNow != 1) {
        // console.log("pre");
        req_pageNow--;
        if (req_pageNow == 1) atags[0].className = "invisible";
        is_ajaxSucces=getList(false, true, req_firstIdx);
        atags[idx_count + 1].classList.remove('invisible');
    }
    if(is_ajaxSucces==true){
        atags[active_page].classList.remove('active');
        atags[1].className = "active";
        active_page = 1;
        for (i = 1; i < atags.length - 1; i++) {
            var num = Number(req_pageNow * (idx_count));
            atags[i].innerText = num - (idx_count - i);
        }
    }else{
        alert("통신실패");
    }
}
function showReqList(startN) {
    var listnum = 0;
    var date = new Date();
    for (var i = startN; i < startN + post_perpage; i++) {
        r_tr[listnum].classList.remove('bg-onclick');
        r_tr[listnum].classList.remove('style');
        r_viewee[listnum].classList.remove('bg-primary');
        r_viewee[listnum].classList.remove('bg-danger');
        if (req_IdxList[i] != null) {
            r_tr[listnum].setAttribute("onclick", "location.href='interview_detail?idx=" + req_IdxList[i] + "'");
            r_tr[listnum].setAttribute("style", "cursor:pointer;");
            r_idx[listnum].innerText=req_IdxList[i];
            r_title[listnum].innerText=req_TitleList[i];
            r_writer[listnum].innerText =req_WriterList[i];
            if(req_VieweeList[i]=="선수"){
                r_viewee[listnum].className += " bg-primary";
            }else{
                r_viewee[listnum].className += " bg-danger";
            }
            r_viewee[listnum].innerText=req_VieweeList[i];
            r_likes[listnum].innerText = req_LikesList[i];
            r_at[listnum].innerText=req_AtList[i].split(" ")[0];
        } else {
            r_idx[listnum].innerText="X";
            r_title[listnum].innerText="어서 인터뷰 질문글을 작성해 보세요!";
            r_writer[listnum].innerText="👀";
            r_viewee[listnum].innerText="💨";
            r_likes[listnum].innerText = "👎";
            r_at[listnum].innerText=date.getHours() + ":" + date.getMinutes();
        }
        listnum++;
    }
}
function pagebuttonShow(listCount, lastIdx) {
    let CNT = listCount / (post_perpage);
    let buttonCNT;
    if (listCount % (post_perpage) == 0)
        buttonCNT = CNT;
    else
        buttonCNT = CNT + 1;
    for (var i = 1; i < idx_count + 1; i++) {
        if (buttonCNT >= i) {
            atags[i].classList.remove('invisible');
        }
        else {
            atags[i].className = "invisible";
        }
    }
    if (listCount < post_perpage * idx_count || lastIdx == 1)
        atags[idx_count + 1].className = "invisible";
}
function getList(init, isPre, idx) {
	let u;
    if (init == true) u = "reqFirstList";
    else {
        if (isPre == true) u = "reqPreList";
        else u = "reqPostList";
        u += "?range=" + idx;
    }
    $.ajax({
        url: u,
        type: "get",
        dataType: 'json',
        async :false,
        success: (data) => {
            req_IdxList = [];
            req_TitleList = [];
            req_WriterList = [];
            req_VieweeList = [];
            req_LikesList = [];
            req_AtList = [];
            req_lastIdx = data[data.length - 1].req_idx;
            req_firstIdx = data[0].req_idx;
            let tmp = "";
            for (var i = 0; i < data.length; i++) {
                if (data[i] != null) {
                    req_IdxList.push(data[i].req_idx);
                    req_TitleList.push(data[i].req_title);
                    req_WriterList.push(data[i].mem_email);
                    if (data[i].player_idx != 0) {
                        req_VieweeList.push("선수");
                    }
                    else {
                        req_VieweeList.push("구단");
                    }
                    tmp = "👍";
                    tmp += data[i].req_likes;
                    req_LikesList.push(tmp);
                    req_AtList.push(data[i].req_at);
                }
            }
            showReqList(0);
            pagebuttonShow(data.length, req_lastIdx);
            return true;
        }, error: () => {
            console.log("통신실패");
            return false;
        }
    })
}
likebutton.addEventListener('click',()=>{
    Number(likes.innerText.split)
})