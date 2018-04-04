$(document).ready(function() {

// List of Words only

var List1 = ["cat apple","dog watermelon","mouse grape","squirrel rasin","bird orange","cat bird","squirrel cat","eagle goat"]

var btnDiv = document.getElementById("itemButtons");
var main = $("body");

// We are using another method from jQuery called "find" which scans our DOM tree for what we ask
// See ... D:\UCLABootCamp\04-jquery\01-Activities\11-FridgeGame
var btns = main.find('#itemButtons');

document.getElementById("demo0").innerHTML = List1;

// Looping to create a button for each array item in List:
    $.each(List1 , function (index, value) {
        console.log(index + ':' + value);
        var aniFruit = $("<button>");
        aniFruit.addClass("brand-button-color btn btn-info getbutton");
        aniFruit.attr("id", "api-brand");
        aniFruit.attr("data-api-brand", value);
        aniFruit.prop("type", "button");
        aniFruit.text(value);
        btns.append(aniFruit);
    });


// add a new button based on text input box and submit click
// ??how to check if blank??

    $("body").on("click", "#addItem", function () {
      
      //var tc = $(this).closest("form").find("input[id='item-input']").val().trim(); 
      //var tc = $("#item-input").val().trim();
      var tc = document.getElementById("item-input").value
      console.log("this is " + tc);
      // var inputArtist = $("#artist-input").val().trim(); //06-11
      // if (tc == "") {
      //   return
      // }

      var aniFruit = $("<button>"); 
      aniFruit.addClass("brand-button-color btn btn-info getbutton");
      aniFruit.attr("id", "api-brand");
      aniFruit.attr("data-api-brand", tc); 
      aniFruit.prop("type", "button");
      aniFruit.text(tc);
      btns.append(aniFruit);
      console.log('test',tc);
      return false;            // is this needed?
   //  event.preventDefault(); where does this go?
             
    });

 // pciking a button from list


// Event listener for all button elements
$("body").on("click", ".getbutton", function() {

  // In this case, the "this" keyword refers to the button that was clicked
  var person = $(this).attr("data-api-brand");
  console.log(person);

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(person);
  
    $("#gifs-appear-here").empty();

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;
          console.log(results);
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var personImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height_still.url);
          personImage.attr("data-animated", results[i].images.fixed_height.url);
          personImage.attr("data-still", results[i].images.fixed_height_still.url);
          personImage.attr("data-state", "still");
          personImage.addClass("giphy-img");
          

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});




//lastbelow //
});

$(document).on("click", ".giphy-img", function() {
  var state = $(this).attr("data-state");
  var animatedImage = $(this).attr("data-animated");
  var stillImage = $(this).attr("data-still");

  if (state == "still") {
    $(this).attr("src", animatedImage)
    $(this).attr("data-state", "animated")
  }

  if (state == "animated") {
    $(this).attr("src", stillImage)
    $(this).attr("data-state", "still")
  }
})




