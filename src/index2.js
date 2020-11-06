const url = `http://localhost:3000/pups`;
const dogBar = document.getElementById('dog-bar')
const pupBar = document.querySelector('#dog-bar')
const dogInfo = document.getElementById('dog-info')
const dogFilter = document.querySelector('#good-dog-filter')
let filter = false;
let pups = [];
let dogStates ={
    "Good Dog!": "Bad Dog!",
    "Bad Dog!" : "Good Dog!"
}

function setFilterButtonText(filterValue){
    const valueDescription = filter ? "ON" : "OFF";
    dogFilter.innerText = `Filter good dogs: ${valueDescription}`;
}

document.addEventListener('DOMContentLoaded', () =>{
    setFilterButtonText(filter);
    

})


function displayPup(pup){
    let pupCharacter = `${pup.isGoodDog}`;
    let goodPup = pupCharacter === "true" ? "Good Dog!" : "Bad Dog!"; 
        const onePup = document.getElementById('dog-info')
        onePup.innerHTML = ` <img src="${pup.image}">
        <h2>${pup.name}</h2>
        <button data-id=${pup.id}>${goodPup}</button>`
    }

function fetchPups(){
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
        pups = json;
        renderPups(pups);
        fetchPups();
    })
}


function renderPups(pups){
    dogBar.innerHTML = "";
    for(pup of pups){
        renderPup(pup)
    }
}
function renderPup(pup){
    dogBar.innerHTML += `<span data-id=${pup.id}>${pup.name}</span>`

}
pupBar.addEventListener('click', function(event){
    const dogId = event.target.dataset.id;

    fetch(url+'/'+dogId)
    .then(resp => resp.json())
    .then(pup =>{
        displayPup(pup)
    })
})

dogInfo.addEventListener('click', function(event){
    const dogId = event.target.dataset.id;
    if(event.target.tagName.toLowerCase() === 'button'){
      const isGoodDog = event.target.innerText === "Good Dog!";
        const reqObj ={
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                isGoodDog : isGoodDog
            })
        }

        fetch(url+'/'+dogId, reqObj)
        .then(resp => resp.json())
        .then(pup => {
            event.target.innerText = dogStates[event.target.innerText];
            updatePup(pup);
            renderPups(pups);
            toggleFilter();
        })
    }

})

function updatePup(updatedPup){
    const pup = pups.find(p => p.id === updatedPup.id); 
    pup.isGoodDog = updatedPup.isGoodDog;
}

function toggleFilter(){
    filter= !filter;
    setFilterButtonText(filter);
    let filteredPups = pups;
   if(filter){
       filteredPups = pups.filter(pup => pup.isGoodDog === true);
   }
   renderPups(filteredPups);
}

dogFilter.addEventListener('click', function(event){
   toggleFilter();
})

