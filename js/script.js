//--CONNECT TO API--//
// const client = new DirectusSDK({
// 	url: "https://directus.ethanrusson.com",
// 	project: "_",
// 	token: "tangledintulle"
// });

//--DETERMINE PAGE CONTENT--//
var pageURL = $(location).attr('pathname');
switch(pageURL){      
	case "/":

		var bridalLink = true;
		var summer = false;
		getHours(bridalLink, summer);
		
    	break;
		
	case "/bridal/":

		var page = "bridal";
		getPhotos(page);
		getText(page);
		
		break;
		
	case "/prom/":

		var page = "prom";
		getPhotos(page);
		getText(page);
		var bridalLink = false;
		var summer = false;
		getHours(bridalLink, summer);
		
		break;
		
	case "/about/":
		
		var page = "about";
		getPhotos(page);
		getText(page);
		var bridalLink = true;
		var summer = false;
		getHours(bridalLink, summer);
		
		break;
	
	case "/contact/":
		
		var bridalLink = true;
		var summer = false;
		getHours(bridalLink, summer);
		
		break;
}

//--GET PHOTOS DATA--//
// function getPhotos(page) {
// 	if (page == "bridal") {
// 		var apiLink = "Bridal_Gowns?fields=*.*";
// 	}
// 	if (page == "prom") {
// 		var apiLink = "Prom_Dresses?fields=*.*";
// 	}
// 	if (page == "about") {
// 		var apiLink = "About_Images?fields=*.*";
// 	}
// 	client.getItems(apiLink)
// 		.then(data => {
// 		composePhotos(data, page);
// 		}).catch(error => console.error(error));
// }

//--APPEND PHOTOS TO DOM--//
// function composePhotos(data, page) {
// 	var images = data.data;
// 	var imageContainer = document.getElementById("page-left");
// 	var imageData = [];
// 	var done = "";
// 	var totalPortrait = 0;
// 	var totalLandscape = 0;
// 	//FORMAT DRESS CONTENT//
// 	for (i = 0; i < images.length; i++) {

// 		if (images[i].status == "published") {	
// 			if (page == "bridal") {
// 				if (images[i].elizabeth_cooper){
// 					var dressCat = "Elizabeth Cooper";
// 				} else {
// 					var dressCat = "Pre Loved";
// 				}
// 			}

// 			if (images[i].image.height > images[i].image.width) {
// 				var orientation = "portrait";
// 				totalPortrait++;
// 			} else {
// 				var orientation = "landscape";
// 				totalLandscape++;
// 			}

// 			//COMPOSE DRESS IMAGE DIVS//
// 			var imageDiv = "";
// 			if (page == "bridal") {
// 				if (orientation == "portrait") {
// 					imageDiv = '<div class="image-container portrait"><img src="' + images[i].image.data.full_url + '" alt="' + dressCat + '"><p>' + dressCat + ' - ' + images[i].dress_name + '</p></div>';
// 					imageData.push(imageDiv);
// 				} else if (orientation == "landscape") {
// 					imageDiv = '<div class="image-container landscape"><img src="' + images[i].image.data.full_url + '" alt="' + dressCat + '"><p>' + dressCat + ' - ' + images[i].dress_name + '</p></div>';
// 					imageData.push(imageDiv);
// 				}
// 			}
// 			if (page == "prom") {
// 				if (orientation == "portrait") {
// 					imageDiv = '<div class="image-container portrait"><img src="' + images[i].image.data.full_url + '" alt="' + images[i].description + '"></div>';
// 					imageData.push(imageDiv);
// 				} else if (orientation == "landscape") {
// 					imageDiv = '<div class="image-container landscape"><img src="' + images[i].image.data.full_url + '" alt="' + images[i].description + '"></div>';
// 					imageData.push(imageDiv);
// 				}
// 			}
// 			if (page == "about") {
// 				if (orientation == "portrait") {
// 					imageDiv = '<div class="image-container portrait"><img src="' + images[i].image.data.full_url + '" alt="' + images[i].name + '"><p>'+ images[i].name + '</p></div>';
// 					imageData.push(imageDiv);
// 				} else if (orientation == "landscape") {
// 					imageDiv = '<div class="image-container landscape"><img src="' + images[i].image.data.full_url + '" alt="' + images[i].name + '"><p>'+ images[i].name + '</p></div>';
// 					imageData.push(imageDiv);
// 				}
// 			}
// 		}

// 	}
// 	//REMOVE ONE PORTRAIT IMAGE IF TOTAL IS ODD//
// 	if (totalPortrait % 2 != 0 && page !== "about") {
// 		for (i=0; i < imageData.length; i++) {
// 			if (imageData[i].includes("portrait")) {
// 				imageData.splice(i, 1);
// 				totalPortrait--;
// 				i = imageData.length;
// 			}
// 		}
// 	}
	
// 	//REORGANIZE IMAGES BY ORIENTATION//
// 	var landscape = [];
// 	var portrait = [];
// 	if (totalLandscape > 0) {
// 		for (i = 0; i < imageData.length; i++) {
// 			if (imageData[i].includes("landscape")) {
// 				landscape.push(imageData[i]);
// 			} 
// 			if (imageData[i].includes("portrait")) {
// 				portrait.push(imageData[i]);
// 			}
// 		}
// 	}
	
