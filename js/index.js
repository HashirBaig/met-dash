//Document load function here
document.addEventListener('DOMContentLoaded', function(){
    
    //CSS for Main Metric Dashboard Page
    cssForMainPage();

    if ( $('#rev-occ-main-all-pid').is(':checked') === false ){
        
        //Main Page
        $('#rev-occ-main-all-pid').prop('checked', true);
        $('#rev-occ-main-pid-1').prop('checked', true);
        $('#rev-occ-main-pid-2').prop('checked', true);

    }
    $('#menu__item__btn__1').prop('disabled', true);
    $('#menu__item__btn__1').css({
        'cursor':'no-drop',
        'background-color':'#f0f0f0',
    });
    //Getting Review Score & Hotel Resp Bool Main Data
    revRespMainAPICall__03();
});

function cssForMainPage() {
    //Adding gradient to body of html page
    $('body').css({
        'background-color':'#F7F6FF',
    });
}


//API Call - Review Score vs Hotel Resp Bool - Main Dashboard [2020]
function revRespMainAPICall__2020() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRCMTnTn')
    .then(response => response.json())
    .then(data => loadRevRespMainData__2020(data));
}
//Loading Review v Hotel Response Data [2020]
function loadRevRespMainData__2020(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let rev            = [];
    let revpar         = [];
    let rev_occ_mon    = []; 
    let adr            = [];

    let rev_pid_1    = [];     let rev_pid_2    = [];     let rev_pid_all            = [];
    let revpar_pid_1 = [];     let revpar_pid_2 = [];     let revpar_pid_all         = [];
    /*---------------------------------------------*/     let rev_occ_mon_pid_all    = [];
    let adr_pid_1    = [];     let adr_pid_2    = [];     let adr_pid_all            = [];
    
    //Factors for Occ vs Avail Graph
    let occ   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];
    
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
        dataSplittor_RevRespMain__2020(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
        
        //Loading data
        dataLoader_RevRespMain__2020(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2);
    
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool - Main Dashboard [2020]
function dataSplittor_RevRespMain__2020(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2) {
    
    
    //For Rev Resp
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    //Rev Occ
    let a=0; let b=0; let c=0; let d=0; let e=0; let f=0;
    let g=0; let h=0; let j=0; let k=0; let l=0; let m=0;
    let n=0; let o=0; let p=0; let q=0;
    
    for (let i = 1; i <= parsed_data.length; i++) {
        
        //For rev-pid-all
        if ( i <= 12 ) {
            rev_pid_all[a] = parsed_data[i-1].rev;
            a+=1;
        }
        //For rev-pid-1
        if ( (i > 12) && (i <= 24) ) {
            rev_pid_1[b] = parsed_data[i-1].rev;
            b+=1;
        }
        //For rev-pid-2
        if ( (i > 24) && (i <= 36) ) {
            rev_pid_2[c] = parsed_data[i-1].rev;
            c+=1;
        }

        /*------------------------------------------------------------*/

        //For revpar-pid-all
        if ( i <= 12 ) {
            revpar_pid_all[d] = parsed_data[i-1].revpar;
            d+=1;
        }
        //For revpar-pid-1
        if ( (i > 12) && (i <= 24) ) {
            revpar_pid_1[e] = parsed_data[i-1].revpar;
            e+=1;
        }
        //For revpar-pid-2
        if ( (i > 24) && (i <= 36) ) {
            revpar_pid_2[f] = parsed_data[i-1].revpar;
            f+=1;
        }

        /*------------------------------------------------------------*/

        //For adr-pid-all
        if ( i <= 12 ) {
            adr_pid_all[g] = parsed_data[i-1].adr;
            g+=1;
        }
        //For adr-pid-1
        if ( (i > 12) && (i <= 24) ) {
            adr_pid_1[h] = parsed_data[i-1].adr;
            h+=1;
        }
        //For adr-pid-2
        if ( (i > 24) && (i <= 36) ) {
            adr_pid_2[j] = parsed_data[i-1].adr;
            j+=1;
        }

        /*------------------------------------------------------------*/

        //For mon-pid-all
        if ( i <= 12 ) {
            rev_occ_mon_pid_all[k] = parsed_data[i-1].mon;
            k+=1;
        }

        /*------------------------------------------------------------*/
        
        //For occ-pid-all
        if ( (i > 36) && (i <= 48) ) {
            occ_pid_all[l] = parsed_data[i-1].revpar; //Getting occ from revpar
            l+=1;
        }
        //For occ-pid-1
        if ( (i > 48) && (i <= 60) ) {
            occ_pid_1[m] = parsed_data[i-1].revpar; //Getting occ from revpar
            m+=1;
        }
        //For occ-pid-2
        if ( (i > 60) && (i <= 72) ) {
            occ_pid_2[n] = parsed_data[i-1].revpar; //Getting occ from revpar
            n+=1;
        }
        
        /*------------------------------------------------------------*/

        //For avail-pid-all
        if ( (i > 36) && (i <= 48) ) {
            avail_pid_all[o] = parsed_data[i-1].adr; //Getting avail from adr
            o+=1;
        }
        //For avail-pid-1
        if ( (i > 48) && (i <= 60) ) {
            avail_pid_1[p] = parsed_data[i-1].adr; //Getting avail from adr
            p+=1;
        }
        //For avail-pid-2
        if ( (i > 60) && (i <= 72) ) {
            avail_pid_2[q] = parsed_data[i-1].adr; //Getting avail from adr
            q+=1;
        }

        /*------------------------------------------------------------*/

        //Avg. Review Score for pid = all
        if ( (i > 72) && (i <= 83 ) ) {
            mon_pid_all[w] = parsed_data[i-1].mon;
            rev_score_pid_all[w] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            w+=1;
        }

        //Avg. Review Score for pid = 1
        if ( (i > 83) && (i <= 94 ) ) {
            mon_pid_1[u] = parsed_data[i-1].mon;
            rev_score_pid_1[u] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            u+=1;
        }

        //Avg. Review Score for pid = 2
        if ((i > 94) && (i <= 105)) {
            rev_score_pid_2[v] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            v+=1;
        }
        
        /*------------------------------------------------------------*/

        //Total Reviews for pid = all
        if ((i > 105) && (i <= 116)) {
            total_rev_pid_all[x] = parseInt( parsed_data[i-1].adr );
            x+=1;
        }

        //Total Reviews for pid = 1
        if ((i > 116) && (i <= 127)) {
            total_rev_pid_1[y] = parseInt( parsed_data[i-1].adr );
            y+=1;
        }

        //Total Reviews for pid = 2
        if ((i > 127) && (i <= 138)) {
            total_rev_pid_2[z] = parseInt( parsed_data[i-1].adr );
            z+=1;
        }

        /*------------------------------------------------------------*/

        //Reviews with Hotel Response for pid = all
        if ((i > 138) && (i <= 149)) {
            rev_with_resp_pid_all[r] = parseInt( parsed_data[i-1].adr );
            r+=1;
        }

        //Reviews with Hotel Response for pid = 1
        if ((i > 149) && (i <= 159)) {
            rev_with_resp_pid_1[s] = parseInt( parsed_data[i-1].adr );
            s+=1;
        }

        //Reviews with Hotel Response for pid = 2
        if ( (i > 159) && (i <= 170) ) {
            rev_with_resp_pid_2[t] = parseInt( parsed_data[i-1].adr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < rev_with_resp_pid_2.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool - Main Dashboard [2020]
function dataLoader_RevRespMain__2020(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2){
    let c = 0;
    
    if ($('#rev-occ-main-all-pid').is(':checked') === true){

        c = 0;

        while(rev_occ_mon.length > 0){
            rev.pop();
            revpar.pop();
            adr.pop();
            rev_occ_mon.pop();
            occ.pop();
            avail.pop();
        }
        
        for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
            rev[i]         = rev_pid_all[i];
            revpar[i]      = revpar_pid_all[i];
            adr[i]         = adr_pid_all[i];
            rev_occ_mon[i] = rev_occ_mon_pid_all[i];
            occ[i]         = occ_pid_all[i];
            avail[i]       = avail_pid_all[i];
        }

        while(rev_score.length > 0){
            rev_score.pop();
            resp_bool.pop();
            mon.pop();
        }
        
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i]       = mon_pid_all[i];
        }
        c+=1;
        
        revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
        delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );

    }
    
    $('#rev-occ-main-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            document.getElementById('metric-rev-resp-canvas').style.display = 'block';
            document.getElementById('metric-revpar-canvas').style.display = 'block';
            document.getElementById('occ-metric-canvas').style.display = 'block';

            $('#rev-occ-main-pid-1').prop('checked', true);
            $('#rev-occ-main-pid-2').prop('checked', true);

            while(rev_occ_mon.length > 0){
                rev.pop();
                revpar.pop();
                adr.pop();
                rev_occ_mon.pop();
                occ.pop();
                avail.pop();
            }
            
            for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                rev[i]         = rev_pid_all[i];
                revpar[i]      = revpar_pid_all[i];
                adr[i]         = adr_pid_all[i];
                rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                occ[i]         = occ_pid_all[i];
                avail[i]       = avail_pid_all[i];
            }

            while(rev_score.length > 0){
                rev_score.pop();
                resp_bool.pop();
                mon.pop();
            }
            
            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i]       = mon_pid_all[i];
            }

            c+=1;

            revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

        }else{
            
            $('#rev-occ-main-pid-1').prop('checked', false);
            $('#rev-occ-main-pid-2').prop('checked', false);
            
            while(rev_occ_mon.length > 0){
                rev.pop();
                revpar.pop();
                adr.pop();
                rev_occ_mon.pop();
                occ.pop();
                avail.pop();
            }
            while(rev_score.length > 0){
                rev_score.pop();
                resp_bool.pop();
                mon.pop();
            }
            
            revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
        }
    });
    
    $('#rev-occ-main-pid-1').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            if ($('#rev-occ-main-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);
                $('#rev-occ-main-pid-2').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }else{                                            //if 2 is checked, load pid all data
                
                c = 0;

                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];
                }
        
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }
             

        }else{
            
            if ( ($('#rev-occ-main-pid-2').is(':checked') === false) && ($('#rev-occ-main-all-pid').is(':checked') === false) ) {

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

            }else if ( $('#rev-occ-main-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#rev-occ-main-all-pid').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_2[i];
                    revpar[i]      = revpar_pid_2[i];
                    adr[i]         = adr_pid_2[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_2[i];
                    avail[i]       = avail_pid_2[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i]       = mon_pid_all[i];
                }

                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }

        }
    });
    
    $('#rev-occ-main-pid-2').change(function () {
        
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    rev[i]         = rev_pid_2[i];
                    revpar[i]      = revpar_pid_2[i];
                    adr[i]         = adr_pid_2[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_2[i];
                    avail[i]       = avail_pid_2[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i]       = mon_pid_all[i];
                }

                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

            }else {
                //Then display pid all data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];
                }
        
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail);
            }

        }else{

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Display none

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail );

            }else if ( $('#rev-occ-main-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);

                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail );
            }

        }
    });
    
}


