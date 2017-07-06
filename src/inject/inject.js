chrome.extension.sendMessage({}, function(response) {

	var href = location.href;
	if (href.indexOf("editors=0010") === -1){
		var hasQuery = href.indexOf("?") + 1;
		var hasHash = href.indexOf("#") + 1;
		var appendix = (hasQuery ? "&" : "?") + "editors=0010";
		location.href = hasHash ? href.replace("#", appendix + "#") : href + appendix;
	}else{

		var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			document.getElementById('left-layout').click();
			document.getElementsByClassName('editor-parent')[0].style.width = "65%";
			if (!document.getElementById('auto-run').checked){
				document.getElementById('auto-run').click();
			}

		}
		}, 10);

	}
});
