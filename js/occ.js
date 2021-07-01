//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    if ( ($('#occ-all-pid').is(':checked') === false)){
        $('#occ-all-pid').prop('checked', true);
        $('#occ-pid-1').prop('checked', true);
        $('#occ-pid-2').prop('checked', true);
    }

    //Getting Occupancy% v Availability Data
    occAvailAPICall();
});

function occAvailAPICall() {
    fetch('https://adevu-metric-dashboard.herokuapp.com/getOccAvail')
    .then(response => response.json())
    .then(data => loadOccAvailData(data));
}

//Loading Occupancy% v Availability Data
function loadOccAvailData(data) {

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

        delete (d1,d2,dataset,mon_data, adr_data, rev_data, mon_tmp_data, adr_tmp_data, rev_tmp_data);
}
