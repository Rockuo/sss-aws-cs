/*
 * external.js
 * Cal Evans <cal@calevans.com>
 * (c) Evans Internet Construction Company, Inc.
 * Released under the MIT license
 * Load external files into a reveal.js presentation.
 *
 * This is a reveal.js plugin to load external html files. It replaces the
 * content of any element with a data-external="file.ext" with the contents
 * of file.ext.
 *
 * This started life as markdown.js. Thank you to whomever wrote it.
 * Small mods by JJ Merelo, github.com/JJ
 */

(function(){
	loadExternal();

	function loadExternal() {

		var sections = document.querySelectorAll( '[data-external]');

		for( var i = 0, len = sections.length; i < len; i++ ) {

			var this_section = sections[i];

			if( this_section.getAttribute( 'data-external' ).length ) {

				var xhr = new XMLHttpRequest(),
					url = this_section.getAttribute( 'data-external' );

				// see https://developer.mozilla.org/en-US/docs/Web/API/element.getAttribute#Notes
				xhr.onreadystatechange = function() {
					if( xhr.readyState === 4 ) {
						// file protocol yields status code 0 (useful for local debug, mobile applications etc.)
						if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 0 ) {

							this_section.innerHTML = xhr.responseText;


						}
						else {

							this_section.innerHTML = '<section data-state="alert">' +
								'ERROR: The attempt to fetch ' + url + ' failed with HTTP status ' + xhr.status + '.' +
								'Check your browser\'s JavaScript console for more details.' +
								'<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>' +
								'</section>';

						}
					}
				};

				xhr.open( 'GET', url, false );

				try {
					xhr.send();
				}
				catch ( e ) {
					alert( 'Failed to get the file ' + url + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + e );
				}

			}

		}

		return;
	}

})();
