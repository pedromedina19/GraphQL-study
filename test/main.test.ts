import axios from "axios";

test("Deve consultar os livros passando parametros", async function(){
    const response = await axios("http://localhost:4000", {
        method: "post",
        data: {
            query: `
                {
                    books {
                        id
                        title
                        author{
                            name
                        }
                    }
                }
            `
        }
    });

    const output = response.data;
    
    const [bookA, bookB] = output.data.books;
    expect(bookA.title).toBe("Clean code");
    expect(bookB.title).toBe("refactoring");

});