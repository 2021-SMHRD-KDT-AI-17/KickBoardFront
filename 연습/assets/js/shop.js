/* class
goodsDiv - 상품 전체 영역
goodsImg - 상품 이미지 영역
goodsAdd - 상품 장바구니에 추가버튼(p태그)
goodsName - 상품 이름
goodsPrice - 상품 가격
goodsInven - 상품 재고
 */
const divs = document.getElementsByClassName("goodsDiv");
const imgs = document.getElementsByClassName("goodsImg");
const carts = document.getElementsByClassName("goodsAdd");
const names = document.getElementsByClassName("goodsName");
const prices = document.getElementsByClassName("goodsPrice");
const inventory = document.getElementsByClassName("goodsInven");
let goods_idxList = [];
let goods_nameList = [];
let goods_imgList = [];
let goods_priceList = [];
let goods_inventory = [];
let goods_lastIdx; //페이징 할 글 끝 IDX
let goods_firstIdx;
const goods_perpage = 8; //페이지 당 굿즈 수
const idx_count = 5; //아래 버튼 수
let goods_pageNow = 1; //전체 페이지
let active_page = 1; //현재 선택 페이징
//버튼
const atags = document.querySelectorAll('a[class="enum"]');
atags[0].className = "invisible";
atags[1].className = "active";
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
//초기값
getList(true, false, 0);
//클로저 적용
function listChange(i, idx) {
    //즉시실행함수
    (() => {
        atags[i].addEventListener('click', () => {
            if (active_page != idx) {
                atags[active_page].classList.remove('active');
                atags[idx].className = "active";
                active_page = idx;
                showGoodsList((idx - 1) * goods_perpage);
            }
        });
    })();
}
function cartbutton(listnum, itemidx){
    (()=>{
        console.log(listnum);
        console.log(itemidx);
        carts[listnum].setAttribute("style", "cursor:pointer;");
        carts[listnum].removeEventListener();
        carts[listnum].addEventListener('click',()=>{
            $.ajax({
                url: 'goodsAddcart?idx=' + itemidx,
                type: "get",
                dataType: 'json',
                success: (data) => {
                    if (data == null)
                        alert("장바구니 담기에 실패했습니다");
                    else
                        alert("'" + data.goods_name + "'을 장바구니에 담았습니다");
                }, error: () => {
                    alert("통신실패-다시 시도해주세요");
                }
            })
        });
    })();
}
function pre_post(option) {
    if (option == "post") {
        /*console.log("post");*/
        goods_pageNow++;
        atags[active_page].classList.remove('active');
        atags[0].classList.remove('invisible');
        atags[1].className = "active";
        active_page = 1;
        getList(goods_lastIdx);
    } else if (option == "pre" && goods_pageNow != 1) {
        /*console.log("pre")*/;
        goods_pageNow--;
        atags[active_page].classList.remove('active');
        atags[1].className = "active";
        active_page = 1;
        if (goods_pageNow == 1) atags[0].className = "invisible";
        getList(goods_firstIdx);
        atags[idx_count + 1].classList.remove('invisible');
    }
    for (i = 1; i < atags.length - 1; i++) {
        var num = Number(goods_pageNow * (idx_count));
        atags[i].innerText = num - (idx_count - i);
    }
}
function showGoodsList(startN) {
    var listnum = 0;
    for (var i = startN; i < startN + goods_perpage; i++) {
        carts[listnum].classList.remove('style');
        if (goods_idxList[i] != null) {
            let itemidx=Number(goods_idxList[i]);
            console.log(itemidx);
            divs[listnum].classList.remove("invisible");
            imgs[listnum].setAttribute('src', goods_imgList[i]);
            cartbutton(listnum, itemidx);
            // carts[listnum].addEventListener('click', addcart(itemidx));
            
            names[listnum].innerText = goods_nameList[i];
            prices[listnum].innerText = goods_priceList[i];
            inventory[listnum].innerText = goods_inventory[i];
        } else {
            divs[listnum].className += " invisible";
        }
        listnum++;
    }
}
function pagebuttonShow(listCount, lastIdx) {
    let CNT = listCount / (goods_perpage);
    let buttonCNT;
    if (listCount % (goods_perpage) == 0)
        buttonCNT = CNT;
    else
        buttonCNT = CNT + 1;
    for (var i = 1; i < idx_count + 1; i++) {
        if (buttonCNT >= i) {
            atags[i].classList.remove('invisible');
        }
        else {
            atags[i].className += " invisible";
        }
    }
    if (listCount < goods_perpage * idx_count || lastIdx == 1)
        atags[idx_count + 1].className += " invisible";
}
function getList(init, isPre, idx) {
    let u;
    if (init == true) u = "goodsFirstList";
    else {
        if (isPre == true) u = "goodsPreList";
        else u = "goodsPostList";
        u += "?range=" + idx;
    }
    $.ajax({
        url: u,
        type: "get",
        dataType: 'json',
        success: (data) => {
            goods_idxList = [];
            goods_nameList = [];
            goods_imgList = [];
            goods_priceList = [];
            goods_inventory = [];
            goods_lastIdx = data[data.length - 1].goods_idx;
            goods_firstIdx = data[0].goods_idx;
            for (var i = 0; i < data.length; i++) {
                if (data[i] != null) {
                    goods_idxList.push(data[i].goods_idx);
                    goods_nameList.push(data[i].goods_name);
                    goods_imgList.push(data[i].goods_img);
                    goods_priceList.push(data[i].goods_price);
                    goods_inventory.push(data[i].goods_inventory);
                }
            }
            showGoodsList(0);
            pagebuttonShow(data.length, goods_lastIdx);
        }, error: () => {
            console.log("통신실패");
        }
    })
}
function addcart(idx) {

}