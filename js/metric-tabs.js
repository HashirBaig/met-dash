//Document load function here
document.addEventListener('DOMContentLoaded', function(){

    ratingMetricApiCall();

    availMetricApiCall();

    occMetricApiCall();

    metricApiCall();

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
                'color':'darkgray',
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
                $('#metric-avail').css({
                    'background-color':'#FFEBE7',
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
                    'color':'darkgray',
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
                'color':'darkgray',
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
                $('#metric-rating').css({
                    'background-color':'#FFEBE7',
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
                'color':'darkgray',
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
                'color':'darkgray',
            });
            $('.triangle-revpar-up').css({
                'display' : 'none',
            });
            $('.triangle-revpar-down').css({
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
                $('#metric-revpar').css({
                    'background-color':'#FFEBE7',
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
                    'color':'darkgray',
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
                $('#metric-revpar').css({
                    'background-color':'#FFEBE7',
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
                    'color':'darkgray',
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
                'color':'darkgray',
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
            
            $(document).ready(function(){
                $('#occ-val').css({
                    'color':'#FC6847',
                });
                $('#metric-occ').css({
                    'background-color':'#FFEBE7',
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
                    'color':'darkgray',
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
