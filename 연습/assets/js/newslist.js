//jsp에서 값 받아온 변수
news_imgList;
news_titleList;
news_linkList;
news_lastIdx;
news_firstIdx;
let listCNT=news_imgList.length; // 총 뉴스글 수
//초기 설정
const atags = document.querySelectorAll('a[class="enum"]');
atags[0].className = "invisible";
atags[1].className = "active";
const post_perpage = 5; //페이지 당 뉴스글 수
const idx_count=5; //아래 버튼 수
if ((news_imgList.length) / post_perpage < 5) {
    for (var i = news_imgList.length + 1; i < 7; i++)
        atags[i + 1].className = "invisible";
}
let pageListN=listCNT%post_perpage==0?listCNT/post_perpage:listCNT/post_perpage+1;
let news_pageNow = 1;
let active_page=1;
//뉴스페이지
const imgs = document.getElementsByClassName("news-img");
const titles = document.getElementsByClassName("card-text");
const links = document.getElementsByClassName("card-link");
//첫화면
showNewsList(5);
for (var i=0; i < atags.length; i++) {
    if (i > 0 && i < atags.length-1) {
        var idx=Number(atags[i].innerText);
        listChange(i, idx);
    }else{
        if(i==0)
        atags[i].addEventListener('click', () =>pre_post("pre"));
        else
        atags[i].addEventListener('click', () =>pre_post("post"));
    }
}
  //클로저 적용
function listChange(i, idx) {
      //즉시실행함수
    (()=>{
        atags[i].addEventListener('click', ()=>{
            console.log(idx);
            atags[active_page].classList.remove('active');
            var lidx=idx%5==0?5:idx%5;
            atags[lidx].className = "active";
            active_page=lidx;
        });
    })();
}
function pre_post(option) {
    if(option=="post"){
        console.log("post");
        for(i=1;i<atags.length-1;i++){
            var num=Number(atags[i].innerText);
            atags[i].innerText=num+5;
        }
        //showNewsList(news_pageNow*post_perpage*idx_count+1);
        news_pageNow++;
        atags[active_page].classList.remove('active');
        atags[1].className = "active";
        active_page=1;
    }else if(option=="pre"&&news_pageNow!=1){
        console.log("pre");
        for(i=1;i<atags.length-1;i++){
            var num=Number(atags[i].innerText);
            atags[i].innerText=num-5;
        }
        news_pageNow--;
        //showNewsList(news_pageNow*post_perpage*idx_count+1-(post_perpage*idx_count));
        atags[active_page].classList.remove('active');
        atags[1].className = "active";
        active_page=1;
    }
}
function showNewsList(startN){
    var listnum=0;
    for (var i = startN; i < startN+post_perpage; i++) {
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
function getList(isPre,idx){
    if(isPre==true)u="preList";
    else u="postList";
    $.ajax({
        url:u+"?range="+idx,
        type : "get",
        dataType : 'json',
        success:(data)=>{
            news_imgList=[];
            news_titleList=[];
            news_linkList=[];
            news_lastIdx=data[data.length-1].article_idx;
            news_firstIdx=data[0].article_idx;
            for(var i=0;i<data.length;i++){
                news_imgList.push(data[i].article_img);
                news_titleList.push(data[i].article_title);
                news_linkList.push(data[i].article_url);
            }
            console.log("lastidx:"+news_lastIdx);
            console.log("startidx"+news_firstIdx);
        },error:()=>{
            console.log("통신실패");
        }
    })
}
//

