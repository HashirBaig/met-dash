//Document load function here
document.addEventListener('DOMContentLoaded', function(){
    if ( ($('#revpar-all-pid').is(':checked') === false) && ($('#rev-resp-all-pid').is(':checked') === false) && ($('#occ-all-pid').is(':checked') === false) ){
        
        $('#revpar-all-pid').prop('checked', true);
        $('#revpar-pid-1').prop('checked', true);
        $('#revpar-pid-2').prop('checked', true);

        $('#rev-resp-all-pid').prop('checked', true);
        $('#rev-resp-pid-1').prop('checked', true);
        $('#rev-resp-pid-2').prop('checked', true);

        $('#occ-all-pid').prop('checked', true);
        $('#occ-pid-1').prop('checked', true);
        $('#occ-pid-2').prop('checked', true);
    }

    ratingMetricApiCall();

    availMetricApiCall();

    occMetricApiCall();

    metricApiCall();

    //Getting RevPar v Rev Data
    revParAPICall();

    //Getting Review v Hotel Response Data
    revHotelRespAPICall();
    
    //Getting Occupancy% v Availability Data
    occAvailAPICall();

});


//Making API calls
function availMetricApiCall(){
    fetch('https://adevu-metric-dashboard.herokuapp.com/getAvailMetric')
    .then(response => response.json())
    .then(data => loadAvailMetricData(data));
}
function loadAvailMetricData(data) {
    
    let parsed_data = JSON.parse(data);

    let prev_avail; let curr_avail;

    if ( parsed_data[0].availmetric === null ) {

        document.getElementById('avail-val').innerHTML = 0 + '%';
        $(document).ready(function(){
            $('#avail-val').css({
                'color':'lightgray',
            });
            $('.triangle-avail-up').css({
                'display' : 'none',
            });
            $('.triangle-avail-down').css({
                'display' : 'none',
            });
            $('.val-avail').css({
                'margin-top' : '-23px',
            });
        });

    }else{
        curr_avail = parsed_data[0].availmetric.toFixed(1);
        prev_avail = parsed_data[1].availmetric.toFixed(1);
        
        rslt_avail = (((curr_avail - prev_avail)/curr_avail)*100).toFixed(1);
        
        document.getElementById('avail-val').innerHTML = rslt_avail + '%';
        
        
        if (rslt_avail>0){
            
            $(document).ready(function(){
                $('#avail-val').css({
                    'color':'#7BE15F',
                });
                $('.triangle-avail-up').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('.triangle-avail-down').css({
                    'display' : 'none',
                });
            }); 
        }else if (rslt_avail<0){
            
            $(document).ready(function(){
                $('#avail-val').css({
                    'color':'#FC6847',
                });
                $('.triangle-avail-up').css({
                    'display' : 'none',
                });
                $('.triangle-avail-down').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-top': '18px solid #FC6847',
                    'margin-left': '41px',
                });  
            }); 
        }else {
            document.getElementById('avail-val').innerHTML = 0 + '%';
            $(document).ready(function(){
                $('#avail-val').css({
                    'color':'lightgray',
                });
                $('.triangle-avail-up').css({
                    'display' : 'none',
                });
                $('.triangle-avail-down').css({
                    'display' : 'none',
                });  
            });
        }
    }
    
}


function ratingMetricApiCall(){
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRatingMetric')
    .then(response => response.json())
    .then(data => loadRatingMetricData(data));
}
function loadRatingMetricData(data) {

    let parsed_data = JSON.parse(data);

    if ( parsed_data[0].ratingmetric === null ) {

        document.getElementById('rating-val').innerHTML = 0 + '%';
        $(document).ready(function(){
            $('#rating-val').css({
                'color':'lightgray',
            });
            $('.triangle-rating-up').css({
                'display' : 'none',
            });
            $('.triangle-rating-down').css({
                'display' : 'none',
            });
            $('.val-rating').css({
                'margin-top' : '-23px',
            });
        });

    }else {
        let prev_rating; let curr_rating;
    
        curr_rating = parsed_data[0].ratingmetric;
        prev_rating = parsed_data[1].ratingmetric;
        
        
        rslt_rating = (((curr_rating - prev_rating)/curr_rating)*100).toFixed(1);
        

        document.getElementById('rating-val').innerHTML = rslt_rating + '%';
        
        
        if (rslt_rating>0){
            
            //#7BE15F - lightgreen
            $(document).ready(function(){
                $('#rating-val').css({
                    'color':'#7BE15F',
                });
                $('.triangle-rating-up').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('.triangle-rating-down').css({
                    'display': 'none',
                }); 
            }); 
        }else if (rslt_rating<0){
            //p_adr.fontcolor("#FC6847");//#FC6847 - light red
            $(document).ready(function(){
                $('#rating-val').css({
                    'color':'#FC6847',
                });
                $('.triangle-rating-up').css({
                    'display': 'none',
                });
                $('.triangle-rating-down').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-top': '18px solid #FC6847',
                    'margin-left': '41px',
                }); 
            }); 
        }
    }

}


