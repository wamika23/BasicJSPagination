console.log("inside pagination app");

let data;
//console.log(data);
init();
//console.log(data);
async function init() {
  data = await getData();
  console.log(data);
  generateView(data);
}

function getData() {
  let temp = fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => data);
  return temp;
}

function generateView(data) {
  let main = document.querySelector(".main");
  data.map((entry) => {
    var div = document.createElement("div");
    div.innerHTML = `<img src=${entry.image} alt=${entry.title} />`;
    main.insertAdjacentElement("beforeend", div);
  });
}
