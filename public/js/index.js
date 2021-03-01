const deleteBtn = document.querySelectorAll(".delete-btn");

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
