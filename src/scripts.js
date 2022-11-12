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
import Hotel from './classes/Hotel';

import { fetchData, getPromiseData } from './apiCalls'

//~~~QuerySelectors~~~
const userWelcome = document.getElementById('userWelcome');
const userDashBoardLabel = document.getElementById('dashboardLabel');
const calenderForBookingCont = document.getElementById('calanderForBookingContainer');
const pastFutureBookings = document.getElementById('pastFutureBookings');
const futureBookings = document.getElementById('futureBookings');
const previousBookings = document.getElementById('pastBookings');
const previousBookingsPage = document.getElementById('previousBookingsPage');
const navBar= document.getElementById('navBar');
const dashboard = document.getElementById('dashBoard');
const dashboardReturn = document.getElementById('backToDashboard');
const showAllPastButton = document.getElementById('showAllPast');
const showAllFutureButton = document.getElementById('showAllFuture');


let customerData;
let bookingData;
let roomData;
let customer;
let pastBookings;
let totalMoneySpent;
let upcomingBookings;
let hotel;



//~~Event Listeners~~
// window.addEventListener('load', );

//~~Helper Functions~~
const hide = (elements) => elements.forEach(element => element.classList.add('hidden'));
const show = (elements) => elements.forEach(element => element.classList.remove('hidden'));
const bookedMessage = `<h1>The Overlook at Mordor awaits your arival, the room is booked!</h1>`
const canceledMessage = `<h1>The Overlook at Mordor hopes to see you soon, the room is cancled!</h1>`
const returnCurrentDate = () => {
  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let date = new Date().getDate().toString();
  month = month.length === 1 ? 0 + month : month;
  date = date.length === 1 ? 0 + date : date;
  return `${year}/${month}/${date}`;
};

const makeDateDisplay = (date) => {
  const dateNumbers = date.split("/");
  const year = dateNumbers.shift();
  dateNumbers.push(year);
  return dateNumbers.join('/');
};

function mapBookings(bookingsArray) {
  let mappedBookings = ''
  mappedBookings = bookingsArray.map((booking) => {
    return `<p class='past-booking-info'> Date: ${booking.date}  <br />
       Room Number: ${booking.roomNumber} <br /> </p>`
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
  hide([navBar,dashboard]);
  show([previousBookingsPage])
  previousBookingsPage.innerHTML += `<p> ${ mapBookings(customer.pastBookings) }</p >`
  

};

const refreshCustomerAndHotel = (statusMessage) => {
  Promise.all([getFetch(`customers/${customer.id}`), getFetch('bookings')])
    .then(data => {
      customer = new Customer({ customer: data[0], allBookings: data[1].bookings });
      hotel = new Hotel({ allRooms: hotel.allRooms, allBookings: data[1].bookings });
      show([]);
      hide([]);
      null.innerHTML = ``
    })
    .catch(error => {
      dashboardSectionCustomer.innerHTML = (`
           
            <h1 class="heading">Sorry, it looks like something went wrong reloading the page. Error: ${error}</h1>
            `)
    });

}

const confirmBookingPost = (dateAndRoomNumber) => {
  const booking = hotel.makeBookingObj({ id: customer.id, date: dateAndRoomNumber.date, roomNumber: dateAndRoomNumber.roomNumber });
  postBooking(booking)
    .then(data => {
      refreshCustomerAndHotel(bookedMessage)
    })
    .catch(error => {
  
      userDashBoardLabel.innerText = `${error}`;
    });

}


