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
            $('.triangle-avail').css({
                'display' : 'none',
            });
            $('.val-avail').css({
                'margin-top' : '-23px',
            });
            $('#metric-avail').css({
                'border-top': '4px solid darkgray',
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
                $('.triangle-avail').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('#metric-avail').css({
                    'border-top': '4px solid #7BE15F',
                });
            }); 
        }else if (rslt_avail<0){
            
            $(document).ready(function(){
                $('#avail-val').css({
                    'color':'#FC6847',
                });
                $('#metric-avail').css({
                    'background-color':'#FFEBE7',
                    'border-top': '4px solid #FC6847',
                });
                $('.triangle-avail').css({
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
                $('.triangle-avail').css({
                    'display' : 'none',
                });
                $('#metric-avail').css({
                    'border-top': '4px solid darkgray',
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
            $('.triangle-rating').css({
                'display' : 'none',
            });
            $('.val-rating').css({
                'margin-top' : '-23px',
            });
            $('#metric-rating').css({
                'border-top': '4px solid darkgray',
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
                $('.triangle-rating').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('#metric-rating').css({
                    'border-top': '4px solid #7BE15F',
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
                    'border-top': '4px solid #FFEBE7',
                });
                $('.triangle-rating').css({
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
            $('.triangle-adr').css({
                'display' : 'none',
            });
            $('.val-adr').css({
                'margin-top' : '-23px',
            });
            $('#metric-adr').css({
                'border-top': '4px solid darkgray',
            }); 
        });


        document.getElementById('revpar-val').innerHTML = 0 + '%';
        $(document).ready(function(){
            $('#revpar-val').css({
                'color':'darkgray',
            });
            $('.triangle-revpar').css({
                'display' : 'none',
            });
            $('.val-revpar').css({
                'margin-top' : '-23px',
            });
            $('#metric-revpar').css({
                'border-top': '4px solid darkgray',
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
                $('.triangle-adr').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('#metric-adr').css({
                    'border-top': '4px solid #7BE15F',
                });
            }); 
        }else if (rslt_adr<0){

            $(document).ready(function(){
                $('#adr-val').css({
                    'color':'#FC6847',
                });
                $('#metric-adr').css({
                    'background-color':'#FFEBE7',
                    'border-top': '4px solid #FC6847',
                });
                $('.triangle-adr').css({
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
                $('.triangle-adr').css({
                    'display' : 'none',
                }); 
                $('#metric-adr').css({
                    'border-top': '4px solid darkgray',
                });
            });
        }
    
        if (rslt_revpar>0){
            
            $(document).ready(function(){
                $('#revpar-val').css({
                    'color':'#7BE15F',
                });
                $('.triangle-revpar').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('#metric-revpar').css({
                    'border-top': '4px solid #7BE15F',
                });
            }); 
        }else if (rslt_revpar<0){

            $(document).ready(function(){
                $('#revpar-val').css({
                    'color':'#FC6847',
                });
                $('#metric-revpar').css({
                    'background-color':'#FFEBE7',
                    'border-top': '4px solid #FC6847',
                });
                $('.triangle-revpar').css({
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
                $('.triangle-revpar').css({
                    'display' : 'none',
                });
                $('#metric-revpar').css({
                    'border-top': '4px solid darkgray',
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
            $('.triangle-occ').css({
                'display' : 'none',
            });
            $('.val-occ').css({
                'margin-top' : '-23px',
            });
            $('#metric-occ').css({
                'border-top': '4px solid darkgray',
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
                $('.triangle-occ').css({
                    'width': '0',
                    'height': '0',
                    'border-left': '9px solid transparent',
                    'border-right': '9px solid transparent',
                    'border-bottom': '18px solid #7BE15F',
                    'margin-left': '41px',
                });
                $('#metric-occ').css({
                    'border-top': '4px solid #7BE15F',
                });
            }); 
        }else if (rslt_occ<0){
            
            $(document).ready(function(){
                $('#occ-val').css({
                    'color':'#FC6847',
                });
                $('#metric-occ').css({
                    'background-color':'#FFEBE7',
                    'border-top': '4px solid #FC6847',
                });
                $('.triangle-occ').css({
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
                $('.triangle-occ').css({
                    'display' : 'none',
                });
                $('#metric-occ').css({
                    'border-top': '4px solid darkgray',
                });
            });
        }
    }

}
