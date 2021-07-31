//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#occ-all-pid').is(':checked') === false)){
        $('#occ-all-pid').prop('checked', true);
        $('#occ-pid-1').prop('checked', true);
        $('#occ-pid-2').prop('checked', true);
    }

    $('#occ__menu__item__btn__1').prop('disabled', true);
    $('#occ__menu__item__btn__1').css({
        'cursor':'no-drop',
        'background-color':'#f0f0f0',
    });
});



//For Rev vs Revpar - Dashboard [2020]
function occAvailAPICall__2020() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccAvail2020')
    .then(response => response.json())
    //.then(data => { console.log( (JSON.parse(data)).length ) });
    .then(data => loadOccAvailData__2020(data));
}
//Loading Occupancy% v Availability Data [2020]
function loadOccAvailData__2020(data) {

    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let occ   = [];
    let mon   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    /*--------------------------------------------*/    let mon_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];

    if(parsed_data.length === 0){
        document.write('no data');
    }else{
        
        //Data Splitter
        dataSplittor_Occ__2020(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
        //Data Loader
        dataLoader_Occ__2020(occ, avail, mon, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
    }
    
}
//Data Splitting Function [2020]
function dataSplittor_Occ__2020(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= 12) {
            occ_pid_all[x]    = parsed_data[i-1].occ;
            avail_pid_all[x]  = parsed_data[i-1].avail;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > 12) && (i <= 24)) {
            occ_pid_1[y]      = parsed_data[i-1].occ;
            avail_pid_1[y]    = parsed_data[i-1].avail;

            y+=1
        }
        if (i > 24) {
            occ_pid_2[z]      = parsed_data[i-1].occ;
            avail_pid_2[z]    = parsed_data[i-1].avail;

            z+=1
        }
    }
    delete (x,y,z);
    
}
//Data Loader Function for Occ% vs Avail% [2020]
function dataLoader_Occ__2020(occ, avail, mon, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all){
    let c = 0;

    if ($('#occ-all-pid').is(':checked') === true){ //Load pid-all OCC data
        
        c=0;

        for (let i = 0; i < mon_pid_all.length; i++) {
            occ[i] = occ_pid_all[i];
            avail[i] = avail_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;

        occVAvailGraph(occ, mon, avail, c);
        delete ( occ, mon, avail );
    }

    $('#occ-all-pid').change(function () {
        if ( $(this).is(':checked')) { //Load pid-all OCC data

            c = 0;

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
            delete ( occ, mon, avail );

        }else{ //If unchecked, load none
            
            $('#occ-pid-1').prop('checked', false);
            $('#occ-pid-2').prop('checked', false);
            
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            occVAvailGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    
    $('#occ-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#occ-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#occ-all-pid').prop('checked', false);
                $('#occ-pid-2').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }else{                                            //if 2 is checked, load pid all data

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
            c = 0;
            
            if ( ($('#occ-pid-2').is(':checked') === false) && ($('#occ-all-pid').is(':checked') === false) ) {
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#occ-all-pid').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete (occ, mon, avail);
            }

        }
    });
    
    $('#occ-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#occ-pid-1').is(':checked') === false && $('#occ-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete( occ, mon, avail );

            }else {
                //Then display pid all data

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
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#occ-all-pid').prop('checked', false);

                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }

        }
    });

}


//For Rev vs Revpar - Dashboard [This Year]
function occAvailAPICall__ThisYear() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccAvailThisYear')
    .then(response => response.json())
    .then(data => loadOccAvailData__ThisYear(data));
}
//Loading Occupancy% v Availability Data [This Year]
function loadOccAvailData__ThisYear(data) {

    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let occ   = [];
    let mon   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    /*--------------------------------------------*/    let mon_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];

    if(parsed_data.length === 0){
        document.write('no data');
    }else{
        
        //Data Splitter
        dataSplittor_Occ__ThisYear(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
        //Data Loader
        dataLoader_Occ__ThisYear(occ, avail, mon, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
    }
    
}
//Data Splitting Function [This Year]
function dataSplittor_Occ__ThisYear(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all) {
    let x=0; let y=0; let z=0;

    //Getting Current Month
    var date = new Date();
    var n = date.getMonth() + 1;

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= n) {
            occ_pid_all[x]    = parsed_data[i-1].occ;
            avail_pid_all[x]  = parsed_data[i-1].avail;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > n) && (i <= (n*2))) {
            occ_pid_1[y]      = parsed_data[i-1].occ;
            avail_pid_1[y]    = parsed_data[i-1].avail;

            y+=1
        }
        if (i > (n*2)) {
            occ_pid_2[z]      = parsed_data[i-1].occ;
            avail_pid_2[z]    = parsed_data[i-1].avail;

            z+=1
        }
    }
    delete (date,n,x,y,z);
    
}
//Data Loader Function for Occ% vs Avail% [This Year]
function dataLoader_Occ__ThisYear(occ, avail, mon, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all){
    let c = 0;

    if ($('#occ-all-pid').is(':checked') === true){ //Load pid-all OCC data
        
        c=0;

        for (let i = 0; i < mon_pid_all.length; i++) {
            occ[i] = occ_pid_all[i];
            avail[i] = avail_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;

        occVAvailGraph(occ, mon, avail, c);
        delete ( occ, mon, avail );
    }

    $('#occ-all-pid').change(function () {
        if ( $(this).is(':checked')) { //Load pid-all OCC data

            c = 0;

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
            delete ( occ, mon, avail );

        }else{ //If unchecked, load none
            
            $('#occ-pid-1').prop('checked', false);
            $('#occ-pid-2').prop('checked', false);
            
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            occVAvailGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    
    $('#occ-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#occ-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#occ-all-pid').prop('checked', false);
                $('#occ-pid-2').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }else{                                            //if 2 is checked, load pid all data

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
            c = 0;
            
            if ( ($('#occ-pid-2').is(':checked') === false) && ($('#occ-all-pid').is(':checked') === false) ) {
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#occ-all-pid').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete (occ, mon, avail);
            }

        }
    });
    
    $('#occ-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#occ-pid-1').is(':checked') === false && $('#occ-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete( occ, mon, avail );

            }else {
                //Then display pid all data

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
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#occ-all-pid').prop('checked', false);

                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }

        }
    });

}


