"use strict";

console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");
class Book {
  constructor(id, title, author, read = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.bookCount = 0;
    this.books = [];
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (book.id === id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook(title, author, read) {
    const newBook = new Book(this.bookCount++, title, author, read);
    const tableBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-id", newBook.id);

    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const readCell = document.createElement("td");
    const removeCell = document.createElement("td");

    titleCell.textContent = newBook.title;
    authorCell.textContent = newBook.author;

    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.checked = newBook.read;
    readCheckbox.disabled = newBook.read;
    readCheckbox.addEventListener("change", () =>
      this.markRead(readCheckbox, newBook.id)
    );
    readCell.appendChild(readCheckbox);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => this.removeBook(newBook.id));

    removeCell.appendChild(removeButton);

    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(readCell);
    newRow.appendChild(removeCell);

    tableBody.appendChild(newRow);
    this.books.push(newBook);
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
    if (rowToRemove) {
      rowToRemove.remove();
    }
  }
}

const library = new Library();

const addBookForm = document.querySelector("#addBookForm");

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const read = document.querySelector("#read").checked;

  library.addBook(title, author, read);
});