function metricApiCall(){
    fetch('https://adevu-metric-dashboard.herokuapp.com/getMetrics')
    .then(response => response.json())
    .then(data => loadMetricData(data));
}
function loadMetricData(data) {
    let parsed_data = JSON.parse(data);

    let prev_adr;     let curr_adr;
    let prev_revpar;  let curr_revpar;
    let rslt_adr;     let rslt_revpar;
    if ( parsed_data[0].adrmetric === null && parsed_data[0].revparmetric === null ) {
        
        document.getElementById('adr-val').innerHTML = 0 + '%';
        $(document).ready(function(){
            $('#adr-val').css({
                'color':'lightgray',
            });
            $('.triangle-adr-up').css({
                'display' : 'none',
            });
            $('.triangle-adr-down').css({
                'display' : 'none',
            });
            $('.val-adr').css({
                'margin-top' : '-23px',
            }); 
        });


        document.getElementById('revpar-val').innerHTML = 0 + '%';
        $(document).ready(function(){
            $('#revpar-val').css({
                'color':'lightgray',
            });
            $('.triangle-revpar').css({
                'display' : 'none',
            });
            $('.val-revpar').css({
                'margin-top' : '-23px',
            }); 
        });

    }else {

        prev_adr = parsed_data[1].adrmetric.toFixed(1);
        curr_adr = parsed_data[0].adrmetric.toFixed(1);

        prev_revpar = parsed_data[1].revparmetric.toFixed(1);
        curr_revpar = parsed_data[0].revparmetric.toFixed(1);

        
        rslt_adr = (((curr_adr - prev_adr)/curr_adr)*100).toFixed(1);
        rslt_revpar = (((curr_revpar - prev_revpar)/curr_revpar)*100).toFixed(1);


        document.getElementById('adr-val').innerHTML = rslt_adr + '%';
        document.getElementById('revpar-val').innerHTML = rslt_revpar + '%';
        
        if (rslt_adr>0){
            
            $(document).ready(function(){
                $('#adr-val').css({
                    'color':'#7BE15F',
                });
                $('.triangle-adr-up').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('.triangle-adr-down').css({
                    'display': 'none',
                });
            }); 
        }else if (rslt_adr<0){

            $(document).ready(function(){
                $('#adr-val').css({
                    'color':'#FC6847',
                });
                $('.triangle-adr-up').css({
                    'display': 'none',
                });
                $('.triangle-adr-down').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-top': '18px solid #FC6847',
                    'margin-left': '41px',
                });  
            }); 
        }else{
            document.getElementById('adr-val').innerHTML = 0 + '%';
            $(document).ready(function(){
                $('#adr-val').css({
                    'color':'lightgray',
                });
                $('.triangle-adr-up').css({
                    'display' : 'none',
                });
                $('.triangle-adr-down').css({
                    'display' : 'none',
                });  
            });
        }
    
        if (rslt_revpar>0){
            
            //#7BE15F - lightgreen
            $(document).ready(function(){
                $('#revpar-val').css({
                    'color':'#7BE15F',
                });
                $('.triangle-revpar-up').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('.triangle-revpar-down').css({
                    'display': 'none',
                });  
            }); 
        }else if (rslt_revpar<0){

            $(document).ready(function(){
                $('#revpar-val').css({
                    'color':'#FC6847',
                });
                $('.triangle-revpar-up').css({
                    'display': 'none',
                });
                $('.triangle-revpar-down').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-top': '18px solid #FC6847',
                    'margin-left': '41px',
                });
            }); 
        }else{
            document.getElementById('revpar-val').innerHTML = 0 + '%';
            $(document).ready(function(){
                $('#revpar-val').css({
                    'color':'lightgray',
                });
                $('.triangle-revpar-up').css({
                    'display' : 'none',
                });
                $('.triangle-revpar-down').css({
                    'display' : 'none',
                }); 
            });
        }
    }

}

//Occ % Metric
function occMetricApiCall(){
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccMetric')
    .then(response => response.json())
    .then(data => loadOccMetric(data));
}
function loadOccMetric(data) {
    let parsed_data = JSON.parse(data);

    let curr_occ; let prev_occ;

    if ( parsed_data[0].occmetric === null ) {

        document.getElementById('occ-val').innerHTML = 0 + '%';
        $(document).ready(function(){
            $('#occ-val').css({
                'color':'lightgray',
            });
            $('.triangle-occ-up').css({
                'display' : 'none',
            });
            $('.triangle-occ-down').css({
                'display' : 'none',
            });
            $('.val-occ').css({
                'margin-top' : '-23px',
            }); 
        });

    } else{
        curr_occ = parsed_data[0].occmetric;
        prev_occ = parsed_data[1].occmetric;

        rslt_occ = (((curr_occ - prev_occ)/curr_occ)*100).toFixed(1);
        document.getElementById('occ-val').innerHTML = rslt_occ + '%';

        if (rslt_occ>0){
            
            //#7BE15F - lightgreen
            $(document).ready(function(){
                $('#occ-val').css({
                    'color':'#7BE15F',
                });
                $('.triangle-occ-up').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('.triangle-occ-down').css({
                    'display': 'none',
                });
            }); 
        }else if (rslt_occ<0){
            //p_adr.fontcolor("#FC6847");//#FC6847 - light red
            $(document).ready(function(){
                $('#occ-val').css({
                    'color':'#FC6847',
                });
                $('.triangle-occ-up').css({
                    'display': 'none',
                });
                $('.triangle-occ-down').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-top': '18px solid #FC6847',
                    'margin-left': '41px',
                });  
            }); 
        }else{
            document.getElementById('occ-val').innerHTML = 0 + '%';
            $(document).ready(function(){
                $('#occ-val').css({
                    'color':'lightgray',
                });
                $('.triangle-occ-up').css({
                    'display' : 'none',
                });
                $('.triangle-occ-down').css({
                    'display' : 'none',
                });
            });
        }
    }

}