//For Rev vs Revpar - Dashboard [Last 06 Months]
function occAvailAPICall__06() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccAvail06')
    .then(response => response.json())
    .then(data => loadOccAvailData__06(data));
}
//Loading Occupancy% v Availability Data [Last 06 Months]
function loadOccAvailData__06(data) {

    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let occ   = [];
    let mon   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let mon_pid_1    = [];    let mon_pid_2    = [];    let mon_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];

    if(parsed_data.length === 0){
        document.write('no data');
    }else{
        
        //Data Splitter
        dataSplittor_Occ__06(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
        //Data Loader
        dataLoader_Occ__06(occ, avail, mon, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
    }
    
}
//Data Splitting Function [Last 06 Months]
function dataSplittor_Occ__06(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= 6) {
            occ_pid_all[x]    = parsed_data[i-1].occ;
            avail_pid_all[x]  = parsed_data[i-1].avail;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > 6) && (i <= 12)) {
            occ_pid_1[y]      = parsed_data[i-1].occ;
            avail_pid_1[y]    = parsed_data[i-1].avail;

            y+=1
        }
        if (i > 12) {
            occ_pid_2[z]      = parsed_data[i-1].occ;
            avail_pid_2[z]    = parsed_data[i-1].avail;

            z+=1
        }
    }
    delete (x,y,z);
    
}
//Data Loader Function for Occ% vs Avail% [Last 06 Months]
function dataLoader_Occ__06(occ, avail, mon, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all){
    let c = 0;

    if ($('#occ-all-pid').is(':checked') === true){ //Load pid-all OCC data
        
        c=0;

        for (let i = 0; i < mon_pid_all.length; i++) {
            occ[i] = occ_pid_all[i];
            avail[i] = avail_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;

        occVAvailGraph(occ, mon, avail, c);
        delete ( occ, mon, avail );
    }

    $('#occ-all-pid').change(function () {
        if ( $(this).is(':checked')) { //Load pid-all OCC data

            c = 0;

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
            delete ( occ, mon, avail );

        }else{ //If unchecked, load none
            
            $('#occ-pid-1').prop('checked', false);
            $('#occ-pid-2').prop('checked', false);
            
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            occVAvailGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    
    $('#occ-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#occ-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#occ-all-pid').prop('checked', false);
                $('#occ-pid-2').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }else{                                            //if 2 is checked, load pid all data

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
            c = 0;
            
            if ( ($('#occ-pid-2').is(':checked') === false) && ($('#occ-all-pid').is(':checked') === false) ) {
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#occ-all-pid').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete (occ, mon, avail);
            }

        }
    });
    
    $('#occ-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#occ-pid-1').is(':checked') === false && $('#occ-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete( occ, mon, avail );

            }else {
                //Then display pid all data

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
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#occ-all-pid').prop('checked', false);

                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }

        }
    });

}



