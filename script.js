const library = [];

function Book(title, author, genre, pages, read = false) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read; 
}

function addBookToLibrary(title, author, genre, pages, read = false) {
    const book = new Book(title, author, genre, pages, read);
    library.push(book);
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
        <h2 class="card-title">${book.title}</h2>
        <p>by</p>
        <h3 class="card-author">${book.author}</h3>
        <p>Genre: ${book.genre}</p>
        <p>Pages: ${book.pages}</p> 
        <p class="card-read-status">${book.read ? 'READ' : 'UNREAD'}</p>
        <div class="card-buttons">
            <button id="toggle-button" class=${book.read ? 'card-unread' : 'card-read'}></button>
            <button id="remove-button" class="remove-book" "></button>
        </div>
    `;
    card.querySelector('#toggle-button').addEventListener('click', () => {
        book.toggleRead();
        renderLibrary();
    });

    card.querySelector('#remove-button').addEventListener('click', () => {
        const index = library.indexOf(book);
        library.splice(index, 1);
        renderLibrary();
    });
    return card;
}

function renderLibrary() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    library.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
}

const addPopup = document.querySelector('.book-add-popup');
const addButton = document.querySelector('.add-button');
const confirmAddButton = document.querySelector('#confirm-add');
const cancelAddButton = document.querySelector('#cancel-add');

addButton.addEventListener('click', () => {
    addPopup.showModal();
});

confirmAddButton.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(
        document.querySelector('#title').value,
        document.querySelector('#author').value,
        document.querySelector('#genre').value,
        document.querySelector('#pages').value,
        document.querySelector('#read').checked
    );
    renderLibrary();
    addPopup.close();
});

cancelAddButton.addEventListener('click', () => {
    addPopup.close();
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 295, true);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 180, false);

renderLibrary();