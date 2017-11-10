(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    // Get the modal
var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

    $(document).ready( () => {
        $.ajax({
            url: `${apiUrl}week`,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                $('#bio').text(data.bio);
                $('#name').text(data.name);
                $('#picture').attr("src", data.url);
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });

        $.ajax({
            url: `${apiUrl}all`,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                console.log(data.length);

                data.sort(function(a, b){return b.score - a.score});

                var $div = $("<div>", {"class": "board"});
                $div.append("<h3>Top Score</h3>")

                for (var i = 0; i < data.length; i++) {
                    var bird = data[i];

                    var $list = $("<div>", {"class": "list"});
                    const $id = $(`<div>${i}</div>`);

                    $list.append(`
                                <div class="list-line">
                                    <div class="list-image"><img src=${bird.url}></div>
                                    <div class="list-text">
                                        <p>${bird.name}</p> 
                                        <p>Score: ${bird.score}</p>
                                    </div>
                                </div>`);
                    $id.hide();
                    $list.append($id);

                    $list.click(() => {
                        birds.sort(function(a, b){return b.score - a.score});
                        modal.style.display = "block";
                        $("#modal-name").text($list.find("div")[0]);
                    });

                    $div.append($list);
                    $div.append(`<hr>`);
                }


                $("#boards").append($div);
                $("#boards").append("<br>");
                $("#boards").append("<br>");
                $("#boards").append("<br>");

                data.sort(function(a, b){return b.views - a.views});

                var $div = $("<div>", {"class": "board"});
                $div.append("<h3>Most Viewed</h3>")

                for (var i = 0; i < data.length; i++) {
                    var bird = data[i];

                    var $list = $("<div>", {"class": "list"});

                    $list.append(`
                                <div class="list-line">
                                    <div class="list-image"><img src=${bird.url}></div>
                                    <div class="list-text"><p>${bird.name}</p> <p>Views: ${bird.views}</p> </div>
                                </div>`);

                    $list.click(() => {
                        modal.style.display = "block";
                        console.log("TEST");
                    });

                    $div.append($list);
                    $div.append(`<hr>`);
                }

                $("#boards").append($div);
                $("#boards").append("<br>");
                $("#boards").append("<br>");
                $("#boards").append("<br>");

                data.sort(function(a, b){return b.date_added - a.date_added});

                var $div = $("<div>", {"class": "board"});
                $div.append("<h3>Newest Uploaded</h3>")

                for (var i = 0; i < data.length; i++) {
                    var bird = data[i];
                    var date = new Date(parseInt(bird.date_added));

                    var $list = $("<div>", {"class": "list"});


                    $list.append(`
                                <div class="list-line">
                                    <div class="list-image"><img src=${bird.url}></div>
                                    <div class="list-text"><p>${bird.name}</p> <p>Date: ${date.customFormat( "#MM#/#DD#/#YYYY# #hh#:#mm#:#ss#" )}</p></div>
                                </div>`);

                    $list.click(() => {
                        modal.style.display = "block";
                        console.log("TEST");
                    });

                    $div.append($list);
                    $div.append(`<hr>`);
                }

                $("#boards").append($div);
                $("#boards").append("<br>");
                $("#boards").append("<br>");
                $("#boards").append("<br>");

            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });

    });

    Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = this;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}


})();