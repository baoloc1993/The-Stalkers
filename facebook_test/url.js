/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
 
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
	callback(url);
  });
}

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTabUrl(function(url) {	
		$("body").append("<iframe src='http://localhost/facebook_test/loginFace.html' id ='iframe1' name = '" +url +"' ></iframe>");
		console.log($("#iframe1").attr("name"));
	});	
});