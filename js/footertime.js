//本站运行时间
function show_date_time(){
$('.framework-info').html('本站已运行<span id="span_dt_dt" style="color: #fff;"></span>');
window.setTimeout("show_date_time()", 1000);
BirthDay=new Date("7/25/2022 0:0:0");
today=new Date();
timeold=(today.getTime()-BirthDay.getTime());
sectimeold=timeold/1000
secondsold=Math.floor(sectimeold);
msPerDay=24*60*60*1000
e_daysold=timeold/msPerDay
daysold=Math.floor(e_daysold);
e_hrsold=(e_daysold-daysold)*24;
hrsold=Math.floor(e_hrsold);
e_minsold=(e_hrsold-hrsold)*60;
minsold=Math.floor((e_hrsold-hrsold)*60);
seconds=Math.floor((e_minsold-minsold)*60);
span_dt_dt.innerHTML='<font style="color:#2d85f0; font-size: 20px;">'+daysold+'</font> 天 <font style="color:#f4433c; font-size: 20px;">'+hrsold+'</font> 时 <font style="color:#ffbc32; font-size: 20px;">'+minsold+'</font> 分 <font style="color:#0aa858; font-size: 20px;">'+seconds+'</font> 秒';
}
$(document).ready(function(e){
    show_date_time();
})