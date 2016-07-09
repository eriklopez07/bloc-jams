 // Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
// Assignment Example
var albumAnohni = {
    title: 'HOPELESSNESS',
    artist: 'ANOHNI',
    label: 'Imaginary Label',
    year: '2016',
    albumArtUrl: 'assets/images/album_covers/00.png',
    songs: [
        { title: 'Drone Bomb Me', duration: '4:09'},
        { title: 'Hopelessness', duration: '3:30'},
        { title: 'Execution', duration: '3:37'},
    ]
};


//This function recives the information of the song and creats the html needed
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
     /* the variable data-song-number allows us to store to access the data held in the attribute using DOM methods when the mouse leaves the table row, and the song number's table cell returns to its original state.*/
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };

var setCurrentAlbum = function(album) {
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 

     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
   
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };
//This function will recive an element and the desiered element to be selected named as a targetClass//
var findParentByClassName = function (element, targetClass){
    //The if statement verifies the existance of an element
    if (element){
        /*var currentParrent selects the element's parent*/
        var currentParent = element.parentElement;
        /*While currentParrent(classname) is NOT equal to targetClass AND currentParrent(classname) is NOT equal to null*/
       if (currentParent.className === null){
           alert("No parent found");
       }
        
        while (currentParent.className != targetClass) {
            //This loop will iterate until the currentParent is equal to the targetClass
               
        currentParent = currentParent.parentElement;
        if (currentParent === null){
            alert("No parent found with that class name");
        }
        
        }
        return currentParent;
        
    }
};


 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//songRows selects the element with the class album-view-song-time
var songRows = document.getElementsByClassName('album-view-song-item');
//This var templates replaces the icons
var playButtonTemplate= '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//This variable is set to null because nothing should be playing
var currentlyPlayingSong = null;


 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     
        //This function listens for a hovering over an element.
        songListContainer.addEventListener('mouseover', function(event) {
            console.log('mouseover');
        /*The target property on the object selected below stores the event occured
        /*  console.log(event.target);
        /*parentElement and className properties together make sure that it is only acted on the table row /*selected.*/      
        if (event.target.parentElement.className === 'album-view-song-item'){
            /* Change the content from the number to the play button's HTML by selecting the event's element based on a query selector*/
            /*event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;*/
            /*We use the querySelector() method because we only need to return a single element with the .song-item-number class.*/
            
            var songItem = getSongItem(event.target);
 
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
            
            
            }      
        });
        
        for (var i = 0; i <  songRows.length; i++){
            songRows[i].addEventListener('mouseleave', function(event){
               //This reverts where the mouse has left the table row selected
                
                var songItem = getSongItem(event.target);
                var songItemNumber = songItem.getAttribute('data-song-number');

                 if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
                }
                
            });
        /*The getAttribute() method takes a single argument: a string with the name of the attribute whose value we want to retrieve. When the mouse leaves a selected table row, it will change back to the song number using the value obtained from this method */
                
            // Triger by the event listener
                songRows[i].addEventListener('click', function(event){
                //Event handler call
                clickHandler(event.target);
            });
        }
     
     var albums = [albumPicasso, albumMarconi, albumAnohni];
     var index = 0;
     albumImage.addEventListener("click", function(event){
        
        setCurrentAlbum(albums[index]);
     index++;
     if(index == albums.length){
         index= 0;
     }
    });
 };




var getSongItem = function (element){
    switch (element.className){
        case 'album-song-button':
        case 'ion-play' :
        case 'ion-pause' :
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item' :
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function (targetElement){
    var songItem = getSongItem(targetElement);
    //The first segments starts to play the selected song
    if (currentlyPlayingSong === null){
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } 
    //Stops the song because it is the current song playing
    else if( currentlyPlayingSong === songItem.getAttribute('data-song-number')){
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
     } 
    //It is a new song that should be playing 
    else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};