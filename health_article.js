var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

var url = "./health_article.json"; // URL of the JSON file

xhr.open("GET", url, true); // Initialize a GET request

xhr.responseType = "json"; // Set the expected response type to JSON

xhr.onload = function () {
  if (xhr.status === 200) {
    // Ensure the request was successful
    // Define the onload callback function
    var articles = xhr.response.articles; // Get the articles array from the response
    var articlesDiv = document.getElementById("articles"); // Get the div where articles will be displayed

    articles.forEach(function (article) {
      var articleDiv = document.createElement("div");
      articleDiv.classList.add("article");

      var title = document.createElement("h2");
      title.textContent = article.title;

      var description = document.createElement("p");
      description.textContent = article.description;

      var waysHeader = document.createElement("h3");
      waysHeader.textContent = "Ways to Achieve:";

      var waysList = document.createElement("ul");
      article.ways_to_achieve.forEach(function (way) {
        var listItem = document.createElement("li");
        listItem.textContent = way;
        waysList.appendChild(listItem);
      });

      var benefitsHeader = document.createElement("h3");
      benefitsHeader.textContent = "Benefits:";

      var benefitsList = document.createElement("ul");
      article.benefits.forEach(function (benefit) {
        var listItem = document.createElement("li");
        listItem.textContent = benefit;
        benefitsList.appendChild(listItem);
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(description);
      articleDiv.appendChild(waysHeader);
      articleDiv.appendChild(waysList);
      articleDiv.appendChild(benefitsHeader);
      articleDiv.appendChild(benefitsList);

      articlesDiv.appendChild(articleDiv);
    });
  } else {
    console.error("Failed to load articles: " + xhr.status);
  }
};

xhr.send(); // Send the request to fetch the JSON data
