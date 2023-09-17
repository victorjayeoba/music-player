const trendingSongs = document.getElementById("trendingContainer");
const afropopSongs = document.getElementById("Afropopsong");
const gospelSongs = document.getElementById("gospelContainer");
const playingRange = document.getElementById("playingRange")
const main_playing_control = document.querySelector(".main_playing_control")
const mainPlayBtn = document.querySelector(".main_playing_control > .fa-play")
const mainPauseBtn = document.querySelector(".main_playing_control > .fa-pause")

mainPlayBtn.addEventListener("click", (e) => {
  mainAudio.play()
})


mainPauseBtn.addEventListener("click", () => {
  mainAudio.pause()
})

main_playing_control.addEventListener("click", () => {
  main_playing_control.classList.toggle('playing')
})

let playingArray = [];
var trending = [];
var afropop = [];
var gospel = [];


const mainAudio = new Audio()
mainAudio.src = 'song_5.mp3'


mainAudio.addEventListener("timeupdate", (e) => {
  let playingAudioTime = e.target.currentTime;
  let playingAudioDuration = e.target.duration;
  playingRange.value = playingAudioTime / playingAudioDuration * 100
  playingRange.addEventListener("change", (e) => {
    mainAudio.currentTime = playingAudioDuration * e.target.value / 100
    console.log(e.target.value)
  })
})

var playingMusicIndex = 0;
/* setTimeout(() => {
  mainAudio.play()
}, 5000)
 */

var gettrendingSongsArray = [
  "if i were a boy",
  "unavailable",
  "way too big",
  "essence",
  "peaches",
  "love",
  "dance",
];
var getAfropopSongs = [
  "Calm Down",
  "safe haven",
  "sability",
  "bandana",
  "top of the world",
  "baby",
];
//fetching billboard data througha github api
var getgospelSong = [
  "yah",
  "bigger everyday",
  "spirit chant",
  "always God",
  "Nara",
  "way maker",
  "Yeshua",
];

const billboard = async () => {
  try {
    const url = `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json`;
    const response = await fetch(url);
    const text = await response.json();
    console.log(text);
  } catch (error) {
    console.log(error);
  }
};
billboard();

// looping through raw data array and moving elements to the dom
//getting the trending songs
const getTrending = async (array) => {
  try {
    let li = "";
    array.map(async (e) => {
      const url = `https://itunes.apple.com/search?term=${e}&entity=song&limit=1`;
      const response = await fetch(url);
      let text = await response.json();


      // optimising the quality of image
      let imgSrc = text.results[0].artworkUrl100;
      img = imgSrc.replace("100x100", "400x400");
      let audioSrc = text.results[0].previewUrl
      let artistName = text.results[0].artistName
      let trackName = text.results[0].trackName
      let id = trending.length == 0 ? 0 : trending.length
      /*  onclick="push(this.dataset.arrayClass, this.dataset.audioSrc, ${text})" */

      li += `
      <li class="wrapper">
        <div data-array-class='trending' data-index=${id}  class="image_container">
          <div  data-index="${id}"  class="overlay playing ">
            <div class="playpause"><i class="fa-solid fa-play"></i>
            <i class="fa-solid fa-pause"></i></div>
          </div>
          <img src="${img}" alt="">
          <div class="no_of_listen">
            <span><i class="fa-solid fa-headphones"></i>${text.results[0].collectionPrice}M</span>
          </div>
        </div>
        <div class="song_details">
          <a href="" class="line-clamp  song_author">${artistName}</a>
          <p class="line-clamp  song_title">${trackName}</p>

        </div>
      </li>
    `;
      trending = [...trending, { audioSrc, img, id, artistName, trackName }]
      //injecting the li element into the dom
      trendingSongs.innerHTML = li;
      //break

      // accessing the container to add an onlick event
      const containers =
        trendingSongs.querySelectorAll(".image_container");
      containers.forEach((container) => {
        container.addEventListener("click", (e) => {
          push(e.currentTarget.dataset);
        });
      });
      //break

    });
  } catch (error) {
    console.log(error);
  }
};

//break

function push(object) {
  playingMusicIndex = object.index

  playingArray = window[object.arrayClass]
  console.log(playingArray)

  loadActiveMusic()
}

function loadActiveMusic() {

  document.querySelector("#playing_song_img").src = playingArray[playingMusicIndex].img;
  document.querySelector("#playing_song_title").textContent = playingArray[playingMusicIndex].trackName;
  document.querySelector("#playing_song_name p").textContent = playingArray[playingMusicIndex].artistName;
  mainAudio.src = playingArray[0][playingMusicIndex].audioSrc;
  play()
  console.log(mainAudio)
}

function play() {
  mainAudio.play()
}