function occAvailAPICall() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccAvail')
    .then(response => response.json())
    .then(data => loadOccAvailData(data));
}
//Loading Occupancy% v Availability Data
function loadOccAvailData(data) {
    //console.log(data);

    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let occ   = []; let tmp_occ   = [];
    let mon   = []; let tmp_mon   = [];
    let avail = []; let tmp_avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let mon_pid_1    = [];    let mon_pid_2    = [];    let mon_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];

    if(data.length === 0){
        document.write('no data');
    }else{
        let cnt=0;
        for (var i=1; i<=parsed_data.length; i+=1){
            let tmp;
            if (i === 1){
                tmp_mon[cnt] = parsed_data[i-1].mon;
                tmp = parsed_data[i-1].occ.toFixed(0);
                tmp_occ[cnt] = parseInt(tmp);
                tmp = 0;
                tmp = parsed_data[i-1].avail.toFixed(0);
                tmp_avail[cnt] = parseInt(tmp);

                tmp = 0;
                cnt+=1;

            }else if (parsed_data[i-2].mon == parsed_data[i-1].mon){
                continue;
            }else{
                tmp_mon[cnt] = parsed_data[i-1].mon;
                tmp = parsed_data[i-1].occ.toFixed(0);
                tmp_occ[cnt] = parseInt(tmp);
                tmp = 0;
                tmp = parsed_data[i-1].avail.toFixed(0);
                tmp_avail[cnt] = parseInt(tmp);

                tmp = 0;
                cnt+=1;
            }
        }
        delete tmp;
        //Data Splitter
        dataSplittor_Occ(occ_pid_1, avail_pid_1, mon_pid_1, occ_pid_2, avail_pid_2, mon_pid_2, occ_pid_all, avail_pid_all, mon_pid_all, tmp_occ, tmp_avail, tmp_mon);
        //Data Loader
        dataLoader_Occ(occ, avail, mon, occ_pid_1, avail_pid_1, mon_pid_1, occ_pid_2, avail_pid_2, mon_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
    }
    
    occVAvailGraph_Metric(occ,mon,avail);
}
//Data Splitting Function
function dataSplittor_Occ(occ_pid_1, avail_pid_1, mon_pid_1, occ_pid_2, avail_pid_2, mon_pid_2, occ_pid_all, avail_pid_all, mon_pid_all, tmp_occ, tmp_avail, tmp_mon) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= tmp_mon.length; i++) {
        if (i <= 12) {
            occ_pid_all[x]    = tmp_occ[i-1];
            avail_pid_all[x]  = tmp_avail[i-1];
            mon_pid_all[x]    = tmp_mon[i-1];

            x+=1
        }
        if ((i > 12) && (i <= 24)) {
            occ_pid_1[y]      = tmp_occ[i-1];
            avail_pid_1[y]    = tmp_avail[i-1];
            mon_pid_1[y]      = tmp_mon[i-1];

            y+=1
        }
        if (i > 24) {
            occ_pid_2[z]      = tmp_occ[i-1];
            avail_pid_2[z]    = tmp_avail[i-1];
            mon_pid_2[z]      = tmp_mon[i-1];

            z+=1
        }
    }
    delete (x,y);
    
}
//Data Loader Function for Review Score vs Hotel Resp Bool
function dataLoader_Occ(occ, avail, mon, occ_pid_1, avail_pid_1, mon_pid_1, occ_pid_2, avail_pid_2, mon_pid_2, occ_pid_all, avail_pid_all, mon_pid_all){
    let c = 0;

    if ($('#occ-all-pid').is(':checked') === true){ //Load pid-all OCC data

        for (let i = 0; i < mon_pid_all.length; i++) {
            occ[i] = occ_pid_all[i];
            avail[i] = avail_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        occVAvailGraph(occ, mon, avail, c);

        delete ( occ, mon, avail );
    }
    
    $('#occ-all-pid').change(function () {
        if ( $(this).is(':checked')) { //Load pid-all OCC data

            c = 0;

            document.getElementById('occ-date').style.display = 'block';
            document.getElementById('occ-canvas').style.display = 'block';
            
            
            $('#occ-pid-1').prop('checked', true);
            $('#occ-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                occ[i] = occ_pid_all[i];
                avail[i] = avail_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            occVAvailGraph(occ, mon, avail, c);

        }else{ //If unchecked, load none
            
            $('#occ-pid-1').prop('checked', false);
            $('#occ-pid-2').prop('checked', false);
            
            document.getElementById('occ-canvas').style.display = 'none';

            $('#occ-control-panel').css({
                'float': 'right',
                'margin-right': '35px',
            });

        }
    });
    
    $('#occ-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#occ-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#occ-all-pid').prop('checked', false);
                $('#occ-pid-2').prop('checked', false);
                
                document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_1[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }else{                                            //if 2 is checked, load pid all data

                document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'block';

                $('#occ-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_all[i];
                    avail[i] = avail_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }
             

        }else{
            
            if ( ($('#occ-pid-2').is(':checked') === false) && ($('#occ-all-pid').is(':checked') === false) ) {
                
                //document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'none';

                $('#occ-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

            }else if ( $('#occ-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                let t_occ = []; let t_avail = []; let t_mon = []; 

                $('#occ-all-pid').prop('checked', false);
                
                document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_2.length; i++) {
                    t_occ[i] = occ_pid_2[i];
                    t_avail[i] = avail_pid_2[i];
                    t_mon[i] = mon_pid_2[i];
                }
                c+=1;
    
                occVAvailGraph(t_occ, t_mon, t_avail, c);
                
                $('#occ-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

                delete (t_occ, t_mon, t_avail);
            }

        }
    });
    
    $('#occ-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#occ-pid-1').is(':checked') === false && $('#occ-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                let t_occ = []; let t_avail = []; let t_mon = [];

                document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_2.length; i++) {
                    t_occ[i] = occ_pid_2[i];
                    t_avail[i] = avail_pid_2[i];
                    t_mon[i] = mon_pid_2[i];
                }
                c+=1;
    
                occVAvailGraph(t_occ, t_mon, t_resp_bool, c);
                delete( t_occ, t_mon, t_avail );

            }else {
                //Then display pid all data
                document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'block';

                $('#occ-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_all[i];
                    avail[i] = avail_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }

        }else{

            if ( $('#occ-pid-1').is(':checked') === false && $('#occ-all-pid').is(':checked') === false ) {
                //Display none
            
                //document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'none';

                $('#occ-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

            }else if ( $('#occ-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#occ-all-pid').prop('checked', false);

                document.getElementById('occ-date').style.display = 'block';
                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_1[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);


                $('#occ-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

                delete ( occ, mon, avail );
            }

        }
    });

}
//Creating Avg. Occupancy % vs Avg. Available Rooms Chart Here
function occVAvailGraph(occ, mon, avail, c) {

    //Temporay Data
		var rev_tmp_data = [];
		var adr_tmp_data =[];
		var mon_tmp_data =[];
		//Dynamically changed data - creat and store separate data variables like above & below
		var rev_data = [];
		var adr_data = [];
		var mon_data = [];
		
		for (var i = 0; i < mon.length; i+=1) {

				rev_tmp_data[i] = occ[i];
				adr_tmp_data[i] = avail[i];
				mon_tmp_data[i] = mon[i];

				rev_data[i] = occ[i];
				adr_data[i] = avail[i];
				mon_data[i] = mon[i];
		}
		
		let d1 = (new Date('2020.01.01')).getTime(); let d2 = (new Date('2020.12.31')).getTime();
        let start_time = (new Date('2020.01.01')); let end_time = new Date('2020.12.31');

        document.getElementById('occ-date').innerHTML = start_time.getDate()+'/'+(start_time.getMonth()+1)+'/'+start_time.getFullYear() + ' - ' + end_time.getDate()+'/'+(end_time.getMonth()+1)+'/'+end_time.getFullYear();

        //Slider
		$( function() {
			
		    $( "#occ-slider-range" ).slider({
		      	range: true,
		      	min: d1,
		      	max: d2,
		      	values: [ (new Date(2020,03,01)).getTime(), (new Date(2020,06,31)).getTime() ],
		      	slide: function( event, ui ) {
		        	$( "#occ-amount" ).val( new Date(ui.values[ 0 ]).getDate() + "/" + (new Date(ui.values[ 0 ]).getMonth()+1) + "/" + new Date(ui.values[ 0 ]).getFullYear() + " - " + new Date(ui.values[ 1 ]).getDate() + "/" + (new Date(ui.values[ 1 ]).getMonth()+1) + "/" + new Date(ui.values[ 1 ]).getFullYear());
		        	//Dynamically change arrays here
		        	
		        	loadData((new Date(ui.values[0]).getMonth()+1), (new Date(ui.values[1]).getMonth()+1),mon_data, adr_data, rev_data, mon_tmp_data,adr_tmp_data,rev_tmp_data)
		      	}
		    });
		    $( "#occ-amount" ).val( $( "#occ-slider-range" ).slider( "values", 0 ) +
		      " - " + $( "#occ-slider-range" ).slider( "values", 1 ) );
            $("#occ-amount").css({
                'display':'none',
            });
		});

		//Function to change arrays dynamically
		function loadData(point_1,point_2, mon_data, adr_data, rev_data, mon_tmp_data, adr_tmp_data, rev_tmp_data){
            $("#occ-date").css({
                'display':'none',
            });
            $("#occ-amount").css({
                'display':'block',
                'margin-top': '15px',
                'font-size': '15px'
            });
			while(mon_data.length > 0){
				rev_data.pop();
				adr_data.pop();
				mon_data.pop();
			}
			
			
			let cnt = 0;
			for (var i = point_1; i <= point_2; i+=1) {

				rev_data[cnt] = rev_tmp_data[i-1];
				adr_data[cnt] = adr_tmp_data[i-1];
				mon_data[cnt] = mon_tmp_data[i-1];
				cnt+=1
			}

			delete cnt;
			//updating chart
			occ_v_Avail_Graph.update();
		}

		

    let occCanvas = document.getElementById('occ-canvas').getContext('2d');

        var entranceDataset = {
            label: 'Avg. Occupancy %',
            type: 'line',
            yAxesID : "y-axis-1",
            data: rev_data,
            backgroundColor: 'rgba(0, 204, 0, 0.2)',
            borderColor: 'rgba(0, 204, 0,1)',
            borderWidth: 1
        };

        var dataset = [];
        dataset.push(entranceDataset);

        var lineDataset = {
            type: 'line',
            label: 'Avg. Available Rooms',
            yAxisID : "y-axis-2",
            data: adr_data,
            backgroundColor: "rgba(255,255,255,0.5)",
            borderColor: 'rgba(255, 93, 0, 0.6)',
            borderWidth: 2
        }

        dataset.push(lineDataset);

        if (c === 1) {
            occ_v_Avail_Graph.destroy();
        }

        occ_v_Avail_Graph = new Chart(occCanvas, {
            type: 'line',
            data: {
                labels: mon_data,
                datasets: dataset
            },
            options: {
                /*tooltips: {
                    mode: 'single'
                },*/
                scales: {
                    yAxes: [{
                        id:"y-axis-1",
                        position:'left',
                        type: 'linear',
                        ticks: {
                            beginAtZero:true/*,
                            callback: function(label, index, labels){
		                		return label/1000+'k';
		                	},*/
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Occupancy %'
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
                                labelString: 'Avg. Available Rooms'
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
                            labelString: 'Month of Date'
                        }
                    }]
                },
                
            }
        });

        if (c === 1) {
            occ_v_Avail_Graph.update();
        }

        delete (d1,d2,dataset,mon_data, adr_data, rev_data, mon_tmp_data, adr_tmp_data, rev_tmp_data);
}
//Duplicate Metric Avg. Occupancy % vs Avg. Available Rooms Chart Here
function occVAvailGraph_Metric(occ,mon,avail) {

    //Temporay Data
    var occ_tmp_data = [];
    var avail_tmp_data =[];
    var mon_tmp_data =[];
    //Dynamically changed data - creat and store separate data variables like above & below
    var occ_data = [];
    var avail_data = [];
    var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {

            occ_tmp_data[i] = occ[i];
            avail_tmp_data[i] = avail[i];
            mon_tmp_data[i] = mon[i];

            occ_data[i] = occ[i];
            avail_data[i] = avail[i];
            mon_data[i] = mon[i];
    }
    
    let d1 = (new Date('2020.01.01')).getTime();
    let d2 = (new Date('2020.12.31')).getTime();

    let occCanvas_Metric = document.getElementById('occ-metric-canvas').getContext('2d');

        var occDataset = {
            label: 'Avg. Occupancy %',
            type: 'line',
            yAxesID : "y-axis-1",
            data: occ_data,
            backgroundColor: 'rgba(0, 204, 0, 0.2)',
            borderColor: 'rgba(0, 204, 0,1)',
            borderWidth: 1
        };

        var dataset = [];
        dataset.push(occDataset);

        var availDataset = {
            type: 'line',
            label: 'Avg. Available Rooms',
            yAxisID : "y-axis-2",
            data: avail_data,
            backgroundColor: "rgba(255,255,255,0.5)",
            borderColor: 'rgba(255, 93, 0, 0.6)',
            borderWidth: 2
        }

        dataset.push(availDataset);


        occ_v_Avail_Graph_Metric = new Chart(occCanvas_Metric, {
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
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Occupancy %'
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
                                labelString: 'Avg. Available Rooms'
                            }
                    }],
                    xAxes : [{
                        ticks: {
                            display: false
                        },
                        barPercentage: 1.1,
                        gridLines : {
                            display : false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Month of Date'
                        }
                    }]
                },
                
            }
        });

        delete (d1,d2,dataset,mon_data, avail_data, occ_data, mon_tmp_data, avail_tmp_data, occ_tmp_data);
}



