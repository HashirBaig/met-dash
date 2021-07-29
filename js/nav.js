$(document).ready( function() {
    
    //For metric-btn
    $('#metric-btn').click( function() {
        
        if ( window.outerWidth <= 480 ) {

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            $('#revpar-pid-filter').hide();
            $('.revpar__dropdown__date').show();
            $('.revpar__date__filter__title').show();
            //Hiding 'rev-resp-container' 
            $('#rev-resp-container').hide();
            $('#revresp-pid-filter').hide();
            $('.revresp__dropdown__date').hide();
            $('.revresp__date__filter__title').hide();
            //Hiding 'occ-container' 
            $('#occ-container').hide();
            $('#occ-pid-filter').hide();
            $('.occ__dropdown__date').hide();
            $('.occ__date__filter__title').hide();

            //Showing main metric page property and date filter
            $('.dropdown__date').show();
            $('.date__filter__title').show();
            $('#metric-container').show();
            $('#metric-stats').show();
            $('#rev-occ-pid-filter').show();
            $('#metric-rev-par-graph').show();
            $('#metric-occ-graph').show();
            $('#metric-hotel-resp-graph').show();
            $('#metric-container').show();

        }else{ /*---Desktop View---*/

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            $('#revpar-pid-filter').hide();
            $('.revpar__dropdown__date').show();
            $('.revpar__date__filter__title').show();
            //Hiding 'rev-resp-container' 
            $('#rev-resp-container').hide();
            $('#revresp-pid-filter').hide();
            $('.revresp__dropdown__date').hide();
            $('.revresp__date__filter__title').hide();
            //Hiding 'occ-container' 
            $('#occ-container').hide();
            $('#occ-pid-filter').hide();
            $('.occ__dropdown__date').hide();
            $('.occ__date__filter__title').hide();

            //Showing main metric page property and date filter
            $('.dropdown__date').show();
            $('.date__filter__title').show();
            $('#metric-container').show();
            $('#metric-stats').show();
            $('#rev-occ-pid-filter').show();
            $('#metric-rev-par-graph').show();
            $('#metric-occ-graph').show();
            $('#metric-hotel-resp-graph').show();
            $('#metric-container').show();
        }
    });
    
    //For revpar-v-rev-btn
    $('#revpar-v-rev-btn').click( function() {

        if ( window.outerWidth <= 480 ) {
            //Showing 'rev-par-container' 
            $('#rev-par-container').show();
            $('#revpar-pid-filter').show();
            $('.revpar__dropdown__date').show();
            $('.revpar__date__filter__title').show();
            //Hiding 'revresp-container' 
            $('#revresp-container').hide();
            $('#revresp-pid-filter').hide();
            $('.revresp__dropdown__date').hide();
            $('.revresp__date__filter__title').hide();
            //Hiding 'occ-container'
            $('#occ-container').hide();
            $('#occ-pid-filter').hide();
            $('.occ__dropdown__date').hide();
            $('.occ__date__filter__title').hide();

            //Showing main metric page property and date filter
            $('.dropdown__date').hide();
            $('.date__filter__title').hide();
            $('#metric-container').hide();
            $('#metric-stats').hide();
            $('#rev-occ-pid-filter').hide();
            $('#metric-rev-par-graph').hide();
            $('#metric-occ-graph').hide();
            $('#metric-hotel-resp-graph').hide();
            $('#metric-container').hide();

        }else{

            //Showing 'rev-par-container' 
            $('#rev-par-container').show();
            $('#revpar-pid-filter').show();
            $('.revpar__dropdown__date').show();
            $('.revpar__date__filter__title').show();
            //Hiding 'rev-resp-container' 
            $('#revresp-container').hide();
            $('#revresp-pid-filter').hide();
            $('.revresp__dropdown__date').hide();
            $('.revresp__date__filter__title').hide();
            //Hiding 'occ-container'
            $('#occ-container').hide();
            $('#occ-pid-filter').hide();
            $('.occ__dropdown__date').hide();
            $('.occ__date__filter__title').hide();

            //Showing main metric page property and date filter
            $('.dropdown__date').hide();
            $('.date__filter__title').hide();
            $('#metric-container').hide();
            $('#metric-stats').hide();
            $('#rev-occ-pid-filter').hide();
            $('#metric-rev-par-graph').hide();
            $('#metric-occ-graph').hide();
            $('#metric-hotel-resp-graph').hide();
            $('#metric-container').hide();

        }
        
    });

    //For rev-v-hotel-resp-btn
    $('#rev-v-hotel-resp-btn').click( function() {
        
        if ( window.outerWidth <= 480 ) {

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            $('#revpar-pid-filter').hide();
            $('.revpar__dropdown__date').hide();
            $('.revpar__date__filter__title').hide();
            //Showing 'rev-resp-container' 
            $('#revresp-container').show();
            $('#revresp-pid-filter').show();
            $('.revresp__dropdown__date').show();
            $('.revresp__date__filter__title').show();
            //Hiding 'occ-container' 
            $('#occ-container').hide();
            $('#occ-pid-filter').hide();
            $('.occ__dropdown__date').hide();
            $('.occ__date__filter__title').hide();

           //Hiding main metric page property and date filter
           $('.dropdown__date').hide();
           $('.date__filter__title').hide();
           $('#metric-container').hide();
           $('#metric-stats').hide();
           $('#rev-occ-pid-filter').hide();
           $('#metric-rev-par-graph').hide();
           $('#metric-occ-graph').hide();
           $('#metric-hotel-resp-graph').hide();
           $('#metric-container').hide();

        }else{ /*---Desktop View---*/

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            $('#revpar-pid-filter').hide();
            $('.revpar__dropdown__date').hide();
            $('.revpar__date__filter__title').hide();
            //Showing 'rev-resp-container' 
            $('#revresp-container').show();
            $('#revresp-pid-filter').show();
            $('.revresp__dropdown__date').show();
            $('.revresp__date__filter__title').show();
            //Hiding 'occ-container' 
            $('#occ-container').hide();
            $('#occ-pid-filter').hide();
            $('.occ__dropdown__date').hide();
            $('.occ__date__filter__title').hide();

           //Hiding main metric page property and date filter
           $('.dropdown__date').hide();
           $('.date__filter__title').hide();
           $('#metric-container').hide();
           $('#metric-stats').hide();
           $('#rev-occ-pid-filter').hide();
           $('#metric-rev-par-graph').hide();
           $('#metric-occ-graph').hide();
           $('#metric-hotel-resp-graph').hide();
           $('#metric-container').hide();
        }
    });

    //For occ-v-avail-btn
    $('#occ-v-avail-btn').click( function() {
        
        if ( window.outerWidth <= 480 ) {

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            $('#revpar-pid-filter').hide();
            $('.revpar__dropdown__date').hide();
            $('.revpar__date__filter__title').hide();
            //Showing 'rev-resp-container' 
            $('#revresp-container').hide();
            $('#revresp-pid-filter').hide();
            $('.revresp__dropdown__date').hide();
            $('.revresp__date__filter__title').hide();
            //Hiding 'occ-container' 
            $('#occ-container').show();
            $('#occ-pid-filter').show();
            $('.occ__dropdown__date').show();
            $('.occ__date__filter__title').show();

           //Hiding main metric page property and date filter
           $('.dropdown__date').hide();
           $('.date__filter__title').hide();
           $('#metric-container').hide();
           $('#metric-stats').hide();
           $('#rev-occ-pid-filter').hide();
           $('#metric-rev-par-graph').hide();
           $('#metric-occ-graph').hide();
           $('#metric-hotel-resp-graph').hide();
           $('#metric-container').hide();

        }else{ /*---Desktop View---*/

            //Hiding 'rev-par-container' 
            $('#rev-par-container').hide();
            $('#revpar-pid-filter').hide();
            $('.revpar__dropdown__date').hide();
            $('.revpar__date__filter__title').hide();
            //Showing 'rev-resp-container' 
            $('#revresp-container').hide();
            $('#revresp-pid-filter').hide();
            $('.revresp__dropdown__date').hide();
            $('.revresp__date__filter__title').hide();
            //Hiding 'occ-container' 
            $('#occ-container').show();
            $('#occ-pid-filter').show();
            $('.occ__dropdown__date').show();
            $('.occ__date__filter__title').show();

           //Hiding main metric page property and date filter
           $('.dropdown__date').hide();
           $('.date__filter__title').hide();
           $('#metric-container').hide();
           $('#metric-stats').hide();
           $('#rev-occ-pid-filter').hide();
           $('#metric-rev-par-graph').hide();
           $('#metric-occ-graph').hide();
           $('#metric-hotel-resp-graph').hide();
           $('#metric-container').hide();
        }
    });

});