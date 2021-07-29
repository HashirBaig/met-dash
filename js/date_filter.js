//For Rev, Occ & Hotel Resp
$(document).ready(function(){
    $('#menu__item__btn__1').click(function(){

        //For 03 Months
        $('#menu__item__btn__1').prop('disabled', true);
        $('#menu__item__btn__1').css({
            'cursor':'no-drop',
        });
        $('#menu__item__btn__1').css({
            'background-color':'#f0f0f0',
        });

        //For 06 Months
        $('#menu__item__btn__2').prop('disabled', false);
        $('#menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For This Year
        $('#menu__item__btn__3').prop('disabled', false);
        $('#menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#menu__item__btn__4').prop('disabled', false);
        $('#menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#dd__hover__span').text( $('#menu__item__btn__1').text() )
    });

    $('#menu__item__btn__2').click(function(){
        //For 06 Months
        $('#menu__item__btn__2').prop('disabled', true);
        $('#menu__item__btn__2').css({
            'cursor':'no-drop',
        });
        $('#menu__item__btn__2').css({
            'background-color':'#f0f0f0',
        });
        //For 03 Months
        $('#menu__item__btn__1').prop('disabled', false);
        $('#menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__1').css({
            'background-color':'#fff',
        });
        //For This Year
        $('#menu__item__btn__3').prop('disabled', false);
        $('#menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#menu__item__btn__4').prop('disabled', false);
        $('#menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#dd__hover__span').text( $('#menu__item__btn__2').text() )
    });
    
    $('#menu__item__btn__3').click(function(){
        
        //For This Year
        $('#menu__item__btn__3').prop('disabled', true);
        $('#menu__item__btn__3').css({
            'cursor':'no-drop',
        });
        $('#menu__item__btn__3').css({
            'background-color':'#f0f0f0',
        });
        
        //For 03 Months
        $('#menu__item__btn__1').prop('disabled', false);
        $('#menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#menu__item__btn__2').prop('disabled', false);
        $('#menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For 2020
        $('#menu__item__btn__4').prop('disabled', false);
        $('#menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });

        $('#dd__hover__span').text( $('#menu__item__btn__3').text() )
    });

    $('#menu__item__btn__4').click(function(){

        //For 2020
        $('#menu__item__btn__4').prop('disabled', true);
        $('#menu__item__btn__4').css({
            'cursor':'no-drop',
        });
        $('#menu__item__btn__4').css({
            'background-color':'#f0f0f0',
        });
        
        //For This Year
        $('#menu__item__btn__3').prop('disabled', false);
        $('#menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__3').css({
            'background-color':'#fff',
        });
        
        //For 03 Months
        $('#menu__item__btn__1').prop('disabled', false);
        $('#menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#menu__item__btn__2').prop('disabled', false);
        $('#menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#menu__item__btn__2').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        //Enabling Hover
        $('.menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#dd__hover__span').text( $('#menu__item__btn__4').text() )
    });
});
//For Rev vs RevPar
$(document).ready(function(){
    $('#revpar__menu__item__btn__1').click(function(){

        //For 03 Months
        $('#revpar__menu__item__btn__1').prop('disabled', true);
        $('#revpar__menu__item__btn__1').css({
            'cursor':'no-drop',
        });
        $('#revpar__menu__item__btn__1').css({
            'background-color':'#f0f0f0',
        });

        //For 06 Months
        $('#revpar__menu__item__btn__2').prop('disabled', false);
        $('#revpar__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For This Year
        $('#revpar__menu__item__btn__3').prop('disabled', false);
        $('#revpar__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#revpar__menu__item__btn__4').prop('disabled', false);
        $('#revpar__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revpar__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#revpar__dd__hover__span').text( $('#revpar__menu__item__btn__1').text() )
    });

    $('#revpar__menu__item__btn__2').click(function(){
        //For 06 Months
        $('#revpar__menu__item__btn__2').prop('disabled', true);
        $('#revpar__menu__item__btn__2').css({
            'cursor':'no-drop',
        });
        $('#revpar__menu__item__btn__2').css({
            'background-color':'#f0f0f0',
        });
        //For 03 Months
        $('#revpar__menu__item__btn__1').prop('disabled', false);
        $('#revpar__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__1').css({
            'background-color':'#fff',
        });
        //For This Year
        $('#revpar__menu__item__btn__3').prop('disabled', false);
        $('#revpar__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#revpar__menu__item__btn__4').prop('disabled', false);
        $('#revpar__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revpar__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#revpar__dd__hover__span').text( $('#revpar__menu__item__btn__2').text() )
    });
    
    $('#revpar__menu__item__btn__3').click(function(){
        
        //For This Year
        $('#revpar__menu__item__btn__3').prop('disabled', true);
        $('#revpar__menu__item__btn__3').css({
            'cursor':'no-drop',
        });
        $('#revpar__menu__item__btn__3').css({
            'background-color':'#f0f0f0',
        });
        
        //For 03 Months
        $('#revpar__menu__item__btn__1').prop('disabled', false);
        $('#revpar__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#revpar__menu__item__btn__2').prop('disabled', false);
        $('#revpar__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For 2020
        $('#revpar__menu__item__btn__4').prop('disabled', false);
        $('#revpar__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revpar__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });

        $('#revpar__dd__hover__span').text( $('#revpar__menu__item__btn__3').text() )
    });

    $('#revpar__menu__item__btn__4').click(function(){

        //For 2020
        $('#revpar__menu__item__btn__4').prop('disabled', true);
        $('#revpar__menu__item__btn__4').css({
            'cursor':'no-drop',
        });
        $('#revpar__menu__item__btn__4').css({
            'background-color':'#f0f0f0',
        });
        
        //For This Year
        $('#revpar__menu__item__btn__3').prop('disabled', false);
        $('#revpar__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        
        //For 03 Months
        $('#revpar__menu__item__btn__1').prop('disabled', false);
        $('#menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#revpar__menu__item__btn__2').prop('disabled', false);
        $('#revpar__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#revpar__menu__item__btn__2').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revpar__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        //Enabling Hover
        $('.revpar__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#revpar__dd__hover__span').text( $('#revpar__menu__item__btn__4').text() )
    });
});
//For Avg. Review Score vs Hotel Response Bool
$(document).ready(function(){
    $('#revresp__menu__item__btn__1').click(function(){

        //For 03 Months
        $('#revresp__menu__item__btn__1').prop('disabled', true);
        $('#revresp__menu__item__btn__1').css({
            'cursor':'no-drop',
        });
        $('#revresp__menu__item__btn__1').css({
            'background-color':'#f0f0f0',
        });

        //For 06 Months
        $('#revresp__menu__item__btn__2').prop('disabled', false);
        $('#revresp__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For This Year
        $('#revresp__menu__item__btn__3').prop('disabled', false);
        $('#revresp__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#revresp__menu__item__btn__4').prop('disabled', false);
        $('#menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revresp__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#revresp__dd__hover__span').text( $('#revresp__menu__item__btn__1').text() )
    });

    $('#revresp__menu__item__btn__2').click(function(){
        //For 06 Months
        $('#revresp__menu__item__btn__2').prop('disabled', true);
        $('#revresp__menu__item__btn__2').css({
            'cursor':'no-drop',
        });
        $('#revresp__menu__item__btn__2').css({
            'background-color':'#f0f0f0',
        });
        //For 03 Months
        $('#revresp__menu__item__btn__1').prop('disabled', false);
        $('#revresp__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__1').css({
            'background-color':'#fff',
        });
        //For This Year
        $('#revresp__menu__item__btn__3').prop('disabled', false);
        $('#revresp__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#revresp__menu__item__btn__4').prop('disabled', false);
        $('#revresp__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revresp__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#revresp__dd__hover__span').text( $('#revresp__menu__item__btn__2').text() )
    });
    
    $('#revresp__menu__item__btn__3').click(function(){
        
        //For This Year
        $('#revresp__menu__item__btn__3').prop('disabled', true);
        $('#revresp__menu__item__btn__3').css({
            'cursor':'no-drop',
        });
        $('#revresp__menu__item__btn__3').css({
            'background-color':'#f0f0f0',
        });
        
        //For 03 Months
        $('#revresp__menu__item__btn__1').prop('disabled', false);
        $('#revresp__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#revresp__menu__item__btn__2').prop('disabled', false);
        $('#revresp__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For 2020
        $('#revresp__menu__item__btn__4').prop('disabled', false);
        $('#revresp__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revresp__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });

        $('#revresp__dd__hover__span').text( $('#revresp__menu__item__btn__3').text() )
    });

    $('#revresp__menu__item__btn__4').click(function(){

        //For 2020
        $('#revresp__menu__item__btn__4').prop('disabled', true);
        $('#revresp__menu__item__btn__4').css({
            'cursor':'no-drop',
        });
        $('#revresp__menu__item__btn__4').css({
            'background-color':'#f0f0f0',
        });
        
        //For This Year
        $('#revresp__menu__item__btn__3').prop('disabled', false);
        $('#revresp__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        
        //For 03 Months
        $('#revresp__menu__item__btn__1').prop('disabled', false);
        $('#revresp__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#revresp__menu__item__btn__2').prop('disabled', false);
        $('#revresp__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#revresp__menu__item__btn__2').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.revresp__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        //Enabling Hover
        $('.revresp__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#revresp__dd__hover__span').text( $('#revresp__menu__item__btn__4').text() )
    });
});
//For Occ% vs Avail%
$(document).ready(function(){
    $('#occ__menu__item__btn__1').click(function(){

        //For 03 Months
        $('#occ__menu__item__btn__1').prop('disabled', true);
        $('#occ__menu__item__btn__1').css({
            'cursor':'no-drop',
        });
        $('#occ__menu__item__btn__1').css({
            'background-color':'#f0f0f0',
        });

        //For 06 Months
        $('#occ__menu__item__btn__2').prop('disabled', false);
        $('#occ__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For This Year
        $('#occ__menu__item__btn__3').prop('disabled', false);
        $('#occ__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#occ__menu__item__btn__4').prop('disabled', false);
        $('#occ__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.occ__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#occ__dd__hover__span').text( $('#occ__menu__item__btn__1').text() )
    });

    $('#occ__menu__item__btn__2').click(function(){
        //For 06 Months
        $('#occ__menu__item__btn__2').prop('disabled', true);
        $('#occ__menu__item__btn__2').css({
            'cursor':'no-drop',
        });
        $('#occ__menu__item__btn__2').css({
            'background-color':'#f0f0f0',
        });
        //For 03 Months
        $('#occ__menu__item__btn__1').prop('disabled', false);
        $('#occ__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__1').css({
            'background-color':'#fff',
        });
        //For This Year
        $('#occ__menu__item__btn__3').prop('disabled', false);
        $('#occ__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        //For 2020
        $('#occ__menu__item__btn__4').prop('disabled', false);
        $('#occ__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.occ__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#occ__dd__hover__span').text( $('#occ__menu__item__btn__2').text() )
    });
    
    $('#occ__menu__item__btn__3').click(function(){
        
        //For This Year
        $('#occ__menu__item__btn__3').prop('disabled', true);
        $('#occ__menu__item__btn__3').css({
            'cursor':'no-drop',
        });
        $('#occ__menu__item__btn__3').css({
            'background-color':'#f0f0f0',
        });
        
        //For 03 Months
        $('#occ__menu__item__btn__1').prop('disabled', false);
        $('#occ__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#occ__menu__item__btn__2').prop('disabled', false);
        $('#menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__2').css({
            'background-color':'#fff',
        });

        //For 2020
        $('#occ__menu__item__btn__4').prop('disabled', false);
        $('#occ__menu__item__btn__4').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__4').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.occ__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });

        $('#occ__dd__hover__span').text( $('#occ__menu__item__btn__3').text() )
    });

    $('#occ__menu__item__btn__4').click(function(){

        //For 2020
        $('#occ__menu__item__btn__4').prop('disabled', true);
        $('#occ__menu__item__btn__4').css({
            'cursor':'no-drop',
        });
        $('#occ__menu__item__btn__4').css({
            'background-color':'#f0f0f0',
        });
        
        //For This Year
        $('#occ__menu__item__btn__3').prop('disabled', false);
        $('#occ__menu__item__btn__3').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__3').css({
            'background-color':'#fff',
        });
        
        //For 03 Months
        $('#occ__menu__item__btn__1').prop('disabled', false);
        $('#occ__menu__item__btn__1').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__1').css({
            'background-color':'#fff',
        });

        //For 06 Months
        $('#occ__menu__item__btn__2').prop('disabled', false);
        $('#occ__menu__item__btn__2').css({
            'cursor':'pointer',
        });
        $('#occ__menu__item__btn__2').css({
            'background-color':'#fff',
        });
        
        //Enabling Hover
        $('.occ__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        //Enabling Hover
        $('.occ__menu__item').hover(function () {
            $(this).css(
                {'background-color':'#f0f0f0',}
            );
        },function () {
            $(this).css(
                {'background-color':'#fff',}
            );
        });
        
        $('#occ__dd__hover__span').text( $('#occ__menu__item__btn__4').text() )
    });
});