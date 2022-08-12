const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const MODAL = document.querySelector("div#modal")
// returns static NodeList
const LIKEGLYPH = document.querySelectorAll("span.like-glyph")

// attach listener to hide modal
document.addEventListener("DOMContentLoaded", hideElement(MODAL));

// attach click listener on all hearts
for (const heart of LIKEGLYPH) { 
  heart.addEventListener("click", heartLikeCallback); 
}

function hideElement(element) {
  element.className = "hidden";
}

function resetElementClassName(element, klassName) {
  element.className = klassName;
}

function setElementInnerText(element, text) {
  element.innerText = text;
}

// if EMPTY_HEART make FULL_HEART and vica versa
function flipHeartState(target) {
  if (target.innerText === EMPTY_HEART) {
    target.innerText = FULL_HEART;
    resetElementClassName(target, "activated-heart");
  } else {
    target.innerText = EMPTY_HEART;
    resetElementClassName(target, "");
  }
}

// if server response success, change how the heart is displayed otherwise show server error
function heartLikeCallback(event) {
  const heart = event.target;
  mimicServerCall("fakeUrl")
    .then(function(success) {
      flipHeartState(heart);
    })
    .catch(function(failure) {
      resetElementClassName(MODAL, "");
      setElementInnerText(MODAL, failure);
      setTimeout(() => hideElement(MODAL), 3000);
    })
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
