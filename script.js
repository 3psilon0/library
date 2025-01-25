const library = [
    {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        pages: 1258,
        read: true
    }
];

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
    const book = new Book(title, author, genre, pages, read = false);
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
        <div class="card-buttons">
            <button class=${book.read ? 'card-read' : 'card-unread'}></button>
            <button class="remove-book"></button>
        </div>
    `;
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

renderLibrary();