
d3.csv("./data/dataMeat2.csv").then(function(dados) {
    meatKg = dados.filter(d => d.MEASURE === "KG_CAP" && d.TIME==="2023" && d.SUBJECT === "BEEF");
    var worldData = meatKg.map(function(d) {
        return {
          name: d.name,
          value: parseFloat(d.Value).toFixed(2)
        };

       
    });

    console.log(worldData);
    var myChart = echarts.init(document.getElementById('chartWorld'),'dark');
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
            
            aspectScale: 0.8, // Ajusta a escala para melhor exibição
            tooltip: {
              trigger: 'item',
              formatter: '{c}( Kg per capita)'
            },
   
            series: [
              {
                type: 'map',
                map: 'world',
                roam: true,
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
              max: 10,
              text: ['High', 'Low'],
            },
              inRange: {
                color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                symbolSize: [30, 100]
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
    
    

 






// Agora você pode usar a variável meatKg fora da função.
// Certifique-se de que a lógica dependente de meatKg está fora do bloco de promessa, 
// pois a leitura do arquivo é assíncrona.