//API Call - Review Score vs Hotel Resp Bool - Main Dashboard [This Year]
function revRespMainAPICall__ThisYear() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRCMThisYear')
    .then(response => response.json())
    .then(data => loadRevRespMainData__ThisYear(data));

}
//Loading Review v Hotel Response Data [This Year]
function loadRevRespMainData__ThisYear(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let rev            = [];
    let revpar         = [];
    let rev_occ_mon    = []; 
    let adr            = [];

    let rev_pid_1    = [];     let rev_pid_2    = [];     let rev_pid_all            = [];
    let revpar_pid_1 = [];     let revpar_pid_2 = [];     let revpar_pid_all         = [];
    /*---------------------------------------------*/     let rev_occ_mon_pid_all    = [];
    let adr_pid_1    = [];     let adr_pid_2    = [];     let adr_pid_all            = [];
    
    //Factors for Occ vs Avail Graph
    let occ   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];
    
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
        dataSplittor_RevRespMain__ThisYear(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
        
        //Loading data
        dataLoader_RevRespMain__ThisYear(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2);
    
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool - Main Dashboard [This Year]
function dataSplittor_RevRespMain__ThisYear(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2) {
    
    //Getting Current Month
    var date = new Date();
    var n = date.getMonth() + 1;
    
    //For Rev Resp
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    //Rev Occ
    let a=0; let b=0; let c=0; let d=0; let e=0; let f=0;
    let g=0; let h=0; let j=0; let k=0; let l=0; let m=0;
    let rn=0; let o=0; let p=0; let q=0;
    
    for (let i = 1; i <= parsed_data.length; i++) {
        
         //For rev-pid-all
         if ( i <= n ) {
            rev_pid_all[a] = parsed_data[i-1].rev;
            a+=1;
        }
        //For rev-pid-1
        if ( (i > n) && (i <= (n*2)) ) {
            rev_pid_1[b] = parsed_data[i-1].rev;
            b+=1;
        }
        //For rev-pid-2
        if ( (i > (n*2)) && (i <= (n*3)) ) {
            rev_pid_2[c] = parsed_data[i-1].rev;
            c+=1;
        }

        /*------------------------------------------------------------*/

        //For revpar-pid-all
        if ( i <= n ) {
            revpar_pid_all[d] = parsed_data[i-1].revpar;
            d+=1;
        }
        //For revpar-pid-1
        if ( (i > n) && (i <= (n*2)) ) {
            revpar_pid_1[e] = parsed_data[i-1].revpar;
            e+=1;
        }
        //For revpar-pid-2
        if ( (i > (n*2)) && (i <= (n*3)) ) {
            revpar_pid_2[f] = parsed_data[i-1].revpar;
            f+=1;
        }

        /*------------------------------------------------------------*/

        //For adr-pid-all
        if ( i <= n ) {
            adr_pid_all[g] = parsed_data[i-1].adr;
            g+=1;
        }
        //For adr-pid-1
        if ( (i > n) && (i <= (n*2)) ) {
            adr_pid_1[h] = parsed_data[i-1].adr;
            h+=1;
        }
        //For adr-pid-2
        if ( (i > (n*2)) && (i <= (n*3)) ) {
            adr_pid_2[j] = parsed_data[i-1].adr;
            j+=1;
        }

        /*------------------------------------------------------------*/

        //For mon-pid-all
        if ( i <= n ) {
            rev_occ_mon_pid_all[k] = parsed_data[i-1].mon;
            k+=1;
        }

        /*------------------------------------------------------------*/
        
        //For occ-pid-all
        if ( (i > (n*3)) && (i <= (n*4)) ) {
            occ_pid_all[l] = parsed_data[i-1].revpar; //Getting occ from revpar
            l+=1;
        }
        //For occ-pid-1
        if ( (i > (n*4)) && (i <= (n*5)) ) {
            occ_pid_1[m] = parsed_data[i-1].revpar; //Getting occ from revpar
            m+=1;
        }
        //For occ-pid-2
        if ( (i > (n*5)) && (i <= (n*6)) ) {
            occ_pid_2[rn] = parsed_data[i-1].revpar; //Getting occ from revpar
            rn+=1;
        }
        
        /*------------------------------------------------------------*/

        //For avail-pid-all
        if ( (i > (n*3)) && (i <= (n*4)) ) {
            avail_pid_all[o] = parsed_data[i-1].adr; //Getting avail from adr
            o+=1;
        }
        //For avail-pid-1
        if ( (i > (n*4)) && (i <= (n*5)) ) {
            avail_pid_1[p] = parsed_data[i-1].adr; //Getting avail from adr
            p+=1;
        }
        //For avail-pid-2
        if ( (i > (n*5)) && (i <= (n*6)) ) {
            avail_pid_2[q] = parsed_data[i-1].adr; //Getting avail from adr
            q+=1;
        }

        /*------------------------------------------------------------*/

        //Avg. Review Score for pid = all
        if ( (i > (n*6)) && (i <= (n*7) ) ) {
            mon_pid_all[w] = parsed_data[i-1].mon;
            tmp = parsed_data[i-1].adr; 
            rev_score_pid_all[w] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            w+=1;
        }

        //Avg. Review Score for pid = 1
        if ( (i > (n*7)) && (i <= (n*8) ) ) {
            mon_pid_1[u] = parsed_data[i-1].mon;
            rev_score_pid_1[u] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            u+=1;
        }

        //Avg. Review Score for pid = 2
        if ((i > (n*8)) && (i <= (n*9))) {
            rev_score_pid_2[v] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            v+=1;
        }
        
        /*------------------------------------------------------------*/

        //Total Reviews for pid = all
        if ((i > (n*9)) && (i <= (n*10))) {
            total_rev_pid_all[x] = parseInt( parsed_data[i-1].adr );
            x+=1;
        }

        //Total Reviews for pid = 1
        if ((i > (n*10)) && (i <= (n*11))) {
            total_rev_pid_1[y] = parseInt( parsed_data[i-1].adr );
            y+=1;
        }

        //Total Reviews for pid = 2
        if ((i > (n*11)) && (i <= (n*12))) {
            total_rev_pid_2[z] = parseInt( parsed_data[i-1].adr );
            z+=1;
        }

        /*------------------------------------------------------------*/

        //Reviews with Hotel Response for pid = all
        if ((i > (n*12)) && (i <= (n*13))) {
            rev_with_resp_pid_all[r] = parseInt( parsed_data[i-1].adr );
            r+=1;
        }

        //Reviews with Hotel Response for pid = 1
        if ((i > (n*13)) && (i <= (n*14))) {
            rev_with_resp_pid_1[s] = parseInt( parsed_data[i-1].adr );
            s+=1;
        }

        //Reviews with Hotel Response for pid = 2
        if ( (i > (n*14)) && (i <= (n*15)) ) {
            rev_with_resp_pid_2[t] = parseInt( parsed_data[i-1].adr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < rev_with_resp_pid_2.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,rn,s,t,u,v,w,x,y,z,date);

}
//Data Loader Function for Review Score vs Hotel Resp Bool - Main Dashboard [This Year]
function dataLoader_RevRespMain__ThisYear(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2){
    let c = 0;
    
    if ($('#rev-occ-main-all-pid').is(':checked') === true){

        c = 0;

        while(rev_occ_mon.length > 0){
            rev.pop();
            revpar.pop();
            adr.pop();
            rev_occ_mon.pop();
            occ.pop();
            avail.pop();
        }
        
        for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
            rev[i]         = rev_pid_all[i];
            revpar[i]      = revpar_pid_all[i];
            adr[i]         = adr_pid_all[i];
            rev_occ_mon[i] = rev_occ_mon_pid_all[i];
            occ[i]         = occ_pid_all[i];
            avail[i]       = avail_pid_all[i];
        }

        while(rev_score.length > 0){
            rev_score.pop();
            resp_bool.pop();
            mon.pop();
        }
        
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i]       = mon_pid_all[i];
        }
        c+=1;
        
        revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
        delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );
        
    }
    
    $('#rev-occ-main-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            document.getElementById('metric-rev-resp-canvas').style.display = 'block';
            document.getElementById('metric-revpar-canvas').style.display = 'block';
            document.getElementById('occ-metric-canvas').style.display = 'block';

            $('#rev-occ-main-pid-1').prop('checked', true);
            $('#rev-occ-main-pid-2').prop('checked', true);

            while(rev_occ_mon.length > 0){
                rev.pop();
                revpar.pop();
                adr.pop();
                rev_occ_mon.pop();
                occ.pop();
                avail.pop();
            }
            
            for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                rev[i]         = rev_pid_all[i];
                revpar[i]      = revpar_pid_all[i];
                adr[i]         = adr_pid_all[i];
                rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                occ[i]         = occ_pid_all[i];
                avail[i]       = avail_pid_all[i];
            }
    
            while(rev_score.length > 0){
                rev_score.pop();
                resp_bool.pop();
                mon.pop();
            }
            
            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i]       = mon_pid_all[i];
            }
            c+=1;
            
            revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );
            

        }else{
            
            $('#rev-occ-main-pid-1').prop('checked', false);
            $('#rev-occ-main-pid-2').prop('checked', false);
            
            while(rev_occ_mon.length > 0){
                rev.pop();
                revpar.pop();
                adr.pop();
                rev_occ_mon.pop();
                occ.pop();
                avail.pop();
            }
            while(rev_score.length > 0){
                rev_score.pop();
                resp_bool.pop();
                mon.pop();
            }
            
            c+=1;
            
            revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );
            
        }
    });
    
    $('#rev-occ-main-pid-1').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            if ($('#rev-occ-main-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);
                $('#rev-occ-main-pid-2').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);  
            }else{                                            //if 2 is checked, load pid all data
                
                c = 0;

                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];
                }
        
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);    
            }
             

        }else{
            
            if ( ($('#rev-occ-main-pid-2').is(':checked') === false) && ($('#rev-occ-main-all-pid').is(':checked') === false) ) {
                

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);   

            }else if ( $('#rev-occ-main-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#rev-occ-main-all-pid').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_2[i];
                    revpar[i]      = revpar_pid_2[i];
                    adr[i]         = adr_pid_2[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_2[i];
                    avail[i]       = avail_pid_2[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i]       = mon_pid_all[i];
                }

                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);   
            }

        }
    });
    
    $('#rev-occ-main-pid-2').change(function () {
        
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_2[i];
                    revpar[i]      = revpar_pid_2[i];
                    adr[i]         = adr_pid_2[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_2[i];
                    avail[i]       = avail_pid_2[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i]       = mon_pid_all[i];
                }

                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);  

            }else {
                //Then display pid all data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];
                }
        
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );        
            }

        }else{

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                c = 0;
                //Display none
                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                c+=1;
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail );

            }else if ( $('#rev-occ-main-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);

                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail );
            }

        }
    });
    
}


