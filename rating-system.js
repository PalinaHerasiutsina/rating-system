//initial setup
document.addEventListener('DOMContentLoaded', function(){
  setUp()  
});

var films = [
{ id : 1,
  title: "The Godfather (1972)",
  rating: 0
},
{ id : 2,
  title: "The Shawshank Redemption  (1994)",
  rating: 0
},
{ id : 3,
  title: "The Dark Knight (2008)",
  rating: 0
},
{ id : 4,
  title: "12 Angry Men (1957)",
  rating: 0
},
{ id : 5,
  title: "Schindler's films (1993)",
  rating: 0
},
{ id : 6,
  title: "The Lord of the Rings: The Return of the King",
  rating: 0
}
]

function input(){
  var input = document.getElementById('inputFilmTitle');
  var value = input.value;
  films.push ({
    id: films.length +1,
    title: value,
    rating: 0
  })
  setUp()
}

function setUp(){
  sort ();
  clone();
  insert();
  addlistener();
}

function sort (){
  films.sort(function(a,b){
    if (a.rating > b.rating){
      return -1
    } else if (a.rating < b.rating) {
      return 1
    } else if (a.title > b.title){
      return -1
    } else if (a.title < b.title){
      return 1
    } 
    return 0
  })
}

function clone(){
  var containers = document.getElementsByClassName('container');
  var object = containers[0];
  for (var i = containers.length; i<films.length; i++){
    document.getElementById('wrapper').appendChild(object.cloneNode(true));
  }
}  

function insert(){
  var containers = document.getElementsByClassName('container');
  films.forEach(function(film, index){
    var divContainer = containers[index];
    var divsfilm = divContainer.getElementsByClassName('film');

    divsfilm[0].children[0].innerHTML = film.title;

    var starsContainer = divContainer.lastElementChild;
    var stars = starsContainer.children;
    starsContainer.setAttribute('filmId', film.id);
    for (var i= 0, star; star=stars[i]; i++) {
      if (i < film.rating){
        star.className = 'star rated';
      } else {
        star.className = 'star';
      }
    }
  })
}

function addlistener(){
  var stars = document.querySelectorAll('.stars');

  [].forEach.call(stars, function(starsContainer) {
    var starArray = starsContainer.querySelectorAll('.star');

    [].forEach.call(starArray, function(star, index) {
      star.addEventListener('click', (function(event){
       var filmId = this.parentNode.getAttribute('filmId');

       var filterFilm = films.filter(function(film) {
         return film.id== filmId;
       });
       filterFilm[0].rating = index +1;
       sort ();
       insert();
     }))
    })

  });
};