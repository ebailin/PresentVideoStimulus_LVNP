$(document).ready(function(e){ 
	$(document).keypress( async function(e){
		for(var i=0; i<orders.length; i++){
			for (var y=0; y<clipsPerBlock; y++){
				console.log("y: "+y)
				clip=orders[i][y]
				index=link_list.indexOf(clip)
				console.log(clip)
				console.log(index)

				if (i==0 && y==0){

					if ((e.keyCode == 222) || (e.keyCode == 39) || (e.keyCode == 34)){
						fullscreen(player, true)
						document.start=performance.now()/1000.0
						clip=await playVid(index)
					} else {
						return
					}
				} else {
					if (e.keyCode==27){
						video.pause()
						return
					} else {
						e.preventDefault() //ignore the keypress UNLESS it's the escape key

					}

					clip=await playVid(index)
				}
				}
				if(i==orders.length-1 && y==clipsPerBlock){
					document.end=performance.now()/1000.0
					console.log("total duration: ")
					console.log(document.end-document.start)
					// fullscreen(video, false)
					fullscreen(player, false)

					//automatically download timing files
					await getTimingFile(timings, name)
					setCookie("downloaded", "True")
					
				}
			}
		})
	})

function playVid(index){
	return new Promise(function(resolve, reject){
		console.log("in playVid")
		video_links.children[index].classList.add("currentvid")
		console.log("ADDED "+video_links.children[index])

		source[0].src =path + allLinks[index].name + ".mp4"
		video.load()

		video.onloadeddata=function() {
			console.log("loaded!")
			allLinks[index].start=performance.now()/1000.0
			console.log("start: " + allLinks[index].start)
			video.controls=false;
			video.play()
			video.onended=function(){
				allLinks[index].end=performance.now()/1000.0;
				allLinks[index].duration=allLinks[index].end-allLinks[index].start
				console.log("clip duration: " + allLinks[index].duration)
				allLinks[index].classList.remove("currentvid");
				console.log("REMOVED "+video_links.children[index])
				timings.push(allLinks[index])
				console.log(allLinks[index].duration)
				resolve(allLinks[index])
			}
		}
	})
}

var req=new XMLHttpRequest();
for(var i=0; i<orders.length; i++){
	for (var y=0; y<clipsPerBlock; y++){
		clip=orders[i][y]
		index=link_list.indexOf(clip)

	}
}

var req = new XMLHttpRequest();
// req.open('GET', 'video.mp4', true);
// req.open('GET', 'http://localhost:5000/static/fMRI_Hallway_all_updated_clips/BLANK_HALLWAY.mp4', true)
req.responseType = 'blob';
var vid
//http://localhost:5000/static/fMRI_Hallway_all_updated_clips/BLANK_HALLWAY.mp4
var videos=[]
req.onload = function() {
	// return new Promise(function(resolve, reject){
	   // Onload is triggered even on 404
	   // so we need to check the status code
	   if (this.status === 200) {
	   	console.log("status 200")
	   	// req.onloadeddata=function(){
	   		// return new Promise(function(resolve, reject){
		      var videoBlob = this.response;
		      console.log("videoBlob: ", videoBlob)
		      try{
		      	vid = URL.createObjectURL(videoBlob);// IE10+
		      	// video.src=vid;
		      	console.log("vid: ", vid)
		      	return vid
		      } catch(TypeError){
		      	console.log("here")
		      	vid=videoBlob
		      	// video.srcObject = vid;
		      	console.log("vid: ", vid)
  		      	return vid
		      }
	      // Video is now downloaded
	      // and we can set it as source on the video element
	      // video.src = vid;
	      // videos.push(vid)
	      // resolve(vid)

	   // })
	}
}

/*function loadClip(request){
	return new Promise(function(resolve, reject){
		var vid
		request.dispatchEvent(new Event("load"))
		
		request.onload=function(){
			console.log("onload")
			console.log("request.status", request.status)
			// return new Promise(function(resolve, reject){
				if(request.status==0){
					var videoBlob = request.response;
				      console.log("videoBlob: ", videoBlob)
				      try{
				      	vid = URL.createObjectURL(videoBlob);// IE10+
				      	// video.src=vid;
				      	console.log("vid: ", vid)
				      	// return vid
				      } catch(TypeError){
				      	console.log("here")
				      	vid=videoBlob
				      	// video.srcObject = vid;
				      	console.log("vid: ", vid)
		  		      	// return vid
				      }
					}
			// resolve()
			// })
		}
		resolve(vid)
	})
}
*/


