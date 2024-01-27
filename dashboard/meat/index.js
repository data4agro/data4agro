
  // Get the Sidebar
  var mySidebar = document.getElementById("mySidebar");

  // Get the DIV with overlay effect
  var overlayBg = document.getElementById("myOverlay");

  // Toggle between showing and hiding the sidebar, and add overlay effect
  function w3_open() {
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
      overlayBg.style.display = "none";
    } else {
      mySidebar.style.display = 'block';
      overlayBg.style.display = "block";
    }
  }
  // Close the sidebar with the close button
  function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  }


/*
    window.addEventListener('resize', function() {
        myChart.resize();
      });

*/
//Slider
function updateValue() {
  var slider = document.getElementById("slider");
  var output = document.getElementById("sliderValue");
  output.innerHTML = slider.value;
}

//Mapa
function filter4Map() {
    // Cache de dados para evitar leitura do arquivo CSV a cada chamada
    var subjectValor = document.getElementById('subjectMap').value;
    d3.csv("dataMeat2.csv").then(function (dados) {
      meatKg =
      dados.filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor)
      .map(function (d) {
        return {
          name: d.name,
          value: parseFloat(d.Value).toFixed(2)
        };
      });
    console.log(meatKg);
  });

  if (subjectValor == 'BEEF') {
    var vMax = 30;
  } else if(subjectValor == 'POULTRY') {
    var vMax = 60;
  } 
  else
  var vMax = 20;

  
  var myChart = echarts.init(document.getElementById('chartMap'));
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
                  zoom: 3,
                  data: meatKg,
                  nameProperty: 'name',       
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

}

//Top and Bottom
function filter4Top10() {
  var subjectValor2 = document.getElementById('locationTop10Chart').value;
  d3.csv('dataMeat2.csv').then(function(dados) {
      // Filtrar os dados
      var top10 = dados
          .filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor2)
          .map(d => ({ LOCATION: d.LOCATION, Value: parseFloat(d.Value).toFixed(2) }))
          .sort((a, b) => b.Value - a.Value)
          .slice(0, 10);

      var less10 = dados
          .filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor2)
          .map(d => ({ LOCATION: d.LOCATION, Value: parseFloat(d.Value).toFixed(2) }))
          .sort((b, a) => b.Value - a.Value)
          .slice(0, 10);

          var chartDom = document.getElementById('chartTop');
          var myChart = echarts.init(chartDom);
          var option; 
          option = {
            xAxis: {
              type: 'category',
              data: top10.map(d => d.LOCATION)
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: top10.map(d => d.Value),
                type: 'bar',
                showBackground: true,
                color:'#860000',
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          };
          option && myChart.setOption(option);

          var chartDom = document.getElementById('chartLess');
          var myChart = echarts.init(chartDom);
          var option; 
          option = {
            xAxis: {
              type: 'category',
              data: less10.map(d => d.LOCATION)
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: less10.map(d => d.Value),
                type: 'bar',
                showBackground: true,
                color:'#ADD8E6',
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          };
          
          option && myChart.setOption(option);   
  });
}
  
//Profile
function filterProfile(){
  var locationValor = document.getElementById('locationDropdown1').value;
  d3.csv('dataMeat2.csv').then(function(dados) {
    var profile = dados
    .filter(d => d.MEASURE === "KG_CAP" && d.LOCATION === locationValor)
    .map(d => ({ name: d.name, Value: parseFloat(d.Value).toFixed(2), SUBJECT:d.SUBJECT, TIME:d.TIME}))
    
    
    var beef = profile
    .filter(d=>d.SUBJECT=='BEEF')

    var poultry = profile
    .filter(d=>d.SUBJECT=='POULTRY')

    var pig = profile
    .filter(d=>d.SUBJECT=='PIG')

    var sheep = profile
    .filter(d=>d.SUBJECT=='SHEEP')

    console.log(beef);

  var chartDom = document.getElementById('chartProfile');
  var myChart = echarts.init(chartDom);
  myChart.setOption(
    option={
      xAxis: {
        type: 'category',
        data: beef.map(d=>d.TIME)
      },
      yAxis:{
        type: 'value'
      },
      series:[
        {
          data: beef.map(d=> d.Value),
          type: 'line'
        },
        {
          data: poultry.map(d=> d.Value),
          type: 'line', 
        },
        {
          data: pig.map(d=> d.Value),
          type: 'line', 
        },
        {
          data: sheep.map(d=> d.Value),
          type: 'line', 
        }
      ]

    });
  option && myChart.setOption(option);
  });
}
  
//Comparison
function filterComparison(){
  var subjectValor2 = document.getElementById('subjectDropdown2').value;
  var locationValor2 = document.getElementById('locationDropdown2').value;
  var locationValor3 = document.getElementById('locationDropdown3').value;
  d3.csv('dataMeat2.csv').then(function(dados) {
    var country1 = dados
    .filter(d=> d.MEASURE === "KG_CAP" && d.LOCATION == locationValor2 && d.SUBJECT == subjectValor2)
    .map(d => ({ name: d.name, Value: parseFloat(d.Value).toFixed(2), TIME:d.TIME}))

    var country2 = dados
    .filter(d=> d.MEASURE === "KG_CAP" && d.LOCATION == locationValor3 && d.SUBJECT == subjectValor2)
    .map(d => ({ name: d.name, Value: parseFloat(d.Value).toFixed(2), TIME:d.TIME}))

    var chartDom = document.getElementById('chartComparison');
    var myChart = echarts.init(chartDom);
    myChart.setOption(
      option={
        xAxis: {
          type: 'category',
          data: country1.map(d=>d.TIME)
        },
        yAxis:{
          type: 'value'
        },
        series:[
          {
            data: country1.map(d=> d.Value),
            type: 'line'
          },
          {
            data: country2.map(d=> d.Value),
            type: 'line', 
          },

        ]
      });
    option && myChart.setOption(option);
  })
}
  
//Calculator
