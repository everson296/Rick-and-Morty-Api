'use strict';

const container = document.getElementById('container');
const url = "https://rickandmortyapi.com/api/character/";

const cont = 50

const LimparCards = () => {
    container.innerHTML = '';
}

const CriarCard = (info) => {
    container.innerHTML += `
        <div class="card">
            <img src="${info.image}"/>

            <div class="containerInfo">
                <div class="name"> ${info.name} </div>
                <div class="species"> ${info.species}  </div>
                <div class="${info.status}"> ${info.status} <div/>
            </div>
        <div/>
    `;
}

const CarregarCard = async() => {
    LimparCards()
    
    for( let i = 1; i <= cont; i++ ){

        const dados = await fetch(`${url}${i}`);
        const info = await dados.json();
        CriarCard(info)   
    }
}

CarregarCard()

