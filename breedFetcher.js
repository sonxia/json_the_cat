const request = require('request');

const fetchBreedDescription = function(breedName, callback) {

  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(`Failed to request details: ${error}`,null);
    }

    const data = JSON.parse(body);
    //console.log(data);
    console.log(typeof body);

    const breed = data[0];
    if (breed) {
      callback(null,breed.description);
    } else {
      callback(`Failed to find breed ${breedName}`,null);
    }
  });

};

const breedName = process.argv[2]; // 2 means the second argument when you typing them out in the terminal

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});

module.exports = { fetchBreedDescription };