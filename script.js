const myLibrary = [];

function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    
  }

  Book.prototype.toggleRead=function(){
    this.read = !this.read;
  }
 


  function PutBooks() {
    let bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = ""; // Clear existing content

    myLibrary.forEach((book) => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("book-title");
        titleDiv.textContent = `Title: ${book.title}`;
        bookDiv.appendChild(titleDiv);

        let authorDiv = document.createElement("div");
        authorDiv.classList.add("book-author");
        authorDiv.textContent = `Author: ${book.author}`;
        bookDiv.appendChild(authorDiv);

        let pagesDiv = document.createElement("div");
        pagesDiv.classList.add("book-pages");
        pagesDiv.textContent = `Pages: ${book.pages}`;
        bookDiv.appendChild(pagesDiv);

        let readBtn = document.createElement("button");
        readBtn.classList.add("toggle-btn");
        readBtn.textContent = book.read ? "Read: Yes" : "Read: No"
        readBtn.addEventListener('click', function() {
          toggleRead(book); 
      });
        bookDiv.appendChild(readBtn);

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener('click', function() {
            removeBook(book);
        });
        bookDiv.appendChild(removeBtn);

        bookContainer.appendChild(bookDiv);
    });
}
function clearErrorMessage() {
  let errorMessage = document.querySelector("#title-error-message");
  if (errorMessage) {
      errorMessage.remove();
  }
}

function displayErrorMessage(message) {
  let errorMessage = document.createElement("div");
  errorMessage.id = "title-error-message";
  errorMessage.textContent = message;
  
  let titleInput = document.querySelector("#title");
  titleInput.parentNode.insertBefore(errorMessage, titleInput.nextSibling);
}


function addBookToLibrary() {
  let titleInput = document.querySelector("#title");
  let title = titleInput.value;

  // Check if a book with the same title already exists
  if (myLibrary.some((book) => book.title === title)) {
      titleInput.classList.add("duplicate"); // Apply the duplicate styling
      displayErrorMessage("The Book Already Exist");
      return; // Do not proceed if a duplicate title is found
  }

  titleInput.classList.remove("duplicate"); // Remove the duplicate styling
  clearErrorMessage(); // Clear any existing error message

  let author = document.querySelector("#authors").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let AddNewBook = new Book(title, author, pages, read);
  myLibrary.push(AddNewBook);
  PutBooks();

  // Reset the form
  document.querySelector("#form").reset();

  // Close the form after successfully adding a new book
  let newForm = document.querySelector('#form');
  newForm.style.display = "none";
}

function removeBook(book){
    // Find the index of the book in the array
    let index = myLibrary.indexOf(book);

    // Check if the book is found in the array
    if (index !== -1) {
        myLibrary.splice(index, 1);
        PutBooks();
    }
}



  let newbook=document.querySelector("#new-book-btn");
  let add=document.querySelector("#add");

  newbook.addEventListener('click',function(){
    let newForm= document.querySelector('#form');
    newForm.style.display="block";
    
    
  })

  Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function toggleRead(book) {
    // Find the index of the book in the array
    let index = myLibrary.indexOf(book);

    // Check if the book is found in the array
    if (index !== -1) {
        myLibrary[index].toggleRead();
        PutBooks();
    }
}

  const form = document.querySelector("#form");
  form.addEventListener('submit',function(event){
    event.preventDefault();
  })

  add.addEventListener('click',function(){
    addBookToLibrary();
    let newForm= document.querySelector('#form');
    newForm.style.display="none"
  });