//API Call - Review Score vs Hotel Resp Bool - Main Dashboard [Last 06 Months]
function revRespMainAPICall__06() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRCMLSix')
    .then(response => response.json())
    .then(data => loadRevRespMainData__06(data));

}
//Loading Review v Hotel Response Data [Last 06 Months]
function loadRevRespMainData__06(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let rev            = [];
    let revpar         = [];
    let rev_occ_mon    = []; 
    let adr            = [];

    let rev_pid_1    = [];     let rev_pid_2    = [];     let rev_pid_all            = [];
    let revpar_pid_1 = [];     let revpar_pid_2 = [];     let revpar_pid_all         = [];
    /*---------------------------------------------*/     let rev_occ_mon_pid_all    = [];
    let adr_pid_1    = [];     let adr_pid_2    = [];     let adr_pid_all            = [];
    
    //Factors for Occ vs Avail Graph
    let occ   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];
    
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
        dataSplittor_RevRespMain__06(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
        
        //Loading data
        dataLoader_RevRespMain__06(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2);
    
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool - Main Dashboard [Last 06 Months]
function dataSplittor_RevRespMain__06(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2) {
    //For Rev Resp
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    //Rev Occ
    let a=0; let b=0; let c=0; let d=0; let e=0; let f=0;
    let g=0; let h=0; let j=0; let k=0; let l=0; let m=0;
    let n=0; let o=0; let p=0; let q=0;
    
    for (let i = 1; i <= parsed_data.length; i++) {
        
         //For rev-pid-all
         if ( i <= 6 ) {
            rev_pid_all[a] = parsed_data[i-1].rev;
            a+=1;
        }
        //For rev-pid-1
        if ( (i > 6) && (i <= 12) ) {
            rev_pid_1[b] = parsed_data[i-1].rev;
            b+=1;
        }
        //For rev-pid-2
        if ( (i > 12) && (i <= 18) ) {
            rev_pid_2[c] = parsed_data[i-1].rev;
            c+=1;
        }

        /*------------------------------------------------------------*/

        //For revpar-pid-all
        if ( i <= 6 ) {
            revpar_pid_all[d] = parsed_data[i-1].revpar;
            d+=1;
        }
        //For revpar-pid-1
        if ( (i > 6) && (i <= 12) ) {
            revpar_pid_1[e] = parsed_data[i-1].revpar;
            e+=1;
        }
        //For revpar-pid-2
        if ( (i > 12) && (i <= 18) ) {
            revpar_pid_2[f] = parsed_data[i-1].revpar;
            f+=1;
        }

        /*------------------------------------------------------------*/

        //For adr-pid-all
        if ( i <= 6 ) {
            adr_pid_all[g] = parsed_data[i-1].adr;
            g+=1;
        }
        //For adr-pid-1
        if ( (i > 6) && (i <= 12) ) {
            adr_pid_1[h] = parsed_data[i-1].adr;
            h+=1;
        }
        //For adr-pid-2
        if ( (i > 12) && (i <= 18) ) {
            adr_pid_2[j] = parsed_data[i-1].adr;
            j+=1;
        }

        /*------------------------------------------------------------*/

        //For mon-pid-all
        if ( i <= 6 ) {
            rev_occ_mon_pid_all[k] = parsed_data[i-1].mon;
            k+=1;
        }

        /*------------------------------------------------------------*/
        
        //For occ-pid-all
        if ( (i > 18) && (i <= 24) ) {
            occ_pid_all[l] = parsed_data[i-1].revpar; //Getting occ from revpar
            l+=1;
        }
        //For occ-pid-1
        if ( (i > 24) && (i <= 30) ) {
            occ_pid_1[m] = parsed_data[i-1].revpar; //Getting occ from revpar
            m+=1;
        }
        //For occ-pid-2
        if ( (i > 30) && (i <= 36) ) {
            occ_pid_2[n] = parsed_data[i-1].revpar; //Getting occ from revpar
            n+=1;
        }
        
        /*------------------------------------------------------------*/

        //For avail-pid-all
        if ( (i > 18) && (i <= 24) ) {
            avail_pid_all[o] = parsed_data[i-1].adr; //Getting avail from adr
            o+=1;
        }
        //For avail-pid-1
        if ( (i > 24) && (i <= 30) ) {
            avail_pid_1[p] = parsed_data[i-1].adr; //Getting avail from adr
            p+=1;
        }
        //For avail-pid-2
        if ( (i > 30) && (i <= 36) ) {
            avail_pid_2[q] = parsed_data[i-1].adr; //Getting avail from adr
            q+=1;
        }

        /*------------------------------------------------------------*/

        //Avg. Review Score for pid = all
        if ( (i > 36) && (i <= 42 ) ) {
            mon_pid_all[w] = parsed_data[i-1].mon;
            tmp = parsed_data[i-1].adr; 
            rev_score_pid_all[w] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            w+=1;
        }

        //Avg. Review Score for pid = 1
        if ( (i > 42) && (i <= 48 ) ) {
            mon_pid_1[u] = parsed_data[i-1].mon;
            rev_score_pid_1[u] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            u+=1;
        }

        //Avg. Review Score for pid = 2
        if ((i > 48) && (i <= 54)) {
            rev_score_pid_2[v] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            v+=1;
        }
        
        /*------------------------------------------------------------*/

        //Total Reviews for pid = all
        if ((i > 54) && (i <= 60)) {
            total_rev_pid_all[x] = parseInt( parsed_data[i-1].adr );
            x+=1;
        }

        //Total Reviews for pid = 1
        if ((i > 60) && (i <= 66)) {
            total_rev_pid_1[y] = parseInt( parsed_data[i-1].adr );
            y+=1;
        }

        //Total Reviews for pid = 2
        if ((i > 66) && (i <= 72)) {
            total_rev_pid_2[z] = parseInt( parsed_data[i-1].adr );
            z+=1;
        }

        /*------------------------------------------------------------*/

        //Reviews with Hotel Response for pid = all
        if ((i > 72) && (i <= 78)) {
            rev_with_resp_pid_all[r] = parseInt( parsed_data[i-1].adr );
            r+=1;
        }

        //Reviews with Hotel Response for pid = 1
        if ((i > 78) && (i <= 83)) {
            rev_with_resp_pid_1[s] = parseInt( parsed_data[i-1].adr );
            s+=1;
        }

        //Reviews with Hotel Response for pid = 2
        if ( (i > 83) && (i <= 89) ) {
            rev_with_resp_pid_2[t] = parseInt( parsed_data[i-1].adr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < rev_with_resp_pid_2.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool - Main Dashboard [Last 06 Months]
function dataLoader_RevRespMain__06(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2){
    let c = 0;
    
    if ($('#rev-occ-main-all-pid').is(':checked') === true){

        c = 0;

        for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
            rev[i]         = rev_pid_all[i];
            revpar[i]      = revpar_pid_all[i];
            adr[i]         = adr_pid_all[i];
            rev_occ_mon[i] = rev_occ_mon_pid_all[i];
            occ[i]         = occ_pid_all[i];
            avail[i]       = avail_pid_all[i];

            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i]       = mon_pid_all[i];
        }
        c+=1;
        
        revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

        delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );
    }
    
    $('#rev-occ-main-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            document.getElementById('metric-rev-resp-canvas').style.display = 'block';
            document.getElementById('metric-revpar-canvas').style.display = 'block';
            document.getElementById('occ-metric-canvas').style.display = 'block';

            $('#rev-occ-main-pid-1').prop('checked', true);
            $('#rev-occ-main-pid-2').prop('checked', true);

            for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                rev[i]         = rev_pid_all[i];
                revpar[i]      = revpar_pid_all[i];
                adr[i]         = adr_pid_all[i];
                rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                occ[i]         = occ_pid_all[i];
                avail[i]       = avail_pid_all[i];

                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i]       = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

        }else{
            
            $('#rev-occ-main-pid-1').prop('checked', false);
            $('#rev-occ-main-pid-2').prop('checked', false);
            
            document.getElementById('metric-rev-resp-canvas').style.display = 'none';
            document.getElementById('metric-revpar-canvas').style.display = 'none';
            document.getElementById('occ-metric-canvas').style.display = 'none';
        }
    });
    
    $('#rev-occ-main-pid-1').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            if ($('#rev-occ-main-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);
                $('#rev-occ-main-pid-2').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_1.length; i++) {
                    console.log(i)
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }else{                                            //if 2 is checked, load pid all data
                
                c = 0;

                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];

                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }
             

        }else{
            
            if ( ($('#rev-occ-main-pid-2').is(':checked') === false) && ($('#rev-occ-main-all-pid').is(':checked') === false) ) {
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'none';
                document.getElementById('metric-revpar-canvas').style.display = 'none';
                document.getElementById('occ-metric-canvas').style.display = 'none';

            }else if ( $('#rev-occ-main-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                let t_rev_score = []; let t_resp_bool = [];                 let t_mon         = [];
                let t_rev       = []; let t_revpar    = []; let t_adr = []; let t_rev_occ_mon = [];
                t_occ           = []; t_avail         = [];

                $('#rev-occ-main-all-pid').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    t_rev[i]         = rev_pid_2[i];
                    t_revpar[i]      = revpar_pid_2[i];
                    t_adr[i]         = adr_pid_2[i];
                    t_rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    t_occ[i]         = occ_pid_2[i];
                    t_avail[i]       = avail_pid_2[i];

                    t_rev_score[i] = rev_score_pid_2[i];
                    t_resp_bool[i] = resp_bool_pid_2[i];
                    t_mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(t_rev_score, t_mon, t_resp_bool, c, t_rev, t_revpar, t_adr, t_rev_occ_mon, t_occ, t_avail);
                delete (t_rev_score, t_mon, t_resp_bool, t_rev, t_revpar, t_adr, t_rev_occ_mon, t_occ, t_avail);
            }

        }
    });
    
    $('#rev-occ-main-pid-2').change(function () {
        
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                let t_rev_score = []; let t_resp_bool = [];                 let t_mon         = [];
                let t_rev       = []; let t_revpar    = []; let t_adr = []; let t_rev_occ_mon = [];
                t_occ           = []; t_avail         = [];
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    t_rev[i]         = rev_pid_2[i];
                    t_revpar[i]      = revpar_pid_2[i];
                    t_adr[i]         = adr_pid_2[i];
                    t_rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    t_occ[i]         = occ_pid_2[i];
                    t_avail[i]       = avail_pid_2[i];

                    t_rev_score[i] = rev_score_pid_2[i];
                    t_resp_bool[i] = resp_bool_pid_2[i];
                    t_mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(t_rev_score, t_mon, t_resp_bool, c, t_rev, t_revpar, t_adr, t_rev_occ_mon, t_occ, t_avail);
                delete (t_rev_score, t_mon, t_resp_bool, t_rev, t_revpar, t_adr, t_rev_occ_mon, t_occ, t_avail);

            }else {
                //Then display pid all data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];

                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }

                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail);
            }

        }else{

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Display none
                document.getElementById('metric-rev-resp-canvas').style.display = 'none';
                document.getElementById('metric-revpar-canvas').style.display = 'none';
                document.getElementById('occ-metric-canvas').style.display = 'none';

            }else if ( $('#rev-occ-main-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);

                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                // console.log('rev_pid_1: '+ rev_pid_1 + ' len: ' + rev_pid_1.length);
                // console.log('revpar_pid_1: '+ revpar_pid_1 + ' len: ' + revpar_pid_1.length);
                // console.log('adr_pid_1: '+ adr_pid_1 + ' len: ' + adr_pid_1.length);
                // console.log('rev_occ_mon_pid_all: '+ rev_occ_mon_pid_all + ' len: ' + rev_occ_mon_pid_all.length);
                // console.log('occ_pid_1: '+ occ_pid_1 + ' len: ' + occ_pid_1.length);
                // console.log('avail_pid_1: '+ avail_pid_1 + ' len: ' + avail_pid_1.length);

                // console.log('\n');

                // console.log('rev: '+ rev + ' len: ' + rev.length);
                // console.log('occ: '+ occ + ' len: ' + occ.length);

                //console.log('\nx------------------------------------------------------------------x');

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                //console.log('\n After:-');

                //console.log('rev: '+ rev + ' len: ' + rev.length);
                //console.log('occ: '+ occ + ' len: ' + occ.length);

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail );
            }

        }
    });
    
}



