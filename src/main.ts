import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

async function main () {
    const typeDefs = `
        type Book{
            id: Int
            title: String
            price: Int
            author: Author
        }

        type Author {
            name: String
        }
        
        type Query {
            books: [Book]
        }
    `;

    const books = [
        {
            id: 1,
            title: "Clean code",
            price: 59,
            author: {
                name: "robert"
            }
        },
        {
            id: 2,
            title: "refactoring",
            price: 79,
            author: {
                name: "martin"
            }
        }
    ];

    const resolvers = {
        Query: {
            books (){
                return books;
            }
        }
    };

    const server = new ApolloServer({typeDefs, resolvers});

    await startStandaloneServer(server, {
        listen: {port : 4000}
    })

}

main();