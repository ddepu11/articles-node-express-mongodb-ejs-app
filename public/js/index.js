const form = document.querySelector("form"),
  titleEl = document.getElementById("title"),
  relatedToEl = document.getElementById("relatedTo"),
  bodyEl = document.getElementById("body"),
  inputEl = document.querySelectorAll("input"),
  titleMsg = document.getElementById("titleMsg"),
  relatedToMsg = document.getElementById("relatedToMsg"),
  bodyMsg = document.getElementById("bodyMsg"),
  responseMsgEl = document.querySelector(".message");

let titleErrFlag,
  bodyErrFlag,
  relatedToErrFlag = false;

//Event Listenerts
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleEl.value.trim();
  const relatedTo = relatedToEl.value.trim();
  const body = bodyEl.value.trim();

  validateTheForm(title, relatedTo, body);

  if (
    titleErrFlag === false &&
    bodyErrFlag === false &&
    relatedToErrFlag === false
  ) {
    // console.log(titleErrFlag, bodyErrFlag, relatedToErrFlag);
    createArticleRequest(title, relatedTo, body);
  }
});

// Post Request to create an article
async function createArticleRequest(title, relatedTo, body) {
  const article = JSON.stringify({ title, relatedTo, body });
  try {
    const res = await fetch("/article/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: article,
    });

    const { ok, redirect, msg } = await res.json();

    if (ok) {
      showErrorMsg("Successfully added an article", responseMsgEl, "success");
      setInterval(() => (window.location.href = redirect), 3000);
    } else {
      showErrorMsg(`An Error Occured: ${msg.trim()}`, responseMsgEl, "error");
      setInterval(() => {
        responseMsgEl.innerText = ``;
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  }
}

// Validating Form
function validateTheForm(title, relatedTo, body) {
  if (title === null || title === "") {
    showErrorMsg("Title can't be empty", titleMsg);
    titleErrFlag = true;
  } else if (title.length < 5) {
    showErrorMsg("Title's length's should be at least 10 ", titleMsg);
    titleErrFlag = true;
  } else {
    titleErrFlag = false;
  }

  if (relatedTo === null || relatedTo === "") {
    showErrorMsg("Related to can't be empty", relatedToMsg);
    relatedToErrFlag = true;
  } else if (relatedTo.length > 20 || relatedTo.length < 2) {
    showErrorMsg(
      "Related to length cant't be less then 2 and greter then 20 ",
      relatedToMsg
    );
    relatedToErrFlag = true;
  } else {
    relatedToErrFlag = false;
  }

  if (body === null || body === "") {
    showErrorMsg("Body can't be empty", bodyMsg);
    bodyErrFlag = true;
  } else if (body.length < 50) {
    showErrorMsg("Body's length should be at least 50", bodyMsg);
    bodyErrFlag = true;
  } else {
    bodyErrFlag = false;
  }
}

//Show errors function
function showErrorMsg(msg, el, classToAdd = "error") {
  el.innerText = msg;
  el.classList.add(classToAdd);
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
