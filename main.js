let myLibrary = [];
const form = document.querySelector("form");
const container = document.querySelector("table");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleInput = document.querySelector("#title").value;
    const authorInput = document.getElementById("author").value;
    const pagesInput = document.getElementById("pages").value;
    addBookToLibrary(titleInput, authorInput, pagesInput);
    displayBook(myLibrary);
});
function Book(title, author, pages){
    if(!new.target){
        throw new Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages){
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

function displayBook(library){
    container.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

    library.forEach(element => {
        const newRow = document.createElement("tr");
        if (element.read) newRow.classList.add("readBook");


        newRow.innerHTML = `<td>${element.id}</td>
                            <td>${element.title}</td>
                            <td>${element.author}</td>
                            <td>${element.pages}</td>
                            <td>${element.read}</td>
                            <td><button data-id=${element.id}>Remove</button></td>
                            <td><input type="checkbox" name="read" data-id=${element.id} ${element.read ? "checked" : ""}></td>`
        container.appendChild(newRow);
    });
}

container.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON"){
        const id = event.target.dataset.id;
        myLibrary = myLibrary.filter(book => book.id !== id)
        displayBook(myLibrary);
    }
});

container.addEventListener("change", (event) => {
    if(event.target.type === "checkbox"){
        const id = event.target.dataset.id;
        for(b of myLibrary){
            if(b.id === id){
                b.toggleRead();
                const row = event.target.closest("tr");
                row.classList.toggle("readBook");
                break;
            }
        }
    }
});
