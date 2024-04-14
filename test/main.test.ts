import axios from "axios";

test("Deve consultar os livros", async function(){
    const response = await axios("http://localhost:4000", {
        method: "post",
        data: {
            query: `
                {
                    books {
                        id
                        title
                        authors{
                            name
                        }
                    }
                }
            `
        }
    });

    const output = response.data;
    const [bookA, bookB, bookC] = output.data.books;
    expect(bookA.title).toBe("Clean code");
    expect(bookB.title).toBe("refactoring");
    expect(bookC.title).toBe("design patterns");
});

test("Deve consultar os livros passando parametros", async function(){
    const response = await axios("http://localhost:4000", {
        method: "post",
        data: {
            query: `
                query ($criteria: String) {
                    books (criteria: $criteria) {
                        id
                        title
                        authors {
                            name
                        }
                    }
                }
            `,
            variables: {
                criteria: "Clean"
            }
        }
    });

    const output = response.data;
    const books = output.data.books
    const [bookA] = output.data.books;
    const [authorA] = bookA.authors;
    expect(bookA.title).toBe("Clean code");
    expect(authorA.name).toBe("robert");
});

test("Deve salvar um novo livro", async function(){
    const response = await axios("http://localhost:4000", {
        method: "post",
        data: {
            query: `
                mutation ($book: BookInput){
                    saveBook (book: $book) {
                        id
                    }
                }
            `,
            variables: {
                book: {
                    title: "clean arch",
                    price: 89,
                    authorName: "robert"
                }
            }
        }
    });

    const output = response.data;
    console.log(output);
    
});