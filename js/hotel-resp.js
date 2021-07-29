//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#revresp-all-pid').is(':checked') === false)){
        $('#revresp-all-pid').prop('checked', true);
        $('#revresp-pid-1').prop('checked', true);
        $('#revresp-pid-2').prop('checked', true);
    }

    $('#revresp__menu__item__btn__1').prop('disabled', true);
    $('#revresp__menu__item__btn__1').css({
        'cursor':'no-drop',
        'background-color':'#f0f0f0',
    });
});


// For Hotel Resp Graph [2020]
function revHotelRespAPICall__2020() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getHotelResp2020')
    .then(response => response.json())
    .then(data => loadRevHotelRespData__2020(data));
}
//Loading Review v Hotel Response Data [2020]
function loadRevHotelRespData__2020(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for Review Score vs Hotel Response Graph
    let rev_score       = [];
    let mon             = [];
    let total_rev       = [];
    let rev_with_resp   = [];
    let resp_bool       = [];
    
    let rev_score_pid_1         = [];     let rev_score_pid_2             = [];/*19*/ let rev_score_pid_all      = [];
    let total_rev_pid_1         = [];     let total_rev_pid_2             = [];       let total_rev_pid_all      = [];
    let rev_with_resp_pid_1     = [];     let rev_with_resp_pid_2         = [];       let rev_with_resp_pid_all  = [];
    let resp_bool_pid_1         = [];     let resp_bool_pid_2             = [];       let resp_bool_pid_all      = [];
    let mon_pid_1               = [];     let mon_pid_2                   = [];       let mon_pid_all            = [];
                                          let mon_total_rev_pid_2         = [];//19
    let mon_rev_with_resp_pid_1 = [];     let mon_rev_with_resp_pid_2     = [];//18

    if(data.length === 0){
        document.write('no data');
    }else{
        //Splitting data
        dataSplittor_RevResp__2020(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
        //Loading data
        dataLoader_RevResp__2020(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all);
    
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool [2020]
function dataSplittor_RevResp__2020(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all) {
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    
    for (let i = 1; i <= parsed_data.length; i++) {
        //Avg. Review Score for pid = all
        if ( i <= 11 ) {
            mon_pid_all[u] = parsed_data[i-1].revdate;
            rev_score_pid_all[u] = parseFloat( parsed_data[i-1].revscr );
            u+=1;
        }
        //Avg. Review Score for pid = 1
        if ((i > 11) && (i <= 22)) {
            rev_score_pid_1[v] = parseFloat( parsed_data[i-1].revscr );
            v+=1;
        }
        //Avg. Review Score for pid = 2
        if ( (i > 22) && (i <= 33) ) {
            rev_score_pid_2[w] = parseFloat( parsed_data[i-1].revscr );
            w+=1;
        }

        //Total Reviews for pid = all
        if ( (i > 33) && (i <= 44) ) {
            total_rev_pid_all[x] = parseFloat( parsed_data[i-1].revscr );
            x+=1;
        }
        //Total Reviews for pid = 1
        if ( (i > 44) && (i <= 55) ) {
            total_rev_pid_1[y] = parseFloat( parsed_data[i-1].revscr );
            y+=1;
        }
        //Total Reviews for pid = 2
        if ( (i > 55) && (i <= 66) ) {
            total_rev_pid_2[z] = parseFloat( parsed_data[i-1].revscr );
            z+=1;
        }
        //Reviews with Hotel Response for pid = all
        if ( (i > 66) && (i <= 77) ) {
            rev_with_resp_pid_all[r] = parseFloat( parsed_data[i-1].revscr );
            r+=1;
        }
        //Reviews with Hotel Response for pid = 1
        if ( (i > 77) && (i <= 87) ) {
            mon_rev_with_resp_pid_1[s] = parsed_data[i-1].revdate;
            rev_with_resp_pid_1[s] = parseFloat( parsed_data[i-1].revscr );
            s+=1;
        }
        //Reviews with Hotel Response for pid = 2
        if ( (i > 87) && (i <= 98) ) {
            rev_with_resp_pid_2[t] = parseFloat( parsed_data[i-1].revscr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < mon_rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool [2020]
function dataLoader_RevResp__2020(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all){
    let c = 0;

    if ($('#revresp-all-pid').is(':checked') === true){
        c=0;
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        revHotelRespGraph(rev_score, mon, resp_bool, c);
        delete ( rev_score, mon, resp_bool );
    }
    $('#revresp-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;
            document.getElementById('rev-resp-canvas').style.display = 'block';
            
            
            $('#revresp-pid-1').prop('checked', true);
            $('#revresp-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph(rev_score, mon, resp_bool, c);
            delete(rev_score, mon, resp_bool);

        }else{
            
            $('#revresp-pid-1').prop('checked', false);
            $('#revresp-pid-2').prop('checked', false);
            c=0;
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            c+=1;
            revHotelRespGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    $('#revresp-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revresp-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c=0;
                
                $('#revresp-all-pid').prop('checked', false);
                $('#revresp-pid-2').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }else{                                            //if 2 is checked, load pid all data
                c=0;
                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }
             

        }else{
            
            if ( ($('#revresp-pid-2').is(':checked') === false) && ($('#revresp-all-pid').is(':checked') === false) ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            } else if ( $('#revresp-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#revresp-all-pid').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete (rev_score, mon, resp_bool);
            }

        }
    });
    $('#revresp-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );

            }else {
                //Then display pid all data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }else{

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);
                

            }else if ( $('#revresp-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#revresp-all-pid').prop('checked', false);

                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }
    });

}


// For Hotel Resp Graph [This Year]
function revHotelRespAPICall__ThisYear() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getHotelRespThisYear')
    .then(response => response.json())
    .then(data => loadRevHotelRespData__ThisYear(data));
}
//Loading Review v Hotel Response Data [This Year]
function loadRevHotelRespData__ThisYear(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for Review Score vs Hotel Response Graph
    let rev_score       = [];
    let mon             = [];
    let total_rev       = [];
    let rev_with_resp   = [];
    let resp_bool       = [];
    
    let rev_score_pid_1         = [];     let rev_score_pid_2             = [];/*19*/ let rev_score_pid_all      = [];
    let total_rev_pid_1         = [];     let total_rev_pid_2             = [];       let total_rev_pid_all      = [];
    let rev_with_resp_pid_1     = [];     let rev_with_resp_pid_2         = [];       let rev_with_resp_pid_all  = [];
    let resp_bool_pid_1         = [];     let resp_bool_pid_2             = [];       let resp_bool_pid_all      = [];
    let mon_pid_1               = [];     let mon_pid_2                   = [];       let mon_pid_all            = [];
                                          let mon_total_rev_pid_2         = [];//19
    let mon_rev_with_resp_pid_1 = [];     let mon_rev_with_resp_pid_2     = [];//18

    if(data.length === 0){
        document.write('no data');
    }else{
        //Splitting data
        dataSplittor_RevResp__ThisYear(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
        //Loading data
        dataLoader_RevResp__ThisYear(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all);
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool [This Year]
function dataSplittor_RevResp__ThisYear(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all) {
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;

    //Getting Current Month
    var date = new Date();
    var n = date.getMonth() + 1;
    
    
    for (let i = 1; i <= parsed_data.length; i++) {
        //Avg. Review Score for pid = all
        if ( i <= n ) {
            mon_pid_all[u] = parsed_data[i-1].revdate;
            rev_score_pid_all[u] = parseFloat( parsed_data[i-1].revscr );
            u+=1;
        }
        //Avg. Review Score for pid = 1
        if ((i > n) && (i <= (n*2))) {
            rev_score_pid_1[v] = parseFloat( parsed_data[i-1].revscr );
            v+=1;
        }
        //Avg. Review Score for pid = 2
        if ( (i > (n*2)) && (i <= (n*3)) ) {
            rev_score_pid_2[w] = parseFloat( parsed_data[i-1].revscr );
            w+=1;
        }

        //Total Reviews for pid = all
        if ( (i > (n*3)) && (i <= (n*4)) ) {
            total_rev_pid_all[x] = parseFloat( parsed_data[i-1].revscr );
            x+=1;
        }
        //Total Reviews for pid = 1
        if ( (i > (n*4)) && (i <= (n*5)) ) {
            total_rev_pid_1[y] = parseFloat( parsed_data[i-1].revscr );
            y+=1;
        }
        //Total Reviews for pid = 2
        if ( (i > (n*5)) && (i <= (n*6)) ) {
            total_rev_pid_2[z] = parseFloat( parsed_data[i-1].revscr );
            z+=1;
        }
        //Reviews with Hotel Response for pid = all
        if ( (i > (n*6)) && (i <= (n*7)) ) {
            rev_with_resp_pid_all[r] = parseFloat( parsed_data[i-1].revscr );
            r+=1;
        }
        //Reviews with Hotel Response for pid = 1
        if ( (i > (n*7)) && (i <= (n*8)) ) {
            mon_rev_with_resp_pid_1[s] = parsed_data[i-1].revdate;
            rev_with_resp_pid_1[s] = parseFloat( parsed_data[i-1].revscr );
            s+=1;
        }
        //Reviews with Hotel Response for pid = 2
        if ( (i > (n*8)) && (i <= (n*9)) ) {
            rev_with_resp_pid_2[t] = parseFloat( parsed_data[i-1].revscr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < mon_rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (date,n,r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool [This Year]
function dataLoader_RevResp__ThisYear(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all){
    let c = 0;

    if ($('#revresp-all-pid').is(':checked') === true){
        c=0;
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        revHotelRespGraph(rev_score, mon, resp_bool, c);
        delete ( rev_score, mon, resp_bool );
    }
    $('#revresp-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;
            document.getElementById('rev-resp-canvas').style.display = 'block';
            
            
            $('#revresp-pid-1').prop('checked', true);
            $('#revresp-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph(rev_score, mon, resp_bool, c);
            delete(rev_score, mon, resp_bool);

        }else{
            
            $('#revresp-pid-1').prop('checked', false);
            $('#revresp-pid-2').prop('checked', false);
            c=0;
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            c+=1;
            revHotelRespGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    $('#revresp-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revresp-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c=0;
                
                $('#revresp-all-pid').prop('checked', false);
                $('#revresp-pid-2').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }else{                                            //if 2 is checked, load pid all data
                c=0;
                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }
             

        }else{
            
            if ( ($('#revresp-pid-2').is(':checked') === false) && ($('#revresp-all-pid').is(':checked') === false) ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            } else if ( $('#revresp-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#revresp-all-pid').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete (rev_score, mon, resp_bool);
            }

        }
    });
    $('#revresp-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );

            }else {
                //Then display pid all data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }else{

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);
                

            }else if ( $('#revresp-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#revresp-all-pid').prop('checked', false);

                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }
    });

}


// For Hotel Resp Graph [Last 06 Months]
function revHotelRespAPICall__06() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getHotelResp06')
    .then(response => response.json())
    .then(data => loadRevHotelRespData__06(data));
}
//Loading Review v Hotel Response Data [Last 06 Months]
function loadRevHotelRespData__06(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for Review Score vs Hotel Response Graph
    let rev_score       = [];
    let mon             = [];
    let total_rev       = [];
    let rev_with_resp   = [];
    let resp_bool       = [];
    
    let rev_score_pid_1         = [];     let rev_score_pid_2             = [];/*19*/ let rev_score_pid_all      = [];
    let total_rev_pid_1         = [];     let total_rev_pid_2             = [];       let total_rev_pid_all      = [];
    let rev_with_resp_pid_1     = [];     let rev_with_resp_pid_2         = [];       let rev_with_resp_pid_all  = [];
    let resp_bool_pid_1         = [];     let resp_bool_pid_2             = [];       let resp_bool_pid_all      = [];
    let mon_pid_1               = [];     let mon_pid_2                   = [];       let mon_pid_all            = [];
                                          let mon_total_rev_pid_2         = [];//19
    let mon_rev_with_resp_pid_1 = [];     let mon_rev_with_resp_pid_2     = [];//18

    if(data.length === 0){
        document.write('no data');
    }else{
        //Splitting data
        dataSplittor_RevResp__06(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
        //Loading data
        dataLoader_RevResp__06(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all);
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool [Last 06 Months]
function dataSplittor_RevResp__06(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all) {
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    
    for (let i = 1; i <= parsed_data.length; i++) {
        //Avg. Review Score for pid = all
        if ( i <= 6 ) {
            mon_pid_all[u] = parsed_data[i-1].revdate;
            rev_score_pid_all[u] = parseFloat( parsed_data[i-1].revscr );
            u+=1;
        }
        //Avg. Review Score for pid = 1
        if ((i > 6) && (i <= 12)) {
            rev_score_pid_1[v] = parseFloat( parsed_data[i-1].revscr );
            v+=1;
        }
        //Avg. Review Score for pid = 2
        if ( (i > 12) && (i <= 18) ) {
            rev_score_pid_2[w] = parseFloat( parsed_data[i-1].revscr );
            w+=1;
        }

        //Total Reviews for pid = all
        if ( (i > 18) && (i <= 24) ) {
            total_rev_pid_all[x] = parseFloat( parsed_data[i-1].revscr );
            x+=1;
        }
        //Total Reviews for pid = 1
        if ( (i > 24) && (i <= 30) ) {
            total_rev_pid_1[y] = parseFloat( parsed_data[i-1].revscr );
            y+=1;
        }
        //Total Reviews for pid = 2
        if ( (i > 30) && (i <= 36) ) {
            total_rev_pid_2[z] = parseFloat( parsed_data[i-1].revscr );
            z+=1;
        }
        //Reviews with Hotel Response for pid = all
        if ( (i > 36) && (i <= 42) ) {
            rev_with_resp_pid_all[r] = parseFloat( parsed_data[i-1].revscr );
            r+=1;
        }
        //Reviews with Hotel Response for pid = 1
        if ( (i > 42) && (i <= 48) ) {
            mon_rev_with_resp_pid_1[s] = parsed_data[i-1].revdate;
            rev_with_resp_pid_1[s] = parseFloat( parsed_data[i-1].revscr );
            s+=1;
        }
        //Reviews with Hotel Response for pid = 2
        if ( (i > 48) && (i <= 54) ) {
            rev_with_resp_pid_2[t] = parseFloat( parsed_data[i-1].revscr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < mon_rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool [Last 06 Months]
function dataLoader_RevResp__06(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all){
    let c = 0;

    if ($('#revresp-all-pid').is(':checked') === true){
        c=0;
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        revHotelRespGraph(rev_score, mon, resp_bool, c);
        delete ( rev_score, mon, resp_bool );
    }
    $('#revresp-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;
            document.getElementById('rev-resp-canvas').style.display = 'block';
            
            
            $('#revresp-pid-1').prop('checked', true);
            $('#revresp-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph(rev_score, mon, resp_bool, c);
            delete(rev_score, mon, resp_bool);

        }else{
            
            $('#revresp-pid-1').prop('checked', false);
            $('#revresp-pid-2').prop('checked', false);
            c=0;
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            c+=1;
            revHotelRespGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    $('#revresp-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revresp-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c=0;
                
                $('#revresp-all-pid').prop('checked', false);
                $('#revresp-pid-2').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }else{                                            //if 2 is checked, load pid all data
                c=0;
                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }
             

        }else{
            
            if ( ($('#revresp-pid-2').is(':checked') === false) && ($('#revresp-all-pid').is(':checked') === false) ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            } else if ( $('#revresp-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#revresp-all-pid').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete (rev_score, mon, resp_bool);
            }

        }
    });
    $('#revresp-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );

            }else {
                //Then display pid all data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }else{

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);
                

            }else if ( $('#revresp-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#revresp-all-pid').prop('checked', false);

                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }
    });

}


// For Hotel Resp Graph [Last 03 Months]
function revHotelRespAPICall__03() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getHotelResp03')
    .then(response => response.json())
    .then(data => loadRevHotelRespData__03(data));
}
//Loading Review v Hotel Response Data [Last 03 Months]
function loadRevHotelRespData__03(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for Review Score vs Hotel Response Graph
    let rev_score       = [];
    let mon             = [];
    let total_rev       = [];
    let rev_with_resp   = [];
    let resp_bool       = [];
    
    let rev_score_pid_1         = [];     let rev_score_pid_2             = [];/*19*/ let rev_score_pid_all      = [];
    let total_rev_pid_1         = [];     let total_rev_pid_2             = [];       let total_rev_pid_all      = [];
    let rev_with_resp_pid_1     = [];     let rev_with_resp_pid_2         = [];       let rev_with_resp_pid_all  = [];
    let resp_bool_pid_1         = [];     let resp_bool_pid_2             = [];       let resp_bool_pid_all      = [];
    let mon_pid_1               = [];     let mon_pid_2                   = [];       let mon_pid_all            = [];
                                          let mon_total_rev_pid_2         = [];//19
    let mon_rev_with_resp_pid_1 = [];     let mon_rev_with_resp_pid_2     = [];//18

    if(data.length === 0){
        document.write('no data');
    }else{
        //Splitting data
        dataSplittor_RevResp__03(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
        
        //Loading data
        dataLoader_RevResp__03(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all);
    
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool [Last 03 Months]
function dataSplittor_RevResp__03(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all) {
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    
    for (let i = 1; i <= parsed_data.length; i++) {
        //Avg. Review Score for pid = all
        if ( i <= 3 ) {
            mon_pid_all[u] = parsed_data[i-1].revdate;
            rev_score_pid_all[u] = parseFloat( parsed_data[i-1].revscr );
            u+=1;
        }
        //Avg. Review Score for pid = 1
        if ((i > 3) && (i <= 6)) {
            rev_score_pid_1[v] = parseFloat( parsed_data[i-1].revscr );
            v+=1;
        }
        //Avg. Review Score for pid = 2
        if ( (i > 6) && (i <= 9) ) {
            rev_score_pid_2[w] = parseFloat( parsed_data[i-1].revscr );
            w+=1;
        }

        //Total Reviews for pid = all
        if ( (i > 9) && (i <= 12) ) {
            total_rev_pid_all[x] = parseFloat( parsed_data[i-1].revscr );
            x+=1;
        }
        //Total Reviews for pid = 1
        if ( (i > 12) && (i <= 15) ) {
            total_rev_pid_1[y] = parseFloat( parsed_data[i-1].revscr );
            y+=1;
        }
        //Total Reviews for pid = 2
        if ( (i > 15) && (i <= 18) ) {
            total_rev_pid_2[z] = parseFloat( parsed_data[i-1].revscr );
            z+=1;
        }
        //Reviews with Hotel Response for pid = all
        if ( (i > 18) && (i <= 21) ) {
            rev_with_resp_pid_all[r] = parseFloat( parsed_data[i-1].revscr );
            r+=1;
        }
        //Reviews with Hotel Response for pid = 1
        if ( (i > 21) && (i <= 24) ) {
            mon_rev_with_resp_pid_1[s] = parsed_data[i-1].revdate;
            rev_with_resp_pid_1[s] = parseFloat( parsed_data[i-1].revscr );
            s+=1;
        }
        //Reviews with Hotel Response for pid = 2
        if ( (i > 24) && (i <= 27) ) {
            rev_with_resp_pid_2[t] = parseFloat( parsed_data[i-1].revscr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < mon_rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool [Last 03 Months]
function dataLoader_RevResp__03(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all){
    let c = 0;

    if ($('#revresp-all-pid').is(':checked') === true){
        c=0;
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        revHotelRespGraph(rev_score, mon, resp_bool, c);
        delete ( rev_score, mon, resp_bool );
    }
    $('#revresp-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;
            document.getElementById('rev-resp-canvas').style.display = 'block';
            
            
            $('#revresp-pid-1').prop('checked', true);
            $('#revresp-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph(rev_score, mon, resp_bool, c);
            delete(rev_score, mon, resp_bool);

        }else{
            
            $('#revresp-pid-1').prop('checked', false);
            $('#revresp-pid-2').prop('checked', false);
            c=0;
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            c+=1;
            revHotelRespGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    $('#revresp-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revresp-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c=0;
                
                $('#revresp-all-pid').prop('checked', false);
                $('#revresp-pid-2').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }else{                                            //if 2 is checked, load pid all data
                c=0;
                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete(rev_score, mon, resp_bool);
            }
             

        }else{
            
            if ( ($('#revresp-pid-2').is(':checked') === false) && ($('#revresp-all-pid').is(':checked') === false) ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            } else if ( $('#revresp-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#revresp-all-pid').prop('checked', false);
                
                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete (rev_score, mon, resp_bool);
            }

        }
    });
    $('#revresp-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );

            }else {
                //Then display pid all data
                c = 0;

                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#revresp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }else{

            if ( $('#revresp-pid-1').is(':checked') === false && $('#revresp-all-pid').is(':checked') === false ) {
                c=0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                revHotelRespGraph(a, b, d, e, c);
                delete (a, b, d, e, c);
                

            }else if ( $('#revresp-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#revresp-all-pid').prop('checked', false);

                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
                delete( rev_score, mon, resp_bool );
            }

        }
    });

}
//Creating Avg. Review Score vs Avg. Hotel Response Bool Chart Here
function revHotelRespGraph(rev_score ,mon, resp_bool, c) {
    
    var rev_score_data = [];
    var resp_bool_data = [];
    var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {
        rev_score_data[i] = rev_score[i];
        resp_bool_data[i] = resp_bool[i];
        mon_data[i] = mon[i];
    }

    let revRespCanvas = document.getElementById('rev-resp-canvas').getContext('2d');

    var entranceDataset = {
        label: 'Avg. Review Score',
        type: 'line',
        yAxesID : "y-axis-1",
        data: rev_score_data,
        backgroundColor: 'rgba(0, 204, 0, 0.2)',
        borderColor: 'rgba(0, 204, 0,1)',
        borderWidth: 1
    };

    var dataset = [];
    dataset.push(entranceDataset);

    var lineDataset = {
        type: 'line',
        label: 'Avg. Hotel Response Bool',
        yAxisID : "y-axis-2",
        data: resp_bool_data,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: 'rgba(255, 93, 0, 0.6)',
        borderWidth: 2
    }

    dataset.push(lineDataset);


    //Hotel Response Bool Graph here
    rev_Resp_Graph = new Chart(revRespCanvas, {
        type: 'line',
        data: {
            labels: mon_data,
            datasets: dataset
        },
        options: {
            scales: {
                yAxes: [{
                    id:"y-axis-1",
                    position:'left',
                    type: 'linear',
                    ticks: {
                        beginAtZero:true,
                        max: 10
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Avg. Review Score',
                        fontStyle: "bold",
                        fontSize: 16,
                    }
                    }, {
                        id:"y-axis-2",
                        position:'right',
                        type: 'linear',
                        scaleOverride: true,
                        scaleSteps: 10,
                        ticks: {
                            beginAtZero:true,
                            max: 100,
                            callback: function(label, index, labels){
                                return label+'.00%';
                            },
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Hotel Response Bool',
                            fontStyle: "bold",
                            fontSize: 16,
                        }
                }],
                xAxes : [{
                    ticks: {
                        display: true,
                    },
                    barPercentage: 1.1,
                    gridLines : {
                        display : false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month of Date',
                        fontStyle: "bold",
                        fontSize: 16,
                    }
                }]
            },
            
        }
    });
    if (c === 1) {
        rev_Resp_Graph.destroy();
    }
    //Hotel Response Bool Graph here
    rev_Resp_Graph = new Chart(revRespCanvas, {
        type: 'line',
        data: {
            labels: mon_data,
            datasets: dataset
        },
        options: {
            scales: {
                yAxes: [{
                    id:"y-axis-1",
                    position:'left',
                    type: 'linear',
                    ticks: {
                        beginAtZero:true,
                        max: 10
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Avg. Review Score',
                        fontStyle: "bold",
                        fontSize: 16,
                    }
                    }, {
                        id:"y-axis-2",
                        position:'right',
                        type: 'linear',
                        scaleOverride: true,
                        scaleSteps: 10,
                        ticks: {
                            beginAtZero:true,
                            max: 100,
                            callback: function(label, index, labels){
                                return label+'.00%';
                            },
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Hotel Response Bool',
                            fontStyle: "bold",
                            fontSize: 16,
                        }
                }],
                xAxes : [{
                    ticks: {
                        display: true,
                    },
                    barPercentage: 1.1,
                    gridLines : {
                        display : false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month of Date',
                        fontStyle: "bold",
                        fontSize: 16,
                    }
                }]
            },
            
        }
    });

    if (c === 1) {
        rev_Resp_Graph.update();
    }

    delete (dataset,mon_data, resp_bool_data, rev_score_data);
}