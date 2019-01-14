// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    console.log('queryStringParameters: ', event.queryStringParameters);
    var params = JSON.parse(event.queryStringParameters.params);
    console.log("query params: "+JSON.stringify(params));
    const title = params.title;
    const year = params.year;
    


    const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;
    
    const URL = `${API_URL}?i=${API_CLIENT_ID}&apikey=${API_CLIENT_SECRET}&t=${title}&y=${year}`;

    const response = await fetch(URL);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ movieData: data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      //err.message
      body: JSON.stringify({ movieData: "Error" }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
