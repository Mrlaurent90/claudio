( function () {
	'use strict';

	// FAQ accordion
	function initFaqAccordion() {
		document.querySelectorAll( '.ladb-faq__item' ).forEach( function ( item ) {
			var btn = item.querySelector( '.ladb-faq__question' );
			var answer = item.querySelector( '.ladb-faq__answer' );
			if ( ! btn || ! answer ) return;

			btn.setAttribute( 'aria-expanded', 'false' );
			answer.hidden = true;

			btn.addEventListener( 'click', function () {
				var isOpen = btn.getAttribute( 'aria-expanded' ) === 'true';

				// Fermer tous les autres
				item.closest( '.ladb-faq__list' )
					.querySelectorAll( '.ladb-faq__item' )
					.forEach( function ( other ) {
						var otherBtn = other.querySelector( '.ladb-faq__question' );
						var otherAns = other.querySelector( '.ladb-faq__answer' );
						if ( otherBtn && otherAns ) {
							otherBtn.setAttribute( 'aria-expanded', 'false' );
							otherAns.hidden = true;
							other.classList.remove( 'is-open' );
						}
					} );

				if ( ! isOpen ) {
					btn.setAttribute( 'aria-expanded', 'true' );
					answer.hidden = false;
					item.classList.add( 'is-open' );
				}
			} );
		} );
	}

	// Smooth scroll pour les ancres internes
	function initSmoothScroll() {
		document.querySelectorAll( 'a[href^="#"]' ).forEach( function ( link ) {
			link.addEventListener( 'click', function ( e ) {
				var target = document.querySelector( link.getAttribute( 'href' ) );
				if ( ! target ) return;
				e.preventDefault();
				var offset = 80; // hauteur header sticky
				var top = target.getBoundingClientRect().top + window.scrollY - offset;
				window.scrollTo( { top: top, behavior: 'smooth' } );
				target.focus( { preventScroll: true } );
			} );
		} );
	}

	document.addEventListener( 'DOMContentLoaded', function () {
		initFaqAccordion();
		initSmoothScroll();
	} );
} )();
