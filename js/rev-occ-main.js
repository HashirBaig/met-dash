document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#rev-occ-main-all-pid').is(':checked') === false) ){
        
        //Main Page
        $('#rev-occ-main-all-pid').prop('checked', true);
        $('#rev-occ-main-pid-1').prop('checked', true);
        $('#rev-occ-main-pid-2').prop('checked', true);
    }

    //Getting RevPar & Occ Main Data
    revOccMainAPICall();
});

//API Call - RevPar vs Occ - Main Dashboard
function revOccMainAPICall() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevOccMain')
    .then(response => response.json())
    .then(data => loadRevOccMainData(data));
}
//Loading RevOccMain Data
function loadRevOccMainData(data){

    let parsed_data = JSON.parse(data);

    //Factors for RevPar vs Rev Graph
    let rev    = []; let tmp_rev    = [];
    let revpar = []; let tmp_revpar = [];
    let mon    = []; let tmp_mon    = []; 
    let adr    = []; let tmp_adr    = [];

    let rev_pid_1    = [];     let rev_pid_2    = [];     let rev_pid_all    = [];
    let revpar_pid_1 = [];     let revpar_pid_2 = [];     let revpar_pid_all = [];
    /*---------------------------------------------*/     let mon_pid_all    = [];
    let adr_pid_1    = [];     let adr_pid_2    = [];     let adr_pid_all    = [];
    
    //Factors for RevPar vs Rev Graph
    let occ   = []; let tmp_occ   = [];
    let avail = []; let tmp_avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];

    if(data.length === 0){
        document.write('no data');
    }else{
        let cnt=0;
        
        //Removing redundancy from data
        for (var i=1; i<=parsed_data.length; i+=1){
            let tmp;
            if (i === 1){
                tmp_mon[cnt] = parsed_data[i-1].mon;
                
                
                tmp = parsed_data[i-1].rev.toFixed(0);
                tmp_rev[cnt] = parseInt(tmp);
                
                tmp = 0.00;
                tmp = parsed_data[i-1].adr.toFixed(3);
                tmp_adr[cnt] = parseFloat(tmp);

                tmp = 0.00;
                tmp = parsed_data[i-1].revpar.toFixed(2);
                tmp_revpar[cnt] = parseFloat(tmp);

                tmp = 0;
                cnt+=1;

            }else if (parsed_data[i-2].mon == parsed_data[i-1].mon){
                continue;
            }else{
                tmp_mon[cnt] = parsed_data[i-1].mon;
                
                tmp = parsed_data[i-1].rev.toFixed(0);
                tmp_rev[cnt] = parseInt(tmp);
                
                tmp = 0;
                tmp = parsed_data[i-1].adr.toFixed(3);
                tmp_adr[cnt] = parseFloat(tmp);


                tmp = 0.00;
                tmp = parsed_data[i-1].revpar.toFixed(2);
                tmp_revpar[cnt] = parseFloat(tmp);

                tmp = 0.00;
                cnt+=1;
            }
        }
        delete tmp;
        
    }

    //Data Splitting - Phase#1
    primaryDataSplitter(tmp_rev, tmp_revpar, tmp_adr, tmp_mon, tmp_occ, tmp_avail);

    //Data Splitting - Phase#2 (Splitting data w.r.t pid values)
    dataSplittor_RevOccMain(tmp_rev, tmp_revpar, tmp_adr, tmp_mon, tmp_occ, tmp_avail, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2);

    //Data Loading Function for RevOcc Main
    dataLoader_RevOccMain(rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, mon, mon_pid_all, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2);


    //Delete all tmp arrays - No use for them
    delete (tmp_rev, tmp_revpar, tmp_adr, tmp_mon, tmp_occ, tmp_avail);

}
//Rev Occ Primary Split
function primaryDataSplitter(tmp_rev, tmp_revpar, tmp_adr, tmp_mon, tmp_occ, tmp_avail){
    let a=0; let b=0;

    for (let i = 0; i < tmp_mon.length; i++) {
        
        if (i > 35) {
            //Removing pid from rev
            tmp_rev.pop();

            //Getting occ from revpar
            tmp_occ[a] = tmp_revpar[i];
            a+=1;

            //Getting avail from adr
            tmp_avail[b] = tmp_adr[i];
            b+=1;
        }
        
    }
    for (let i = 0; i < tmp_adr.length; i++) {
        if (i > 35) {
            tmp_mon.pop();
        }
    }
    for (let i = 0; i < ( (tmp_mon.length)*2 ); i++) {
        if (i > 35) {
            tmp_adr.pop();
            tmp_revpar.pop();
        }
    }

    delete (a, b);
}
//Rev Occ Main Data Splittor
function dataSplittor_RevOccMain(tmp_rev, tmp_revpar, tmp_adr, tmp_mon, tmp_occ, tmp_avail, rev_pid_all, rev_pid_1, rev_pid_2, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr_pid_all, adr_pid_1, adr_pid_2, mon_pid_all, occ_pid_all, occ_pid_1, occ_pid_2, avail_pid_all, avail_pid_1, avail_pid_2) {
    let a=0; let b=0; let c=0; let d=0; let e=0; let f=0;
    let g=0; let h=0; let j=0; let k=0; let l=0; let m=0;
    let n=0; let o=0; let p=0; let q=0;


    for (let i = 0; i < tmp_mon.length; i++) {
        
        //For rev-pid-all
        if ( i < 12 ) {
            rev_pid_all[a] = tmp_rev[i];
            a+=1;
        }
        //For rev-pid-1
        if ( (i >= 12) && (i < 24) ) {
            rev_pid_1[b] = tmp_rev[i];
            b+=1;
        }
        //For rev-pid-2
        if ( i >= 24 ) {
            rev_pid_2[c] = tmp_rev[i];
            c+=1;
        }

        /*------------------------------------------------------------*/

        //For revpar-pid-all
        if ( i < 12 ) {
            revpar_pid_all[d] = tmp_revpar[i];
            d+=1;
        }
        //For revpar-pid-1
        if ( (i >= 12) && (i < 24) ) {
            revpar_pid_1[e] = tmp_revpar[i];
            e+=1;
        }
        //For revpar-pid-2
        if ( i >= 24 ) {
            revpar_pid_2[f] = tmp_revpar[i];
            f+=1;
        }

        /*------------------------------------------------------------*/

        //For adr-pid-all
        if ( i < 12 ) {
            adr_pid_all[g] = tmp_adr[i];
            g+=1;
        }
        //For adr-pid-1
        if ( (i >= 12) && (i < 24) ) {
            adr_pid_1[h] = tmp_adr[i];
            h+=1;
        }
        //For adr-pid-2
        if ( i >= 24 ) {
            adr_pid_2[j] = tmp_adr[i];
            j+=1;
        }

        /*------------------------------------------------------------*/

        //For mon-pid-all
        if ( i < 12 ) {
            mon_pid_all[k] = tmp_mon[i];
            k+=1;
        }

        /*------------------------------------------------------------*/

        //For occ-pid-all
        if ( i < 12 ) {
            occ_pid_all[l] = tmp_occ[i];
            l+=1;
        }
        //For occ-pid-1
        if ( (i >= 12) && (i < 24) ) {
            occ_pid_1[m] = tmp_occ[i];
            m+=1;
        }
        //For occ-pid-2
        if ( i >= 24 ) {
            occ_pid_2[n] = tmp_occ[i];
            n+=1;
        }
        
        /*------------------------------------------------------------*/

        //For avail-pid-all
        if ( i < 12 ) {
            avail_pid_all[o] = tmp_avail[i];
            o+=1;
        }
        //For avail-pid-1
        if ( (i >= 12) && (i < 24) ) {
            avail_pid_1[p] = tmp_avail[i];
            p+=1;
        }
        //For avail-pid-2
        if ( i >= 24 ) {
            avail_pid_2[q] = tmp_avail[i];
            q+=1;
        }
    }
    delete(a, b, c, d, e, f, g, h, j, k, l, m, n, o, p, q);
}
//Rev Occ Main Data Loader
function dataLoader_RevOccMain(rev, rev_pid_all, rev_pid_1, rev_pid_2, revpar, revpar_pid_all, revpar_pid_1, revpar_pid_2, adr, adr_pid_all, adr_pid_1, adr_pid_2, mon, mon_pid_all, occ, occ_pid_all, occ_pid_1, occ_pid_2, avail, avail_pid_all, avail_pid_1, avail_pid_2) {
    
    let c = 0;

    if ($('#rev-occ-main-all-pid').is(':checked') === true){ //Load pid-all data

        c = 0;

        for (let i = 0; i < mon_pid_all.length; i++) {
            rev[i]    = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i]    = adr_pid_all[i];
            mon[i]    = mon_pid_all[i];
            occ[i]    = occ_pid_all[i];
            avail[i]  = avail_pid_all[i];
        }

        c+=1;
        
        revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c);

        delete ( rev, revpar, mon, adr, occ, avail, c );
    }

    $('#rev-occ-main-all-pid').change(function () {
        

        if ( $(this).is(':checked')) { //Load pid-all data

            //Date Label
            $('#rev-occ-main-tmp-date').css({
                'display':'block',
            });
            $('#rev-occ-main-label-amount').css({
                'display':'none',
            });

            //Date values
            $('#rev-occ-main-metric-date').css({
                'display':'block',
            });
            
            c = 0;

            document.getElementById('metric-revpar-canvas').style.display = 'block';
            document.getElementById('occ-metric-canvas').style.display = 'block';
            
            
            $('#rev-occ-main-pid-1').prop('checked', true);
            $('#rev-occ-main-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                rev[i]    = rev_pid_all[i];
                revpar[i] = revpar_pid_all[i];
                adr[i]    = adr_pid_all[i];
                mon[i]    = mon_pid_all[i];
                occ[i]    = occ_pid_all[i];
                avail[i]  = avail_pid_all[i];
            }
            c+=1;

            revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c);

        }else{ //If unchecked, load none
            
            $('#rev-occ-main-pid-1').prop('checked', false);
            $('#rev-occ-main-pid-2').prop('checked', false);
            
            document.getElementById('metric-revpar-canvas').style.display = 'none';
            document.getElementById('occ-metric-canvas').style.display = 'none';

        }
    });

    $('#rev-occ-main-pid-1').change(function () {

        if ( $(this).is(':checked')) {

            //Date Label
            $('#rev-occ-main-tmp-date').css({
                'display':'block',
            });
            $('#rev-occ-main-label-amount').css({
                'display':'none',
            });

            //Date values
            $('#rev-occ-main-metric-date').css({
                'display':'block',
            });

            c = 0;

            if ($('#rev-occ-main-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#rev-occ-main-all-pid').prop('checked', false);
                $('#rev-occ-main-pid-2').prop('checked', false);
                
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i]    = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i]    = adr_pid_1[i];
                    mon[i]    = mon_pid_all[i];
                    occ[i]    = occ_pid_1[i];
                    avail[i]  = avail_pid_1[i];
                }
                c+=1;

                revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c);
                delete ( rev, revpar, mon, adr, occ, avail, c );

            }else{                                            //if 2 is checked, load pid all data

                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i]    = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i]    = adr_pid_all[i];
                    mon[i]    = mon_pid_all[i];
                    occ[i]    = occ_pid_all[i];
                    avail[i]  = avail_pid_all[i];
                }
                c+=1;
    
                revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c);
                delete ( rev, revpar, mon, adr, occ, avail, c );
            }
             

        }else{

            //Date Label
            $('#rev-occ-main-tmp-date').css({
                'display':'block',
            });
            $('#rev-occ-main-label-amount').css({
                'display':'none',
            });

            //Date values
            
            $('#rev-occ-main-metric-date').css({
                'display':'block',
            });
            $('#rev-occ-main-amount').css({
                'display':'none',
            });
            
            
            if ( ($('#rev-occ-main-pid-2').is(':checked') === false) && ($('#rev-occ-main-all-pid').is(':checked') === false) ) {
                
                document.getElementById('metric-revpar-canvas').style.display = 'none';
                document.getElementById('occ-metric-canvas').style.display = 'none';


            }else if ( $('#rev-occ-main-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                let t_rev = []; let t_revpar = []; let t_adr = [];
                let t_occ = []; let t_avail = []; let t_mon = [];

                $('#rev-occ-main-all-pid').prop('checked', false);
                
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    t_rev[i]    = rev_pid_2[i];
                    t_revpar[i] = revpar_pid_2[i];
                    t_adr[i]    = adr_pid_2[i];
                    t_occ[i]    = occ_pid_2[i];
                    t_avail[i]  = avail_pid_2[i];
                    t_mon[i]    = mon_pid_all[i];
                }
                c+=1;
    
                revOccMainGraph_Metric(t_rev, t_revpar, t_mon, t_adr, t_occ, t_avail, c);
                delete (t_rev, t_revpar, t_adr, t_occ, t_mon, t_avail);
            }

        }
    });

    $('#rev-occ-main-pid-2').change(function () {

        if ( $(this).is(':checked')) {

            //Date Label
            $('#rev-occ-main-tmp-date').css({
                'display':'block',
            });
            $('#rev-occ-main-label-amount').css({
                'display':'none',
            });

            //Date values
            $('#rev-occ-main-metric-date').css({
                'display':'block',
            });
            $('#rev-occ-main-amount').css({
                'display':'none',
            });

            c = 0;

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                let t_rev = []; let t_revpar = []; let t_adr = [];
                let t_occ = []; let t_avail = []; let t_mon = [];

                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    t_rev[i]    = rev_pid_2[i];
                    t_revpar[i] = revpar_pid_2[i];
                    t_adr[i]    = adr_pid_2[i];
                    t_occ[i]    = occ_pid_2[i];
                    t_avail[i]  = avail_pid_2[i];
                    t_mon[i]    = mon_pid_all[i];
                }
                c+=1;
    
                revOccMainGraph_Metric(t_rev, t_revpar, t_mon, t_adr, t_occ, t_avail, c);
                delete (t_rev, t_revpar, t_adr, t_occ, t_mon, t_avail);

            }else {
                //Then display pid all data
                
                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                $('#rev-occ-main-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i]    = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i]    = adr_pid_all[i];
                    mon[i]    = mon_pid_all[i];
                    occ[i]    = occ_pid_all[i];
                    avail[i]  = avail_pid_all[i];
                }
                c+=1;
    
                revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c);
                delete (t_rev, t_revpar, t_adr, t_occ, t_mon, t_avail);
            }

        }else{

            //Date Label
            $('#rev-occ-main-tmp-date').css({
                'display':'block',
            });
            $('#rev-occ-main-label-amount').css({
                'display':'none',
            });

            //Date values
            $('#rev-occ-main-metric-date').css({
                'display':'block',
            });
            $('#rev-occ-main-amount').css({
                'display':'none',
            });
            
            

            if ( $('#rev-occ-main-pid-1').is(':checked') === false && $('#rev-occ-main-all-pid').is(':checked') === false ) {
                //Display none
            
                document.getElementById('metric-revpar-canvas').style.display = 'none';
                document.getElementById('occ-metric-canvas').style.display = 'none';

            }else if ( $('#rev-occ-main-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#rev-occ-main-all-pid').prop('checked', false);

                document.getElementById('metric-revpar-canvas').style.display = 'block';
                document.getElementById('occ-metric-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i]    = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i]    = adr_pid_1[i];
                    mon[i]    = mon_pid_all[i];
                    occ[i]    = occ_pid_1[i];
                    avail[i]  = avail_pid_1[i];
                }
                c+=1;

                revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c);
                delete ( rev, revpar, mon, adr, occ, avail, c );
            }

        }
    });

}
//Metric Revenue Par vs Revenue & Occupancy vs Availibilty Chart Here
function revOccMainGraph_Metric(rev, revpar, mon, adr, occ, avail, c) {

    //Temporay Data
	var rev_tmp_data    = []; var occ_tmp_data    = []; 
    var revpar_tmp_data = []; var avail_tmp_data = [];
	var adr_tmp_data    = [];
	var mon_tmp_data    = [];
	
    //Dynamically changed data - creat and store separate data variables like above & below
	var rev_data    = []; var occ_data    = [];
    var revpar_data = []; var avail_data = [];
	var adr_data    = [];
	var mon_data    = [];
    
    for (var i = 0; i < mon.length; i+=1) {

        rev_tmp_data[i]    = rev[i];
        revpar_tmp_data[i] = revpar[i];
        adr_tmp_data[i]    = adr[i];
        mon_tmp_data[i]    = mon[i];
        occ_tmp_data[i]    = occ[i];
        avail_tmp_data[i]  = avail[i];

        rev_data[i]    = rev[i];
        revpar_data[i] = revpar[i];
        adr_data[i]    = adr[i];
        mon_data[i]    = mon[i];
        occ_data[i]    = occ[i];
        avail_data[i]  = avail[i];
    }
    
    let d1 = (new Date('2020.01.01')).getTime();
    let d2 = (new Date('2020.12.31')).getTime();

    let start_time = (new Date('2020.01.01')); let end_time = new Date('2020.12.31');
    document.getElementById('rev-occ-main-metric-date').innerHTML = start_time.getDate()+'/'+(start_time.getMonth()+1)+'/'+start_time.getFullYear() + ' - ' + end_time.getDate()+'/'+(end_time.getMonth()+1)+'/'+end_time.getFullYear();

    //Slider
    $( function() {
        
        $( "#rev-occ-main-slider-range" ).slider({
            range: true,
            min: d1,
            max: d2,
            values: [ (new Date(2020,03,01)).getTime(), (new Date(2020,06,31)).getTime() ],
            slide: function( event, ui ) {
                $( "#rev-occ-main-amount" ).val( new Date(ui.values[ 0 ]).getDate() + "/" + (new Date(ui.values[ 0 ]).getMonth()+1) + "/" + new Date(ui.values[ 0 ]).getFullYear() + " - " + new Date(ui.values[ 1 ]).getDate() + "/" + (new Date(ui.values[ 1 ]).getMonth()+1) + "/" + new Date(ui.values[ 1 ]).getFullYear());
                
                //Dynamically change arrays here
                loadData((new Date(ui.values[0]).getMonth()+1), (new Date(ui.values[1]).getMonth()+1),mon_data, adr_data, rev_data, revpar_data, occ_data, avail_data, mon_tmp_data, adr_tmp_data, rev_tmp_data, revpar_tmp_data, occ_tmp_data, avail_tmp_data);
                
            }
        });
        $( "#rev-occ-main-amount" ).val( $( "#rev-occ-main-slider-range" ).slider( "values", 0 ) + " - " + $( "#rev-occ-main-slider-range" ).slider( "values", 1 ) );
        
        $("#rev-occ-main-amount").css({
            'display':'none',
        });
    });

    //Function to change arrays dynamically
    function loadData(point_1,point_2, mon_data, adr_data, rev_data, revpar_data, occ_data, avail_data, mon_tmp_data, adr_tmp_data, rev_tmp_data, revpar_tmp_data, occ_tmp_data, avail_tmp_data){

        $('#rev-resp-main-tmp-date').css({
            'display':'none',
        });
        $('#rev-occ-main-metric-date').css({
            'display':'none',
        });

        $('#rev-occ-main-date').css({
            'float':'right',
            'margin-top':'119px', //prev = 80px
            'margin-right':'-175px',
        });
        
        $('#rev-occ-main-amount').css({
            'display':'block',
            'margin-top':'12px',//prev = 12px
            'font-weight':'bold',
        });

        while(mon_data.length > 0){
            rev_data.pop();
            revpar_data.pop();
            adr_data.pop();
            mon_data.pop();
            occ_data.pop();
            avail_data.pop();
        }
        
        
        let cnt = 0;
        for (var i = point_1; i <= point_2; i+=1) {

            rev_data[cnt]    = rev_tmp_data[i-1];
            revpar_data[cnt] = revpar_tmp_data[i-1];
            adr_data[cnt]    = adr_tmp_data[i-1];
            mon_data[cnt]    = mon_tmp_data[i-1];
            occ_data[cnt]    = occ_tmp_data[i-1];
            avail_data[cnt]  = avail_tmp_data[i-1];

            cnt+=1
        }

        delete cnt;

        //updating chart
        revPar_v_Par_Graph_Metric.update();
        occ_v_Avail_Graph_Metric.update();
    }

    let revParCanvas_Metric = document.getElementById('metric-revpar-canvas').getContext('2d');
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

    var dataset = [];
    dataset.push(revenueDataset);
    
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

    dataset.push(adrDataset);

    //Occ vs Avail Graph here
    occ_v_Avail_Graph_Metric = new Chart(occCanvas_Metric, {
        type: 'line',
        data: {
            labels: mon_data,
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
    //Rev vs Revpar Graph here
    revPar_v_Par_Graph_Metric = new Chart(revParCanvas_Metric, {
        type: 'bar',
        data: {
            labels: mon_data,
            datasets: dataset
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
    
    //Destroying graphs here
    if (c === 1) {
        revPar_v_Par_Graph_Metric.destroy();
        occ_v_Avail_Graph_Metric.destroy();
    }

    //Occ vs Avail Graph here
    occ_v_Avail_Graph_Metric = new Chart(occCanvas_Metric, {
        type: 'line',
        data: {
            labels: mon_data,
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
    //Rev vs Revpar Graph here
    revPar_v_Par_Graph_Metric = new Chart(revParCanvas_Metric, {
        type: 'bar',
        data: {
            labels: mon_data,
            datasets: dataset
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

    //Updating graphs here
    if (c === 1) {
        revPar_v_Par_Graph_Metric.update();
        occ_v_Avail_Graph_Metric.update();
    }

    delete ( d1, d2, dataset, mon_data, adr_data, rev_data, revpar_data, occ_data, avail_data, mon_tmp_data, adr_tmp_data, rev_tmp_data, revpar_tmp_data, occ_tmp_data, avail_tmp_data );
}