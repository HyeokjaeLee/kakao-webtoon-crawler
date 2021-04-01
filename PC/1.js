const week2 = document.getElementById("week");
const state = document.getElementById("state");
const daum = document.getElementById("DaumStateText");
const naver = document.getElementById("NaverStateText");
const all = document.getElementById("AllStateText");
const home = document.getElementById("HomeStateText");
const about = document.getElementById("AboutStateText")
const selectText = document.getElementById("selectText")
const selectWeek = document.getElementById("top_display_week")
const selectState = document.getElementById("top_display_state")
const webtoonform = document.getElementById("webtoon_contents")
const homedisplay = document.getElementById("home_display_form")
const menuHRweek = document.getElementById("menuHRweek")
const naverReWebtoon = document.getElementById("top_display_naver_recommend_contain")
const daumReWebtoon = document.getElementById("top_display_daum_recommend_contain")
const hiddenHR1 = document.getElementById("hiddenHR1")
const hiddenHR2 = document.getElementById("hiddenHR2")


function showWeek(){
  week2.style.display ='block';
}
function hideWeek(){
  week2.style.display ='none';
}
function showState(){
  state.style.display ='none';
}
function hideWeek() {
  state.style.display ='none';
}

function selWeek(){
  week2.style.display="block";
  state.style.display="none";
}

function selState() {
  week2.style.display="none";
  state.style.display="block";
}

function selDaum() {
  daum.style.display="block";
  naver.style.display="none";
  all.style.display="none";
  home.style.display="none";
  about.style.display="none";
  selectText.style.display="block";
  week2.style.display="block";
  state.style.display="none";
  webtoonform.style.display="block";
  homedisplay.style.display="none";
  menuHRweek.style.display="block";
  naverReWebtoon.style.display="none";
  daumReWebtoon.style.display="block";
  hiddenHR1.style.display="block";
}

function selNaver() {
  daum.style.display="none";
  naver.style.display="block";
  all.style.display="none";
  home.style.display="none";
  about.style.display="none";
  selectText.style.display="block";
  week2.style.display="block";
  state.style.display="none";
  webtoonform.style.display="block";
  homedisplay.style.display="none";
  menuHRweek.style.display="block";
  naverReWebtoon.style.display="block";
  daumReWebtoon.style.display="none";
  hiddenHR1.style.display="block";
  hiddenHR2.style.display="none";
}

function selAll() {
  daum.style.display="none";
  naver.style.display="none";
  all.style.display="block";
  home.style.display="none";
  about.style.display="none";
  selectText.style.display="block";
  week2.style.display="block";
  state.style.display="none";
  webtoonform.style.display="block";
  homedisplay.style.display="none";
  menuHRweek.style.display="block";
  naverReWebtoon.style.display="none";
  daumReWebtoon.style.display="none";
  hiddenHR1.style.display="none";
}

function selHome() {
  daum.style.display="none";
  naver.style.display="none";
  all.style.display="none";
  home.style.display="block";
  about.style.display="none";
  selectText.style.display="none";
  week2.style.display="none";
  state.style.display="none";
  webtoonform.style.display="none";
  homedisplay.style.display="block";
  menuHRweek.style.display="none";
  naverReWebtoon.style.display="block";
  daumReWebtoon.style.display="block";
  hiddenHR1.style.display="none";
}


function abc() {
  get_service_num_reload(1); 
  selNaver();
  location.href="1.html";
}


/*API*/
const api_url = "https://korean-webtoon-hub-project.herokuapp.com/";
var today = new Date();
var week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", "finished", "all"];
var service_num = 0;
var state_num = null;
var week_num = today.getDay();

reload();

function ajax_get(url, callback) {
  //ajax 구현을 위한 함수
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("responseText:" + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };
  xmlhttp.open("GET", url, false); //true는 비동기식, false는 동기식 true로 할시 변수 변경전에 웹페이지가 떠버림
  xmlhttp.send();
}

function get_weeknum_reload(get_week_num) {
  week_num = get_week_num;
  reload();
}

function get_service_num_reload(get_service_num) {
  service_num = get_service_num;
  reload();
}

function get_state_num_reload(get_state_num) {
  week_num = 8;
  state_num = get_state_num;
  reload();
}

