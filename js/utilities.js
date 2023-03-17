// current data array
let currentdataArr = [];

// get value function
const getValue = (id) => {
  const element = document.getElementById(id);
  const value = element.innerText;
  return value;
};
// set set value funtion
const setValue = (id, value) => {
  const element = document.getElementById(id);
  element.innerText = value;
};

// fetch data function
const fetchData = (url, displayData, sortby = "default") => {
  toggleLoading(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data, sortby);
    });
};

// display news categories function
const displayCategoryNews = (newsCatobj, sortby) => {
  const newsCatArr = newsCatobj.news_category;

  const newsCatContainer = document.getElementById("categoryNews-container");
  newsCatContainer.innerHTML = "";

  //   loop through each
  for (const newsCat of newsCatArr) {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsCat.category_id}`;
    const newsCatDiv = document.createElement("div");
    newsCatDiv.classList.add("d-inline-block");
    newsCatDiv.classList.add("mb-1");
    newsCatDiv.innerHTML = `
    <a class="category text-decoration-none text-grey mx-2 p-1 rounded" id="cat-${newsCat.category_id}" href="#" onclick="categoriesClick(${newsCat.category_id})">${newsCat.category_name}</a>
    `;
    newsCatContainer.appendChild(newsCatDiv);
  }
};

// display News function
const displayNews = (newsArr, sortby) => {
  currentdataArr = newsArr;
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  // sortby
  if (sortby == "view") {
    newsArr.sort((a, b) => b.total_view - a.total_view);
  } else if (sortby == "todaysPick") {
    const newsArrFilter = newsArr.filter((el) => el.others_info.is_todays_pick == true);
    newsArr = newsArrFilter;
  } else {
    newsArr.sort((a, b) => a.total_view - b.total_view);
  }

  //   not found
  if (newsArr.length === 0) {
    toggleNotFound(true);
    toggleLoading(false);
    setValue("data-num", newsArr.length);
  } else {
    setValue("data-num", newsArr.length);
    toggleNotFound(false);
  }

  //   loop through each
  for (const news of newsArr) {
    // console.log(news._id);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.classList.add("col-md-11");
    newsDiv.classList.add("mx-auto");

    newsDiv.innerHTML = `
    <div class="card p-2 border-0 shadow" onclick="displayDetailsModal('${news._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <div class="row g-0">
        <div class="col-md-4 my-auto">
          <img src="${news.thumbnail_url}" class="w-100 rounded-4" alt="..." style="max-height: 320px" />
        </div>
        <div class="col-md-8 my-auto">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-3">${news.title}</h5>
            <p class="card-text">${news.details.slice(0, 130)}</p>
            <p class="card-text d-none d-md-block">${news.details.slice(131, 260)}...</p>
            <div class="d-flex justify-content-between align-items-center flex-wrap mt-4">
              <div class="d-flex">
                <img class="rounded-circle my-auto" src="${news.author.img}" alt="" width="35px" height="35px" />
                <p class="my-auto ms-2">${news.author.name} <br />${news.author?.published_date?.slice(0, 10)}</p>
              </div>
              <p class="my-auto"><i class="fa-solid fa-eye"></i> ${news.total_view}</p>
              ${displayRating(news.rating.number)}
              <button class="btn d-none d-lg-block"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    newsContainer.appendChild(newsDiv);
    toggleLoading(false);
  }
};

// display details model function
const displayDetailsModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;

  console.log(url);

  // fetch
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data.data[0]));

  // display
  const displayModal = (newsDetails) => {
    console.log(newsDetails);
    const newsDetailsLength = newsDetails.details.length;
    document.getElementById("details-img").src = newsDetails.image_url;
    setValue("details-title", newsDetails.title);
    setValue("details-p1", newsDetails.details.slice(0, 200));
    setValue("details-p2", newsDetails.details.slice(201, newsDetailsLength));
    document.getElementById("details-author-img").src = newsDetails.author.img;
    setValue("details-author-name", newsDetails.author.name);
    setValue("details-date", newsDetails.author.published_date.slice(0, 10));
    setValue("details-view", newsDetails.total_view);
    // ${displayRating(news.rating.number)
    document.getElementById("details-rating").innerHTML = `
    ${displayRating(newsDetails.rating.number)}
    `;
  };
};

// display rating function
const displayRating = (num) => {
  const numRounded = Math.round(num);
  if (numRounded === 1) {
    return `
    <div>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
    </div>
    `;
  } else if (numRounded === 2) {
    return `
    <div>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
    </div>
    `;
  } else if (numRounded === 3) {
    return `
    <div>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
    </div>
    `;
  } else if (numRounded === 4) {
    return `
    <div>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-regular fa-star text-warning"></i>
    </div>
    `;
  } else {
    return `
    <div>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
        <i class="fa-solid fa-star text-warning"></i>
    </div>
    `;
  }
};

// toggleLoading function
const toggleLoading = (isShow) => {
  const loading = document.getElementById("loading");
  if (isShow) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};

// toggleActive function for Cat
const toggleActiveClass = (id, isActive) => {
  const activeEl = document.getElementById(`cat-0${id}`);
  if (isActive) {
    activeEl.classList.add("activeCat");
  } else {
    const noActiveEl = document.querySelectorAll(".category");
    noActiveEl.forEach((el) => {
      el.classList.remove("activeCat");
    });
  }
};

// toggleLoading function
const toggleNotFound = (isShow) => {
  const notFound = document.getElementById("not-found");
  if (isShow) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }
};