//API Call - Review Score vs Hotel Resp Bool - Main Dashboard [Last 03 Months]
function revRespMainAPICall__03() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevOccRespMain')
    .then(response => response.json())
    .then(data => loadRevRespMainData__03(data));
}
//Loading Review v Hotel Response Data [Last 03 Months]
function loadRevRespMainData__03(data) {
    
    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let rev            = [];
    let revpar         = [];
    let rev_occ_mon    = []; 
    let adr            = [];

    let rev_pid_1    = [];     let rev_pid_2    = [];     let rev_pid_all            = [];
    let revpar_pid_1 = [];     let revpar_pid_2 = [];     let revpar_pid_all         = [];
    /*---------------------------------------------*/     let rev_occ_mon_pid_all    = [];
    let adr_pid_1    = [];     let adr_pid_2    = [];     let adr_pid_all            = [];
    
    //Factors for Occ vs Avail Graph
    let occ   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];
    
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
        dataSplittor_RevRespMain__03(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
        
        //Loading data
        dataLoader_RevRespMain__03(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2);
    
    }
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);
}
//Data Splitting Function for Review Score vs Hotel Resp Bool - Main Dashboard [Last 03 Months]
function dataSplittor_RevRespMain__03(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, rev_occ_mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2) {
    //For Rev Resp
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    //Rev Occ
    let a=0; let b=0; let c=0; let d=0; let e=0; let f=0;
    let g=0; let h=0; let j=0; let k=0; let l=0; let m=0;
    let n=0; let o=0; let p=0; let q=0;
    
    for (let i = 1; i <= parsed_data.length; i++) {
        
         //For rev-pid-all
         if ( i <= 3 ) {
            rev_pid_all[a] = parsed_data[i-1].rev;
            a+=1;
        }
        //For rev-pid-1
        if ( (i > 3) && (i <= 6) ) {
            rev_pid_1[b] = parsed_data[i-1].rev;
            b+=1;
        }
        //For rev-pid-2
        if ( (i > 6) && (i <= 9) ) {
            rev_pid_2[c] = parsed_data[i-1].rev;
            c+=1;
        }

        /*------------------------------------------------------------*/

        //For revpar-pid-all
        if ( i <= 3 ) {
            revpar_pid_all[d] = parsed_data[i-1].revpar;
            d+=1;
        }
        //For revpar-pid-1
        if ( (i > 3) && (i <= 6) ) {
            revpar_pid_1[e] = parsed_data[i-1].revpar;
            e+=1;
        }
        //For revpar-pid-2
        if ( (i > 6) && (i <= 9) ) {
            revpar_pid_2[f] = parsed_data[i-1].revpar;
            f+=1;
        }

        /*------------------------------------------------------------*/

        //For adr-pid-all
        if ( i <= 3 ) {
            adr_pid_all[g] = parsed_data[i-1].adr;
            g+=1;
        }
        //For adr-pid-1
        if ( (i > 3) && (i <= 6) ) {
            adr_pid_1[h] = parsed_data[i-1].adr;
            h+=1;
        }
        //For adr-pid-2
        if ( (i > 6) && (i <= 9) ) {
            adr_pid_2[j] = parsed_data[i-1].adr;
            j+=1;
        }

        /*------------------------------------------------------------*/

        //For mon-pid-all
        if ( i <= 3 ) {
            rev_occ_mon_pid_all[k] = parsed_data[i-1].mon;
            k+=1;
        }

        /*------------------------------------------------------------*/
        
        //For occ-pid-all
        if ( (i > 9) && (i <= 12) ) {
            occ_pid_all[l] = parsed_data[i-1].revpar; //Getting occ from revpar
            l+=1;
        }
        //For occ-pid-1
        if ( (i > 12) && (i <= 15) ) {
            occ_pid_1[m] = parsed_data[i-1].revpar; //Getting occ from revpar
            m+=1;
        }
        //For occ-pid-2
        if ( (i > 15) && (i <= 18 ) ) {
            occ_pid_2[n] = parsed_data[i-1].revpar; //Getting occ from revpar
            n+=1;
        }
        
        /*------------------------------------------------------------*/

        //For avail-pid-all
        if ( (i > 9) && (i <= 12) ) {
            avail_pid_all[o] = parsed_data[i-1].adr; //Getting avail from adr
            o+=1;
        }
        //For avail-pid-1
        if ( (i > 12) && (i <= 15) ) {
            avail_pid_1[p] = parsed_data[i-1].adr; //Getting avail from adr
            p+=1;
        }
        //For avail-pid-2
        if ( (i > 15) && (i <= 18 ) ) {
            avail_pid_2[q] = parsed_data[i-1].adr; //Getting avail from adr
            q+=1;
        }

        /*------------------------------------------------------------*/

        //Avg. Review Score for pid = all
        if ( (i > 18) && (i <= 21 ) ) {
            mon_pid_all[w] = parsed_data[i-1].mon;
            tmp = parsed_data[i-1].adr; 
            rev_score_pid_all[w] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            w+=1;
        }

        //Avg. Review Score for pid = 1
        if ( (i > 21) && (i <= 23 ) ) {
            mon_pid_1[u] = parsed_data[i-1].mon;
            rev_score_pid_1[u] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            u+=1;
        }

        //Avg. Review Score for pid = 2
        if ((i > 23) && (i <= 26)) {
            rev_score_pid_2[v] = parseInt( parsed_data[i-1].adr ); //Getting Review Score from adr
            v+=1;
        }
        
        /*------------------------------------------------------------*/

        //Total Reviews for pid = all
        if ((i > 26) && (i <= 29)) {
            total_rev_pid_all[x] = parseInt( parsed_data[i-1].adr );
            x+=1;
        }

        //Total Reviews for pid = 1
        if ((i > 29) && (i <= 31)) {
            total_rev_pid_1[y] = parseInt( parsed_data[i-1].adr );
            y+=1;
        }

        //Total Reviews for pid = 2
        if ((i > 31) && (i <= 34)) {
            total_rev_pid_2[z] = parseInt( parsed_data[i-1].adr );
            z+=1;
        }

        /*------------------------------------------------------------*/

        //Reviews with Hotel Response for pid = all
        if ((i > 34) && (i <= 37)) {
            rev_with_resp_pid_all[r] = parseInt( parsed_data[i-1].adr );
            r+=1;
        }

        //Reviews with Hotel Response for pid = 1
        if ((i > 37) && (i <= 39)) {
            rev_with_resp_pid_1[s] = parseInt( parsed_data[i-1].adr );
            s+=1;
        }

        //Reviews with Hotel Response for pid = 2
        if ( (i > 39) && (i <= 42) ) {
            rev_with_resp_pid_2[t] = parseInt( parsed_data[i-1].adr );
            t+=1;
        }
    }

    //For pid = all
    for (let i = 0; i < mon_pid_all.length; i++) {
        resp_bool_pid_all[i] = (rev_with_resp_pid_all[i]/total_rev_pid_all[i]);
        resp_bool_pid_all[i] = (resp_bool_pid_all[i]*100).toFixed(2);
    }
    //For pid = 1
    for (let i = 0; i < rev_with_resp_pid_1.length; i++) {
        resp_bool_pid_1[i] = (rev_with_resp_pid_1[i] / total_rev_pid_1[i]);
        resp_bool_pid_1[i] = (resp_bool_pid_1[i]*100).toFixed(2);
    }
    //For pid = 2
    for (let i = 0; i < rev_with_resp_pid_2.length; i++) {
        resp_bool_pid_2[i] = (rev_with_resp_pid_2[i]/total_rev_pid_2[i]);
        resp_bool_pid_2[i] = (resp_bool_pid_2[i]*100).toFixed(2);

        if (resp_bool_pid_2[i] > 100) {
            resp_bool_pid_2[i] = 100;
        }
    }

    delete (a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z);

}
//Data Loader Function for Review Score vs Hotel Resp Bool - Main Dashboard [Last 03 Months]
function dataLoader_RevRespMain__03(rev_occ_mon, rev_occ_mon_pid_all, rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, mon, mon_pid_all, mon_pid_1, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2){
    let c = 0;
    
    if ($('#rev-occ-main-all-pid').is(':checked') === true){

        c = 0;

        while(rev_occ_mon.length > 0){
            rev.pop();
            revpar.pop();
            adr.pop();
            rev_occ_mon.pop();
            occ.pop();
            avail.pop();
        }
        
        while(rev_score.length > 0){
            rev_score.pop();
            resp_bool.pop();
            mon.pop();
        }

        for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {
            rev[i]    = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i]    = adr_pid_all[i];
            rev_occ_mon[i]    = rev_occ_mon_pid_all[i];
            occ[i]    = occ_pid_all[i];
            avail[i]  = avail_pid_all[i];

            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        
        revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

        delete ( rev, rev_pid_all, rev_pid_1, rev_pid_2, rev_occ_mon, rev_occ_mon_pid_all, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2, rev_score, rev_score_pid_all, rev_score_pid_1, rev_score_pid_2, resp_bool, resp_bool_pid_all, resp_bool_pid_1, resp_bool_pid_2 );
    }
    
    $('#rev-occ-main-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            document.getElementById('metric-rev-resp-canvas').style.display = 'block';
            document.getElementById('metric-revpar-canvas').style.display = 'block';
            document.getElementById('occ-metric-canvas').style.display = 'block';

            $('#rev-occ-main-pid-1').prop('checked', true);
            $('#rev-occ-main-pid-2').prop('checked', true);

            while(rev_occ_mon.length > 0){
                rev.pop();
                revpar.pop();
                adr.pop();
                rev_occ_mon.pop();
                occ.pop();
                avail.pop();
            }
            
            while(rev_score.length > 0){
                rev_score.pop();
                resp_bool.pop();
                mon.pop();
            }
            
            for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                rev[i]    = rev_pid_all[i];
                revpar[i] = revpar_pid_all[i];
                adr[i]    = adr_pid_all[i];
                rev_occ_mon[i]    = rev_occ_mon_pid_all[i];
                occ[i]    = occ_pid_all[i];
                avail[i]  = avail_pid_all[i];

                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

        }else{
            
            $('#rev-occ-main-pid-1').prop('checked', false);
            $('#rev-occ-main-pid-2').prop('checked', false);
            
            document.getElementById('metric-rev-resp-canvas').style.display = 'none';
            document.getElementById('metric-revpar-canvas').style.display = 'none';
            document.getElementById('occ-metric-canvas').style.display = 'none';
        }
    });
    
    $('#rev-occ-main-pid-1').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            if ($('#rev-occ-main-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);
                $('#rev-occ-main-pid-2').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }else{                                            //if 2 is checked, load pid all data
                
                c = 0;

                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];

                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
            }
             

        }else{
            
            if ( ($('#rev-occ-main-pid-2').is(':checked') === false) && ($('#rev-occ-main-all-pid').is(':checked') === false) ) {
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'none';
                document.getElementById('metric-revpar-canvas').style.display = 'none';
                document.getElementById('occ-metric-canvas').style.display = 'none';

            }else if ( $('#rev-occ-main-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                let t_rev_score = []; let t_resp_bool = [];                 let t_mon         = [];
                let t_rev       = []; let t_revpar    = []; let t_adr = []; let t_rev_occ_mon = [];
                t_occ           = []; t_avail         = [];

                $('#rev-occ-main-all-pid').prop('checked', false);
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    t_rev[i]         = rev_pid_2[i];
                    t_revpar[i]      = revpar_pid_2[i];
                    t_adr[i]         = adr_pid_2[i];
                    t_rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    t_occ[i]         = occ_pid_2[i];
                    t_avail[i]       = avail_pid_2[i];

                    t_rev_score[i] = rev_score_pid_2[i];
                    t_resp_bool[i] = resp_bool_pid_2[i];
                    t_mon[i]       = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph_Metric(t_rev_score, t_mon, t_resp_bool, c, t_rev, t_revpar, t_adr, t_rev_occ_mon, t_occ, t_avail);
                delete (t_rev_score, t_mon, t_resp_bool, t_rev, t_revpar, t_adr, t_rev_occ_mon, t_occ, t_avail);
            }

        }
    });
    
    $('#rev-occ-main-pid-2').change(function () {
        
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    rev[i]         = rev_pid_2[i];
                    revpar[i]      = revpar_pid_2[i];
                    adr[i]         = adr_pid_2[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_2[i];
                    avail[i]       = avail_pid_2[i];

                    rev_score[i] = rev_score_pid_2[i];
                    resp_bool[i] = resp_bool_pid_2[i];
                    mon[i]       = mon_pid_all[i];
                }
                c+=1;
                
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);
                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail);
                
            }else {
                //Then display pid all data
                c = 0;
                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                
                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++) {

                    rev[i]         = rev_pid_all[i];
                    revpar[i]      = revpar_pid_all[i];
                    adr[i]         = adr_pid_all[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_all[i];
                    avail[i]       = avail_pid_all[i];

                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i]       = mon_pid_all[i];
                }

                c+=1;
    
                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail);
            }

        }else{

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Display none
                document.getElementById('metric-rev-resp-canvas').style.display = 'none';
                document.getElementById('metric-revpar-canvas').style.display = 'none';
                document.getElementById('occ-metric-canvas').style.display = 'none';

            }else if ( $('#rev-occ-main-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);

                
                document.getElementById('metric-rev-resp-canvas').style.display = 'block';
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                while(rev_occ_mon.length > 0){
                    rev.pop();
                    revpar.pop();
                    adr.pop();
                    rev_occ_mon.pop();
                    occ.pop();
                    avail.pop();
                }
                

                for (let i = 0; i < rev_occ_mon_pid_all.length; i++){
                    rev[i]         = rev_pid_1[i];
                    revpar[i]      = revpar_pid_1[i];
                    adr[i]         = adr_pid_1[i];
                    rev_occ_mon[i] = rev_occ_mon_pid_all[i];
                    occ[i]         = occ_pid_1[i];
                    avail[i]       = avail_pid_1[i];
                }

                while(rev_score.length > 0){
                    rev_score.pop();
                    resp_bool.pop();
                    mon.pop();
                }
                
                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i]       = mon_pid_1[i];
                }
                c+=1;

                revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail);

                delete( rev_score, mon, resp_bool, rev, revpar, adr, rev_occ_mon, occ, avail );
            }

        }
    });
    
}
//Metric Avg. Review Score vs Avg. Hotel Response Bool - Main Dashboard [Last 03 Months]
function revHotelRespGraph_Metric(rev_score, mon, resp_bool, c, rev, revpar, adr, rev_occ_mon, occ, avail) {
    
    //-----For Hotel Resp------
    var rev_score_data = [];
    var resp_bool_data = [];
    var mon_data       = [];

    //-----For Rev Occ------
    var rev_data            = []; var occ_data    = [];
    var revpar_data         = []; var avail_data  = [];
	var adr_data            = [];
	var rev_occ_mon_data    = [];

    for (var i = 0; i < rev_occ_mon.length; i+=1) {
        
        //Rev Occ Data
        rev_data[i]         = rev[i];
        revpar_data[i]      = revpar[i];
        adr_data[i]         = adr[i];
        rev_occ_mon_data[i] = rev_occ_mon[i];
        occ_data[i]         = occ[i];
        avail_data[i]       = avail[i];
    }


    for (var i = 0; i < mon.length; i+=1) {

        //Hotel Resp Data
        rev_score_data[i] = rev_score[i];
        resp_bool_data[i] = resp_bool[i];
        mon_data[i]       = mon[i];
    }

    /*Avg. RevPar vs ADR*/
    let revParCanvas_Metric = document.getElementById('metric-revpar-canvas').getContext('2d');

    //Rev vs Revpar dataset
    var revenueDataset = {
        label: 'Revenue',
        type: 'bar',
        yAxesID : "y-axis-1",
        data: rev_data,
        backgroundColor: 'rgba(0, 204, 0, 0.2)',
        borderColor: 'rgba(0, 204, 0,1)',
        borderWidth: 1
    };
    var rev_dataset = [];
    rev_dataset.push(revenueDataset);
    var addon = {
        data: revpar_data
    }
    var adrDataset = {
        type: 'line',
        label: 'Avg. ADR',
        yAxisID : "y-axis-2",
        data: adr_data,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: 'rgba(255, 93, 0, 0.6)',
        borderWidth: 2
    }
    rev_dataset.push(adrDataset);
    
    /*Avg. Occupancy vs Availability*/
    let occCanvas_Metric = document.getElementById('occ-metric-canvas').getContext('2d');

    //Occ vs Avail dataset
    var occDataset = {
        label: 'Avg. Occupancy %',
        type: 'line',
        yAxesID : "y-axis-1",
        data: occ_data,
        backgroundColor: 'rgba(0, 204, 0, 0.2)',
        borderColor: 'rgba(0, 204, 0,1)',
        borderWidth: 1
    };
    var occ_dataset = [];
    occ_dataset.push(occDataset);
    var availDataset = {
        type: 'line',
        label: 'Avg. Available Rooms',
        yAxisID : "y-axis-2",
        data: avail_data,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: 'rgba(255, 93, 0, 0.6)',
        borderWidth: 2
    }
    occ_dataset.push(availDataset);

    /*Avg. Review Score vs Hotel Response*/
    let revRespCanvas_Metric = document.getElementById('metric-rev-resp-canvas').getContext('2d');
    var revScoreDataset = {
        label: 'Avg. Review Score',
        type: 'line',
        yAxesID : "y-axis-1",
        data: rev_score_data,
        backgroundColor: 'rgba(0, 204, 0, 0.2)',
        borderColor: 'rgba(0, 204, 0,1)',
        borderWidth: 1
    };
    var dataset = [];
    dataset.push(revScoreDataset);
    var respBoolDataset = {
        type: 'line',
        label: 'Avg. Hotel Response Bool',
        yAxisID : "y-axis-2",
        data: resp_bool_data,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderColor: 'rgba(255, 93, 0, 0.6)',
        borderWidth: 2
    }
    dataset.push(respBoolDataset);
    

    

    //Rev vs Revpar Graph here
    revPar_v_Par_Graph_Metric = new Chart(revParCanvas_Metric, {
        type: 'bar',
        data: {
            labels: rev_occ_mon_data,
            datasets: rev_dataset
        },
        options: { 
            responsive: true,
            tooltips: {
                mode: 'single',
                callbacks: {
                    afterLabel: function(tooltipItem, data) {
                        const adrevpar = addon.data[tooltipItem['index']]
                        return 'Avg. RevPar: ' + adrevpar;
                    }	
                }
            },
            scales: {
                yAxes: [{
                    id:"y-axis-1",
                    position:'left',
                    type: 'linear',
                    ticks: {
                        beginAtZero:true,
                        callback: function(label, index, labels){
                            return label/1000+'k';
                        },
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Revenue',
                        fontStyle: "bold",
                        fontSize: 12,
                    }
                    }, {
                        id:"y-axis-2",
                        position:'right',
                        type: 'linear',
                        scaleOverride: true,
                        scaleSteps: 10,
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. ADR',
                            fontStyle: "bold",
                            fontSize: 12,
                        }
                }],
                xAxes : [{
                    ticks: {
                        display: true
                    },
                    barPercentage: 1.1,
                    gridLines : {
                        display : false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month of Date',
                        fontStyle: "bold",
                        fontSize: 15,
                    }
                }]
            },
            
        }
    });
    //Occ vs Avail Graph here
    occ_v_Avail_Graph_Metric = new Chart(occCanvas_Metric, {
        type: 'line',
        data: {
            labels: rev_occ_mon_data,
            datasets: occ_dataset
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                        id:"y-axis-1",
                        position:'left',
                        type: 'linear',
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Occupancy %',
                            fontSize: 12,
                            fontStyle: "bold",
                        }
                    }, {
                        id:"y-axis-2",
                        position:'right',
                        type: 'linear',
                        scaleOverride: true,
                        scaleSteps: 10,
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Available Rooms',
                            fontSize: 12,
                            fontStyle: "bold",
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
                        fontSize: 15,
                    }
                }]
            },
            
        }
    });
    //Hotel Resp Graph here
    rev_Resp_Graph_Metric = new Chart(revRespCanvas_Metric, {
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
                        max: 12
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Avg. Review Score',
                        fontSize: 16,
                        fontStyle: "bold",
                    }
                    }, {
                        id:"y-axis-2",
                        position:'right',
                        type: 'linear',
                        scaleOverride: true,
                        scaleSteps: 10,
                        ticks: {
                            beginAtZero:true,
                            max: 120,
                            callback: function(label, index, labels){
                                return label+'.00%';
                            },
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Hotel Resp Bool',
                            fontSize: 16,
                            fontStyle: "bold",
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

    //Destroying graphs here
    if (c === 1) {
        revPar_v_Par_Graph_Metric.destroy();
        occ_v_Avail_Graph_Metric.destroy();
        rev_Resp_Graph_Metric.destroy();
    }

    //Updating graphs here
    if (c === 1) {
        rev_Resp_Graph_Metric.update();
        revPar_v_Par_Graph_Metric.update();
        occ_v_Avail_Graph_Metric.update();
    }

    delete (revPar_v_Par_Graph_Metric, occ_v_Avail_Graph_Metric, rev_Resp_Graph_Metric, dataset, occ_dataset, rev_dataset, mon_data, resp_bool_data, rev_score_data, rev_data, revpar_data, adr_data, rev_occ_mon_data);
}