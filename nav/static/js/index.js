/** ---------------------------------- 
 * 小枫毛玻璃UI-个人引导页
 * https://www.xfabe.com
 * 小枫<1809185784@qq.com>
 -------------------------------------- */
$(window).on('load', function handlePreloader(){
    if($('.xf_load').length){
        $('.xf_load').delay(2000).fadeOut(1800)
    }
})

var swiper = new Swiper(".xf_ico_banner", {
    navigation: {
        nextEl: ".swiper-button-next-ico",
        prevEl: ".swiper-button-prev-ico",
    },
})

var modal = document.getElementById('myModal')
var img = document.getElementById('xf_wxImg')
var modalImg = document.getElementById("img01")
var captionText = document.getElementById("caption")

img.onclick = function(){
    modal.style.display = "block"
    modalImg.src = this.src
    captionText.innerHTML = this.alt
}

var span = document.getElementsByClassName("close")[0]
span.onclick = function(){
    modal.style.display = 'none'
}

const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")

clock = () => {
    let today = new Date()
    let h = (today.getHours() % 12) + today.getMinutes() / 59;
    let m = today.getMinutes()
    let s = today.getSeconds()
    h *= 30
    m *= 6
    s *= 6
    rotation(hours, h)
    rotation(minutes, m)
    rotation(seconds, s)
    setTimeout(clock, 500)
}

rotation = (target, val) => {
    target.style.transform = `rotate(${val}deg)`
}

window.onload = clock()

$(function(){
    updateTime(); // call updateTime function initially
    setInterval(updateTime, 500); // call updateTime function every 500ms
});

function updateTime() {
    var xf_time = new Date();
    var xf_hour = xf_time.getHours() + ':';
    var xf_branch = xf_time.getMinutes();
    var myDate = new Date();
    var xf_year = myDate.getFullYear();
    var xf_mon = myDate.getMonth() + 1;
    var xf_date = myDate.getDate();
    var xf_week = new Date();
    var week = xf_week.getDay();
    var weeks = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
    $(".xf_time_1").html(xf_hour + xfppp(xf_branch));
    $(".xf_time_2").html(xf_year + "年" + xfppp(xf_mon) + "月" + xfppp(xf_date) + "日 ");
    $(".xf_time_3").html(weeks[week]);
}

function xfppp(s){
    return s < 10 ? '0' + s : s;
}

function getClick(event){
    if(event.button == 2){
        swal('为了不影响页面美观, 这边禁用您了您的右键！')
        document.oncontextmenu = new Function('event.returnValue=false;')
    }
}

$('.xf_zhuanfa').click(function(){
    let transfer = document.createElement('input')
    document.body.appendChild(transfer)
    transfer.style.cssText = 'position: absolute; right: 45%; top: 80%;'
    transfer.value = document.domain
    transfer.focus()
    transfer.select()
    if(document.execCommand('copy')){
        document.execCommand('copy')
    }
    transfer.blur()
    swal('复制本站域名成功!')
    document.body.removeChild(transfer)
})

let qixiazhandian = document.querySelector('.but_site')
let jinriyunshi = document.querySelector('.but_fortune')
let xf_fortune = document.querySelector('.xf_fortune')
let xf_site = document.querySelector('.xf_site')

qixiazhandian.addEventListener('click', function(){
    xf_fortune.style.display = 'none'
    xf_site.style.display = 'block'
})

jinriyunshi.addEventListener('click', function(){
    xf_fortune.style.display = 'block'
    xf_site.style.display = 'none'
})

// 修改部分开始，新的 API URL
var url = "https://api.vvhan.com/api/wyMusic/%E7%83%AD%E6%AD%8C%E6%A6%9C?type=json"; // 新的 API URL
var musicInfo = []
var nowmusic = ''
var audio = $("<audio />")
var musicimg = $("<img>")
var song = $("<div></div>")
var auther = $("<div></div>")
var isPaused = true // 进入页面时默认暂停状态
var isMuted = false
var len = 0
var nowloca = 0
var volume = 1
var playTimeout

// 尝试播放音乐，如果加载时长为0，则自动切换到下一首
function tryPlayMusic() {
    clearTimeout(playTimeout);
    playTimeout = setTimeout(() => {
        if (isNaN(audio[0].duration) || audio[0].duration === 0) {
            console.log("歌曲时长为0或未加载，自动切下一首...");
            nextMusic();
        } else {
            console.log("歌曲时长有效，继续播放...");
        }
    }, 5000);

    audio[0].play().catch(() => {
        console.log("播放失败，尝试自动切下一首...");
        nextMusic();
    });
}

