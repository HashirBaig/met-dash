//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#rev-resp-all-pid').is(':checked') === false)){
        $('#rev-resp-all-pid').prop('checked', true);
        $('#rev-resp-pid-1').prop('checked', true);
        $('#rev-resp-pid-2').prop('checked', true);
    }

    //Getting Review v Hotel Response Data
    revHotelRespAPICall();
});

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

        delete (d1,d2,dataset,mon_data, resp_bool_data, rev_score_data, mon_tmp_data, resp_bool_tmp_data, rev_score_tmp_data);
}