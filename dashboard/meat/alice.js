function testeAlice(){
    alert("Alice ok!")
};

function showData(sourceData){
    d3.csv(sourceData).then(function(dados){  
        //console.log(dados);
})
};

//function to load unique values for a dropdown menu
function carregarValoresDropdown(sourceData, colName, id) {
    d3.csv(sourceData).then(function(dados) {
        // Extrair valores únicos da primeira coluna (assumindo que é a coluna desejada)
        var valoresUnicos = Array.from(new Set(dados.map(function(d) { return d[colName]; })));

        // Preencher as opções do dropdown com base nos valores únicos
        var dropdown = d3.select('#'+ id);
        dropdown.selectAll("option")
            .data(valoresUnicos)
            .enter().append("option")
            .attr("value", function(d) { return d; })
            .text(function(d) { return d; });
    }).catch(function(error) {
        console.error("Erro ao carregar o arquivo CSV:", error);
    });
}
