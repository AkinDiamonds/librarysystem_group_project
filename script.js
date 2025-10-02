// ===================================General functions

// Empty book array
function loadBooks() {
    let books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
}

// save books to existing array
function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
}

// display the books in the table
function displayBooks(filter = "") {
    let books = filter ? searchBooks(filter) : loadBooks();
    let bookList = document.querySelector(".book-list");
    bookList.innerHTML = "";

    books.forEach(book => {
        let row = `
          <tr>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.year}</td>
              <td style="color:${book.available ? 'green' : 'red'}">
                ${book.available ? "Available" : "Not Available"}
              </td>`;

        if (document.body.classList.contains("dashboard")) {
            row += `
              <td>
                  <button onclick="toggleStatus(${book.id})">
                      ${book.available ? "Check Out" : "Make Available"}
                  </button>
                  <button onclick="removeBook(${book.id})">Delete</button>
              </td>`;
        }

        row += `</tr>`;
        bookList.innerHTML += row;
    });
}


if (!localStorage.getItem("books")) {
    saveBooks([
        { id: 1, title: "Making It Big: Lessons from a Life in Business", author: "Nepo Baby", year: 2025, available: true },
        { id: 2, title: "Nearly All the Men in Lagos Are Mad", author: "Damilare Kuku", year: 2021, available: false },
        { id: 3, title: "The Middle Daughter", author: "Chika Unigwe", year: 2023, available: true },
        { id: 4, title: "The Death of Vivek Oji", author: "Akwaeke Emezi", year: 2020, available: false },
        { id: 5, title: "My Sister, the Serial Killer", author: "Oyinkan Braithwaite", year: 2018, available: true },
        { id: 6, title: "The Girl with the Louding Voice", author: "Abi Daré", year: 2020, available: false },
        { id: 7, title: "Butter Honey Pig Bread", author: "Francesca Ekwuyasi", year: 2020, available: true },
        { id: 8, title: "The Road to the Country", author: "Chigozie Obioma", year: 2024, available: false },
        { id: 9, title: "Shigidi: And the Brass Head of Obalufon", author: "Wole Talabi", year: 2023, available: true },
        { id: 10, title: "Vagabonds!", author: "Eloghosa Osunde", year: 2022, available: false },
        { id: 11, title: "A Broken People's Playlist", author: "Chimeka Garricks", year: 2020, available: true },
        { id: 12, title: "Dazzling", author: "Chikodili Emelumadu", year: 2023, available: false },
        { id: 13, title: "Black Sunday", author: "Tola Rotimi Abraham", year: 2020, available: true },
        { id: 14, title: "The Mechanics of Yenagoa", author: "Michael Afenfia", year: 2020, available: false },
        { id: 15, title: "Daughter in Exile", author: "Bisi Adjapon", year: 2023, available: true },
        { id: 16, title: "The Returnees", author: "Elizabeth Okoh", year: 2020, available: false },
        { id: 17, title: "Children of Blood and Bone", author: "Tomi Adeyemi", year: 2018, available: true },
        { id: 18, title: "Warrior of the Wind", author: "Suyi Davies Okungbowa", year: 2023, available: false },
        { id: 19, title: "Love in Colour", author: "Bolu Babalola", year: 2020, available: true },
        { id: 20, title: "Allow Me to Introduce Myself", author: "Onyi Nwabineli", year: 2023, available: false },
        { id: 21, title: "Ghostroots: Stories", author: "'Pemi Aguda", year: 2024, available: true },
        { id: 22, title: "The House of Shells", author: "S. E. Duru", year: 2023, available: false },
        { id: 23, title: "Only Big Bumbum Matters Tomorrow", author: "Damilare Kuku", year: 2024, available: true },
        { id: 24, title: "The Three of Us", author: "Ore Agbaje-Williams", year: 2023, available: false },
        { id: 25, title: "Forged by Blood", author: "Ehigbor Okosun", year: 2023, available: true }
    ]);
}

// Run on page load
window.onload = () => displayBooks();

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
    displayBooks();
}

// delete book from the array
function removeBook(id) {
    let books = loadBooks();
    books = books.filter(book => book.id !== id);
    saveBooks(books);
    displayBooks();
}

// availability toggle
function toggleStatus(id) {
    let books = loadBooks();
    books = books.map(book => {
        if (book.id === id) {~
            book.available = !book.available;
        }
        return book;
    });
    saveBooks(books);
    displayBooks();
}

// login page
function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "agboola" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials!");
    }
}
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

displayBooks()