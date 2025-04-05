function searchRecipes() {
    var type = document.getElementById("searchType").value;
    var input = document.getElementById("searchInput").value.trim();
  
    if (!input) {
      alert("Please enter a value to search.");
      return;
    }
  
    var url = "";
  
    if (type === "name") {
      url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
    } else if (type === "letter") {
      if (input.length !== 1 || !/^[a-zA-Z]$/.test(input)) {
        alert("Please enter only one alphabet letter (A-Z).");
        return;
      }
      url = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + input.toLowerCase();
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        showResults(data.meals);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }
  
  function showResults(meals) {
    var grid = document.getElementById("recipeGrid");
    grid.innerHTML = "";
  
    if (!meals) {
      grid.innerHTML = `<p class="no-results">No meals found.</p>`;
      return;
    }
  
    meals.forEach(meal => {
      var card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
      `;
  
      grid.appendChild(card);
    });
  }
  