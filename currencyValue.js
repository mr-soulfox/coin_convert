//dando um request em uma api para pegar a conversão do dolar, dolar turistico, dolar canadense...
function currencyValue() {

    //pegando valor digitado e transformando ele em um number
    var value = Number(document.querySelector('#value').value.replace(',', '.'));
    
    //conferindo se o valor foi preenchido corretamente
    if (value > 0 && value <= 100000000) {

        //mostrando modal
        var modal = document.querySelector('#modal');
        modal.classList.add('mostrar');

        //pegando o valor do select e convertendo para string
        var coinSelected = String(document.querySelector('#coin').value);

        //completando a url com o tipo da moeda qu equeremos saber a cotação
        const url = "https://economia.awesomeapi.com.br/json/" + coinSelected + "-BRL";

        //fazendo o request pra api [https://docs.awesomeapi.com.br/api-de-moedas]
        const request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send();

        const responseText = request.responseText;
        const response = JSON.parse(responseText);
        console.log(response);

        //verificando se deu tudo certo
        if (response.status == undefined) {
            
            //pegando elemento do resultado de dentro do modal
            const result = document.querySelector('#result');

            //preenchendo a div com o resultado
            result.innerHTML = `<span>${response[0].name} para Real</span> <br/>
                                <h1>${response[0].code}$1.00 = R$${Number(response[0].high).toFixed(2).replace('.', ',')}</h1>
                                <span id="resText">Resultado maximo:</span> 
                                <span>${response[0].code}$${value.toFixed(2)} é R$${(value * Number(response[0].high)).toFixed(2).replace('.', ',')}</span>
                                <span id="resText">Resultado minimo:</span> 
                                <span>${response[0].code}$${value.toFixed(2)} é R$${(value * Number(response[0].low)).toFixed(2).replace('.', ',')}</span>
                                `;

        } else {
            //indicando erro interno
            alert('Erro interno');
            modal.classList.remove('mostrar');
        };

    } else {
        //indicando erro do usuario
        alert('Valor invalido');
    };
};

//função para fechar o modal
function closeModal() {
    var modal = document.querySelector('#modal');
    modal.classList.remove('mostrar');
};
