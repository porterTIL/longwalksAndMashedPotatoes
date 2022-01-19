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
