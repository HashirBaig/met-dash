$(document).ready( function() {
    
    //For metric-btn
    $('#metric-btn').click( function() {

        if ( window.innerWidth === 567 ) {
            console.log('in here');

            //Hiding main metric page's filters
            $('#rev-occ-pid-filter').hide();
            $('#rev-occ-main-date').hide();
            $('#rev-occ-main-tmp-date').hide();
            $('#rev-occ-main-metric-date').hide();
            $('#rev-occ-main-slider-range').hide();

            $('#rev-resp-pid-filter').hide();
            $('#rev-resp-main-date').hide();
            $('#rev-resp-main-tmp-date').hide();
            $('#rev-resp-main-metric-date').hide();
            $('#rev-resp-main-slider-range').hide();
            $('#metric-rev-par-graph').hide();
            $('#metric-occ-graph').hide();
            $('#metric-hotel-resp-graph').hide();

        }else{

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            //Hiding 'rev-resp-container' 
            $('#rev-resp-container').hide();
            //Hiding 'occ-container' 
            $('#occ-container').hide();

            //Showing main metric page
            $('#metric-container').show();
            $('#metric-stats').show();
            $('#rev-occ-pid-filter').show();
            $('#rev-occ-main-date').show();
            $('#rev-occ-main-tmp-date').show();
            $('#rev-occ-main-metric-date').show();
            $('#rev-occ-main-slider-range').show();
            $('#rev-resp-pid-filter').show();
            $('#rev-resp-main-date').show();
            $('#rev-resp-main-tmp-date').show();
            $('#rev-resp-main-metric-date').show();
            $('#rev-resp-main-slider-range').show();
            $('#metric-rev-par-graph').show();
            $('#metric-occ-graph').show();
            $('#metric-hotel-resp-graph').show();
        }
    });
    
    //For revpar-v-rev-btn
    $('#revpar-v-rev-btn').click( function() {
        
        //Hiding main metric page
        $('#metric-container').hide();
        $('#metric-stats').hide();
        $('#rev-occ-pid-filter').hide();
        $('#rev-occ-main-date').hide();
        $('#rev-occ-main-tmp-date').hide();
        $('#rev-occ-main-metric-date').hide();
        $('#rev-occ-main-slider-range').hide();
        $('#rev-resp-pid-filter').hide();
        $('#rev-resp-main-date').hide();
        $('#rev-resp-main-tmp-date').hide();
        $('#rev-resp-main-metric-date').hide();
        $('#rev-resp-main-slider-range').hide();
        $('#metric-rev-par-graph').hide();
        $('#metric-occ-graph').hide();
        $('#metric-hotel-resp-graph').hide();
        //Hiding 'rev-resp-container' 
        $('#rev-resp-container').hide();
        //Hiding 'occ-container' 
        $('#occ-container').hide();

        //Showing 'rev-par-container' 
        $('#rev-par-container').show();
    });

    //For rev-v-hotel-resp-btn
    $('#rev-v-hotel-resp-btn').click( function() {
        
        //Hiding main metric page
        $('#metric-container').hide();
        $('#metric-stats').hide();
        $('#rev-occ-pid-filter').hide();
        $('#rev-occ-main-date').hide();
        $('#rev-occ-main-tmp-date').hide();
        $('#rev-occ-main-metric-date').hide();
        $('#rev-occ-main-slider-range').hide();
        $('#rev-resp-pid-filter').hide();
        $('#rev-resp-main-date').hide();
        $('#rev-resp-main-tmp-date').hide();
        $('#rev-resp-main-metric-date').hide();
        $('#rev-resp-main-slider-range').hide();
        $('#metric-rev-par-graph').hide();
        $('#metric-occ-graph').hide();
        $('#metric-hotel-resp-graph').hide();
        //Hiding 'rev-par-container' 
        $('#rev-par-container').hide();
        //Hiding 'occ-container' 
        $('#occ-container').hide();

        //Showing 'rev-resp-container' 
        $('#rev-resp-container').show();
    });

    //For occ-v-avail-btn
    $('#occ-v-avail-btn').click( function() {
        
        //Hiding main metric page
        $('#metric-container').hide();
        $('#metric-stats').hide();
        $('#rev-occ-pid-filter').hide();
        $('#rev-occ-main-date').hide();
        $('#rev-occ-main-tmp-date').hide();
        $('#rev-occ-main-metric-date').hide();
        $('#rev-occ-main-slider-range').hide();
        $('#rev-resp-pid-filter').hide();
        $('#rev-resp-main-date').hide();
        $('#rev-resp-main-tmp-date').hide();
        $('#rev-resp-main-metric-date').hide();
        $('#rev-resp-main-slider-range').hide();
        $('#metric-rev-par-graph').hide();
        $('#metric-occ-graph').hide();
        $('#metric-hotel-resp-graph').hide();
        //Hiding 'rev-par-container' 
        $('#rev-par-container').hide();
        //Hiding 'rev-resp-container' 
        $('#rev-resp-container').hide();

        //Showing 'occ-container' 
        $('#occ-container').show();
    });

});