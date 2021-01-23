const {gql} = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql')
const Movie = require('./models/movie').Movies;
const User = require('./models/User').Users;
const Journal = require('./models/Journal').Journals;


const typeDefs = gql `
    scalar Date
    type Journal {
        id: ID!
        content: String!
        count: Float!
        completed: Boolean!
        authorid: ID!
        user: User
        createdAt: Date
    }
    type User {
        id: ID!
        googleId: String!
        displayName: String
        firstName: String
        lastName: String
        image: String
        createdAt: Date
        journal: [Journal] 
    }
    type Movie {
        id: ID!
        name: String!
        producer: String!
        rating: Float!
    }

    type Query {
        getMovies: [Movie]
        getMovie(id: ID!): Movie
        getJournals: [Journal]
        getJournal(id: ID!): Journal
        getUsers: [User]
        getUser(id: ID!): User
    }
    type Mutation {
        addUser(googleId: String!,displayName: String!, firstName: String!, lastName: String!, image: String!): User
        addJournal(content: String!, count: Float!, completed: Boolean!, authorId: ID!): Journal
        addMovie(name: String!, producer: String!, rating: Float!): Movie
        updateMovie(name: String!, producer: String!, rating: Float): Movie
        deleteMovie(id: ID!): Movie
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
        getJournals: (parent, args) => {
            return Journal.find({})
        },
        getUsers: (parent, args) => {
            return User.find({})
        },
        getUser: (parent, args) => {
            return User.findById(args.id)
        },
        getJournal: (parent, args) => {
            return Journal.findById(args.id)
        },
        getMovies: (parent, args) => {
            return Movie.find({})
        },
        getMovie: (parent, args) => {
            return Movie.findById(args.id);
        }
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
            let journal = new Journal({
                content: args.content,
                count: args.count,
                completed: args.completed,
                authorId: User.findOne({googleId:args.googleId}).id
            })
            return journal.save();
        },
        addMovie: (parent, args) => {
            let movie = new Movie({
                name: args.name,
                producer: args.producer,
                rating: args.rating,
            });
            return movie.save();
        },
        updateMovie: (parent, args) => {
            if (!args.id) return ;
                return Movie.findOneAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            name: args.name,
                            producer: args.producer,
                            rating: args.rating
                        }
                    }, {new: true}, (err, Movie) => {
                        if(err) {
                            console.log('Something went wrong when updating the movie');
                        } else {

                        }
                    } 
                )
        }
    }
}

module.exports = {typeDefs, resolvers};