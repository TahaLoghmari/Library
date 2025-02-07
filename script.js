let btn = document.querySelector(".First");
let submit = document.querySelector(".Second");
let form = document.querySelector(".hidden");
let container = document.querySelector(".container");
let x = document.querySelector(".top svg");
let Books = document.querySelector(".books");
class Library {
  constructor() {
    this.collection = [];
  }
  AddBook(title, author, pages, read) {
    this.collection.push(new Book(title, author, pages, read));
  }
  ShowBooks() {
    Books.innerHTML = "";
    for (let i = 0; i < this.collection.length; ++i)
      this.collection[i].ShowBook(i);
  }
}
class Book {
  constructor(t, a, n, r) {
    this.title = t;
    this.author = a;
    this.nbPages = n;
    this.read = r;
  }
  ShowBook(i) {
    let Book = document.createElement("div");
    Book.classList.add("book");
    let title = document.createElement("p");
    title.innerHTML = this.title;
    let author = document.createElement("p");
    author.innerHTML = this.author;
    let nbPages = document.createElement("p");
    nbPages.innerHTML = this.nbPages + " Pages";
    let group = document.createElement("div");
    let status = document.createElement("button");
    status.innerHTML = this.read ? "Read" : "Not Read";
    if (this.read) status.classList.add("bookButtonRead");
    else status.classList.add("bookButtonNotRead");
    let trash = document.createElement("button");
    trash.classList.add("trashButton");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("style", "height:30px;");
    svg.classList.add("size-6");
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute(
      "d",
      "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    );
    svg.appendChild(path);
    trash.appendChild(svg);
    Book.appendChild(title);
    Book.appendChild(author);
    Book.appendChild(nbPages);
    trash.addEventListener("click", (e) => {
      myLibrary.collection.splice(i, 1);
      myLibrary.ShowBooks();
    });
    status.addEventListener("click", () => {
      status.classList.toggle("bookButtonNotRead");
      status.classList.toggle("bookButtonRead");
      if (status.classList.contains("bookButtonNotRead"))
        status.innerHTML = "Not Read";
      else status.innerHTML = "Read";
    });
    group.appendChild(status);
    group.append(trash);
    group.classList.add("miniContainer");
    Book.append(group);
    Books.appendChild(Book);
  }
}
let myLibrary = new Library();
myLibrary.AddBook("Deep Work", "Cal Newport", 202, true);
myLibrary.AddBook("Dopamine Nation", "Anna Lembke", 204, false);
myLibrary.ShowBooks();
function Toggle() {
  form.classList.toggle("hidden");
  form.classList.toggle("form");
  container.classList.toggle("blur");
}
btn.addEventListener("click", (e) => {
  Toggle();
});
submit.addEventListener("click", (e) => {
  let t = document.querySelector("#title");
  let a = document.querySelector("#author");
  let n = document.querySelector("#pages");
  let r = document.querySelector("#read");
  if (!t.checkValidity() || !a.checkValidity() || !n.checkValidity()) {
    t.reportValidity();
    a.reportValidity();
    n.reportValidity();
    return;
  }
  myLibrary.AddBook(t.value, a.value, n.value, r.checked);
  myLibrary.collection[myLibrary.collection.length - 1].ShowBook();
  Toggle();
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
});
x.addEventListener("click", () => {
  Toggle();
});
