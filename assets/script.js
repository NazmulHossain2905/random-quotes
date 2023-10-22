function initialApp() {
  const categories = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communication",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success",
  ];

  const categoriesWrapper = document.querySelector(".categories-wrapper");

  const displayCategories = () => {
    const createListItem = categories.map((category, index) => {
      if (index === 0)
        return `<li class="category category--active">${category}</li>`;
      return `<li class="category">${category}</li>`;
    });

    categoriesWrapper.innerHTML = createListItem.join(" ");
  };

  displayCategories();

  // active category
  const activeCategory = (e) => {
    const allCategoriesItem = document.querySelectorAll(".category");

    if (e.target.matches(".category")) {
      allCategoriesItem.forEach((category) => {
        category.classList.remove("category--active");
      });

      e.target.classList.add("category--active");
    }
  };

  // category on click handle
  categoriesWrapper.addEventListener("click", (e) => {
    activeCategory(e);

    const category = e.target.innerText.toLowerCase();
    getQuotes(category).then((jsonQuotes) => displayQuotes(jsonQuotes));
  });

  const getQuotes = (category) => {
    const loading = document.querySelector(".loading-container");
    const LIMIT = Math.floor(Math.random() * 10 + 1);

    loading.style.display = "flex";

    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": "yIg7WOE3dc9kD8JlTWOpTQ==0ks6Xw78XP28vNeO",
      },
      contentType: "application/json",
    };

    const URL = `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=${LIMIT}`;

    return fetch(URL, options)
      .then((res) => {
        if (res.ok) {
          loading.style.display = "none";
          return res.json();
        }

        throw new Error("Something went wrong 😭");
      })
      .catch((err) => {
        loading.style.display = "none";
        console.log(err);
      });
  };

  const generateQuote = (quote) => {
    return `<div class="quote__card">
          <img
            src="./assets/images/quote-left.png"
            alt="Quote"
            class="quote__img quote__img--left"
          />

          <h4 class="quote__text">
            ${quote.quote}
          </h4>

          <img
            src="./assets/images/quote-right.png"
            alt="Quote"
            class="quote__img quote__img--right"
          />

          <div class="quote__author-wrapper">
            <div class="quote__author-line"></div>

            <p class="quote__author-name">${quote.author}</p>
          </div>
        </div>`;
  };

  const displayQuotes = (allQuotes) => {
    const quotesContainer = document.querySelector(".quotes");
    const createQuotes = allQuotes.map((quote) => generateQuote(quote));
    quotesContainer.innerHTML = createQuotes.join(" ");
  };

  getQuotes(categories[0]).then((jsonQuotes) => displayQuotes(jsonQuotes));

  // getQuotes().then((json) => console.log(json));

  // "https://api.api-ninjas.com/v1/quotes?category=" + category + "&limit=10"
}

window.onload = initialApp();
