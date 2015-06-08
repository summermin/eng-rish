$(document).ready(function(){
  $(".twitter_form").submit(function(event){
    event.preventDefault();
    var user = $(".twitter_form #user").val()
    window.location = "/users/"+ user;
  });

   if($('body').is('#users.show')){
    $(".score").hide();
    $("#ego_button").hide()

    $.ajax({
      url: window.location.pathname + '/get_tweets',
      dataType: "JSON",
      type: "GET"
    }).done(function(dataset){
        var score = dataset.avg_length;

        if(score < 5.8){
          $("#bad").show();
        } else if(score >= 5.8 && score <= 6.2){
          $("#okay").show();
        } else if(score > 6.2){
          $("#good").show();
        }

        $(".avg_length").append(score)

        var words = dataset.word_list;
        var donut = new d3pie("donut_chart", {
          header: {
            title: {
              text: "Your Top 20",
              color: "#000000",
              fontSize: 34,
              font: "courier"
            },
            subtitle: {
              text: "most commonly used words on Twitter",
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
                label: words[0].word,
                value: words[0].freq,
                color: "#333333"
              },
              {
                label: words[1].word,
                value: words[1].freq,
                color: "#838181"
              },
              {
                label: words[2].word,
                value: words[2].freq,
                color: "#cdcaca"
              },
              {
                label: words[3].word,
                value: words[3].freq,
                color: "#bd0a0a"
              },
              {
                label: words[4].word,
                value: words[4].freq,
                color: "#e67272"
              },
              {
                label: words[5].word,
                value: words[5].freq,
                color: "#2f9de4"
              },
              {
                label: words[6].word,
                value: words[6].freq,
                color: "#9f25e1"
              },
              {
                label: words[7].word,
                value: words[7].freq,
                color: "#2122cb"
              },
              {
                label: words[8].word,
                value: words[8].freq,
                color: "#fbab22"
              },
              {
                label: words[9].word,
                value: words[9].freq,
                color: "#ee3d97"
              },
              {
                label: words[10].word,
                value: words[10].freq,
                color: "#c4a1e4"
              },
              {
                label: words[11].word,
                value: words[11].freq,
                color: "#03b324"
              },
              {
                label: words[12].word,
                value: words[12].freq,
                color: "#d6ee5e"
              },
              {
                label: words[13].word,
                value: words[13].freq,
                color: "#75beda"
              },
              {
                label: words[14].word,
                value: words[14].freq,
                color: "#9debe9"
              },
              {
                label: words[15].word,
                value: words[15].freq,
                color: "#eb77dc"
              },
              {
                label: words[16].word,
                value: words[16].freq,
                color: "#599049"
              },
              {
                label: words[17].word,
                value: words[17].freq,
                color: "#d46f05"
              },
              {
                label: words[18].word,
                value: words[18].freq,
                color: "#970434"
              },
              {
                label: words[19].word,
                value: words[19].freq,
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
        }); //donut
      
      $("#ego_button").show()

      $("#ego_button").bind("submit", function(event) {
        event.preventDefault();
        $("#donut_chart").empty();
        $("#ego_button").hide()

        var pronouns = dataset.pronoun_list;

        var first_total = 0;
        var second_total = 0;
        var third_total = 0;

        pronouns.forEach(function(pronoun){
          if(pronoun.person === "1st"){
            first_total += pronoun.freq
          } else if(pronoun.person === "2nd"){
            second_total += pronoun.freq
          } else if (pronoun.person === "3rd"){
            third_total += pronoun.freq
          }
        });

        var pie = new d3pie("pie_chart", {
          header: {
            title: {
              text: "Your Ego",
              fontSize: 22,
              font: "verdana"
            },
            subtitle: {
              text: "analyzing the ratio of first person to second & third person pronouns you use",
              color: "#999999",
              fontSize: 10,
              font: "verdana"
            },
            titleSubtitlePadding: 12
          },
          footer: {
            color: "#999999",
            fontSize: 11,
            font: "open sans",
            location: "bottom-center"
          },
          size: {
            canvasHeight: 400,
            canvasWidth: 590,
            pieOuterRadius: "90%"
          },
          data: {
            content: [
              {
                label: "all about me me me",
                value: first_total,
                color: "#c83163"
              },
              {
                label: "yous guys, you're great",
                value: second_total,
                color: "#4fa9b8"
              },
              {
                label: "they crushed it",
                value: third_total,
                color: "#f69618"
              }
            ]
          },
          labels: {
            outer: {
              pieDistance: 32
            },
            inner: {
              format: "percentage"
            },
            mainLabel: {
              font: "verdana"
            },
            percentage: {
              color: "#e1e1e1",
              font: "verdana",
              decimalPlaces: 0
            },
            value: {
              color: "#ffffff",
              font: "verdana"
            },
            lines: {
              enabled: true,
              color: "#cccccc"
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
          }
        });

      });

      }); //.done
   }
})