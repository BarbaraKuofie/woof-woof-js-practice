document.addEventListener("DOMContentLoaded", () => {
    main();
  });


const url = "http://localhost:3000/pups"
let filterPup = false;

function main(){

    getPups();
    renderPup();
    addEventListeners();
}

function getPups(){
    return fetch (url)
    .then(resp => resp.json())
    .then(pups => renderPups(pups))
}

function renderPups(pups){
    const dogContainer = document.getElementById('dog-bar');
    dogContainer.innerHTML = ' '
    if (filterPup === false){
        pups.forEach(pup => {
        dogContainer.innerHTML += `<span id="${pup.id}" class='pup-btn'><div >${pup.name}</div></span>`
        });
    }else {
        pups.forEach(pup => {
        if (pup.isGoodDog === true){
        dogContainer.innerHTML += `<span id="${pup.id}" class='pup-btn'><div >${pup.name}</div></span>`
        }
        });
    }
}


function displayPup(pup){
let pupCharacter = `${pup.isGoodDog}`;
let goodPup = pupCharacter === "true" ? "Good Dog!" : "Bad Dog!"; 
    const onePup = document.getElementById('dog-info')
    onePup.innerHTML = ` <img src="${pup.image}">
    <h2>${pup.name}</h2>, 
    <button>${goodPup}</button>`
}


function addEventListeners(){
    const dogContainer = document.getElementById('dog-bar');
 dogContainer.addEventListener('click', function(event){
    if (event.target.className === 'pup-btn'){
        fetch(`http://localhost:3000/pups/${event.target.id}`)
        .then(resp => resp.json())
        .then(pup => displayPup(pup))
    }
    if (event.target.id === 'good-dog-filter'){
        filterPup = !filterPup
        displayPup()
        event.target.innerText = 'Filter good dogs: ON'      
        }
    })
}