function loadClip(url){
	return new Promise(function(resolve, reject){
		var vid
		var request = new XMLHttpRequest();
		request.open('GET', url, true)
		request.responseType = 'blob';
		
		request.onload=function(){
			console.log("onload")
			console.log("request.status", request.status)
			// return new Promise(function(resolve, reject){
				if((request.status==200) || (request.status==0)){
					
						var videoBlob = request.response;
					      console.log("videoBlob: ", videoBlob)
					      try{
					      	vid = URL.createObjectURL(videoBlob);// IE10+
					      	// video.src=vid;
					      	console.log("vid: ", vid)
					      	resolve(vid)
					      } catch(TypeError){
					      	console.log("here")
					        vid=videoBlob
					      	// video.srcObject = vid;
					      	console.log("vid: ", vid)
			  		      	resolve(vid)
					      }
						}
					// var videoBlob = request.response;
				 //      console.log("videoBlob: ", videoBlob)
				 //      try{
				 //      	var vid = URL.createObjectURL(videoBlob);// IE10+
				 //      	// video.src=vid;
				 //      	console.log("vid: ", vid)
				 //      	// return vid
				 //      } catch(TypeError){
				 //      	console.log("here")
				 //      	var vid=videoBlob
				 //      	// video.srcObject = vid;
				 //      	console.log("vid: ", vid)
		  	// 	      	// return vid
				 //      }
					// }
			// resolve()
			// })
		}
		// request.dispatchEvent(new Event("load"))
		request.send()

		// resolve(vid)
	})
}
// req.onloadeddata=function(){
// 	return new Promise(function(resolve, reject){
// 		resolve(this.response)
// 	})
// }

async function again(){ 
	req.open('GET', 'http://localhost:5000/static/fMRI_Hallway_all_updated_clips/BLANK_HALLWAY.mp4', true)
	// req.dispatchEvent(new Event("load"))
	vid=await req.send()
	videos.push(vid)
	// var req = new XMLHttpRequest();
	// videos.push(vid)
	req.open('GET', 'http://localhost:5000/static/fMRI_Hallway_all_updated_clips/High_L2L.mp4', true)
	vid=await req.send()
	videos.push(vid)
}
// videos.push(vid)

req.open('GET', 'http://localhost:5000/static/fMRI_Hallway_all_updated_clips/BLANK_HALLWAY.mp4', true)
// req.dispatchEvent(new Event("load"))
req.send()
videos.push(vid)

videos=[]
reqs=['http://localhost:5000/static/fMRI_Hallway_all_updated_clips/BLANK_HALLWAY.mp4','http://localhost:5000/static/fMRI_Hallway_all_updated_clips/High_L2L.mp4' ]
async function pushData(array, data){
	// var req = new XMLHttpRequest();
	// req.responseType = 'blob';
	for(var i=0; i<reqs.length; i++){
		// req.open('GET', reqs[i], true)
		// var vid=await 
		// var vid=loadClip(req, reqs[i])
		var vid = await loadClip(reqs[i])


		array.push(vid)
	}
}

video.src=videos[1]
video.onload=function(){
	console.log("load", performance.now()/1000.0)
}
video.onplay=function(){
	if(video.readyState<4){
		console.log("readyState", )
	}
	console.log("play", performance.now()/1000.0)
}
video.play()

/* FROM dinbror.dk/blog*/
var req = new XMLHttpRequest();
req.open('GET', 'video.mp4', true);
req.responseType = 'blob';

req.onload = function() {
   // Onload is triggered even on 404
   // so we need to check the status code
   if (this.status === 200) {
      var videoBlob = this.response;
      var vid = URL.createObjectURL(videoBlob); // IE10+
      // Video is now downloaded
      // and we can set it as source on the video element
      video.src = vid;
   }
}
req.onerror = function() {
   // Error
}

req.send();

/* NEW TATIC*/
function hasMediaSource() {
  return !!(window.MediaSource || window.WebKitMediaSource);
}

if (hasMediaSource()) {
  // Ready to (html5)rock!
} else {
  alert("Bummer. Your browser doesn't support the MediaSource API!");
}


window.MediaSource=window.MediaSource || window.WebKitMediaSource;
var ms = new MediaSource()

var video = document.querySelector('video');
video.src = window.URL.createObjectURL(ms); // blob URL pointing to the MediaSource.

function onSourceOpen(e) {
  // this.readyState === 'open'. Add source buffer that expects webm chunks.
  var sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vorbis,vp8"');

  ....
}