// 	//PAIR PORTRAIT IMAGES//
// 	var portraitPair = [];
// 	if (totalPortrait > 0) {
// 		var newPair = "";
// 		for (i = 0; i < portrait.length; i++) {
// 			newPair += portrait[i];
// 			i++;
// 			newPair += portrait[i];
// 			portraitPair.push(newPair);
// 			newPair = "";
// 		}
// 	}
	
// 	//SEND IMAGES TO IMAGECONTAINER//
// 	var contentNode = document.createElement('div');
// 	contentNode.className = 'images';
// 	console.log(totalLandscape);
// 	console.log(totalPortrait);
// 	var finalContent = [];
	
// 	landscape.forEach(function(item) {
//   		finalContent.push(item);
// 	});
	
// 	portraitPair.forEach(function(item) {
//   		finalContent.push(item);
// 	});
	
// 	//SHUFFLE IMAGES UNLESS IT'S THE ABOUT PAGE//
// 	if (page !== "about") {
// 		shuffle(finalContent);
// 	}
	
// 	finalContent.forEach(function(item) {
//   		contentNode.innerHTML += item;
// 	});
// 	imageContainer.appendChild(contentNode);
// }

//--GET PAGE TEXT DATA--//
// function getText(page) {
// 	client.getItems("Pages")
// 		.then(data => {
// 		composeText(data, page);
// 		}).catch(error => console.error(error));
// }

//--APPEND PAGE TEXT TO DOM--//
// function composeText(data, page) {
// 	var textData = data.data;
// 	var textContainer = document.getElementById('page-right');
// 	var contentNode = document.createElement('div');
// 	contentNode.className = 'page-text';
// 	contentNode.setAttribute("id", "page-text");
// 	if (page == "bridal") {
// 		var pageId = 0;
// 	}
// 	if (page == "prom") {
// 		var pageId = 1;
// 	}
// 	if (page == "about") {
// 		var pageId = 2;
// 	}
// 	var link = "";
// 	if (textData[pageId].link) {
// 		var link = textData[pageId].link;
// 	}
// 	contentNode.innerHTML = `
// 		<h1>${textData[pageId].header}</h1>
// 		${textData[pageId].paragraph}
// 		${link}
// 	`;
// 	textContainer.appendChild(contentNode);
// }

//--GET HOURS DATA--//
// function getHours(bridalLink, summer) {
// 	client.getItems("Hours")
// 		.then(data => {
// 		composeHours(data, bridalLink, summer);
// 		}).catch(error => console.error(error));
// }

//--APPEND HOURS TO DOM--//
// function composeHours(data, bridalLink, summer) {
// 	var hoursData = data.data;
// 	var hoursContainer = document.getElementById("hours-section");
// 	if (summer) {
// 		var days = '<div class="summer-list"><h3>Summer Hours &mdash; By Appointment Only</h3>';
// 		var hours = '<a href="/book-appointment" class="button">Book an Appointment Here</a>';
// 	} else {
// 		var days = '<div class="parallel-list"><ul>';
// 		var hours = '<ul>';
// 		for (i = 0; i < hoursData.length; i++) {
// 			days += '<li>' + hoursData[i].day + '</li>';
// 			hours += '<li>' + hoursData[i].opening + ' ' + hoursData[i].opening_category + ' - ' + hoursData[i].closing + ' ' + hoursData[i].closing_category + '</li>'
// 		}
// 		days += '</ul>';
// 		hours += '</ul></div>';
// 		if (bridalLink) {
// 			hours += '<a href="/book-appointment" class="button"><em>Bridal by Appointment Only</em><br>Book an Appointment 	Here</a>'
// 		}
// 	}
	
// 	hoursContainer.innerHTML = '<h2>Hours</h2>' + days + hours;
// }

//--SHUFFLE IMAGES--//
// function shuffle(finalContent) {
//     for (var i = finalContent.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = finalContent[i];
//         finalContent[i] = finalContent[j];
//         finalContent[j] = temp;
//     }
// }

//--MOBILE MENU--//
var icon = document.getElementById("menu-icon")
icon.addEventListener("click", showMenu);
var menu = document.getElementById("mobile-menu");
var iconX = document.getElementById("icon-x");

function showMenu() {
	menu.classList.toggle("show-menu");
	icon.classList.toggle("fixed");
	iconX.classList.toggle("icon-x")
}

//--FIX CONTENT ON SCROLL--//
window.onscroll = function() {fixContent()};

function fixContent() {
	var pageRight = document.getElementById("page-right");
	var leftHeight = $('#page-left').height();
	var rightHeight = $('#page-text').height();
	var totalHeight = leftHeight - rightHeight + 132;
	if (pageRight && ($(window).width() > 800) )  {
		if (window.pageYOffset > 128 && window.pageYOffset < totalHeight) {
			pageRight.classList.add("fixed");
			if ($(window).width() > 1280) {
				var rightPosition = (($(window).width() - 1280) / 2);
				var leftWidth = $("#page-left").width() + 60;
				var rightWidth = (leftWidth * 0.667)
				$("#page-right").css({"right": rightPosition, "width": (rightWidth + "px")});
			}
		} else if (window.pageYOffset > totalHeight) {
			$("#page-right").css({"right": "", "width": ""});
			pageRight.classList.remove("fixed");
			pageRight.classList.add("bottom");
		} else {
			$("#page-right").css({"right": "", "width": ""});
			pageRight.classList.remove("fixed");
			pageRight.classList.remove("bottom");
		}
	}
}

