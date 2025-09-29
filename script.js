// ===================================General functions

// Empty book array
function loadBooks() {
    let books = localStorage.getItem("books");
    return books? JSON.parse(books): [];
}

// save books to existing array
function saveBooks() {
    let books = loadBooks();
    localStorage.setItem("books", JSON.stringify(books));
}

// display the books in the table
function displayBooks() {
    let books = loadBooks();
    let bookList = document.getElementById("book-list");
    bookList.innerHTML = "<tr><th>Title</th><th>Author</th><th>Year</th><th>Availability</th></tr>";
    books.forEach(book => {
        bookList.innerHTML += `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.available ? "Available" : "Not Available"}</td>
        </tr>`;
    });
}

// search for books by title or author
function searchBooks(search) {
    let books = loadBooks();
    return books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()));
}


// =========================Special functions for librarian

// add book to array
function addBook(title, author, year, available) {
    let books = loadBooks();
    let newBook = {
        id: Date.now(),
        title: title,
        author: author,
        year: year,
        available: available
    }
    books.push(newBook);
    saveBooks(books);
}

// delete book from the array
function removeBook(id) {
    let books = loadBooks();
    books = books.filter(book => book.id !== id);
    saveBooks(books);
}