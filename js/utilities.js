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
const fetchData = (url, displayData) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
// display data function
const displayNews = (news) => {
  console.log(news);
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
const toggleActiveClass = (isActive) => {
  const loading = document.getElementById("loading");
  if (isActive) {
    loading.classList.add("activeCat");
  } else {
    loading.classList.remove("activeCat");
  }
};