function init(){
    $.ajax({
        url: url,
        type: "get",
        dataType: 'json',
        success: function(res){
            if (res) {
                audio.attr("src", res.info.url);  // 新 API 音乐 URL 字段
                $(".musicbox").append(audio);
                musicimg.attr("src", res.info.pic_url);  // 新 API 封面图片字段
                musicimg.addClass("musicimg");
                $(".music-img").append(musicimg);
                auther.text(res.info.auther);  // 新 API 作者字段
                auther.addClass("auther");
                song.text(res.info.name);  // 新 API 歌曲名称字段
                song.addClass("name");
                $(".music-info").append(song);
                $(".music-info").append(auther);
                len = 1;
                nowloca = 1;
                musicInfo.push(res.info);
                nowmusic = res.info;

                // 设置初始状态为暂停
                audio[0].pause(); 
                musicimg.css("animation-play-state", "paused"); 
                $("#pause").html("&#xea82;"); // 暂停图标
            } else {
                swal('错误', '音乐数据无效', 'error');
            }
        },
        error: function(xhr, status, error) {
            swal('错误', '加载音乐数据失败', 'error');
            console.error("API 错误:", error);
        }
    });
}

$('#icon-rotate').click(() => {
    $('.xf_right_box ').css('transform','rotateY(180deg)')
    $('.xf_music_box').css('display','none')
    $('.xf_friends').css('display','block')
})

$('#xf-friend-rotate').click(() => {
    $('.xf_right_box ').css('transform','rotateY(0deg)')
    $('.xf_music_box').css('display','block')
    $('.xf_friends').css('display','none')
})

$(function(){
    init()
    setTimer()
})

function ProgressBar(){
    var duration = audio.prop("duration")
    var currentTime = audio.prop("currentTime")
    let m = parseInt(duration / 60)
    let s = parseInt(duration % 60)
    let sm = parseInt(currentTime / 60)
    let ss = parseInt(currentTime % 60)

    if(s > 9){
        let end = '0' + m + ':' + s
        $(".end").text(end)
    } else {
        let end = '0' + m + ':0' + s
        $(".end").text(end)
    }

    if(sm > 0){
        if(ss > 9){
            let runtime = '0' + sm + ':' + ss
            $(".start").text(runtime)
        } else {
            let runtime = '0' + sm + ':0' + ss
            $(".start").text(runtime)
        }
    } else {
        if(ss > 9){
            let runtime = '0' + sm + ':' + ss
            $(".start").text(runtime)
        } else {
            let runtime = '0' + sm + ':0' + ss
            $(".start").text(runtime)
        }
    }

    let width = $(".running").css("width")
    let rate = currentTime / duration
    width = parseFloat(width) * parseFloat(rate)
    $(".running1").css("width", parseInt(width))

    if(duration == currentTime){
        $.ajax({
            url: url,
            type: "get",
            dataType: 'json',
            success: function(res){
                nowmusic = res.info
                musicInfo.push(nowmusic)
                len = musicInfo.length
                nowloca = len
                audio.prop("src", nowmusic.url)
                musicimg.prop("src", nowmusic.pic_url)
                auther.text(nowmusic.auther)
                song.text(nowmusic.name)

                // 尝试播放音乐
                tryPlayMusic()
            }
        })
    }
}

function replayMusic(){
    audio.prop("src", nowmusic.url)
    musicimg.prop("src", nowmusic.pic_url)
    auther.text(nowmusic.auther)
    song.text(nowmusic.name)

    // 尝试播放音乐
    tryPlayMusic()
}

var bool
function pauseMusic(){
    if(isPaused){
        audio[0].play()
        musicimg.css("animation-play-state", "running")
        $("#pause").html("&#xe638;")
        bool = true
    } else {
        audio[0].pause()
        musicimg.css("animation-play-state", "paused")
        $("#pause").html("&#xea82;")
        bool = false
    }
    isPaused = !isPaused
}

if(bool === false){
    console.log(111);
    $('#music-img').css('animationPlayState', 'paused')
}

