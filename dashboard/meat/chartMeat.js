
var sourceData = "./data/dataMeat2.csv";

/*
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
carregarValoresDropdown(sourceData, "SUBJECT", "locationDropdown1");

*/

//mapa
function filtrarMapa(){
var subjectValor  = document.getElementById('locationDropdown1').value;
d3.csv("./data/dataMeat2.csv").then(function(dados) {
    meatKg = dados.filter(d => d.MEASURE === "KG_CAP" && d.TIME==="2023" && d.SUBJECT === subjectValor);
    var worldData = meatKg.map(function(d) {
        return {
          name: d.name,
          value: parseFloat(d.Value).toFixed(2)
        };
    });
    
    if (subjectValor == 'BEEF') {
      var vMax = 30;
    } else if(subjectValor == 'POULTRY') {
      var vMax = 60;
    } 
    else
    var vMax = 20;

    var myChart = echarts.init(document.getElementById('chartWorld'));
    var option;
    myChart.showLoading();

    fetch('world.json')
    .then(response => response.json())
    .then(geoJson => {
        myChart.hideLoading();
        echarts.registerMap('world', geoJson);
        myChart.setOption(
      
          (option = {
            title: {
              text: 'Kilograms of meat per capita consumed by country in 2023',
            },
            
            aspectScale: 1, // Ajusta a escala para melhor exibição
            tooltip: {
              trigger: 'item',
              formatter: '{b} - {c} (Kg per capita)'
            },
   
            series: [
              {
                type: 'map',
                map: 'world',
                roam: true,
                zoom: 2,
                data: worldData,
                //nameProperty: 'ISO_A3',       
                itemStyle: {
                  areaColor: 'gray',  // Cor de fundo
                  borderColor: 'white', // Cor da borda
                  borderWidth: 1.1,  // Largura da borda
                },
      
              },
            ],

            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'top',
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },

            visualMap: {
              min: 0,
              max: vMax,
              text: ['High', 'Low'],
              inRange: {
                color: ['light blue', '#db0000']
            },
              
              
          },
  
            emphasis: {
              focus: 'self',
              label: {
                show: true
              },
            },
          })  
        );
  })
option && myChart.setOption(option);
});
}
    





