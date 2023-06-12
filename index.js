import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModal = document.getElementById('meme-modal');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

// *********************** //
// *** Event listeners *** //
// *********************** //
emotionRadios.addEventListener('change', highlightCheckedOption); // listen for change events on emotion radios
memeModalCloseBtn.addEventListener('click', closeModal);
getImageBtn.addEventListener('click', renderCat); // listen for clicks on 'get image' button

// add styling to selected emotion radio
function highlightCheckedOption(e) {
  // handle highlight style removal - ensure only on item highlighted
  const radios = document.getElementsByClassName('radio');
  for (let radio of radios) {
    radio.classList.remove('highlight');
  }
  const selectedEmotion = document.getElementById(e.target.id).parentElement; // get selected radio
  selectedEmotion.classList.add('highlight'); // add highlight to selected radio
}

function closeModal() {
  memeModal.style.display = 'none';
}

function renderCat() {
  const catObject = getSingleCatObject()
  memeModalInner.innerHTML = `
    <img class="cat-img" src="./images/${catObject.image}" alt="${catObject.alt}">
    `
  memeModal.style.display = 'flex';
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray() // get an array of matching cats
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomCatIndex = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomCatIndex]
  }
}

function getMatchingCatsArray() {
  const isGif = gifsOnlyOption.checked; // check if gif option is selected
  if (document.querySelector('input[type="radio"]:checked')) { // handle clicks if no emotion selected
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
    const matchingCats = catsData.filter(cat => {
      // check if gif option is checked, return appropriate array of cat memes
      return isGif ? cat.emotionTags.includes(selectedEmotion) && cat.isGif : cat.emotionTags.includes(selectedEmotion);
    })
    return matchingCats;
  }
}

// get emotions from the cat arrays
function getEmotionsArray(cats) {
  const emotionsArray = []; // initialize empty array to hold cat emotions
  for (let cat of cats) { // loop over the cats array
    for (let emotion of cat.emotionTags) { // loop over emotion array of each cat (within the cats array)
      if (!emotionsArray.includes(emotion)) { // ensure duplicate emotions are not pushed to emotion array
        emotionsArray.push(emotion)
      }
    }
  }
  return emotionsArray;
}

// render emotion radios to page
function renderEmotionsRadios(cats) {
  let radiosItems = ``;
  const emotions = getEmotionsArray(cats); // get the emotions that need to be rendered to the page
  for (let emotion of emotions) { // loop over emotions and create html for each
    radiosItems += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" id="${emotion}" name="emotions" value="${emotion}">
      </div>
      `
  }
  emotionRadios.innerHTML = radiosItems;
}

renderEmotionsRadios(catsData)