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
