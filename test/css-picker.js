
(function() {
    function e(e, t) {
        var n = document.createElement("script");
        n.src = e;
        var r = document.getElementsByTagName("head")[0],
            i = false;
        n.onload = n.onreadystatechange = function() {
            if (!i && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                i = true;
                t();
                n.onload = n.onreadystatechange = null;
                r.removeChild(n)
            }
        };
        r.appendChild(n)
    }

    if (window.jQuery === undefined) {
        e("http://code.jquery.com/jquery-latest.min.js", function() {
            if (typeof jQuery == "undefined") {
                console.log("error loading jquery")
            } else {
                console.log("jquerified v" + jQuery.fn.jquery);
                jQuery.noConflict();
		    	load_assets();
            }
        })
    }else{
    	load_assets();
    }

    function load_assets(){
        e("js/modernizr.custom.js", function() {
            if (typeof Modernizr == "undefined") {
                console.log("error loading modernizr")
            } else {
                console.log("modernizd");

                // inject css
				var n=document.createElement("link");n.rel='stylesheet';n.type='text/css';n.href='css/style8.css';var r=document.getElementsByTagName("head")[0];r.appendChild(n);

				// init everything
				init();
            }
        })
    }
})()

function init(){
	demo7();

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

				if( ! CSSPICKER._target ){
					CSSPICKER._target = e.target;

					// do it
					var css_props = $( e.target ).css(['width', 'height', 'font', 'border', 'background']);
					$.each( css_props, function( prop, value ) {
						console.log( prop + ": " + value );
					});


					setTimeout(function(){
						CSSPICKER._lasttarget = CSSPICKER._target;
						CSSPICKER._target = null;
					}, 500);
				}
			}
		}

	});
}

// demo7
function demo7() {
	var container = document.querySelector( 'div.container' ),
		triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.remove( container, 'overlay-open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
			classie.add( container, 'overlay-open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
}

// classie
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
	return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
	hasClass = function( elem, c ) {
		return elem.classList.contains( c );
	};
	addClass = function( elem, c ) {
		elem.classList.add( c );
	};
	removeClass = function( elem, c ) {
		elem.classList.remove( c );
	};
}
else {
	hasClass = function( elem, c ) {
		return classReg( c ).test( elem.className );
	};
	addClass = function( elem, c ) {
		if ( !hasClass( elem, c ) ) {
			elem.className = elem.className + ' ' + c;
		}
	};
	removeClass = function( elem, c ) {
		elem.className = elem.className.replace( classReg( c ), ' ' );
	};
}

function toggleClass( elem, c ) {
	var fn = hasClass( elem, c ) ? removeClass : addClass;
	fn( elem, c );
}

var classie = {
	// full names
	hasClass: hasClass,
	addClass: addClass,
	removeClass: removeClass,
	toggleClass: toggleClass,
	// short names
	has: hasClass,
	add: addClass,
	remove: removeClass,
	toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
	// AMD
	define( classie );
} else {
	// browser global
	window.classie = classie;
}

})( window );


