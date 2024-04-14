import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

async function main () {
    const typeDefs = `
        type Book{
            id: Int
            title: String
            price: Int
            authors: [Author]
        }

        type Author {
            name: String
        }
        
        type Query {
            books (criteria: String): [Book]
        }

        input BookInput {
            title: String,
            price: Int,
            authorName: String
        }

        type Mutation {
            saveBook (book: BookInput): Book
        }
    `;

    const books = [
        {
            id: 1,
            title: "Clean code",
            price: 59,
            authors: [{
                name: "robert"
            }]
        },
        {
            id: 2,
            title: "refactoring",
            price: 79,
            authors: [{
                name: "martin"
            }]
        },
        {
            id: 3,
            title: "design patterns",
            price: 79,
            authors: [{
                name: "erich gamma"
            },
            {
                name: "richard helm"
            },
            {
                name: "ralph johnson"
            },
            {
                name: "john vlissides"
            }
            ]
        }
    ];

    const resolvers = {
        Query: {


            books (_: any, args: any){
                if (!args.criteria) return books;
                return books.filter((book: any)=>{
                    return book.title.includes(args.criteria);
                });
            }
        },
        Mutation: {
            saveBook (_: any, args: any){
                const book = {
                    id: books.length + 1,
                    title: args.book.title,
                    price: args.book.price,
                    authors: [{
                        name: args.book.authorName
                    }]
                }
                books.push(book);
                return book;
            }
        }
    };

    const server = new ApolloServer({typeDefs, resolvers});

    await startStandaloneServer(server, {
        listen: {port : 4000}
    })

}

main();