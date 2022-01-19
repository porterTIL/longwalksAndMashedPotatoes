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
    .then(data => console.log(data))
    searchBox.value = ''
    })
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
