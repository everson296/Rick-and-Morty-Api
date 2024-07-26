'use strict';

const container = document.getElementById('container');
const url = "https://rickandmortyapi.com/api/episode/";

const cont = 50

const LimparCards = () => {
    container.innerHTML = '';
}

const CriarCard = (info) => {
    container.innerHTML += `
        <div class="cardEpLocal">
            <div class="nameEpLocal"> ${info.name} </div>
            <div class="typeEpLocal"> ${info.episode} </div>
            <div class="epDimension"> ${info.air_date} </div>
        </div>
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


