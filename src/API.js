export const API = 'http://35.201.2.209:8000/';

export async function postData(path='', data = {}, authToken) {
  console.log("postData", path, data, authToken);

  var init = {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
  }

  if (data !== undefined) {
    init.body = JSON.stringify(data) ;
  }

  if (authToken !== undefined) {
    init.headers.Authorization = 'Bearer ' + authToken;
  }

  const response = await fetch(API + path, init);
  return await response; 
}