function reload() {
  var webtoon_contents = document.getElementById("webtoon_contents");
  webtoon_contents.innerHTML = "";
  var target_api = api_url + week[week_num];
  ajax_get(target_api, function (data) {
    for (i = 0; i < data.length; i++) {
      if (service_num == 0) {
        view_by_state();
      } else if (data[i].service == service_num) {
        view_by_state();
      }

      function view_by_state() {
        if (state_num == null) {
          get_webtoon();
        } else if (data[i].state == state_num) {
          get_webtoon();
        }
      }

      function get_webtoon() {
        //웹툰 정보 받아오기
        var webtoon_link = document.createElement("a");
        webtoon_link.href = data[i].url;
        var new_dt = document.createElement("dt");
        new_dt.classList.add("webtoon_container");
        var new_div = document.createElement("div");
        new_div.classList.add("square");
        var img_container = document.createElement("div");
        img_container.classList.add("content");
        var img_text = document.createElement("div");
        img_text.classList.add("icon");
        var new_dd = document.createElement("dd");
        new_dd.classList.add("webtoon_info");
        if (data[i].img == null) {
          img_container.innerHTML =
            "<img src=../img/noimg.jpg width=25% height=15%>";
        } else {
          img_container.innerHTML =
            "<img style='object-fit:cover;width:100%;'src=" + data[i].img + ">";
        }
        new_dd.innerHTML =
          "<p style='font-size:1.1em;line-height:120%;'>" +
          data[i].title +
          "</p><p style='font-size:0.8em;'>" +
          data[i].artist +
          "</p>";

        switch (data[i].service) {
          case 1:
            img_text.innerHTML = "<img src=../img/naver.png width=30%>";
            break;
          case 2:
            img_text.innerHTML = "<img src=../img/daum.png width=30%>";
            break;
        }
        webtoon_contents.appendChild(webtoon_link);
        webtoon_link.appendChild(new_dt);
        new_dt.appendChild(new_div);
        new_div.appendChild(img_container);
        img_container.appendChild(img_text);
        new_dt.appendChild(new_dd);
      }
    }
  });
}

/*메뉴 클릭 이벤트 */
var menu = document.querySelector('.select123');
		
function clickHandler(e){    // eventHandler써주면 자동으로 들어오지만 활용하려면 e를 써주기.  e는 이벤트 객체로써, 발생한 이벤트에 대한 많은 정보를 담고 있는 객체.
  console.log(e.target);    // event 객체의 타겟
  console.log(e.currentTarget);
  console.log(this);   // this는 menu이다. menu가 addEventLisner를 호출하였으므로
  console.log(this == e.currentTarget);
}

var currentMenu;
var menu = document.querySelector('.select123');


function inactivate(elem){
elem.classList.remove('clicked');
}

function activate(elem){
elem.classList.add('clicked');
currentMenu = elem;
}
function clickHandler(e){    // 보통 이벤트 handler 안에 길게 쓰기 보다 함수를 쓴다.
if (currentMenu){
    inactivate(currentMenu);
}
activate(e.target);
}

menu.addEventListener('click', clickHandler);

// 검색기능

function Wsearch() {
  let search = document.getElementById("search").value.toLowerCase();
  let webtoonCon = document.getElementsByClassName("webtoon_container");

  for (let i = 0; i < webtoonCon.length; i++) {
    webtoon_info = webtoonCon[i].getElementsByClassName("webtoon_info");
    if (webtoon_info[0].innerHTML.toLowerCase().indexOf(search) != -1  ) {
      webtoonCon[i].style.display = "flex"
    } else {
      webtoonCon[i].style.display = "none"
    }
  }
}

//다음 슬라이드 쇼
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

//네이버 슬라이드 쇼
var slideIndexNaver = 1;
showSlides2(slideIndexNaver);

function plusSlides2(n) {
  showSlides2(slideIndexNaver += n);
}

function currentSlide2(n) {
  showSlides2(slideIndexNaver = n);
}

function showSlides2(n) {
  var i;
  var slides2 = document.getElementsByClassName("mySlides2");
  if (n > slides2.length) {slideIndexNaver = 1}    
  if (n < 1) {slideIndexNaver = slides2.length}
  for (i = 0; i < slides2.length; i++) {
      slides2[i].style.display = "none";  
  }
  slides2[slideIndexNaver-1].style.display = "block";  
}



