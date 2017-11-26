import React from 'react';

const clientId = '2Ecw4HUVMYgeNN5Yw1-O4Q';
const secret = 'EtljJNGcmA9ZmhzkhpLlXi1eymjxMrhdmpagD6kIKgc8JGmxJhiJua3RwiXFgsZh';

let accessToken = '';

let Yelp = {
  getAccessToken(){

    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch( `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=` + clientId + `&client_secret=` + secret, {
      method: 'POST'
    }).then(response => {
      response.json()
    }).then(jsonResponse => {accessToken = jsonResponse.access_token});
  },
  search(term, location, sortBy){
    return Yelp.getAccessToken().then(() => {
      return fetch('https://api.yelp.com/v3/businesses/search?term=' + term + '&location=' + location + '&sort_by=' + sortBy, {
        headers: {Authorization: `Bearer ${accessToken}`}
      } )
    }).then(response => {return response.json()}).then(jsonResponse => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map( business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          adress: business.adress,
          city: business.city,
          state: business.state,
          zipCode: business.zipCode,
          category: business.category,
          rating: business.rating,
          reviewCount: business.reviewCount
        }));
      }
    });
  }
}

export default Yelp;
