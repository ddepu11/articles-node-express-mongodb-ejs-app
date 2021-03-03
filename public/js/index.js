const deleteBtn = document.querySelectorAll(".delete-btn");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const container = document.querySelector(".tobehide");
const menu = document.querySelector(".menubar");
const innerDiv = document.querySelector(".inner");
const outerDiv = document.querySelector(".outer");

//tav menu
menu.addEventListener("click", () => {
  const height = innerDiv.clientHeight;

  if (outerDiv.clientHeight === 0) {
    outerDiv.style.height = `${height}px`;
  } else {
    outerDiv.style.height = `0px`;
  }
  // if (outerDiv.clientHeight !== 0) {
  //   outerDiv.style.height = `0px`;
  // }
});

// Search by keyword
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const keyword = search.value.trim();
  search.value = "";

  try {
    const res = await fetch(`/article/search/q=${keyword}`);
    const { ok, articles } = await res.json();
    if (ok) {
      container.innerText = "";
      const section = document.createElement("section");
      section.classList.add("articles-div");
      // console.log(articles);
      let data = ``;

      await articles.forEach((a) => {
        const time = new Date(a.createdAt).toLocaleString("gu-IN", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const date = new Date(a.createdAt);
        const d = date.getDate();
        const m = date.getMonth();
        const y = date.getFullYear();

        data += `<a href="/article/${a._id}/${a.views}">
              <div class="r-article card" data-id="${a._id} ">
                <button class="delete-btn" data-id="${a._id}">
                  Delete
                </button>
                <img
                  src="https://source.unsplash.com/random/30${Math.floor(
                    Math.random() * 9
                  )}*30${Math.floor(Math.random() * 9)}"
                />

                <div class="r-article-info">
                  <span>${a.relatedTo}</span>
                  <span>${d}-${m}-${y} ${time}</span>
                  <p> ${a.title} </p>
                </div>
              </div>
            </a>`;
      });

      section.innerHTML = data;
      container.appendChild(section);
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete an article
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const id = btn.dataset.id;

    try {
      const res = await fetch(`/article/delete/${id}`, {
        method: "DELETE",
      });

      const { redirect, ok } = await res.json();

      if (ok) {
        alert("Article Deleted!!!");
        setTimeout(() => {
          window.location.href = redirect;
        }, 1000);
      } else {
        alert("Could not delete article!!!");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