//For Rev vs Revpar - Dashboard [Last 03 Months]
function occAvailAPICall__03() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccAvail03')
    .then(response => response.json())
    .then(data => loadOccAvailData__03(data));
}
//Loading Occupancy% v Availability Data [Last 03 Months]
function loadOccAvailData__03(data) {

    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph
    let occ   = [];
    let mon   = [];
    let avail = [];

    let occ_pid_1    = [];    let occ_pid_2    = [];    let occ_pid_all    = [];
    let mon_pid_1    = [];    let mon_pid_2    = [];    let mon_pid_all    = [];
    let avail_pid_1  = [];    let avail_pid_2  = [];    let avail_pid_all  = [];

    if(parsed_data.length === 0){
        document.write('no data');
    }else{
        
        //Data Splitter
        dataSplittor_Occ__03(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
        //Data Loader
        dataLoader_Occ__03(occ, avail, mon, occ_pid_1, avail_pid_1, mon_pid_1, occ_pid_2, avail_pid_2, mon_pid_2, occ_pid_all, avail_pid_all, mon_pid_all);
    }
    
}
//Data Splitting Function [Last 03 Months]
function dataSplittor_Occ__03(parsed_data, occ_pid_1, avail_pid_1, occ_pid_2, avail_pid_2, occ_pid_all, avail_pid_all, mon_pid_all) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= 3) {
            occ_pid_all[x]    = parsed_data[i-1].occ;
            avail_pid_all[x]  = parsed_data[i-1].avail;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > 3) && (i <= 6)) {
            occ_pid_1[y]      = parsed_data[i-1].occ;
            avail_pid_1[y]    = parsed_data[i-1].avail;

            y+=1
        }
        if (i > 6) {
            occ_pid_2[z]      = parsed_data[i-1].occ;
            avail_pid_2[z]    = parsed_data[i-1].avail;

            z+=1
        }
    }
    delete (x,y,z);
    
}
//Data Loader Function for Occ% vs Avail% [Last 03 Months]
function dataLoader_Occ__03(occ, avail, mon, occ_pid_1, avail_pid_1, mon_pid_1, occ_pid_2, avail_pid_2, mon_pid_2, occ_pid_all, avail_pid_all, mon_pid_all){
    let c = 0;

    if ($('#occ-all-pid').is(':checked') === true){ //Load pid-all OCC data
        
        c=0;

        for (let i = 0; i < mon_pid_all.length; i++) {
            occ[i] = occ_pid_all[i];
            avail[i] = avail_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;

        occVAvailGraph(occ, mon, avail, c);
        delete ( occ, mon, avail );
    }

    $('#occ-all-pid').change(function () {
        if ( $(this).is(':checked')) { //Load pid-all OCC data

            c = 0;

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
            delete ( occ, mon, avail );

        }else{ //If unchecked, load none
            
            $('#occ-pid-1').prop('checked', false);
            $('#occ-pid-2').prop('checked', false);
            
            //Display none
            let a=[];let b=[];let d=[];let e=[]; 
            occVAvailGraph(a, b, d, e, c);
            delete (a, b, d, e, c);
        }
    });
    
    $('#occ-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#occ-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                
                $('#occ-all-pid').prop('checked', false);
                $('#occ-pid-2').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }else{                                            //if 2 is checked, load pid all data

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
            c = 0;
            
            if ( ($('#occ-pid-2').is(':checked') === false) && ($('#occ-all-pid').is(':checked') === false) ) {
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-2').is(':checked') === true ){ //Load pid 2 data
                c = 0;

                $('#occ-all-pid').prop('checked', false);
                
                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete (occ, mon, avail);
            }

        }
    });
    
    $('#occ-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ( $('#occ-pid-1').is(':checked') === false && $('#occ-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;

                document.getElementById('occ-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_2[i];
                    avail[i] = avail_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;
    
                occVAvailGraph(occ, mon, avail, c);
                delete( occ, mon, avail );

            }else {
                //Then display pid all data

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
                c =0;
                //Display none
                let a=[];let b=[];let d=[];let e=[];
                c+=1;
                occVAvailGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#occ-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;
                $('#occ-all-pid').prop('checked', false);

                document.getElementById('occ-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    occ[i] = occ_pid_1[i];
                    avail[i] = avail_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                occVAvailGraph(occ, mon, avail, c);
                delete ( occ, mon, avail );
            }

        }
    });

}
//Creating Avg. Occupancy % vs Avg. Available Rooms Chart Here
function occVAvailGraph(occ, mon, avail, c) {

    //Dynamically changed data - creat and store separate data variables like above & below
    var rev_data = [];
    var adr_data = [];
    var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {
        rev_data[i] = occ[i];
        adr_data[i] = avail[i];
        mon_data[i] = mon[i];
    }

    //Updating Canvas
    $('#occ-canvas').remove();
    $('#occ-graph').html('<canvas id="occ-canvas"></canvas>');
    
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

    //Occ% vs Avail% Graph here
    occ_v_Avail_Graph = new Chart(occCanvas, {
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
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Avg. Occupancy %',
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
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Avg. Available Rooms',
                            fontSize: 16,
                            fontStyle: "bold",
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
                        fontSize: 16,
                        fontStyle: "bold",
                    }
                }]
            },
            
        }
    });
    if (c === 1) {
        occ_v_Avail_Graph.update();
    }

    delete (dataset,mon_data, adr_data, rev_data);
}
