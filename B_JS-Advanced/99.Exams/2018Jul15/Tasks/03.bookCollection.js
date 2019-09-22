class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.shelfGenre = shelfGenre;
        this.room = room;
        this.shelfCapacity = shelfCapacity;
        this.shelf = [];
    }

    get room () {
        return this._room;
    }

    set room (val) {
        if(val !== "livingRoom" && val !== "bedRoom" && val !== "closet") {
            throw new Error(`Cannot have book shelf in {room's name}`);
        }
        this._room = val;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    toString(){
        if (this.shelf.length===0){
            return 'It\'s an empty shelf';
        } else {
            let header=`"${this.shelfGenre}" shelf in ${this.room} contains:\n`;
            let books='';
            for (let book of this.shelf) {
                books+=`\uD83D\uDCD6 "${book.bookName}" - ${book.bookAuthor}\n`;
            }

            return header+books.trimRight();
        }
    }

    addBook(bookName, bookAuthor, genre) {
        if (this.shelf.length < this.shelfCapacity) {
            this.shelf.push({bookName,bookAuthor,genre});
        } else {
            this.shelf.splice(0, 1);
            this.shelf.push({bookName,bookAuthor,genre});
        }
      
        this.shelf = this.shelf.sort((a, b) => {
            return a.bookAuthor > b.bookAuthor;
        });

        return this;
    }

    throwAwayBook(bookName) {
        for (let i = 0; i < this.shelf.length; i++) {
            if (bookName === this.shelf[i].bookName) {
                this.shelf.splice(i, 1);
            }
        }
    }

    showBooks(genre) {
        let result = `Results for search "${genre}":\n`;
        for (let i = 0; i < this.shelf.length; i++) {
            if (genre === this.shelf[i].genre) {
                result += `\uD83D\uDCD6 ${this.shelf[i].bookAuthor} - "${this.shelf[i].bookName}"\n`;
            }
        }
        return result.trimRight();
    }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5)
livingRoom.addBook("John Adams", "David McCullough", "history");
livingRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
livingRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
livingRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
livingRoom.throwAwayBook("Introduction to Programming with html");
console.log(livingRoom.toString());

//let garden = new BookCollection("Programming", "garden");
