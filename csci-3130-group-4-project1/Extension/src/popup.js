//Source: https://blog.learningdollars.com/2019/12/24/how-to-develop-an-extension-to-download-images-from-google/
window.onload = function() {
	let videoCollectButton = document.getElementById('collectVid');
	let audioCollectButton = document.getElementById('collectAud');
	
	// Event after Collect Button
	videoCollectButton.onclick = collectMedia("video");
	audioCollectButton.onclick = collectMedia("audio");
};

function collectMedia(media1) {
	let downloadButton = document.getElementById('download');
	let textCollect = document.getElementById('videoCollect');
    let media2;
	if(media1 == "audio") {
		textCollect = document.getElementById('audioCollect');
		// Collect audios on a web page
		media2 = document.querySelectorAll('video');
        
	}
	else if(media1 == "video") {
		// Collect videos on a web page
		media2 = document.querySelectorAll('audio');
	}
	else {
		return;
	}
    
	let srcArray = Array.from(media2).map(function(med) {
		return med.currentSrc;
	});
    //to get web page data for extension
	chrome.storage.local.get('savedMedia', function(result) {
		mediatodownload = [];
		for (med of srcArray) {
			if (med) mediatodownload.push(med);
		};
		result.savedMedia = mediatodownload;
		
		//store the videos' link that prepare to be downloaded
		chrome.storage.local.set(result);
		console.log("local collection setting success:"+result.savedMedia.length); 
	});
        
	// Display existing video links
	chrome.storage.local.get('savedMedia', function(result) {
        let text="";
        for(let i=0;i<result.savedMedia.length;i++){
            text += i+1 + ". " + result.savedMedia[i] + "<br>";
        }
        textCollect.innerHTML = result.savedMedia.length.toString();
	});
		
	// Download 
	downloadButton.onclick = function() {
		const YOUTUBE = "youtube.com";
	    const CONFIRM_MESSAGE = "Default file name is 'downloadedVideo'. Do you want to continue?";
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			let url = tabs[0].url;
			let format = document.getElementById('format').value;
            let fname = document.getElementById('fname').value;

	        //if there is a user input for file name, then the file will be name as it is. Otherwise, it will be named "downloadedVideo"
            if(fname == null || fname == "") {
			    // Send confirm message
				if(confirm(CONFIRM_MESSAGE)) {
					fname = "downloadedVideo";
				}
		        else {
					return;
				}
	        }

		    let message  = {
		        'format': format,
		        'fname': fname
	        };

	        // Downloader for Youtube
	        if(url.includes(YOUTUBE)) {
		        message.url = url;
		        chrome.runtime.sendMessage(message);
	        }
	        // Downloader for other websites
	        else {
		        chrome.storage.local.get('savedVideos', function(result) {
		            message.savedVideos = result.savedVideos;
		            chrome.runtime.sendMessage(message);
			    });
		    }
	    });
	};
}

// Collect Videos Script
//Source: https://blog.learningdollars.com/2019/12/24/how-to-develop-an-extension-to-download-images-from-google/
function getURL(type, textCollect) {
	//querySelector API to select all links in <video> tag in current page
	let media;
	if(type === "video") {
		media = document.querySelectorAll('video');
	}
	else if(type === "audio") {
		media = document.querySelectorAll('audio');
	}
	else {
		return;
	}
	let srcArray = Array.from(media).map(function(med) {
		return med.currentSrc;
	});
    //to get web page data for extension
	chrome.storage.local.get('savedMedia', function(result) {
		mediatodownload = [];
		for (med of srcArray) {
			if (med) mediastodownload.push(med);
		};
		result.savedMedia = mediatodownload;
		textCollect.innerHTML = result.savedMedia;
		//store the videos' link that prepare to be downloaded
		chrome.storage.local.set(result);
		console.log("local collection setting success:"+result.savedMedia.length); 
	});
}