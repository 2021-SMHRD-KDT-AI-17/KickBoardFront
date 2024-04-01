//변수선언
let news_imgList = [];
let news_titleList = [];
let news_linkList = [];
let news_lastIdx; //페이징 할 글 끝 IDX
let news_firstIdx;
//초기 설정
let news_pageNow = 1; //전체 페이지
let active_page = 1; //현재 선택 페이징
getList(true, false, "");
const atags = document.querySelectorAll('a[class="enum"]');
atags[0].className = "invisible";
atags[1].className = "active";
const post_perpage = 5; //페이지 당 뉴스글 수
const idx_count = 5; //아래 버튼 수
//뉴스양식
const imgs = document.getElementsByClassName("news-img");
const titles = document.getElementsByClassName("card-text");
const links = document.getElementsByClassName("card-link");
//버튼이벤트등록
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
//클로저 적용
function listChange(i, idx) {
    //즉시실행함수
    (() => {
        atags[i].addEventListener('click', () => {
            if (active_page != idx) {
                /*console.log(idx);*/
                atags[active_page].classList.remove('active');
                atags[idx].className = "active";
                active_page = idx;
                showNewsList((idx - 1) * idx_count);
            }
        });
    })();
}
function pre_post(option) {
    if (option == "post") {
        /*console.log("post");*/
        news_pageNow++;
        atags[active_page].classList.remove('active');
        atags[0].classList.remove('invisible');
        atags[1].className = "active";
        active_page = 1;
        getList(false, false, news_lastIdx);
    } else if (option == "pre" && news_pageNow != 1) {
        /*console.log("pre")*/;
        news_pageNow--;
        atags[active_page].classList.remove('active');
        atags[1].className = "active";
        active_page = 1;
        if (news_pageNow == 1) atags[0].className = "invisible";
        getList(false, true, news_firstIdx);
        atags[idx_count+1].classList.remove('invisible');
    }
    for (i = 1; i < atags.length - 1; i++) {
        var num = Number(news_pageNow*(idx_count));
        atags[i].innerText = num-(idx_count-i);
    }
}
function showNewsList(startN) {
    var listnum = 0;
    for (var i = startN; i < startN + post_perpage; i++) {
        if (news_imgList[i] != null) {
            imgs[listnum].setAttribute('src', news_imgList[i]);
            titles[listnum].innerText = news_titleList[i];
            links[listnum].innerText = news_linkList[i];
        } else {
            imgs[listnum].setAttribute('src', "resources/assets/images/logos/ball_logo.png");
            titles[listnum].innerText = "아직 기사를 덜 수집했습니다 기다려 주세요";
            links[listnum].innerText = "";
        }
        listnum++;
    }
}
function pagebuttonShow(listCount,lastIdx) {
    let CNT = listCount / (post_perpage);
    let buttonCNT;
    if (listCount % (post_perpage) == 0)
        buttonCNT = CNT;
    else
        buttonCNT = CNT + 1;
    for(var i=1; i<idx_count+1;i++){
        if(buttonCNT>=i){
            atags[i].classList.remove('invisible');
        }
        else{
            atags[i].className="invisible";
        }
    }
    if(listCount<post_perpage * idx_count||lastIdx==1)
    atags[idx_count+1].className="invisible";
}
function getList(init, isPre, idx) {
	let u;
    if (init == true) u = "newsFirstList";
    else {
        if (isPre == true) u = "newsPreList";
        else u = "newsPostList";
        u += "?range=" + idx;
    }
    $.ajax({
        url: u,
        type: "get",
        dataType: 'json',
        success: (data) => {
            news_imgList = [];
            news_titleList = [];
            news_linkList = [];
            news_lastIdx = data[data.length - 1].article_idx;
            news_firstIdx = data[0].article_idx;
            for (var i = 0; i < data.length; i++) {
                if(data[i]!=null){
                    news_imgList.push(data[i].article_img);
                    news_titleList.push(data[i].article_title);
                    news_linkList.push(data[i].article_url);
                }
            }
            showNewsList(0);
            pagebuttonShow(data.length,news_lastIdx);
        }, error: () => {
            console.log("통신실패");
        }
    })
}