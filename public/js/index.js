const form = document.querySelector("form"),
  titleEl = document.getElementById("title"),
  relatedToEl = document.getElementById("relatedTo"),
  bodyEl = document.getElementById("body"),
  inputEl = document.querySelectorAll("input"),
  titleMsg = document.getElementById("titleMsg"),
  relatedToMsg = document.getElementById("relatedToMsg"),
  bodyMsg = document.getElementById("bodyMsg");

//Event Listenerts
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleEl.value.trim();
  const relatedTo = relatedToEl.value.trim();
  const body = bodyEl.value.trim();

  validateTheForm(title, relatedTo, body);
  console.log(body.length);
});

function validateTheForm(title, relatedTo, body) {
  if (title === null || title === "") {
    showErrorMsg("Title can't be empty", titleMsg);
  } else if (title.length < 5) {
    showErrorMsg("Title's length's should be at least 10 ", titleMsg);
  }

  if (relatedTo === null || relatedTo === "") {
    showErrorMsg("Related to can't be empty", relatedToMsg);
  } else if (relatedTo.length > 20 || relatedTo.length < 2) {
    showErrorMsg(
      "Related to length cant't be less then 2 and greter then 20 ",
      relatedToMsg
    );
  }

  if (body === null || body === "") {
    showErrorMsg("Body can't be empty", bodyMsg);
  } else if (body.length < 50) {
    showErrorMsg("Body's length should be at least 50", bodyMsg);
  }
}

//Show errors function
function showErrorMsg(msg, el) {
  el.innerText = msg;
  el.classList.add("error");
}

// Remove error msg when you type
inputEl.forEach((input) => {
  input.addEventListener("input", (e) => {
    const id = input.id + "Msg";
    const span = document.getElementById(id);
    span.classList.remove("error");
  });
});
// Same as above
bodyEl.addEventListener("input", () => {
  bodyMsg.classList.remove("error");
});

//  action="/article/create"
