//~~~Imports~~~
import './css/styles.css';
import './images/turing-logo.png'
import './images/overlookLogo.png'
import './images/theOverlook.png'
import './images/helpfulFrontDesk.png'
import './images/eye-logo.png'
import Customer from './classes/Customer';
import Booking from './classes/Booking';
import Room from './classes/Room';

import { fetchData, getPromiseData } from './apiCalls'

//~~~QuerySelectors~~~
const userWelcome = document.getElementById('userWelcome');
const userDashBoardLabel = document.getElementById('dashboardLabel');
const calenderForBookingCont = document.getElementById('calanderForBookingContainer');
const pastFutureBookings = document.getElementById('pastFutureBookings');
const futureBookings = document.getElementById('futureBookings');
const previousBookings = document.getElementById('pastBookings');
const previousBookingsTable = document.getElementById('table-past-bookings');

let customerData;
let bookingData;
let roomData;
let customer;
let pastBookings;
let totalMoneySpent;
let upcomingBookings;


function getUpdatedPromiseData() {
  Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customerData = data[0].customers;
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
    customer = new Customer(customerData[8]);
    customer.totalMoneySpent = 0;
    customer.pastBookings = [];
    customer.upcomingBookings = [];
    customer.bookedRooms = [];
    customer.checkAllBookings(bookingData);
    pastBookings = customer.pastBookings;
    upcomingBookings = customer.futureBookings;
    totalMoneySpent = customer.returnTotalMoneySpent(roomData);
    displayUserName();
    displayUserFutureBookings();
    displayUserPastBookings();
  })
}

window.addEventListener('load', getUpdatedPromiseData);

function mapBookings(bookingsArray) {
  let mappedBookings = ''
  mappedBookings = bookingsArray.map((booking) => {
    return `Date: ${booking.date} <br />
        Room Number: ${booking.roomNumber} <br />`
  }).join('')
  return mappedBookings
}

function displayUserName() {
  userWelcome.innerText = `Welcome ${customer.name}`
  let firstName = customer.name.split(' ')[0]
  userDashBoardLabel.innerText = `${firstName}'s Dashboard `
};

function displayUserFutureBookings() {
 let future = mapBookings(upcomingBookings)
  futureBookings.innerHTML += `${future}`
};

function displayUserPastBookings() {
  // previousBookings.innerHTML = `<p class='past-bookings-info'> ${ mapBookings(customer.pastBookings) }</p >`
  // past.forEach(booking => {
  //   previousBookingsTable.innerHTML += `<tr><td>${booking}</td></tr>`
// });
};