function revHotelRespAPICall() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevResp')
    .then(response => response.json())
    .then(data => loadRevHotelRespData(data));
}
//Loading Review v Hotel Response Data
function loadRevHotelRespData(data) {
    
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
        dataSplittor_RevResp(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
        
        //Loading data
        dataLoader_RevResp(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all);
    
    }
    revHotelRespGraph_Metric(rev_score,mon,resp_bool);
    delete (rev_score, total_rev, rev_with_resp, resp_bool, mon, parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all);
}
//Data Loader Function for Review Score vs Hotel Resp Bool
function dataLoader_RevResp(rev_score, total_rev, rev_with_resp, resp_bool, mon, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, resp_bool_pid_all, mon_pid_all){
    let c = 0;

    if ($('#rev-resp-all-pid').is(':checked') === true){

        for (let i = 0; i < mon_pid_all.length; i++) {
            rev_score[i] = rev_score_pid_all[i];
            resp_bool[i] = resp_bool_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        revHotelRespGraph(rev_score, mon, resp_bool, c);

        delete ( rev_score, mon, resp_bool );
    }
    $('#rev-resp-all-pid').change(function () {
        if ( $(this).is(':checked')) {

            c = 0;

            document.getElementById('rev-resp-date').style.display = 'block';
            document.getElementById('rev-resp-canvas').style.display = 'block';
            
            
            $('#rev-resp-pid-1').prop('checked', true);
            $('#rev-resp-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_all.length; i++) {
                rev_score[i] = rev_score_pid_all[i];
                resp_bool[i] = resp_bool_pid_all[i];
                mon[i] = mon_pid_all[i];
            }
            c+=1;

            revHotelRespGraph(rev_score, mon, resp_bool, c);

        }else{
            
            $('#rev-resp-pid-1').prop('checked', false);
            $('#rev-resp-pid-2').prop('checked', false);
            
            document.getElementById('rev-resp-canvas').style.display = 'none';

            $('#rev-resp-control-panel').css({
                'float': 'right',
                'margin-right': '35px',
            });

        }
    });
    $('#rev-resp-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#rev-resp-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#rev-resp-all-pid').prop('checked', false);
                $('#rev-resp-pid-2').prop('checked', false);
                
                document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_1[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);
            }else{                                            //if 2 is checked, load pid all data

                document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#rev-resp-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev_score[i] = rev_score_pid_all[i];
                    resp_bool[i] = resp_bool_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                revHotelRespGraph(rev_score, mon, resp_bool, c);
            }
             

        }else{
            
            if ( ($('#rev-resp-pid-2').is(':checked') === false) && ($('#rev-resp-all-pid').is(':checked') === false) ) {
                
                //document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'none';

                $('#rev-resp-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

            }else if ( $('#rev-resp-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                let t_rev_score = []; let t_resp_bool = []; let t_mon = []; 

                $('#rev-resp-all-pid').prop('checked', false);
                
                document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_2.length; i++) {
                    t_rev_score[i] = rev_score_pid_2[i];
                    t_resp_bool[i] = resp_bool_pid_2[i];
                    t_mon[i] = mon_pid_2[i];
                }
                c+=1;
    
                revHotelRespGraph(t_rev_score, t_mon, t_resp_bool, c);
                

                $('#rev-resp-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });
                delete (t_rev_score, t_mon, t_resp_bool);
            }

        }
    });
    $('#rev-resp-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#rev-resp-pid-1').is(':checked') === false && $('#rev-resp-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                let t_rev_score = []; let t_resp_bool = []; let t_mon = [];

                document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_2.length; i++) {
                    t_rev_score[i] = rev_score_pid_2[i];
                    t_resp_bool[i] = resp_bool_pid_2[i];
                    t_mon[i] = mon_pid_2[i];
                }
                c+=1;
    
                revHotelRespGraph(t_rev_score, t_mon, t_resp_bool, c);
                delete( rev_score, mon, resp_bool );

            }else {
                //Then display pid all data
                c = 0;
                document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'block';

                $('#rev-resp-all-pid').prop('checked', true);

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

            if ( $('#rev-resp-pid-1').is(':checked') === false && $('#rev-resp-all-pid').is(':checked') === false ) {
                //Display none
            
                //document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'none';

                $('#rev-resp-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

            }else if ( $('#rev-resp-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#rev-resp-all-pid').prop('checked', false);

                document.getElementById('rev-resp-date').style.display = 'block';
                document.getElementById('rev-resp-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev_score[i] = rev_score_pid_1[i];
                    resp_bool[i] = resp_bool_pid_1[i];
                    mon[i] = mon_pid_1[i];
                }
                c+=1;

                revHotelRespGraph(rev_score, mon, resp_bool, c);


                $('#rev-resp-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

                delete( rev_score, mon, resp_bool );
            }

        }
    });

}
//Data Splitting Function for Review Score vs Hotel Resp Bool
function dataSplittor_RevResp(parsed_data, rev_score_pid_1, total_rev_pid_1, rev_with_resp_pid_1, resp_bool_pid_1, mon_pid_1, mon_rev_with_resp_pid_1, rev_score_pid_2, total_rev_pid_2, rev_with_resp_pid_2, resp_bool_pid_2, mon_pid_2, mon_total_rev_pid_2, mon_rev_with_resp_pid_2, rev_score_pid_all, total_rev_pid_all, rev_with_resp_pid_all, resp_bool_pid_all, mon_pid_all) {
    let r=0; let s=0; let t=0; let u=0; let v=0; let w=0; let x=0; let y=0; let z=0;  
    
    
    for (let i = 1; i <= parsed_data.length; i++) {
        //Avg. Review Score for pid = 1
        if ( (i > 1) && (i <= 28) ) {
            let tmp;
            mon_pid_1[u] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            rev_score_pid_1[u] = parseInt(tmp);
            tmp = 0;
            u+=1;
        }
        //Avg. Review Score for pid = 2
        if ((i > 29) && (i <= 47)) {
            let tmp;
            mon_pid_2[v] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            rev_score_pid_2[v] = parseInt(tmp);
            tmp = 0;
            v+=1;
        }
        //Avg. Review Score for pid = all
        if ( (i > 47) && (i <= 75) ) {
            let tmp;
            mon_pid_all[w] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            rev_score_pid_all[w] = parseInt(tmp);
            tmp = 0;
            w+=1;
        }

        //Total Reviews for pid = all
        if ( (i > 75) && (i <= 103) ) {
            let tmp;
            //mon_pid_all[x] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            total_rev_pid_all[x] = parseInt(tmp);
            tmp = 0;
            x+=1;
        }
        //Total Reviews for pid = 1
        if ( (i > 103) && (i <= 131) ) {
            let tmp;
            //mon_pid_1[y] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            total_rev_pid_1[y] = parseInt(tmp);
            tmp = 0;
            y+=1;
        }
        //Total Reviews for pid = 2
        if ( (i > 131) && (i <= 150) ) {
            let tmp;
            mon_total_rev_pid_2[z] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            total_rev_pid_2[z] = parseInt(tmp);
            tmp = 0;
            z+=1;
        }
        //Reviews with Hotel Response for pid = all
        if ( (i > 150) && (i <= 178) ) {
            let tmp;
            //mon_pid_all[r] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            rev_with_resp_pid_all[r] = parseInt(tmp);
            tmp = 0;
            r+=1;
        }
        //Reviews with Hotel Response for pid = 1
        if ( (i > 178) && (i <= 205) ) {
            let tmp;
            mon_rev_with_resp_pid_1[s] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            rev_with_resp_pid_1[s] = parseInt(tmp);
            tmp = 0;
            s+=1;
        }
        //Reviews with Hotel Response for pid = 2
        if ( (i > 205) && (i <= 223) ) {
            let tmp;
            mon_rev_with_resp_pid_2[t] = parsed_data[i-1].revdate;
            tmp = parsed_data[i-1].revscr.toFixed(0);
            rev_with_resp_pid_2[t] = parseInt(tmp);
            tmp = 0;
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

    delete (r,s,t,u,v,w,x,y,z);

}
//Creating Avg. Review Score vs Avg. Hotel Response Bool Chart Here
function revHotelRespGraph(rev_score ,mon, resp_bool, c) {

    //Temporay Data
    var rev_score_tmp_data = [];
    var resp_bool_tmp_data =[];
    var mon_tmp_data =[];
    
    //Dynamically changed data - creat and store separate data variables like above & below
    var rev_score_data = [];
    var resp_bool_data = [];
    var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {

            rev_score_tmp_data[i] = rev_score[i];
            resp_bool_tmp_data[i] = resp_bool[i];
            mon_tmp_data[i] = mon[i];

            rev_score_data[i] = rev_score[i];
            resp_bool_data[i] = resp_bool[i];
            mon_data[i] = mon[i];
    }
        
        

    //Getting 1st and last dates
    let date_first_year = mon_data[2].slice(-4);
    let date_last_year = mon_data[(mon_data.length)-1].slice(-4);
    let last_date = date_last_year + '.' + '11' + '.' + '30';
    let first_date = date_first_year + '.' + '09' + '.' + '01'; 
    

    let t_d1 = (new Date(first_date)).getTime();
    let t_d2 = (new Date(last_date)).getTime();

    let d1 = (new Date(t_d1)).getTime();
    let d2 = (new Date(t_d2)).getTime();


    let start_time = (new Date('2019.03.01')); let end_time = new Date('2020.01.31');

    document.getElementById('rev-resp-date').innerHTML = start_time.getDate()+'/'+(start_time.getMonth()+1)+'/'+start_time.getFullYear() + ' - ' + end_time.getDate()+'/'+(end_time.getMonth()+1)+'/'+end_time.getFullYear();
    
    //Slider
    $( function() {

        $( "#rev-resp-slider-range" ).slider({
            range: true,
            min: d1,
            max: d2,
            values: [ (new Date(2019,02,01)).getTime(), (new Date(2019,11,11)).getTime() ],
            slide: function( event, ui ) {
                
                //Updating data
                for (let i = 0; i < mon.length; i++) {
                    mon_data[i] = mon[i];
                }

                $( "#rev-resp-amount" ).val( new Date(ui.values[ 0 ]).getDate() + "/" + (new Date(ui.values[ 0 ]).getMonth()+1) + "/" + new Date(ui.values[ 0 ]).getFullYear() + " - " + new Date(ui.values[ 1 ]).getDate() + "/" + (new Date(ui.values[ 1 ]).getMonth()+1) + "/" + new Date(ui.values[ 1 ]).getFullYear());
                //Dynamically change arrays here
                
                loadData((new Date(ui.values[0]).getMonth()+1), (new Date(ui.values[0]).getFullYear()), (new Date(ui.values[1]).getMonth()+1), (new Date(ui.values[1]).getFullYear()), mon_data, resp_bool_data, rev_score_data, mon_tmp_data, resp_bool_tmp_data, rev_score_tmp_data)
            }
        });
        $( "#rev-resp-amount" ).val( $( "#rev-resp-slider-range" ).slider( "values", 0 ) + " - " + $( "#rev-resp-slider-range" ).slider( "values", 1 ) );
        $("#rev-resp-amount").css({
            'display':'none',
        });
    });
    
    //Function to change arrays dynamically
    function loadData(first_mon, first_year, last_mon, last_year , mon_data, resp_bool_data, rev_score_data, mon_tmp_data, resp_bool_tmp_data, rev_score_tmp_data){
        
        let point_1; let point_2;

        let t_val_1 = monthName(first_mon) + ' ' + first_year; 
        let t_val_2 = monthName(last_mon) + ' ' + last_year;

        
        for (let x in mon_data) {

            if ( mon_data[x] === t_val_1 ) {
                point_1 = (parseInt(x)+1);
            }
            if ( mon_data[x] === t_val_2 ) {
                point_2 = (parseInt(x)+1);
            }
        }

        $("#rev-resp-date").css({
            'display':'none',
        });
        $("#rev-resp-amount").css({
            'display':'block',
            'margin-top': '15px',
            'font-size': '15px'
        });
        
        //Emptying data arrays
        while(mon_data.length > 0){
            rev_score_data.pop();
            resp_bool_data.pop();
            mon_data.pop();
        }
        
        let cnt = 0;
        for (var i = point_1; i <= point_2; i+=1) {

            rev_score_data[cnt] = rev_score_tmp_data[i-1];
            resp_bool_data[cnt] = resp_bool_tmp_data[i-1];
            mon_data[cnt] = mon_tmp_data[i-1];
            cnt+=1
        }
        delete cnt;
        
        //updating chart
        rev_Resp_Graph.update();
    }

    function monthName(monNumber){
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'][monNumber-1];
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

        if (c === 1) {
            rev_Resp_Graph.destroy();
        }

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
                            labelString: 'Avg. Review Score'
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
                                labelString: 'Avg. Hotel Response Bool'
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
                            labelString: 'Month of Date'
                        }
                    }]
                },
                
            }
        });

        if (c === 1) {
            rev_Resp_Graph.update();
        }

        delete (d1,d2,dataset,mon_data, resp_bool_data, rev_score_data, mon_tmp_data, resp_bool_tmp_data, rev_score_tmp_data);
}
//Duplicate Metric Avg. Review Score vs Avg. Hotel Response Bool Chart Here
function revHotelRespGraph_Metric(rev_score,mon,resp_bool) {

    //Temporay Data
    var rev_score_tmp_data = [];
    var resp_bool_tmp_data =[];
    var mon_tmp_data =[];
    //Dynamically changed data - creat and store separate data variables like above & below
    var rev_score_data = [];
    var resp_bool_data = [];
    var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {

            rev_score_tmp_data[i] = rev_score[i];
            resp_bool_tmp_data[i] = resp_bool[i];
            mon_tmp_data[i] = mon[i];

            rev_score_data[i] = rev_score[i];
            resp_bool_data[i] = resp_bool[i];
            mon_data[i] = mon[i];
    }

    let d1 = (new Date('2020.01.01')).getTime();
    let d2 = (new Date('2020.12.31')).getTime();

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
                            max: 9
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Review Score'
                        }
                        }, {
                            id:"y-axis-2",
                            position:'right',
                            type: 'linear',
                            scaleOverride: true,
                            scaleSteps: 10,
                            ticks: {
                                beginAtZero:true,
                                max: 90,
                                callback: function(label, index, labels){
                                    return label+'.00%';
                                },
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Avg. Hotel Response Bool'
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
                            labelString: 'Month of Date'
                        }
                    }]
                },
                
            }
        });

        delete (d1,d2,dataset,mon_data, resp_bool_data, rev_score_data, mon_tmp_data, resp_bool_tmp_data, rev_score_tmp_data);
}