//looping through the afropop array
const getAfropop = async (array) => {
  try {
    let li = "";
    array.map(async (e) => {
      const url = `https://itunes.apple.com/search?term=${e}&entity=song&country=NG&country=NG&limit=1`;
      const response = await fetch(url);
      const text = await response.json();

      // optimising the quality of image
      let imgSrc = text.results[0].artworkUrl100;
      img = imgSrc.replace("100x100", "400x400");
      let audioSrc = text.results[0].previewUrl
      let artistName = text.results[0].artistName
      let trackName = text.results[0].trackName
      let id = afropop.length == 0 ? 0 : afropop.length
      li += `

      <li class="wrapper">
      <div data-array-class="afropop" data-index="${id}" class="image_container">
        <div class="overlay playing ">
          <div class="playpause"><i class="fa-solid fa-play"></i>
          <i class="fa-solid fa-pause"></i></div>
        </div>
        <img src="${img}" alt="">
        <div class="no_of_listen">
          <span><i class="fa-solid fa-headphones"></i>${text.results[0].collectionPrice}M</span>
        </div>
      </div>
      <div class="song_details line-clamp">
        <a href="" class="line-clamp   song_author line-clamp"> <p class="line-clamp" > ${artistName}</p></a>
        <p class="line-clamp   song_title">${trackName}</p>

      </div>
    </li>
      `;





      //injecting the li element into the dom
      afropopSongs.innerHTML = li;
      /*   if (id + 1 == array.length) {
        slide()
      } */

      afropop = [...afropop, { audioSrc, img, id, artistName, trackName }]
      // accessing the container to add an onlick event
      const containers = afropopSongs.querySelectorAll(".image_container");

      containers.forEach((container) => {

        container.addEventListener("click", (e) => {
          push(e.currentTarget.dataset);

        });
      });
      //break


    });
  } catch (error) {
    console.log(error);
  }
};
//break






//looping through the gospel array
const getGospel = async (array) => {
  try {
    let li = "";
    array.map(async (e) => {
      const url = `https://itunes.apple.com/search?term=${e}&entity=song&country=NG&primaryGenreName=christian&limit=1`;
      const response = await fetch(url);
      const text = await response.json();

      // optimising the quality of image
      let imgSrc = text.results[0].artworkUrl100;
      img = imgSrc.replace("100x100", "400x400");
      let audioSrc = text.results[0].previewUrl
      let artistName = text.results[0].artistName
      let trackName = text.results[0].trackName
      let id = gospel.length == 0 ? 0 : gospel.length

      li += `
      <li class="wrapper">
      <div   data-array-class="gospel" data-index="${id}" class="image_container">
        <div class="overlay playing ">
          <div class="playpause"><i class="fa-solid fa-play"></i>
          <i class="fa-solid fa-pause"></i></div>
        </div>
        <img src="${img}" alt="">
        <div class="no_of_listen">
          <span><i class="fa-solid fa-headphones"></i>${text.results[0].collectionPrice}M</span>
        </div>
      </div>
      <div class="song_details">
        <a href="" class=" song_author">
        <p class="line-clamp">
        ${artistName}</p></a>
        <p class="line-clamp   song_title">${trackName}</p>

      </div>
    </li>
      `;

      //injecting the li element into the dom
      gospelSongs.innerHTML = li;

      gospel = [...gospel, { audioSrc, img, id, artistName, trackName }]
      // accessing the container to add an onlick event
      const containers = gospelSongs.querySelectorAll(".image_container");

      containers.forEach((container) => {

        container.addEventListener("click", (e) => {
          push(e.currentTarget.dataset);

        });
      });
      //break





      // trying to activate the body slick settings when every necessary thing has been injected into the dom
      if (id + 1 == array.length) {
        slide();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//break

// calling on functions for looping through arrays
getTrending(gettrendingSongsArray);
getAfropop(getAfropopSongs);
getGospel(getgospelSong);
//break

// this will control the banners slider animination
$(".slider").slick({
  dots: true,
  centerMode: false,
  centrPadding: "40px",
  infinite: true,
  arrows: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        infinite: true,
        arrows: true,
        dots: true,
      },
    },
    {
      breakpoint: 789,
      settings: {
        centrPadding: "0",
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
//break

// slick setting for the body slide
function slide() {
  $(document).ready(function () {
    $(".aside_slide").slick({
      arrows: true,
      speed: 300,
      slidesToShow: 6.5,
      slidesToScroll: 1,
      swipe: true,
      infinite: false,
      swipeToSlide: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: true,
            slidesToShow: 4.5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 789,
          settings: {
            arrows: false,
            slidesToShow: 3.3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2.3,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  });
}


const header = document.getElementById("header");
const main_content_wrapper = document.getElementById("main_content_wrapper");
main_content_wrapper.addEventListener("scroll", (e) => {
  console.log(e.currentTarget.scrollTop)
  header.style.backgroundImage = e.currentTarget.scrollTop < "150" ? "linear-gradient(rgba(0,0.6,0.3,0),rgba(80, 19, 95, 0),rgba(20, 2, 68, 0))" : "linear-gradient(rgba(39, 26, 77,.03 ),rgba(39, 26, 77,0.5))";
  /*  e.currentTarget.scrollTop == "0" ? header.style.backgroundImage = "linear-gradient(rgba(0,0.6,0.3,0.0),rgba(80, 19, 95, 0.),rgba(20, 2, 68, 0.))" : header.style.backgroundImage = "linear-gradient(rgba(0,0.6,0.3,0.9),rgba(80, 19, 95, 0.144),rgba(20, 2, 68, 0.692))" */
});

