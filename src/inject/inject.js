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

			//get preferred position
			chrome.storage.sync.get(["position", "auto-run"], function(items){
				var position = 'left';
				var autoRun = true;

				if (items['auto-run'] !== undefined){
					autoRun = items['auto-run'];
				}

				if (items.position !== undefined){
					position = items.position;
				}

				//adjust position
				if (position === 'left'){
					document.getElementById('left-layout').click();
					document.getElementsByClassName('editor-parent')[0].style.width = "65%";
					document.getElementsByClassName('editor-parent')[0].style.height = null;
				}else if (position === 'top'){
					document.getElementById('top-layout').click();
					document.getElementsByClassName('editor-parent')[0].style.height = "70%";
					document.getElementsByClassName('editor-parent')[0].style.width = null;
				}else if (position === 'right'){
					document.getElementById('right-layout').click();
					document.getElementsByClassName('editor-parent')[0].style.width = "65%";
					document.getElementsByClassName('editor-parent')[0].style.height = null;
				}

				//adjust auto-run
				if (autoRun !== document.getElementById('auto-run').checked){
					document.getElementById('auto-run').click();
				}

			});

			//enable/disable auto-run
			document.getElementById('auto-run').addEventListener("click", function(){
				var setting = document.getElementById('auto-run').checked;

				chrome.storage.sync.set({ "auto-run": setting }, function(){
				    //  A data saved callback omg so fancy
				});
			});

			//set preferred position
			document.getElementById('left-layout').addEventListener("click", function(){
				chrome.storage.sync.set({ "position": "left" }, function(){
					document.getElementsByClassName('editor-parent')[0].style.width = "65%";
					document.getElementsByClassName('editor-parent')[0].style.height = null;
				});
			});

			document.getElementById('top-layout').addEventListener("click", function(){
				chrome.storage.sync.set({ "position": "top" }, function(){
					document.getElementsByClassName('editor-parent')[0].style.height = "70%";
					document.getElementsByClassName('editor-parent')[0].style.width = null;
				});
			});

			document.getElementById('right-layout').addEventListener("click", function(){
				chrome.storage.sync.set({ "position": "right" }, function(){
					document.getElementsByClassName('editor-parent')[0].style.width = "65%";
					document.getElementsByClassName('editor-parent')[0].style.height = null;
				});
			});

		}
		}, 10);

	}
});
