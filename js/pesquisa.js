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

    fetch(url)
    .then(response => {
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
        throw new Error('Erro ao acessar a API: ' + response.status);
        }
        // Retorna a resposta em formato JSON
        return response.json();
    })
    .then(data => {
        // Manipula os dados recebidos da API
        let countCards = data.results.length;
        let countPages = data.info.pages;
        const results = data.results;

        CriarCards(countCards, results, countPages)
    })
    .catch(error => {
        container.innerHTML = '';
        count.innerHTML =''
        container.innerHTML = '<div id="erro"> Este personagem não existe. </div>'        
    });
}

const CriarCards = (countCards, info, countPages) => {
    for(let i = 0; i < countCards; i++ ){
        container.innerHTML += `
            <div class="card" id="${info[i].id}">
            <img src="${info[i].image}"/>

            <div class="containerInfo">
                <div class="name"> ${info[i].name} </div>
                <div class="species"> ${info[i].species}  </div>
                <div class="${info[i].status}"> ${info[i].status} <div/>
            </div>
        <div/>
        `;
    }

    document.querySelectorAll('#containerResponse .card').forEach(item => {
        const infoCard = document.querySelector('.containerInfoCard');
        const urlCharacter = "https://rickandmortyapi.com/api/character/";
        item.onclick = async(e) => {

            const dados = await fetch(`${urlCharacter}${item.id}`);
            const info = await dados.json();
                
            const infoType = () => {
                if(info.type === ''){
                    return 'unknown'
                }else{
                    return info.type
                }
            }
                
            infoCard.style.display = 'flex'
            infoCard.innerHTML=`
                <div id="left">
                    <img src="${info.image}"/>
                </div>

                <div id="right">
                    <div class="nameClose">
                        <div> ${info.name} </div>
                        <i id="btnClose" class="fa-solid fa-xmark"></i> 
                    </div>
                    <div class="infoItems"> <span> id </span> <p>${info.id}</p> </div>
                    <div class="infoItems"> <span> gender </span> <p>${info.gender}</p> </div>
                    <div class="infoItems"> <span> status </span> <p>${info.status}</p> </div>
                    <div class="infoItems"> <span> specie </span> <p>${info.species}</p> </div>
                    <div class="infoItems"> <span> type </span> <p>${infoType()}</p> </div>
                    <div class="infoItems"> <span> origin </span> <p>${info.origin.name}</p> </div>
                </div>
            `;

            document.getElementById('btnClose').addEventListener('click', () => {
                infoCard.style.display = 'none'
            })
        }
    })  

    count.innerHTML =''
    for(let c = 1; c <= countPages; c++){
        count.innerHTML += `
            <li id="${c}">${c}</li>
        `
    }

    document.querySelectorAll('#count li').forEach(linkItem => {
        linkItem.addEventListener('click', () => {
            const urlPage = `https://rickandmortyapi.com/api/character/?page=${linkItem.id}&name=${user.value}`
            CarregarCards(urlPage)
        })
    })
}

user.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    let urlUser = url + user.value;
    CarregarCards(urlUser)
  }
});