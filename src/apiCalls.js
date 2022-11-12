const apiUrl = 'http://localhost:3001/api/v1/';

const fetchData = (endPoint) => {
  return fetch(`${apiUrl}${endPoint}`)
    .then(response => response.json())
    .catch(error => console.log(error));
};

const getPromiseData = () => {
  Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customerData = data[0].customers;
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
  })
};

const postBooking = (booking) => fetch(`${apiBase}bookings`, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(booking)
})
  .then(response => {
    if (!response.ok) {
      throw 'Sorry, something went wrong. Looks like we Couldnt book your room.'
    }
    return response.json()
  })

export { fetchData, getPromiseData, postBooking } 