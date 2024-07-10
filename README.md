# apollo-server

The Apollo Server is a simple, Express-based implementation of Apollo Server (https://www.apollographql.com/docs/apollo-server/), a spec-compliant GraphQL server that can be used with any compatible GraphQL client.

Simply install the `node_modules` (we use yarn) and start the server. Feel free to use a node version manager (e.g. https://github.com/tj/n) if that helps.

The GraphQL playground can be access via http://localhost:4000/graphql where you can inspect the current schema, and execute queries.

## Endpoints

The Apollo Server uses a few _external_ REST endpoints for retrieving teams and leagues, as well as articles and authors.

Please note these REST endpoints are (considered) coming from _third party provider_ and the content should probably be handled with care (i.e. we don't know if the response is trustable or may contain malicious content). Below are the (sample) available endpoints for your reference:

- https://interview-backend.theathletic.com/teams
- https://interview-backend.theathletic.com/teams/04DDC2D1-6752-4173-8217-BA8326D6CDB7
- https://interview-backend.theathletic.com/teams/04DDC2D1-6752-4173-8217-BA8326D6CDB7/articles
- https://interview-backend.theathletic.com/leagues
- https://interview-backend.theathletic.com/leagues/8D59D789-49A3-43F0-86B5-23166ACBDC15
- https://interview-backend.theathletic.com/leagues/8D59D789-49A3-43F0-86B5-23166ACBDC15/articles
- https://interview-backend.theathletic.com/articles
- https://interview-backend.theathletic.com/articles/FF1F32E5-7D36-4AC7-B855-3BBD5907ADF6
- https://interview-backend.theathletic.com/authors
- https://interview-backend.theathletic.com/authors/CD14297E-ABC0-47B5-AEF7-77803E0BCE36