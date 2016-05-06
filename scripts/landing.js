var pointsArray = document.getElementsByClassName('point');
 
var revealPoint =function(point){ 
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
     }; 


var animatePoints = function(points) {
    forEach(points, revealPoint);
 };

window.onload = function() {
    //This trigers the animation if the screen is big enough for the user not to scroll.
    if (window.innerHeight > 950){
        animatePoints(pointsArray);
    }
    //Calculates the distance from the top of the document to where the objects to be animated are located
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
     window.addEventListener('scroll', function(event) {
         console.log("Current offset from the top is: " + sellingPoints.getBoundingClientRect().top + " pixels");
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
             animatePoints(pointsArray);
         }
     });
 }