function revParAPICall() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevPar')
    .then(response => response.json())
    .then(data => loadRevParData(data));
}
//Loading RevPar v Revenue Data
function loadRevParData(data){
    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph

    let rev    = []; let tmp_rev    = [];
    let revpar = []; let tmp_revpar = [];
    let mon    = []; let tmp_mon    = []; 
    let adr    = []; let tmp_adr    = [];

    let rev_pid_1    = [];     let rev_pid_2    = [];     let rev_pid_all    = [];
    let revpar_pid_1 = [];     let revpar_pid_2 = [];     let revpar_pid_all = [];
    let mon_pid_1    = [];     let mon_pid_2    = [];     let mon_pid_all    = [];
    let adr_pid_1    = [];     let adr_pid_2    = [];     let adr_pid_all    = [];
    
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
        
        //Data Splittor
        dataSplittor_Revpar(rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon);

        //loadData function - checks checkbox's status and then loads the data
        dataLoader_Revpar(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);

        //Next task: Set onclick lister to check box to display data

        delete (rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
    }

    revParVRevGraph_Metric(rev, revpar, mon, adr); //Duplicated graph
}
//loadData function - checks checkbox's status and then loads the data
function dataLoader_Revpar(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all) {
    let c = 0;

    if ($('#revpar-all-pid').is(':checked') === true){ //Load pid-all data

        for (let i = 0; i < mon_pid_1.length; i++) {
            rev[i] = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i] = adr_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        
        revParVRevGraph(rev, revpar, mon, adr, c);
        delete ( rev, revpar, mon, adr );
    }
    
    $('#revpar-all-pid').change(function () { //Load pid-all data
        if ( $(this).is(':checked')) {

            c = 0;

            document.getElementById('rev-par-date').style.display = 'block';
            document.getElementById('revpar-canvas').style.display = 'block';
            
            
            $('#revpar-pid-1').prop('checked', true);
            $('#revpar-pid-2').prop('checked', true);

            for (let i = 0; i < mon_pid_1.length; i++) {
                rev[i] = rev_pid_all[i];
                revpar[i] = revpar_pid_all[i];
                adr[i] = adr_pid_all[i];
                mon[i] = mon_pid_1[i];
            }
            c+=1;
            revParVRevGraph(rev, revpar, mon, adr, c);
            
            delete ( rev, revpar, mon, adr );

        }else{ //Load none
            
            $('#revpar-pid-1').prop('checked', false);
            $('#revpar-pid-2').prop('checked', false);

            document.getElementById('revpar-canvas').style.display = 'none';

            $('#rev-par-control-panel').css({
                'float': 'right',
                'margin-right': '35px',
            });

        }
    });
    
    $('#revpar-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revpar-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;
                $('#revpar-all-pid').prop('checked', false);
                $('#revpar-pid-2').prop('checked', false);

                document.getElementById('rev-par-date').style.display = 'block';
                
                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_1[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else{                                            //if 2 is checked, load pid-all data
                c = 0;

                document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'block';

                $('#revpar-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_1[i];
                }
                c+=1;
                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }
             

        }else{
            
            if ( ($('#revpar-pid-2').is(':checked') === false) && ($('#revpar-all-pid').is(':checked') === false) ) {
                
                
                //document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'none';

                $('#rev-par-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

            }else if ( $('#revpar-pid-2').is(':checked') === true ){ //Load only pid-2 data
                c = 0;
                let t_rev = []; let t_revpar = []; let t_adr = []; let t_mon = []; 

                $('#revpar-all-pid').prop('checked', false);
                

                document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    t_rev[i] = rev_pid_2[i];
                    t_revpar[i] = revpar_pid_2[i];
                    t_adr[i] = adr_pid_2[i];
                    t_mon[i] = mon_pid_2[i];
                }
                
                c+=1;
                
                revParVRevGraph(t_rev, t_revpar, t_mon, t_adr, c);

                $('#rev-par-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

                delete ( t_rev, t_revpar, t_mon, t_adr );
            }

        }
    });
    
    $('#revpar-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'block';
                
                
                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_2[i];
                }
                
                c+=1;
                
                revParVRevGraph(rev, revpar, mon, adr, c);

            }else { //Then display pid all data
                c = 0;

                document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'block';
                

                $('#revpar-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_1[i];
                }
                c+=1;
                revParVRevGraph(rev, revpar, mon, adr, c);
                delete (  rev, revpar, mon, adr );
            }

        }else{

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Display none
            
                //document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'none';

                $('#rev-par-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

            }else if ( $('#revpar-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);

                document.getElementById('rev-par-date').style.display = 'block';
                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_1.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_1[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);


                $('#rev-par-control-panel').css({
                    'float': 'right',
                    'margin-right': '35px',
                });

                delete ( rev, revpar, mon, adr );
            }

        }
    });
}
//Data Splitting Function
function dataSplittor_Revpar(rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= tmp_mon.length; i++) {
        if (i <= 12) {
            rev_pid_all[x]    = tmp_rev[i-1];
            revpar_pid_all[x] = tmp_revpar[i-1];
            adr_pid_all[x]    = tmp_adr[i-1];
            mon_pid_all[x]    = tmp_mon[i-1];

            x+=1
        }
        if ((i > 12) && (i <= 24)) {
            rev_pid_1[y]    = tmp_rev[i-1];
            revpar_pid_1[y] = tmp_revpar[i-1];
            adr_pid_1[y]    = tmp_adr[i-1];
            mon_pid_1[y]    = tmp_mon[i-1];

            y+=1
        }
        if (i > 24) {
            rev_pid_2[z]    = tmp_rev[i-1];
            revpar_pid_2[z] = tmp_revpar[i-1];
            adr_pid_2[z]    = tmp_adr[i-1];
            mon_pid_2[z]    = tmp_mon[i-1];

            z+=1
        }
    }
    delete (x,y,z);
    
}
//Creating Revenue Par vs Revenue Chart Here
function revParVRevGraph(rev, revpar, mon, adr, c) {

    //Temporay Data
	var rev_tmp_data = [];
    var revpar_tmp_data = [];
	var adr_tmp_data =[];
	var mon_tmp_data =[];
	
    //Dynamically changed data - creat and store separate data variables like above & below
	var rev_data = [];
    var revpar_data = [];
	var adr_data = [];
	var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {

        rev_tmp_data[i] = rev[i];
        revpar_tmp_data[i] = revpar[i];
        adr_tmp_data[i] = adr[i];
        mon_tmp_data[i] = mon[i];

        rev_data[i] = rev[i];
        revpar_data[i] = revpar[i];
        adr_data[i] = adr[i];
        mon_data[i] = mon[i];
    }
    
    let d1 = (new Date('2020.01.01')).getTime();
    let d2 = (new Date('2020.12.31')).getTime();

    let start_time = (new Date('2020.01.01')); let end_time = new Date('2020.12.31');
    document.getElementById('rev-par-date').innerHTML = start_time.getDate()+'/'+(start_time.getMonth()+1)+'/'+start_time.getFullYear() + ' - ' + end_time.getDate()+'/'+(end_time.getMonth()+1)+'/'+end_time.getFullYear();

    //Slider
    $( function() {
        
        $( "#rev-par-slider-range" ).slider({
            range: true,
            min: d1,
            max: d2,
            values: [ (new Date(2020,03,01)).getTime(), (new Date(2020,06,31)).getTime() ],
            slide: function( event, ui ) {
                $( "#amount" ).val( new Date(ui.values[ 0 ]).getDate() + "/" + (new Date(ui.values[ 0 ]).getMonth()+1) + "/" + new Date(ui.values[ 0 ]).getFullYear() + " - " + new Date(ui.values[ 1 ]).getDate() + "/" + (new Date(ui.values[ 1 ]).getMonth()+1) + "/" + new Date(ui.values[ 1 ]).getFullYear());
                //Dynamically change arrays here
                
                loadData((new Date(ui.values[0]).getMonth()+1), (new Date(ui.values[1]).getMonth()+1),mon_data, adr_data, rev_data, revpar_data, mon_tmp_data,adr_tmp_data,rev_tmp_data, revpar_tmp_data)
            }
        });
        $( "#amount" ).val( $( "#rev-par-slider-range" ).slider( "values", 0 ) + " - " + $( "#rev-par-slider-range" ).slider( "values", 1 ) );
        $("#amount").css({
            'display':'none',
        });
    });

    //Function to change arrays dynamically
    function loadData(point_1,point_2, mon_data, adr_data, rev_data, revpar_data, mon_tmp_data, adr_tmp_data, rev_tmp_data, revpar_tmp_data){

        $("#rev-par-date").css({
            'display':'none',
        });
        $("#amount").css({
            'display':'block',
            'margin-top': '15px',
            'font-size': '15px'
        });

        while(mon_data.length > 0){
            rev_data.pop();
            revpar_data.pop();
            adr_data.pop();
            mon_data.pop();
        }
        
        
        let cnt = 0;
        for (var i = point_1; i <= point_2; i+=1) {

            rev_data[cnt] = rev_tmp_data[i-1];
            revpar_data[cnt] = revpar_tmp_data[i-1];
            adr_data[cnt] = adr_tmp_data[i-1];
            mon_data[cnt] = mon_tmp_data[i-1];
            cnt+=1
        }

        delete cnt;
        //updating chart
        revPar_v_Par_Graph.update();
    }

		

    let revParCanvas = document.getElementById('revpar-canvas').getContext('2d');

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

        if (c === 1) {
            revPar_v_Par_Graph.destroy();
        }

        revPar_v_Par_Graph = new Chart(revParCanvas, {
            type: 'bar',
            data: {
                labels: mon_data,
                datasets: dataset
            },
            options: {
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
                            labelString: 'Revenue'
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
                                labelString: 'Avg. ADR'
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
                            labelString: 'Month of Date'
                        }
                    }]
                },
                
            }
        });
        if (c === 1) {
            console.log('destroy called');
            revPar_v_Par_Graph.update();
        }

        delete (d1,d2,dataset,mon_data, adr_data, rev_data, mon_tmp_data, adr_tmp_data, rev_tmp_data);
}
//Duplicate Metric Revenue Par vs Revenue Chart Here
function revParVRevGraph_Metric(rev, revpar, mon, adr) {

    //Temporay Data
	var rev_tmp_data = [];
    var revpar_tmp_data = [];
	var adr_tmp_data =[];
	var mon_tmp_data =[];

	//Dynamically changed data
	//creat and store separate data variables like above & below
	var rev_data = [];
    var revpar_data = [];
	var adr_data = [];
	var mon_data = [];
		
	for (var i = 0; i < mon.length; i+=1) {

		rev_tmp_data[i] = rev[i];
        revpar_tmp_data[i] = revpar[i];
		adr_tmp_data[i] = adr[i];
		mon_tmp_data[i] = mon[i];

		rev_data[i] = rev[i];
        revpar_data[i] = revpar[i];
		adr_data[i] = adr[i];
		mon_data[i] = mon[i];
	}
		
	let d1 = (new Date('2020.01.01')).getTime();
	let d2 = (new Date('2020.12.31')).getTime();	

    let revParCanvas = document.getElementById('metric-revpar-canvas').getContext('2d');

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

    revPar_v_Par_Graph_Metric = new Chart(revParCanvas, {
        type: 'bar',
        data: {
            labels: mon_data,
            datasets: dataset
        },
        options: {
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
                        labelString: 'Revenue'
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
                            labelString: 'Avg. ADR'
                        }
                }],
                xAxes : [{
                    ticks: {
                        display: false
                    },
                    barPercentage: 1.1,
                    gridLines : {
                        display : false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month of Date'
                    }
                }]
            },
            
        }
    });


    delete (d1,d2,dataset,mon_data, adr_data, rev_data, mon_tmp_data, adr_tmp_data, rev_tmp_data);
}