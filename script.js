console.log("inside pagination app");

let data;
let current_page = 1;
let records_per_page = 3;

init();
async function init() {
  data = await getData();
  console.log(data);
  //Initial for generating whole data on screen at once
  //generateView(data);
  changePage(1);
}

function getData() {
  let temp = fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => data);
  return temp;
}

//Initial for generating whole data on screen at once
/*
function generateView(data) {
  let main = document.querySelector(".main");
  data.map((entry) => {
    var div = document.createElement("div");
    div.innerHTML = `<img src=${entry.image} alt=${entry.title} />`;
    main.insertAdjacentElement("beforeend", div);
  });
}
*/

function generateView(data, start, end) {
  let main = document.querySelector(".main");
  main.innerHTML = "";
  for (let i = start; i < end; i++) {
    if (data[i]) {
      let div = document.createElement("div");
      div.innerHTML = `<img src=${data[i].image} alt=${data[i].title} />`;
      main.insertAdjacentElement("beforeend", div);
    }
  }
}

function changePage(page) {
  let btn_next = document.querySelector("#next");
  let btn_prev = document.querySelector("#prev");

  //Validate Page
  if (page < 1) {
    page = 1;
  }
  if (page > totalNumOfPages()) {
    page = totalNumOfPages();
  }

  let start = (page - 1) * records_per_page;
  let end = page * records_per_page;
  generateView(data, start, end);

  if (page === 1) {
    //btn_prev.style.visibility = "hidden";
    btn_prev.style.disabled = true;
    btn_prev.classList.add("disabled");
  } else {
    btn_prev.style.disabled = false;
    btn_prev.classList.remove("disabled");
    //btn_prev.style.visibility = "visible";
  }

  if (page === totalNumOfPages()) {
    //btn_next.style.visibility = "hidden";
    btn_next.style.disabled = true;
    btn_next.classList.add("disabled");
  } else {
    btn_next.style.disabled = false;
    btn_next.classList.remove("disabled");
    //btn_next.style.visibility = "visible";
  }
}

function goToPrev() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function goToNext() {
  if (current_page < totalNumOfPages()) {
    current_page++;
    changePage(current_page);
  }
}

function totalNumOfPages() {
  return Math.ceil(data.length / records_per_page);
}