function muteMusic(){
    var player = document.getElementsByTagName("audio")
    if(isMuted){
        player[0].muted = false
        $("#mute").html("&#xe64c;")
    } else {
        player[0].muted = true
        $("#mute").html("&#xe65e;")
    }
    isMuted = !isMuted
}

function preMusic(){
    if(nowloca == 1){
        swal("这是第一首歌曲了！")
    } else {
        nowloca = nowloca - 1
        nowmusic = musicInfo[nowloca - 1]
        audio.prop("src", nowmusic.url)
        musicimg.prop("src", nowmusic.pic_url)
        auther.text(nowmusic.auther)
        song.text(nowmusic.name)

    }
}

function nextMusic(){
    if(nowloca == len){
        $.ajax({
            url: url,
            type: "get",
            dataType: 'json',
            success: function(res){
                nowmusic = res.info
                musicInfo.push(nowmusic)
                len = musicInfo.length
                nowloca = len
                audio.prop("src", nowmusic.url)
                musicimg.prop("src", nowmusic.pic_url)
                auther.text(nowmusic.auther)
                song.text(nowmusic.name)

                // 尝试播放音乐
                tryPlayMusic()
            }
        })
    } else {
        nowmusic = musicInfo[nowloca]
        audio.prop("src", nowmusic.url)
        musicimg.prop("src", nowmusic.pic_url)
        auther.text(nowmusic.auther)
        song.text(nowmusic.name)
        nowloca = nowloca + 1

    }
}

function changeVulme(e){
    $(".vulmeBar").click(function(e){
        let x = e.offsetX
        let y = e.offsetY
        if(x >= 0 && x <= 5 || y <= 0){
            volume = x / 100
            audio.prop("volume", volume)
            $(".vulmeBar1").css("width", volume * 100)
        }
    });
}

function changeProgress(){
    $(".running").click(function(e){
        let x = e.offsetX
        let y = e.offsetY
        var duration = audio.prop("duration")
        if(x >= 0 && x <= 258 || y <= 0){
            let l = x / 258
            let time = l * duration
            document.getElementsByTagName("audio")[0].currentTime = time
            $(".running1").css("width", x)
        }
    });
}

function setTimer(){
    setInterval(() => {
        ProgressBar()
        if($(".vulme").css("width") === '60px'){
            $(".vulmeBar").css("width", 100)
            $(".vulmeBar1").css("width", volume * 100)
        } else {
            $(".vulmeBar").css("width", 0)
            $(".vulmeBar1").css("width", 0)
        }
    }, 1000)
}

WIDGET = {
    "CONFIG": {
        "layout": "1",
        "width": "450",
        "height": "150",
        "background": "5",
        "dataColor": "FFFFFF",
        "language": "zh",
        "modules": "01",
        "key": "fd1825a4fe1143358e87812636b4fe5b"
    }
}

let xf_now_width1 = document.body.clientWidth
let xf_now_width2 = window.screen.width

if(xf_now_width1 < 992 || xf_now_width2 < 992){
    $('.big_box').addClass('swiper mySwiper')
    $('.main_content').addClass('swiper-wrapper')
    $('.slidebox').addClass('swiper-slide')
    $('#icon-rotate').click(()=>{
        $('.xf_right_box ').css('transform','rotateY(360deg)')
        $('.xf_music_box').css('display','none')
        $('.xf_friends').css('display','block')
    })
    $('#xf-friend-rotate').click(()=>{
        $('.xf_right_box ').css('transform','rotateY(0deg)')
        $('.xf_music_box').css('display','block')
        $('.xf_friends').css('display','none')
    })
}

var swiper = new Swiper(".mySwiper", {
    pagination: '.home-slide .swiper-pagination',
    initialSlide: 1,
    observer: true,
    observeParents: true,
    paginationClickable: true,
    pagination: {
        el: ".xf-swiper-pagination",
        clickable: true,
    },
    watchSlidesProgress: true,
    slidesPerView: 1,
});

function orient(){
    if(window.orientation == 0 || window.orientation == 180){
        $("body").attr("class","portrait");
        orientation = 'portrait';
        return false;
    }
    else if(window.orientation == 90 || window.orientation == -90){
        $("body").attr("class","landscape");
        orientation = 'landscape';
        return false;
    }
}

$(function(){
    orient();
});

$(window).bind('orientationchange', function(e){
    orient();
})
