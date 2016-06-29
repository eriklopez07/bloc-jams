/*var pointsArray = document.getElementsByClassName('point');
 
var revealPoint =function(point){ 
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
     }; 

*/
var animatePoints = function() {
    var revealPoint = function(){
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    $.each($('.point'), revealPoint);
};

/*var animatePoints = function(points) {
    forEach(points, revealPoint);
 };
*/

$(window).load(function() {
    //This trigers the animation if the screen is big enough for the user not to scroll.
    //  Vanilla JS Version
    /*if (window.innerHeight > 950){
        animatePoints(pointsArray);
    }
    */
    // jQuery Version
    if ($(window).height() > 950) {
        animatePoints();
    }
    
    //Calculates the distance from the top of the document to where the objects to be animated are located
    //  Vanilla JS Version
    /*var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    */
    // jQuery Version
     var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    // Vanilla JS Version
     /* window.addEventListener('scroll', function(event) {
         console.log("Current offset from the top is: " + sellingPoints.getBoundingClientRect().top + " pixels"); */
    //jQuery Version 
    $(window).scroll(function(event) { 
    
    // Vanilla Version   
    /* if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
             animatePoints(pointsArray);*/
    //jQuery Version 
        if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
        
        
         }
     });
  });