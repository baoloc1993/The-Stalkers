/*var user = {
	"name": "John Doe", 
	"comment": [
		"The first comment", "The second comment", "The third comment"
	],
}*/

/*var comments = [
	{"name": "John", "comment": "John's comment"},
	{"name": "Huy", "comment": "Huy's comment"},
	{"name": "Khoa", "comment": "Huy's 2nd comment"},
	{"name": "Huy", "comment": "Huy's 3rd comment"},
	{"name": "Loc", "comment": "Loc's comment"},
	{"name": "Hung", "comment": "John's comment"},
	{"name": "Hoa", "comment": "Huy's comment"},
	{"name": "Nhat", "comment": "Huy's 2nd comment"},
	{"name": "Loc", "comment": "Huy's 3rd comment"},
	{"name": "Cam", "comment": "Loc's comment"},
	{"name": "Quang", "comment": "John's comment"},
	{"name": "Khanh", "comment": "Huy's comment"},
	{"name": "Kha", "comment": "Huy's 2nd comment"},
	{"name": "Vy", "comment": "Huy's 3rd comment"},
	{"name": "Khang", "comment": "Loc's comment"},
]*/

/**
 * Render the popup (user)
 **/
 
function render(key) {
	//clear the table first
	$("#comment").html("");
	
	//Get the comment from the key

	var user = filter(key, comments);
	
	//Render the comment table
	$("#comment").append('<table id = "comment-list" class ="CSSTableGenerator"></table>');
	if (user.length ==  0) {
		$("#comment-list").append("<tr> <td> Your friend " + key + " didn't comment!</td> </tr>");	
	}
	else {
		$("#comment-list").append("<tr> <td> " + key + "'s comment </td> </tr>");	
		for (var i = 0; i < user.length; i++) {
			$("#comment-list").append( "<tr> <td>" + user[i] + "</td> </tr>");
		}
	}
	
	//Show the table
	$("#comment").slideDown();
	
	console.log(comments);
}

/**
 * Render the popup (content)
 **/
 
function render2(key) {
	//clear the table first
	$("#comment").html("");
	
	//Get the comment from the key

	var commentList = filterComment(key, comments);
	
	//Render the comment table
	$("#comment").append('<table id = "comment-list" class ="CSSTableGenerator"></table>');
	if (commentList.commenter.length ==  0) {
		$("#comment-list").append("<tr> <td> There is no comment matched with the keyword: " + key + " </td> </tr>");	
	}
	else {
		$("#comment-list").append("<tr> <td> User </td> <td> Comment </td> </tr>");		
		for (var i = 0; i < commentList.commenter.length; i++) {
			$("#comment-list").append( "<tr> <td>" + commentList.commenter[i] + "</td>" + "<td>" + commentList.comment[i] + "</td> </tr>");
		}
	}
	
	//Show the table
	$("#comment").slideDown();
	
	//console.log(comments);
}

/**
 * Refresh the suggestion list, called when users key in new character
 **/
 function refreshList() {
	//console.log("Worked");
	var name = $('#friend').val();
	
	// Clear the list
	$("#suggest-name").html("");
	
	if (name != "") {
		var result = filterName(name, commenter);
		// Update the list
		if (result.length != 0) {	
			for (i = 0; i < result.length; i++) {
				if (i > 5) break;
				$("#suggest-name").append( "<tr> <td id= 'column-" + i + "'>" + result[i] + "</td> </tr>");
				$("#column-" + i).on({
					mouseenter: function () {
						$(this).css("background-color", "#bbbbbb");
					},
					mouseleave: function () {
						$(this).css("background-color", "#f4f4f4");
					}
				});
				$("#column-" + i).click(function(event) {
					var column = $(this);
					$("#comment").slideUp(function() {
						render($(column).html()); 
						$("#suggest-name").html("");
					});
				});
			}
		}
	}
 }

/**
* Filter the array by name
* 
* @param: name - to filter, arr - the array to search in
*/
function filter(name, arr) {
	var i = 0; // Counting variable
	var result = []; // Initial an array to store the result
	for (i = 0; i < arr.length; i++) {
		if (arr[i].from.name.search(name) != -1) { // Whenever meet the condition
			result[result.length] = arr[i].message; // assign content of the found comment to the result array
		}
	}
	return result;
}
 
/**
* Filter the names
* Return an array of names that match the input
* @param: keyword - to filter, arr - the array to search in
*/
function filterName(keyword, arr) {
	var result = []; // For storing the result
	
	/**
	* Normalise the text input
	* Cut all unnecessary space, all characters to lowercase
	* @param: the text which need to be process
	*/
	function normaliseText(text) {
		var result = text.trim();
		result = result.toLowerCase();
		return result;
	}
	
	var kw = normaliseText(keyword); // The keyword after being processed
	var i = 0;
	
	var normalisedName; // For storing the processed name
	
	function isKeywordMatch(keyword, name) {
		var n = keyword.length;
		var result = false;
		var j1, j2, j3, j4;
		var name_apart, temp;
		name_apart = name.split(" ");
		var maxChar = 4;
		for (j1 = 0; j1 < maxChar; j1++) { // If keyword is found in a randomly combination of words of the name
			for (j2 = 0; j2 < maxChar; j2++) {
				for (j3 = 0; j3 < maxChar; j3++) {
					for (j4 = 0; j4 < maxChar; j4++) {
						temp = name_apart[j1] + " " + name_apart[j2] + " " + name_apart[j3] + " " + name_apart[j4];
						temp = temp.substr(0, n);
						if (temp == keyword) { // If keyword is found in the current name
							return !result;
							break; break; break; break;
						}
					}
				}
			}
		}
	}

	for (i = 0; i < arr.length; i++) {
	// We need 6 names first
		if (result.length > 5) break;
		normalisedName = normaliseText(arr[i].name);
		if (isKeywordMatch(kw, normalisedName)) {
			result[result.length] = arr[i].name; // then put the name in the result array
		}
	}
	
	return result;
}
 
//document.addEventListener('DOMContentLoaded', function() 
$("document").ready ( function() {
	//Get the page's url
	/*getCurrentTabUrl(function (url) {
		$("#url").html("The page's url: " + url);
	});*/
	//console.log("in popup \n"comments);
	//Show the suggested names when user keys in new character
	$("#friend").keyup( function () { refreshList();});	
	
	//Render the extension when clicked
	$("#submit").click(function() {
		if ($('#friend').val() != "") {
			$("#comment").slideUp(function() {
				render2($('#friend').val());
			});
		}
	});
});


/**
* Filter the comments
* Return an array of comments and commenters that match the input
* @param: keyword - to filter, arr - the array to search in
*/
function filterComment(keyword, arr) {
	var count = 0;
	var i = 0; // Counting variable
	var comments_result = [];
	var commenters_result = [];
	
	for (i = 0; i < arr.length; i++) {
		if (arr[i].message.search(keyword) != -1) {
			comments_result[comments_result.length] = arr[i].message;
			commenters_result[commenters_result.length] = arr[i].from.name;
			count++;
			if (count > 8) {break;}
		}
	}
	var result = {comment:comments_result, commenter:commenters_result}; // Initial an array to store the result
	return result;
}
