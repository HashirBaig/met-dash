//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#revpar-all-pid').is(':checked') === false)){
        $('#revpar-all-pid').prop('checked', true);
        $('#revpar-pid-1').prop('checked', true);
        $('#revpar-pid-2').prop('checked', true);
    }

    $('#revpar__menu__item__btn__1').prop('disabled', true);
    $('#revpar__menu__item__btn__1').css({
        'cursor':'no-drop',
        'background-color':'#f0f0f0',
    });
    
});


//For Rev vs Revpar - Dashboard [2020]
function revParAPICall__2020() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevPar2020')
    .then(response => response.json())
    .then(data => loadRevParData__2020(data));
}
//Loading RevPar v Revenue Data  [2020]
function loadRevParData__2020(data){
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
        
        //Removing redundancy from data
        for (var i=1; i<=parsed_data.length; i+=1){

            //Data Splittor
            dataSplittor_Revpar__2020(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon);
            
            //loadData function - checks checkbox's status and then loads the data
            dataLoader_Revpar__2020(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
        }
        delete (tmp);

        delete (tmp_rev, tmp_revpar, tmp_adr, tmp_mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
    }
}
//Data Splitting Function  [2020]
function dataSplittor_Revpar__2020(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon) {
    let x=0; let y=0; let z=0;

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= 12) {
            rev_pid_all[x]    = parsed_data[i-1].rev;
            revpar_pid_all[x] = parsed_data[i-1].revpar;
            adr_pid_all[x]    = parsed_data[i-1].adr;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > 12) && (i <= 24)) {
            rev_pid_1[y]    = parsed_data[i-1].rev;
            revpar_pid_1[y] = parsed_data[i-1].revpar;
            adr_pid_1[y]    = parsed_data[i-1].adr;

            y+=1
        }
        if (i > 24) {
            rev_pid_2[z]    = parsed_data[i-1].rev;
            revpar_pid_2[z] = parsed_data[i-1].revpar;
            adr_pid_2[z]    = parsed_data[i-1].adr;

            z+=1
        }
    }
    delete (x,y,z);
    
}
//loadData function - checks checkbox's status and then loads the data  [2020]
function dataLoader_Revpar__2020(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all) {
    let c = 0;

    if ($('#revpar-all-pid').is(':checked') === true){ //Load pid-all data
        c=0;
        
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev[i] = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i] = adr_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        
        revParVRevGraph(rev, revpar, mon, adr, c);
        delete ( rev, revpar, mon, adr );
    }
    
    $('#revpar-all-pid').change(function () { //Load pid-all data
        if ( $(this).is(':checked')) {

            c = 0;

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
            c=0;
            $('#revpar-pid-1').prop('checked', false);
            $('#revpar-pid-2').prop('checked', false);

            c+=1;
           //Display none
           let a=[];let b=[];let d=[];let e=[]; 
           revParVRevGraph(a, b, d, e, c);
           delete (a, b, d, e, c);
        }
    });
    
    $('#revpar-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revpar-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);
                $('#revpar-pid-2').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else{                                            //if 2 is checked, load pid-all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';

                $('#revpar-all-pid').prop('checked', true);


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }
             

        }else{
            
            if ( ($('#revpar-pid-2').is(':checked') === false) && ($('#revpar-all-pid').is(':checked') === false) ) {
                
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-2').is(':checked') === true ){ //Load only pid-2 data
                c = 0;
                

                $('#revpar-all-pid').prop('checked', false);
                
                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
    
    $('#revpar-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('revpar-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;
                
                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else { //Then display pid all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';
                
                $('#revpar-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete (  rev, revpar, mon, adr );
            }

        }else{

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
}


//For Rev vs Revpar - Dashboard [This Year]
function revParAPICall__ThisYear() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevParThisYear')
    .then(response => response.json())
    .then(data => loadRevParData__ThisYear(data));
}
//Loading RevPar v Revenue Data  [This Year]
function loadRevParData__ThisYear(data){
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

            //Data Splittor
            dataSplittor_Revpar__ThisYear(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon);
            
            //loadData function - checks checkbox's status and then loads the data
            dataLoader_Revpar__ThisYear(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
        }
        delete (tmp);

        delete (tmp_rev, tmp_revpar, tmp_adr, tmp_mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
    }
}
//Data Splitting Function  [This Year]
function dataSplittor_Revpar__ThisYear(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon) {
    let x=0; let y=0; let z=0;
    
    //Getting Current Month
    var date = new Date();
    var n = date.getMonth() + 1;

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= n) {
            rev_pid_all[x]    = parsed_data[i-1].rev;
            revpar_pid_all[x] = parsed_data[i-1].revpar;
            adr_pid_all[x]    = parsed_data[i-1].adr;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > n) && (i <= (n*2))) {
            rev_pid_1[y]    = parsed_data[i-1].rev;
            revpar_pid_1[y] = parsed_data[i-1].revpar;
            adr_pid_1[y]    = parsed_data[i-1].adr;

            y+=1
        }
        if (i > (n*2)) {
            rev_pid_2[z]    = parsed_data[i-1].rev;
            revpar_pid_2[z] = parsed_data[i-1].revpar;
            adr_pid_2[z]    = parsed_data[i-1].adr;

            z+=1
        }
    }
    delete (date,n,x,y,z);
    
}
//loadData function - checks checkbox's status and then loads the data  [This Year]
function dataLoader_Revpar__ThisYear(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all) {
    let c = 0;

    if ($('#revpar-all-pid').is(':checked') === true){ //Load pid-all data
        c=0;
        
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev[i] = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i] = adr_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        
        revParVRevGraph(rev, revpar, mon, adr, c);
        delete ( rev, revpar, mon, adr );
    }
    
    $('#revpar-all-pid').change(function () { //Load pid-all data
        if ( $(this).is(':checked')) {

            c = 0;

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
            c=0;
            $('#revpar-pid-1').prop('checked', false);
            $('#revpar-pid-2').prop('checked', false);

            c+=1;
           //Display none
           let a=[];let b=[];let d=[];let e=[]; 
           revParVRevGraph(a, b, d, e, c);
           delete (a, b, d, e, c);
        }
    });
    
    $('#revpar-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revpar-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);
                $('#revpar-pid-2').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else{                                            //if 2 is checked, load pid-all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';

                $('#revpar-all-pid').prop('checked', true);


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }
             

        }else{
            
            if ( ($('#revpar-pid-2').is(':checked') === false) && ($('#revpar-all-pid').is(':checked') === false) ) {
                
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-2').is(':checked') === true ){ //Load only pid-2 data
                c = 0;
                

                $('#revpar-all-pid').prop('checked', false);
                
                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
    
    $('#revpar-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('revpar-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;
                
                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else { //Then display pid all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';
                
                $('#revpar-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete (  rev, revpar, mon, adr );
            }

        }else{

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
}


//For Rev vs Revpar - Dashboard [Last 06 Months]
function revParAPICall__06() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevPar06')
    .then(response => response.json())
    .then(data => loadRevParData__06(data));
}
//Loading RevPar v Revenue Data  [Last 06 Months]
function loadRevParData__06(data){
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

            //Data Splittor
            dataSplittor_Revpar__06(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon);
            
            //loadData function - checks checkbox's status and then loads the data
            dataLoader_Revpar__06(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
        }
        delete (tmp);

        delete (tmp_rev, tmp_revpar, tmp_adr, tmp_mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
    }
}
//Data Splitting Function  [Last 06 Months]
function dataSplittor_Revpar__06(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= 6) {
            rev_pid_all[x]    = parsed_data[i-1].rev;
            revpar_pid_all[x] = parsed_data[i-1].revpar;
            adr_pid_all[x]    = parsed_data[i-1].adr;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > 6) && (i <= 12)) {
            rev_pid_1[y]    = parsed_data[i-1].rev;
            revpar_pid_1[y] = parsed_data[i-1].revpar;
            adr_pid_1[y]    = parsed_data[i-1].adr;

            y+=1
        }
        if (i > 12) {
            rev_pid_2[z]    = parsed_data[i-1].rev;
            revpar_pid_2[z] = parsed_data[i-1].revpar;
            adr_pid_2[z]    = parsed_data[i-1].adr;

            z+=1
        }
    }
    delete (x,y,z);
    
}
//loadData function - checks checkbox's status and then loads the data  [Last 06 Months]
function dataLoader_Revpar__06(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all) {
    let c = 0;

    if ($('#revpar-all-pid').is(':checked') === true){ //Load pid-all data
        c=0;
        
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev[i] = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i] = adr_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        
        revParVRevGraph(rev, revpar, mon, adr, c);
        delete ( rev, revpar, mon, adr );
    }
    
    $('#revpar-all-pid').change(function () { //Load pid-all data
        if ( $(this).is(':checked')) {

            c = 0;

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
            c=0;
            $('#revpar-pid-1').prop('checked', false);
            $('#revpar-pid-2').prop('checked', false);

            c+=1;
           //Display none
           let a=[];let b=[];let d=[];let e=[]; 
           revParVRevGraph(a, b, d, e, c);
           delete (a, b, d, e, c);
        }
    });
    
    $('#revpar-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revpar-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);
                $('#revpar-pid-2').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else{                                            //if 2 is checked, load pid-all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';

                $('#revpar-all-pid').prop('checked', true);


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }
             

        }else{
            
            if ( ($('#revpar-pid-2').is(':checked') === false) && ($('#revpar-all-pid').is(':checked') === false) ) {
                
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-2').is(':checked') === true ){ //Load only pid-2 data
                c = 0;
                

                $('#revpar-all-pid').prop('checked', false);
                
                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
    
    $('#revpar-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('revpar-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;
                
                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else { //Then display pid all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';
                
                $('#revpar-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete (  rev, revpar, mon, adr );
            }

        }else{

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
}


//For Rev vs Revpar - Dashboard [Last 03 Months]
function revParAPICall__03() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getRevPar03')
    .then(response => response.json())
    .then(data => loadRevParData__03(data));
}
//Loading RevPar v Revenue Data [Last 03 Months]
function loadRevParData__03(data){
    let parsed_data = JSON.parse(data);
    
    //Factors for RevPar vs Rev Graph

    let rev    = [];
    let revpar = [];
    let mon    = []; 
    let adr    = [];

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

            //Data Splittor
            dataSplittor_Revpar__03(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
            
            //loadData function - checks checkbox's status and then loads the data
            dataLoader_Revpar__03(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
        }
        delete (tmp);

        delete (rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all);
    }
}
//Data Splitting Function [Last 03 Months]
function dataSplittor_Revpar__03(parsed_data, rev_pid_1, revpar_pid_1, adr_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all, tmp_rev, tmp_revpar, tmp_adr, tmp_mon) {
    let x=0; let y=0; let z=0;  

    for (let i = 1; i <= parsed_data.length; i++) {
        if (i <= 3) {
            rev_pid_all[x]    = parsed_data[i-1].rev;
            revpar_pid_all[x] = parsed_data[i-1].revpar;
            adr_pid_all[x]    = parsed_data[i-1].adr;
            mon_pid_all[x]    = parsed_data[i-1].mon;

            x+=1
        }
        if ((i > 3) && (i <= 6)) {
            rev_pid_1[y]    = parsed_data[i-1].rev;
            revpar_pid_1[y] = parsed_data[i-1].revpar;
            adr_pid_1[y]    = parsed_data[i-1].adr;

            y+=1
        }
        if (i > 6) {
            rev_pid_2[z]    = parsed_data[i-1].rev;
            revpar_pid_2[z] = parsed_data[i-1].revpar;
            adr_pid_2[z]    = parsed_data[i-1].adr;

            z+=1
        }
    }
    delete (x,y,z);
    
}
//loadData function - checks checkbox's status and then loads the data [Last 03 Months]
function dataLoader_Revpar__03(rev, revpar, adr, mon, rev_pid_1, revpar_pid_1, adr_pid_1, mon_pid_1, rev_pid_2, revpar_pid_2, adr_pid_2, mon_pid_2, rev_pid_all, revpar_pid_all, adr_pid_all, mon_pid_all) {
    let c = 0;

    if ($('#revpar-all-pid').is(':checked') === true){ //Load pid-all data
        c=0;
        
        for (let i = 0; i < mon_pid_all.length; i++) {
            rev[i] = rev_pid_all[i];
            revpar[i] = revpar_pid_all[i];
            adr[i] = adr_pid_all[i];
            mon[i] = mon_pid_all[i];
        }
        c+=1;
        
        revParVRevGraph(rev, revpar, mon, adr, c);
        delete ( rev, revpar, mon, adr );
    }
    
    $('#revpar-all-pid').change(function () { //Load pid-all data
        if ( $(this).is(':checked')) {

            c = 0;

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
            c=0;
            $('#revpar-pid-1').prop('checked', false);
            $('#revpar-pid-2').prop('checked', false);

            c+=1;
           //Display none
           let a=[];let b=[];let d=[];let e=[]; 
           revParVRevGraph(a, b, d, e, c);
           delete (a, b, d, e, c);
        }
    });
    
    $('#revpar-pid-1').change(function () {
        if ( $(this).is(':checked')) {
            c = 0;

            if ($('#revpar-pid-2').is(':checked') === false) { //if 2 is not checked, load only pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);
                $('#revpar-pid-2').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else{                                            //if 2 is checked, load pid-all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';

                $('#revpar-all-pid').prop('checked', true);


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }
             

        }else{
            
            if ( ($('#revpar-pid-2').is(':checked') === false) && ($('#revpar-all-pid').is(':checked') === false) ) {
                
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-2').is(':checked') === true ){ //Load only pid-2 data
                c = 0;
                

                $('#revpar-all-pid').prop('checked', false);
                
                document.getElementById('revpar-canvas').style.display = 'block';


                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
    
    $('#revpar-pid-2').change(function () {
        if ( $(this).is(':checked')) {
            c = 0

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Then display only pid 2 data
                c = 0;
                
                document.getElementById('revpar-canvas').style.display = 'block';
                
                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_2[i];
                    revpar[i] = revpar_pid_2[i];
                    adr[i] = adr_pid_2[i];
                    mon[i] = mon_pid_all[i];
                }
                
                c+=1;
                
                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );

            }else { //Then display pid all data
                c = 0;

                document.getElementById('revpar-canvas').style.display = 'block';
                
                $('#revpar-all-pid').prop('checked', true);

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_all[i];
                    revpar[i] = revpar_pid_all[i];
                    adr[i] = adr_pid_all[i];
                    mon[i] = mon_pid_all[i];
                }
                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete (  rev, revpar, mon, adr );
            }

        }else{

            if ( $('#revpar-pid-1').is(':checked') === false && $('#revpar-all-pid').is(':checked') === false ) {
                //Display none
                let a=[];let b=[];let d=[];let e=[]; 
                revParVRevGraph(a, b, d, e, c);
                delete (a, b, d, e, c);

            }else if ( $('#revpar-pid-1').is(':checked') === true ) {
                //Then display pid 1 data
                c = 0;

                $('#revpar-all-pid').prop('checked', false);

                document.getElementById('revpar-canvas').style.display = 'block';

                for (let i = 0; i < mon_pid_all.length; i++) {
                    rev[i] = rev_pid_1[i];
                    revpar[i] = revpar_pid_1[i];
                    adr[i] = adr_pid_1[i];
                    mon[i] = mon_pid_all[i];
                }

                c+=1;

                revParVRevGraph(rev, revpar, mon, adr, c);
                delete ( rev, revpar, mon, adr );
            }

        }
    });
}
//Creating Revenue Par vs Revenue Chart Here
function revParVRevGraph(rev, revpar, mon, adr, c) {
	
    //Dynamically changed data - creat and store separate data variables like above & below
	var rev_data = [];
    var revpar_data = [];
	var adr_data = [];
	var mon_data = [];
    
    for (var i = 0; i < mon.length; i+=1) {

        rev_data[i] = rev[i];
        revpar_data[i] = revpar[i];
        adr_data[i] = adr[i];
        mon_data[i] = mon[i];
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

    //Revpar Graph here
    revPar_v_Par_Graph = new Chart(revParCanvas, {
        type: 'bar',
        data: {
            labels: mon_data,
            datasets: rev_dataset
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
                        labelString: 'Revenue',
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
                            labelString: 'Avg. ADR',
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
        //Destroy called
        revPar_v_Par_Graph.destroy();
    }
    //Revpar Graph here
    revPar_v_Par_Graph = new Chart(revParCanvas, {
        type: 'bar',
        data: {
            labels: mon_data,
            datasets: rev_dataset
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
                        labelString: 'Revenue',
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
                            labelString: 'Avg. ADR',
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
        //Update called
        revPar_v_Par_Graph.update();
    }

    delete (rev_dataset,mon_data, adr_data, rev_data);
}