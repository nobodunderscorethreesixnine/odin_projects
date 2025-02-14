const library = document.querySelector('.book-library')
const dialogBox = document.querySelector('dialog')
const addBook = document.querySelector('.add-book');
// querying forms controls
const bookTitle = document.querySelector('#book-title')
const bookAuthor = document.querySelector('#book-author')
const bookPages = document.querySelector('#book-pages')
const bookRead = document.querySelector('#book-read')
// submit btn
const submitBtn = document.querySelector('#submit-btn');
// array
const myLibrary = [];

class Book{
    // constructor
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

addBook.addEventListener('click', () => {
    dialogBox.showModal();
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialogBox.close()
    // calling addBookToLibrary()
    addBookToLibrary()
    // calling render()
    render()
    clearForm()
})



function addBookToLibrary() {
    // getting forms controls value
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const read = bookRead.checked ? 'yes' : 'no';
    if (title !='' && author !='' && pages !='' && read !=''){
        const book = new Book(title, author, pages, read)
        myLibrary.push(book)
    }
}

function render() {
    library.textContent = ''
    myLibrary.forEach((book, indx) => {
        let divTag = document.createElement('div');
        divTag.classList.add('book-container');
        divTag.innerHTML = `
        <h1> ${book.title}</h1>
        <p> By </p>
        <h1> ${book.author} </h1>
        <h1>${book.pages} <sub>pages</sub> </h1>
        <h1> Read - <button onclick=toggleRead(${indx}) id='tgl-read'>${book.read}</button> </h1>
        <button id='dlt-btn' onclick=dltBook(${indx}) data-indx= ${indx} > Remove Book </button>
        `
        library.appendChild(divTag);
    })
}

// removing book
function dltBook(indx) {
    dltIndex = indx;
    myLibrary.splice(dltIndex, 1)
    render()
}

// resetting form
function clearForm() {
    bookTitle.value = ''
    bookAuthor.value = ''
    bookPages.value = ''
    bookRead.checked = false
}

function toggleRead(indx) {
    const updatingBook = myLibrary[indx]
    updatingBook.read = (updatingBook.read == 'yes') ?'no':'yes';
    render()
}

const book1 = new Book('Atomic Habits', 'James Clear', 29, 'yes')
myLibrary.push(book1)
const book2 = new Book("Can't Hurt Me", 'David Goggins', 299, 'no')
myLibrary.push(book2)
const book3 = new Book("Shiva Triology", 'Amish', 299, 'no')
myLibrary.push(book3)
render()