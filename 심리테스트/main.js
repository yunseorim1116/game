const faceBook = document.getElementById("facebook");
const twitter = document.getElementById("twitter");
const url = "https://catleaps.netlify.app/";
const replay = document.querySelector('.replay-icon');

replay.addEventListener('click',()=>{
  location.href = "index.html";
})

faceBook.addEventListener("click", () => {
  console.log("ㅇㅋ");
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url)
  );
});

twitter.addEventListener("click", () => {
  window.open(
    "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url)
  );
});
