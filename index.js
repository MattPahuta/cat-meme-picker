import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios');

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