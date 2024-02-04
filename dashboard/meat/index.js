
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


//Top and Bottom
function filter4Top10() {
  var subjectValor2 = document.getElementById('locationTop10Chart').value;
  d3.csv('dataMeat2.csv').then(function(dados) {
      // Filtrar os dados
      var top10 = dados
          .filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor2)
          .map(d => ({ LOCATION: d.LOCATION, Value: parseFloat(d.Value).toFixed(2), NAME:d.name  }))
          .sort((a, b) => b.Value - a.Value)
          .slice(0, 10);

      var less10 = dados
          .filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor2)
          .map(d => ({ LOCATION: d.LOCATION, Value: parseFloat(d.Value).toFixed(2), NAME:d.name }))
          .sort((b, a) => b.Value - a.Value)
          .slice(0, 10);
  
          var chartDom = document.getElementById('chartTop');
          var myChart = echarts.init(chartDom);
          var option; 
          
          option = {
          
            yAxis: {
              type: 'category',
              data: top10.map(item => item.LOCATION),
              inverse: true,


            },
            xAxis: {
              type: 'value',
              show:false,
            },
            tooltip: {
              trigger: 'item',
              formatter: function(params) {
                var tooltipText = top10[params.dataIndex].NAME+ '<br/>'+ params.value + ' kg per capita' +'<br/>';
                return tooltipText;
              }


            },
            series: [
              {
                data: top10.map(item => ({
                  value: parseFloat(item.Value),
                  itemStyle: {
                    color: parseFloat(item.Value) === Math.max(...top10.map(item => parseFloat(item.Value))) ? '#860000' : ' #edbbbb',
                    borderRadius: [0, 5, 5, 0],
                  }
                })),
                type: 'bar',
                barWidth: '50%'
              },
            ]       
          };
          option && myChart.setOption(option);

          var chartDom = document.getElementById('chartLess');
          var myChart = echarts.init(chartDom);
          var option; 
          option = {
            yAxis: {
              type: 'category',
              data: less10.map(item => item.LOCATION),
              inverse: true
            },
            xAxis: {
              type: 'value',
              show:false,
            },
            tooltip: {
              trigger: 'item',
              formatter: function(params) {
                var tooltipText = less10[params.dataIndex].NAME+ '<br/>'+ params.value + ' kg per capita' +'<br/>';
                return tooltipText;
              }
            },
            series: [
              {
                data: less10.map(item => ({
                  value: parseFloat(item.Value),
                  itemStyle: {
                    color: parseFloat(item.Value) === Math.min(...less10.map(item => parseFloat(item.Value))) ? '  #548caa ' : '#c3d9e5',
                    borderRadius: [0, 5, 5, 0]
                  }
                })),
                type: 'bar',
                barWidth: '50%'
                
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
    .filter(d => d.MEASURE === "KG_CAP" && d.LOCATION === locationValor &&d.TIME >='1991')
    .map(d => ({ name: d.name, Value: parseFloat(d.Value).toFixed(2), SUBJECT:d.SUBJECT, TIME:d.TIME}))
    console.log(profile);
    
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
      emphasis: {
        focus: 'series'
      },

      legend: {
        show: true
      },
      
      xAxis: {
        type: 'category',
        data: beef.map(d=>d.TIME)
      },
      yAxis:{
        type: 'value',

      },
      tooltip: {
        trigger: 'axis',
        showContent: true,
        order: 'valueDesc',
        
      },

      series:
      [
        {
          data: beef.map(d=> d.Value),
          type: 'line',
          name: 'Beef',
          color:'#860000',
          showSymbol: false,

        },
        {
          data: poultry.map(d=> d.Value),
          type: 'line',
          name: 'Poultry',
          color: '#f5ae09',
          showSymbol: false, 
        },
        {
          data: pig.map(d=> d.Value),
          type: 'line', 
          name:'Pig',
          color:'#ffa9a9',
          showSymbol: false,
        },
        {
          data: sheep.map(d=> d.Value),
          type: 'line', 
          name: 'Sheep',
          color: '#67a0ec',
          showSymbol: false,
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
        legend: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: country1.map(d=>d.TIME)
        },
        yAxis:{
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          showContent: true,
          order: 'valueDesc', 
        },
        series:[
          {
            data: country1.map(d=> d.Value),
            name: locationValor2,
            type: 'line',
            showSymbol: false,
            color:'#860000',
          },
          {
            data: country2.map(d=> d.Value),
            name: locationValor3,
            type: 'line', 
            showSymbol: false,
            color: '#f5ae09',
          },

        ]
      });
    option && myChart.setOption(option);
  })
}
  
//Calculator
function calculator(){
  var nMeat = (document.getElementById('sliderValue').value)*0.17;
  var subjectValor3 = document.getElementById('subjectDropdown3').value;
  var you = {LOCATION:"YOU",Value:nMeat, NAME:"YOU"};
  d3.csv('dataMeat2.csv').then(function(dados) {
    var steakCalculator = dados
        .filter(d => d.MEASURE === "KG_CAP" && d.TIME === "2023" && d.SUBJECT === subjectValor3)
        .map(d => ({ NAME:d.name, LOCATION: d.LOCATION, Value: parseFloat((d.Value)/52).toFixed(2)}))

    steakCalculator.push(you)
    
    steakCalculator.sort((b, a) => b.Value - a.Value)
    console.log(steakCalculator);



    var chartDom = document.getElementById('chartCalculator');
          var myChart = echarts.init(chartDom);
          var option; 
          option = {
            yAxis: {
              type: 'category',
              data: steakCalculator.map(d => d.LOCATION)
            },
            xAxis: {
              type: 'value'
            },
            /*
           series:[
            {
              data: steakCalculator.map(d => d.Value),
              type: 'bar'
            }
           ]
           */
           tooltip: {
            trigger: 'item',
            formatter: function(params) {
              var tooltipText = steakCalculator[params.dataIndex].NAME+ '<br/>'+ params.value + ' kg per capita' +'<br/>';
              return tooltipText;
            }
          },
           series: [
            {
              data: steakCalculator.map(item => ({
                value: parseFloat(item.Value),
                itemStyle: {
                color: item.LOCATION === 'YOU' ? '#860000' : '#c3d9e5',
                borderRadius: [0, 5, 5, 0],
                }
              })),
              type: 'bar',
              barWidth: '50%'
            },
          ]   

          };
          option && myChart.setOption(option);

  })

}
  
