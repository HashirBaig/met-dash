//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#revpar-all-pid').is(':checked') === false)){
        $('#revpar-all-pid').prop('checked', true);
        $('#revpar-pid-1').prop('checked', true);
        $('#revpar-pid-2').prop('checked', true);
    }

    //Getting RevPar v Rev Data
    revParAPICall();
});
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
            console.log('destroy called');
            revPar_v_Par_Graph.update();
        }

        delete (d1,d2,dataset,mon_data, adr_data, rev_data, mon_tmp_data, adr_tmp_data, rev_tmp_data);
}