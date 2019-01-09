// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch';
export async function handler(event, context) {
  try {

    const API_URL = "https://www.omdbapi.com/";
    const API_CLIENT_ID =  "xxxx";
    const API_CLIENT_SECRET = "yyyy";
    
    const URL = `${API_URL}?i=${API_CLIENT_ID}&apikey=${API_CLIENT_SECRET}&t=vice&y=2018`;

    const response = await fetch(URL);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      //err.message
      body: JSON.stringify({ msg: "Error" }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
