'use strict';

const container = document.getElementById('containerResponse');
const count = document.getElementById('count');
const user = document.getElementById('txtPesquisa');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const url = "https://rickandmortyapi.com/api/character/?page=1&name=";

const LimparTela = () => {
    container.innerHTML = '';
}

const CarregarCards = async(url) => {
    LimparTela();
    
    const dados = await fetch(url);
    const info = await dados.json();

    let countCards = info.results.length;
    let countPages = info.info.pages;
    const results = info.results;

    CriarCards(countCards, results, countPages)
}

const CriarCards = (countCards, info, countPages) => {
    for(let i = 0; i <= countCards - 1; i++ ){
        container.innerHTML += `
            <div id="cardResponse">
                <img src="${info[i].image}"/>
                <div id="info">
                    <div class="itemName"> id </div>
                    <div class="itemInfo"> ${info[i].id} </div>

                    <div class="itemName"> name </div>
                    <div class="itemInfo"> ${info[i].name} </div>

                    <div class="itemName"> status </div>
                    <div class="itemInfo"> ${info[i].status} </div>

                    <div class="itemName"> species </div>
                    <div class="itemInfo"> ${info[i].species} </div>

                    <div class="itemName"> type </div>
                    <div class="itemInfo"> ${info[i].type} </div>

                    <div class="itemName"> gender </div>
                    <div class="itemInfo"> ${info[i].gender} </div>

                    <div class="itemName"> origin </div>
                    <div class="itemInfo"> ${info[i].origin.name} </div>

                    <div class="itemName"> location </div>
                    <div class="itemInfo"> ${info[i].location.name} </div>

                </div>
            </div>
        `;
    }
    
    for(let i = 1; i <= countPages; i++ ){
        count.innerHTML += `
            <li class="teste"> ${i} </li>
        `;
    }
    
    let teste = document.querySelectorAll(".teste");
    
    for(let j = 1; j <= countPages; j++ ){
        
        teste[j].addEventListener('click', () => {
            alert('ola')
            console.log('ola')
        })
    }    
    
    
}

//user.addEventListener('blur', () => {
//    LimparTela()
//    let urlUser = url + user.value;
//    CarregarCards(urlUser)
//})

const inicio = () => {
    LimparTela()
    let urlUser = url + user.value;
    CarregarCards(urlUser)

}

inicio()


//teste.addEventListener('click', () => {
//    alert(e)
//})














































































