// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/


animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

mCurrentIndex = 0;

function swapPhoto()
{
	
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
	if(mCurrentIndex == mImages.length)
	{
		mCurrentIndex =0;
	}else{
		//aux = 1;
	}
	//alert('here');
    console.log(mCurrentIndex);
    console.log(mImages);

    
	$('#photo').attr('src',mImages[mCurrentIndex].imgPath);
	
	$('.location').html('Location: '+mImages[mCurrentIndex].imgLocation);
	$('.description').html('Description: '+mImages[mCurrentIndex].description);
	$('.date').html('Date: '+mImages[mCurrentIndex].date);
	
	mCurrentIndex++;
	console.log('swap photo');
	
}

// Counter for the mImages array


//customImgs

// XMLHttpRequest variable
//var mRequest = new XMLHttpRequest();
$(function(){
	
	loadData()

});

function goTo(pos){
	console.log(mCurrentIndex);
	console.log(pos);
	if(pos){
		if(mCurrentIndex  == mImages.length){
			mCurrentIndex = 0;
		}else{
			mCurrentIndex += 1;
		}
		swapPhoto()
	}else{
		
		if(mCurrentIndex  <= 0){
			mCurrentIndex = mImages.length - 1;
		}else{
			mCurrentIndex = mCurrentIndex - 2;
		}
		
	}
	console.log(mCurrentIndex);
	swapPhoto();
	
}


function showMoar(){
	if( $('.moreIndicator').hasClass( "rot90" ) )
	{
		$('.moreIndicator').removeClass('rot90');
		$('.moreIndicator').addClass( "rot270" );
		$('.details').hide(1000);
	}else if( $('.moreIndicator').hasClass( "rot270" ) )
	{
		$('.moreIndicator').removeClass('rot270');
		$('.moreIndicator').addClass( "rot90" );
		$('.details').show(1000);
	}
	
}

function loadData()
{
	
    var url = getUrlParameter('gallery');
    
	if(url == null || url == '' || typeof url == undefined){
		url = 'images.json';
		mCurrentIndex = 0;
		mImages = [];
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var imgs = JSON.parse(xmlhttp.responseText);
			populateimg(imgs);
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}


// Array holding GalleryImage objects (see below).
mImages = [];


function populateimg(imgs)
{
	var out = "";
	mImages = [];
	imgs = imgs.images;
	console.log(imgs);
	for(var i = 0; i < imgs.length; i++) {
		
		mImages[i] = imgs[i];
		
		
	}
}





// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.imgPath;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {
		Location ='';
			description ='';
			date ='';
			img ='';
			HTMLImageObject ='';
}



var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
