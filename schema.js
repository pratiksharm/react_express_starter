const {gql} = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql')
const Movie = require('./models/movie').Movies;
const User = require('./models/User').Users;
const Journal = require('./models/Journal').Journals;


const typeDefs = gql `
    scalar Date
    type Journal {
        id: ID!
        content: String
        count: Float
        completed: Boolean
        googleId: String!
        user: User
        createdAt: Date
    }
    type User {
        id: ID!
        googleId: String
        displayName: String
        firstName: String
        lastName: String
        image: String
        createdAt: Date
        journal: [Journal] 
    }
    # type Movie {
    #     id: ID!
    #     name: String!
    #     producer: String!
    #     rating: Float!
    # }

    type Query {
        journals: [Journal]
        journal (id: ID!, googleId: String!): Journal
        users: [User]
        user(id: ID!): User
        journalsByuser(googleId: String!): [Journal]
    }
    type Mutation {
        addUser(googleId: String!,displayName: String, firstName: String, lastName: String, image: String): User
        addJournal(id: String, content: String, count: Float, completed: Boolean, googleId: String!): Journal
        # updateMovie(name: String!, producer: String!, rating: Float): Movie
        updateJournal(id: String!, content: String, count: Float, completed: Boolean): Journal
    }
`
const dateScalar = new GraphQLScalarType({
    name: "Date",
    description:"Date custom scalar type", 
    serialize(value) {
        return value.getTime();// convert outgoing Date to integer to JSON
    },
    parseValue(value) {
        return new Date(value); //convert incoming integer to Date
    },
    parseLiteral(ast) {
        if( ast.kind === Kind.INT) {
            return parseInt(ast.value, 10);// Convert hard-coded AST string to type expected by parseValu
        }
        return null;
    }
  });

const resolvers = {
    Date: dateScalar,
    Query: {
        journals: (parent, args) => {
            return Journal.find({})
        },
        users: (parent, args) => {
            return User.find({})
        },
        user: (parent, args) => {
            return User.findById(args.id)
        },
        journal: (parent, args) => {
            if(args.id) {
                return Journal.findById(args.id)
            } else {
                return Journal.find({googleId: args.googleId})
            }
        },
        journalsByuser:(parent, args) => {
            return Journal.find({googleId: args.googleId})
        }
        // movies: (parent, args) => {
        //     return Movie.find({})
        // },
        // movie: (parent, args) => {
        //     return Movie.findById(args.id);
        // }
    },
    Mutation: {
        addUser: (parent, args) => {
            if(User.findOne({googleId:args.googleId})){
                return 
            }else {
                let user = new User({
                    id: args.id,
                    googleId: args.googleId,
                    displayName: args.displayName,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    image: args.image,
                })
                return user.save();
            }
            
        },
        addJournal: (parent, args) => {
            const author = User.find({googleId: args.googleId})
            const authorId = author.id
            let journal = new Journal({
                id: args.id || null,
                content: args.content || null,
                count: args.count || null,
                completed: args.completed || null,
                googleId: args.googleId,
                user: authorId || null
            })
            return journal.save();
        },
        updateJournal: async (parent, args) => {
            if(!args.id) return;
                return await Journal.findOneAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            content: args.content,
                            count: args.count,
                            completed: args.completed,
                        }
                    }, {new: true}, (err, Journal) => {
                        if(err) {
                            console.log('Somethings went wrong')
                        } else {

                        }
                    }
                )
        }
        // addMovie: (parent, args) => {
        //     let movie = new Movie({
        //         name: args.name,
        //         producer: args.producer,
        //         rating: args.rating,
        //     });
        //     return movie.save();
        // },
        // updateMovie: (parent, args) => {
        //     if (!args.id) return ;
        //         return Movie.findOneAndUpdate(
        //             {
        //                 _id: args.id
        //             },
        //             {
        //                 $set: {
        //                     name: args.name,
        //                     producer: args.producer,
        //                     rating: args.rating
        //                 }
        //             }, {new: true}, (err, Movie) => {
        //                 if(err) {
        //                     console.log('Something went wrong when updating the movie');
        //                 } else {

        //                 }
        //             } 
        //         )
        // }
    }
}

module.exports = {typeDefs, resolvers};