var sourceData = "./data/dataMeat2.csv";
filtrarMapa();


function filtrarMapa() {
  var subjectValor = document.getElementById('locationDropdown1').value;

  // Cache de dados para evitar leitura do arquivo CSV a cada chamada
  if (!filtrarMapa.dadosCache) {
    d3.csv("./data/dataMeat2.csv").then(function (dados) {
      filtrarMapa.dadosCache = dados;
      processarDados(dados, subjectValor);
    });
  } else {
    processarDados(filtrarMapa.dadosCache, subjectValor);
  }
}



function processarDados(dados, subjectValor) {
  meatKg = dados.filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor);
  var worldData = meatKg.map(function (d) {
    return {
      name: d.name,
      value: parseFloat(d.Value).toFixed(2)
    };
  });

  //variavel de valares máximos para cada espécie
  if (subjectValor == 'BEEF') {
    var vMax = 30;
  } else if(subjectValor == 'POULTRY') {
    var vMax = 60;
  } 
  else
  var vMax = 20;


  // Restante do seu código ECharts...
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
                zoom: 2.3,
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

  // ...

  // Chame myChart.setOption() apenas uma vez no final para melhorar o desempenho
  option && myChart.setOption(option);
}






