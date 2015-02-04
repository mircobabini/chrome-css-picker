console.log('here');
init();
function init(){

console.log('here2');
    // csspicker
    jQuery(document).ready(function($) {

        window.CSSPICKER = {
            on: function(){
                $('*').bind( 'click', this.onClick );
            },
            off: function(){
                $('*').unbind( 'click', this.onClick );
            },
            onClick: function(e){
                e.preventDefault();
                console.log( window.testa );

                if( ! CSSPICKER._target ){
                    CSSPICKER._target = e.target;

                    // do it
                    var html = '';
                    var css_props = $( e.target ).css(['width', 'height', 'font', 'border', 'background']);
                    $.each( css_props, function( prop, value ) {
                        html += prop + ": " + value + '<br>';
                    });

                    console.log( html );

                    setTimeout(function(){
                        CSSPICKER._lasttarget = CSSPICKER._target;
                        CSSPICKER._target = null;
                    }, 500);
                }

                CSSPICKER.off();
            }
        }

        CSSPICKER.on();
    });
}


