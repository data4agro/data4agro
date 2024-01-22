
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
            nameProperty : 'NAME',
            aspectScale: 1, // Ajusta a escala para melhor exibição
            tooltip: {
              trigger: 'item',
              formatter: '{c}( Kg per capita)'
            },
  
            visualMap: {
              min: 0,
              max: 20,
              text: ['High', 'Low'],
              inRange: {
                color: ['light blue', 'red']
              },
            
            },
            
            series: [
              {
                type: 'map',
                map: 'world',
                data: worldData,       
                itemStyle: {
                  areaColor: 'white',  // Cor de fundo
                  borderColor: 'black', // Cor da borda
                  borderWidth: 1,  // Largura da borda
                },
      
              },
            
            ],
  
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





