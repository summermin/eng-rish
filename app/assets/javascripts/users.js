$(document).ready(function(){
  $(".twitter_form").submit(function(event){
    event.preventDefault();
    var user = $(".twitter_form #user").val()
    window.location = "/users/"+ user;
  });

   if($('body').is('#users.show')){
    $.ajax({
      url: window.location.pathname + '/get_tweets',
      dataType: "JSON",
      type: "GET"
    }).done(function(dataset){
        var pie = new d3pie("chart", {
          header: {
            title: {
              text: "Your Top 20",
              color: "#000000",
              fontSize: 34,
              font: "courier"
            },
            subtitle: {
              text: "Most commonly used words in Twitter",
              color: "#999999",
              fontSize: 12,
              font: "courier"
            },
            location: "pie-center",
            titleSubtitlePadding: 10
          },
          footer: {
            text: "* taken from the most recent 200 tweets",
            color: "#999999",
            fontSize: 10,
            font: "open sans",
            location: "bottom-left"
          },
          size: {
            canvasWidth: 590,
            pieInnerRadius: "90%",
            pieOuterRadius: "90%"
          },
          data: {
            sortOrder: "label-desc",
            content: [
              {
                label: dataset[0].word,
                value: dataset[0].freq,
                color: "#333333"
              },
              {
                label: dataset[1].word,
                value: dataset[1].freq,
                color: "#838181"
              },
              {
                label: dataset[2].word,
                value: dataset[2].freq,
                color: "#cdcaca"
              },
              {
                label: dataset[3].word,
                value: dataset[3].freq,
                color: "#bd0a0a"
              },
              {
                label: dataset[4].word,
                value: dataset[4].freq,
                color: "#e67272"
              },
              {
                label: dataset[5].word,
                value: dataset[5].freq,
                color: "#2f9de4"
              },
              {
                label: dataset[6].word,
                value: dataset[6].freq,
                color: "#9f25e1"
              },
              {
                label: dataset[7].word,
                value: dataset[7].freq,
                color: "#2122cb"
              },
              {
                label: dataset[8].word,
                value: dataset[8].freq,
                color: "#fbab22"
              },
              {
                label: dataset[9].word,
                value: dataset[9].freq,
                color: "#ee3d97"
              },
              {
                label: dataset[10].word,
                value: dataset[10].freq,
                color: "#c4a1e4"
              },
              {
                label: dataset[11].word,
                value: dataset[11].freq,
                color: "#03b324"
              },
              {
                label: dataset[12].word,
                value: dataset[12].freq,
                color: "#d6ee5e"
              },
              {
                label: dataset[13].word,
                value: dataset[13].freq,
                color: "#75beda"
              },
              {
                label: dataset[14].word,
                value: dataset[14].freq,
                color: "#9debe9"
              },
              {
                label: dataset[15].word,
                value: dataset[15].freq,
                color: "#eb77dc"
              },
              {
                label: dataset[16].word,
                value: dataset[16].freq,
                color: "#599049"
              },
              {
                label: dataset[17].word,
                value: dataset[17].freq,
                color: "#d46f05"
              },
              {
                label: dataset[18].word,
                value: dataset[18].freq,
                color: "#970434"
              },
              {
                label: dataset[19].word,
                value: dataset[19].freq,
                color: "#6c68b8"
              }
            ]
          },
          labels: {
            outer: {
              format: "label-percentage1",
              pieDistance: 20
            },
            inner: {
              format: "none"
            },
            mainLabel: {
              fontSize: 11
            },
            percentage: {
              color: "#999999",
              fontSize: 11,
              decimalPlaces: 0
            },
            value: {
              color: "#cccc43",
              fontSize: 11
            },
            lines: {
              enabled: true,
              color: "#777777"
            },
            truncation: {
              enabled: true
            }
          },
          effects: {
            pullOutSegmentOnClick: {
              effect: "linear",
              speed: 400,
              size: 8
            }
          },
          misc: {
            colors: {
              segmentStroke: "#000000"
            }
          }
        });
      });
   }
})