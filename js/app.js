//click handler category
const categoriesClick = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  fetchData(url, displayNews);

  //   active category
  toggleActiveClass(id, false);
  toggleActiveClass(id, true);
  const catName = getValue(`cat-0${id}`);
  setValue("category-foundName", catName);
};

// Display news category on load
fetchData("https://openapi.programming-hero.com/api/news/categories", displayCategoryNews);

// Display news on load
fetchData("https://openapi.programming-hero.com/api/news/category/01", displayNews);
