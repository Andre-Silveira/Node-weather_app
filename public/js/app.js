console.log('Carregado o JavaScript!')


const weatherForm = document.querySelector('form')          //Lendo a Form
const pesquisar = document.querySelector('input')           //Lendo o que foi digitado no box
const mensagem1 = document.querySelector('#mensagem-1')
const mensagem2 = document.querySelector('#mensagem-2')


//Adicionando o evento ao clicar no botão 'Pesquisar'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()      //Adicionado o evento para que não recarregue a página apos o submit

    const localizacao = pesquisar.value         //Salvando o valor lido no box dentro de uma variável

    //Limpando os dados
    mensagem1.textContent = ''
    mensagem2.textContent = ''

    // Adicionando o endereço onde os dados serão buscados
    fetch('/weather?address=' + localizacao).then((response) =>{
    response.json().then((data)=>{

        if(data.erro){
            mensagem1.textContent = data.erro
            return console.log( 'erro: ' + data.erro)
        }else{
            console.log({
                location: data.location,
                forecast: data.forecast
            })
            mensagem1.textContent = 'Localização: ' + data.location
            mensagem2.textContent = 'Previsão: ' + data.forecast
        }
    })
})
})



