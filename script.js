document.getElementById('form').addEventListener('submit', formSubmit)
let petApi = new URL('https://api.petfinder.com/')


function getApiToken () {
    petApi.pathname = '/v2/oauth2/token'
    return fetch(petApi, {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=MEimVm1ibqiT1m5SfKnKYzbq0AWdOgiX7Lq35F5FWtSiGEXM4a&client_secret=5hplJzzTstQSLXYGAOEXitqJ7ycIMuJN1smDKvGH',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

let apiData
function formSubmit(event) {
    event.preventDefault()
    let token
 
    getApiToken().then(response => response.json())
    .then(data => token = data.access_token)
    .then(() => {
    const searchBox = document.getElementById('searchBox')
    const searchName = searchBox.value;

    petApi.pathname = 'v2/animals'
    petApi.search = `breed=${searchName}`


    fetch(petApi, {headers: {
        Authorization: `Bearer ${token}`
    }})
    .then(response => response.json())
    .then(data => {
        apiData = data
        populateCards()
    })
    // searchBox.value = ''
    document.getElementById("carouselExampleControls").style.display = "none";
    })
}

function populateCards () {
    let cardContainer = document.getElementById('card-container')

    while (document.querySelectorAll('.card').length > 1) {
        document.querySelector('.card').remove()
    }
    for (let i = 0; i < 9; i++){
       let newCard = document.querySelector('.card').cloneNode(true)
       cardContainer.appendChild(newCard)
    }
    // document.getElementById('card-container').style.display = 'flex'
    document.getElementById('card-container').classList.add("d-flex", "flex-wrap", "justify-content-evenly", "container")
    fillInCards()
}

function fillInCards () {
    let cardArray = document.querySelectorAll('.card')
    let i = 0
    for (let card of cardArray) {
        card.addEventListener('click', openAdoptionLink)
        card.setAttribute('url', apiData.animals[i].url)
        card.attrib
        card.childNodes[1].innerText = apiData.animals[i].name
        if(apiData.animals[i].photos[0]){
            card.childNodes[3].setAttribute('src', apiData.animals[i].photos[0].medium)
        }
        i++
    }
}

function openAdoptionLink (evt) {
    let url = evt.currentTarget.getAttribute('url')
    window.open(url)
}

//create form
function createForm(species, age, sex, location) {
  let form = document.createElement("div");
  form.setAttribute("class", "form");
  form.innerHTML = `
    <div class="form_container">
  <div class="row">
  <div class="col-md-3">
    <form id="form">
      <div class="form-group">
        <label for="species">Enter a species name</label>
        <input type="text" class="form-control" id="species">
        <p id="dError"></p>
      </div>
      <div class="form-group">
        <label for="age">Select Age </label>
        <input type="text" class="form-control" id="age">
        <p id="lError"></p>
      </div>
      <div class="form-group">
        <label for="sex">Select gender</label>
        <input type="text" class="form-control" id="sex">
      </div>
      <div class="form-group">
        <label for="location">location</label>
        <input type="text" class="form-control" id="location" >
      </div>
      <button type="submit" class="btn btn-primary submit_btn"> Submit</button> 
    </form>
</div>
    `;
  document.getElementById("form_container").appendChild(form);
}

//Get Geolocation
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

var data;
//add event listener for page load to trigger random imgs from api
window.addEventListener("load", (evt) => {
  evt.preventDefault();
  //add function for assigning source APIs to carousel imgs
  let dogApi = "https://dog.ceo/api/breeds/image/random";

  const dogOne = document.getElementById("img1");
  const dogTwo = document.getElementById("img2");
  const dogThree = document.getElementById("img3");

  fetch(dogApi)
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => dogOne.setAttribute("src", data.message));

  fetch(dogApi)
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => dogTwo.setAttribute("src", data.message));

  fetch(dogApi)
    .then((response) => response.json())
    // .then((data) => console.log(data));
    .then((data) => dogThree.setAttribute("src", data.message));
});
