
var postInfo = "";
var commenter = JSON.parse("[]");
 var comments= JSON.parse("[]");
 var postId;
var constantOffset = "/comments?fields=message,id,from,created_time&limit=1000&offset=";
var constantAfter = "/comments?fields=message,id,from,created_time&limit=1000&after=";
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
   // console.log('statusChangeCallback');
   // console.log(response.authResponse.accessToken);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //FB.api('/me', function(response) {
		 //testAPI();
		// console.log("successful login fb");
		findPostId();
		
		  
	  //});
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
function findPostId(){
var url = window.name;
console.log("url name " + url);
 //var url = "https://www.facebook.com/9gag/photos/a.109041001839.105995.21785951839/10153187822306840/?type=1&theater";
 //var url = "https://www.facebook.com/permalink.php?story_fbid=435625453256601&id=157336581085491";
	var index = url.search("fbid");
	var new_index;
	if(index==-1){
		new_index = url.search("posts");
		console.log("new index " + new_index);
		if(new_index == -1){
			var arr = url.split("/");
			postId = arr[arr.length-2];
			}
			else{
				var endIndex = url.indexOf("?pnref");
				if(endIndex==-1){
					postId = url.substring(new_index+6);
					}
					else{
					postId = url.substring(new_index+6,endIndex);
					}
			}
		
	}
	else{
	console.log("else");
		
			var arr = url.split("?");
			var els = arr[1].split("&");
			var el = els[0];
			postId = el.substring(el.search("fbid")+5);
	}
	loadComment(0,'');
}
 
  function loadComment(offset,after){
	console.log("loadC pId "+postId);
		var request = "";
		if(offset==0){
			request = postId + constantOffset + offset;
		}
		else{
			request = postId + constantAfter+ after;
		}
		
		console.log("request " + request);
		FB.api(request, function(response) {
						store(response.data);
						//console.log(response.data.length);
						if(response.data.length== 0 ){
						//.console.log("after " + after);
						return;
					}
					else{
					after = response.paging.cursors.after;
						loadComment(offset+1000,after);
					}		
							
		});	
  }
  
  function store(data){
	comments = comments.concat(data);
	//commenter = arrUnique(data.from);
		for (i = 0; i < data.length; i++){
			var jObject = data[i].from;
			
			var lastIndex = findIndexByKeyValue(commenter,'id', jObject.id);
			if (lastIndex == -1 ){
				commenter.push(jObject);
				//console.log ("UNDUPLICATE");
			}else{
				//console.log ("DUPLICATE");
			}
		}
	}
	//console.log ("COMMENTER = "  + commenter.length);

  /*function sendBack(){
	if(postInfo == "successfull"){
		parent.postMessage(post.toString(),parent.document.URL);
	}
  }*/
  
  
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '794416800644772',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name+ '!';
    });
  }
  
 function findIndexByKeyValue(obj, key, value)
{
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] == value) {
            return i;
        }
    }
    return -1;
}