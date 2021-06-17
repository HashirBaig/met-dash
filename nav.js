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
