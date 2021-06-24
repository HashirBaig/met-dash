//graph dictionary
var graph_names = {
    1:document.getElementById('rev-par-container'),
    2:document.getElementById('rev-resp-container'),
    3:document.getElementById('occ-container'),
    4:document.getElementById('metric-container'),
    5:document.getElementById('metric-right-panel'),
    6:document.getElementById('metric-rev-par-graph'),
    7:document.getElementById('metric-occ-graph'),
    8:document.getElementById('metric-hotel-resp-graph')
};

function visibleElement(elem_selector, selector_type) {
    
    this.elem_selector = elem_selector;
    this.selector_type = selector_type;

    $( '.sidebar' ).css({
        'top' : '0'
    });

    //For Rev Occ Main
    $('#rev-occ-pid-filter').css({
        'display':'none',
    });
    $('#rev-occ-main-date').css({
        'display':'none',
    });
    $('#rev-occ-main-tmp-date').css({
        'display':'none',
    });
    $('#rev-occ-main-metric-date').css({
        'display':'none',
    });
    $('#rev-occ-main-slider-range').css({
        'display':'none',
    });

    //For Rev Resp Main
    $('#rev-resp-pid-filter').css({
        'display':'none',
    });
    $('#rev-resp-main-date').css({
        'display':'none',
    });
    $('#rev-resp-main-tmp-date').css({
        'display':'none',
    });
    $('#rev-resp-main-metric-date').css({
        'display':'none',
    });
    $('#rev-resp-main-slider-range').css({
        'display':'none',
    });

    if (this.selector_type === 'id'){
        let class_elem = document.getElementById(this.elem_selector);
        
        visibilityCheck(class_elem);
        
        class_elem.style.display = 'block';
    }
    
}
function visibilityCheck(class_elem) {
    this.class_elem = class_elem;
    //console.log('div not to be hided: ',this.class_elem);
    for (var key in graph_names){
        if (graph_names[key] !== this.class_elem){
            let tmp = graph_names[key];
            //console.log('div to be hided: ',tmp);
            tmp.style.display = 'none';
        }
    }
}

function containerOneVisible(metric_container, metric_right_panel, metric_revpar_graph, metric_occ_graph, metric_rev_resp_graph, con_1_selector_type) {
    
    //For Rev Occ Main
    $('#rev-occ-pid-filter').css({
        'display':'block',
    });
    $('#rev-occ-main-date').css({
        'display':'block',
    });
    $('#rev-occ-main-tmp-date').css({
        'display':'block',
    });
    $('#rev-occ-main-metric-date').css({
        'display':'block',
    });
    $('#rev-occ-main-slider-range').css({
        'display':'block',
    });

    //For Rev Resp Main
    $('#rev-resp-pid-filter').css({
        'display':'block',
    });
    $('#rev-resp-main-tmp-date').css({
        'display':'block',
    });
    $('#rev-resp-main-metric-date').css({
        'display':'block',
    });
    $("#rev-resp-main-amount").css({
        'display':'block',
        'margin-top':'6px',
        'margin-right':'-1px',
    });
    $('#rev-resp-main-slider-range').css({
        'display':'block',
    });
    
    
    //Divs to be hided
    document.getElementById('rev-par-container').style.display  = 'none';
    document.getElementById('rev-resp-container').style.display = 'none';
    document.getElementById('occ-container').style.display      = 'none';

    //Divs to be displayed
    document.getElementById('metric-container').style.display        = 'block';
    document.getElementById('metric-right-panel').style.display      = 'block';
    document.getElementById('metric-rev-par-graph').style.display    = 'block';
    document.getElementById('metric-occ-graph').style.display        = 'block';
    document.getElementById('metric-hotel-resp-graph').style.display = 'block';
}