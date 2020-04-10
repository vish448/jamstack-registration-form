const fetch = require('node-fetch');

exports.handler = async (event) => {
    console.log(event);
    const body = JSON.parse(event.body);
    const { firstname, lastname, email} = body.payload.data;

    const response = await fetch(
        'https://graphql.fauna.com/graphql',
        {
           method:'POST',
           headers:{
               Authorization: `Bearer ${process.env.FAUNA_API_SECRET}`,
           },
           body: JSON.stringify({
               query: `
                mutation($name: String!, $email: String!) {
                    createRegistration(data: { name: $name, email: $email }) {
                    _id
                    }
                }
               `,
               variables: { name: `${firstname} ${lastname}`, email },
           }),
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    return {
        statusCode: 200,
        body: 'Success',
    };
};