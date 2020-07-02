const generateBtn = document.querySelector(".generate_btn");
const idCard = document.querySelector(".id_card");
const saveBtn = document.querySelector("#save_btn");
const canvasIdCard = document.getElementById("canvas_id_card");
const loader = document.querySelector(".loader");
const shareIcon = document.querySelector(".share_icon");
const fbBtn = document.querySelector(".fb_btn");

// event listeners
generateBtn.addEventListener("click", generate);
saveBtn.addEventListener("click", save, false);
shareIcon.addEventListener("mouseover", showFacebookIcon);
shareIcon.addEventListener("mouseout", hideFacebookIcon);

// functions
function showFacebookIcon() {
  shareIcon.style.display = "none";
  fbBtn.style.display = "inline-block";
}

function hideFacebookIcon() {
  shareIcon.style.display = "inline-block";
  fbBtn.style.display = "none";
}

function generate() {
  generateBtn.innerHTML = "Generate another";
  loader.style.display = "block";
  canvasIdCard.style.display = "none";
  setTimeout(function () {
    if ((loader.style.display = "block")) {
      loader.style.display = "none";
    }
  }, 1000);
  setTimeout(fetchData, 1000);
}

function fetchData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => createID(data));
}

function createID(data) {
  function randomTime(start, end) {
    let diff = end.getTime() - start.getTime();
    let new_diff = diff * Math.random();
    let date = new Date(start.getTime() + new_diff);
    return date;
  }

  let randomDate = randomTime(
    new Date("31 December 1950 14:48 UTC"),
    new Date("01 January 2002 14:48 UTC")
  )
    .toISOString()
    .slice(0, 10);

  function generateLetters(length = 3) {
    let letters = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      letters += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return letters;
  }

  let randomLetters = generateLetters(3);

  function generateNumbers(length) {
    let numbers = "";
    let characters = "1234567890";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      numbers += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return numbers;
  }

  let randomNumbers = generateNumbers(6);

  let randomIDnumber = `${randomLetters}${randomNumbers}`;

  let number = Math.floor(Math.random() * 20);

  let number2 = Math.floor(Math.random() * 20);

  let number3 = Math.floor(Math.random() * 20);
  let code = `${generateNumbers(3)}-${generateNumbers(2)}-${generateNumbers(
    3
  )}`;

  // creating canvas

  let ctx = canvasIdCard.getContext("2d");
  let bg = document.getElementById("card_bg");
  let pat = ctx.createPattern(bg, "no-repeat");
  ctx.fillStyle = pat;
  ctx.fillRect(0, 0, 370, 230);

  function drawTextForm(string, x, y) {
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.font = "10pt Times New Roman";
    ctx.textAlign = "left";
    ctx.fillText(string, x, y);
  }
  function drawText(string, x, y) {
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.font = "bold 12pt sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(string, x, y);
  }

  drawTextForm("FIRST NAME:", 130, 60);
  drawText(`${data[number].name.toUpperCase()}`, 130, 80);
  drawTextForm("SURNAME:", 130, 100);
  drawText(`${data[number2].surname.toUpperCase()}`, 130, 120);
  drawTextForm(`DATE OF BIRTH:`, 130, 140);
  drawText(`${randomDate} `, 130, 160);
  drawTextForm(`ID NUMBER:`, 250, 170);
  drawText(`${randomIDnumber}`, 250, 190);
  drawTextForm(`${code}`, 265, 140);

  const holo = document.getElementById("holo");
  ctx.drawImage(holo, 260, 60);

  const photo = document.getElementById("id_photo");
  let src = `${data[number3].photo}`;
  photo.src = src;
  photo.src = `${data[number].photo}`;
  photo.onload = () => {
    ctx.drawImage(photo, 20, 60);
  };

  let fontNumber = Math.floor(Math.random() * 5);
  let fonts = [
    "13pt Homemade Apple",
    "15pt Calligraffitti",
    "15pt Nothing You Could Do",
    "12pt Meddon",
    "19pt Reenie Beanie",
  ];

  function drawSignature(txt, font, x, y) {
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.textAlign = "middle";
    ctx.fillStyle = "#000";
    ctx.fillText(txt, x, y);
  }
  // let font = fonts[fontNumber];

  drawSignature(
    `${data[number].name} ${data[number2].surname}`,
    `${fonts[fontNumber]}`,
    30,
    205
  );

  function drawTitle(ctx, txt, font, x, y) {
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.fillStyle = "#a280c280";
    let width = ctx.measureText(txt).width;
    ctx.fillRect(x - 178, y - 5, width + 37, parseInt(font, 25));
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(txt, x, y);
  }

  drawTitle(
    ctx,
    "UNICORN IDENTIFICATION DOCUMENT",
    "13pt Times New Roman",
    180,
    22
  );

  canvasIdCard.style.display = "block";
  saveBtn.style.display = "block";
}

function save() {
  saveBtn.href = canvasIdCard.toDataURL();
  saveBtn.download = "unicorn_id.png";
}

// facebook

document.getElementById("ogBtn").onclick = function () {
  FB.ui(
    {
      display: "popup",
      method: "share_open_graph",
      action_type: "og.likes",
      action_properties: JSON.stringify({
        object: "https://unicorn-dev.pl/generateUnicornID/",
      }),
    },
    function (response) {}
  );
};
