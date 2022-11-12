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

import { fetchData, postBooking } from './apiCalls'

//~~~QuerySelectors~~~
const userWelcome = document.getElementById('userWelcome');
const userDashBoardLabel = document.getElementById('dashboardLabel');
const userRewardsPoints = document.getElementById('rewardsPoints');
const calenderForBookingCont = document.getElementById('calanderForBookingContainer');
const actualCalender = document.getElementById('actualCalender');
const calenderSubmitButton = document.getElementById('calenderSubmitButton')
const pastFutureBookings = document.getElementById('pastFutureBookings');
const futureBookings = document.getElementById('futureBookings');
const previousBookings = document.getElementById('pastBookings');
const previousBookingsPage = document.getElementById('previousBookingsPage');
const navBar = document.getElementById('navBar');
const dashBoard = document.getElementById('dashBoard');
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

// const getCustomerAndHotelData = (id) => {
//   Promise.all([fetchData(`customers/${id}`), fetchData('bookings')])
//     .then(data => {
//       console.log(data)
//       customer = new Customer({ customer: data[0], allBookings: data[1].bookings });
//       console.log('check',customer.name)
//       hotel = new Hotel({ allRooms: hotel.allRooms, allBookings: data[1].bookings });
    
      
//     })
//     .catch(error => {

//     });
const getPromiseData = () => {
  Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customer = data[0].customers[0];
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
    customer = new Customer({ customer: customer, allBookings: bookingData });
    hotel = new Hotel({ allRooms: roomData, allBookings: bookingData });
    displayUserName();

  })
};

  window.addEventListener('load', getPromiseData);
//~~Event Listeners~~

calenderSubmitButton.addEventListener('click', (event) => {
  let selectedDate = actualCalender.value
  makeDateDisplay(selectedDate);
  console.log('does anything work?')
})
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
  const totalRewardPoints = () => {
    userRewardsPoints.innerHTML += `<p class="amount-spent">$${customer.returnTotalSpent(hotel.allRooms)}</p>`
  }
function displayUserName() {
  userWelcome.innerText = `Welcome, ${customer.name} you have spent $${customer.returnTotalSpent(hotel.allRooms)} this pleases our Dark Lord! `
  let firstName = customer.name.split(' ')[0]
  userDashBoardLabel.innerText = `${firstName}'s Dashboard `
  // totalRewardPoints();
};

// const createFutureBookingsBox = () => {
//   customer.futureBookings.forEach(booking => {
//     document.getElementById('futureBookings').innerHTML += (`
//                 <article class="customer-booking-article" id="${booking.id}">
//                     <p class="booking-info">ID: ${booking.id}</p>
//                     <p class="booking-info">Date: ${makeDateDisplay(booking.date)}</p>
//                     <p class="booking-info">Room Number: ${booking.roomNumber}</p>
//                     <button class="cancel-btn" id="${booking.id}" data-bookingID="${booking.id}">Cancel</button>
//                 </article>
//             `);
//   });
// }




// const createPastBookingsBox = () => {
//   customer.pastBookings.forEach(booking => {
//     previousBookings.innerHTML += (`
//     <article class="customer-booking-article">
//     <p class="information">ID: ${booking.id}</p>
//     <p class="information">Date: ${makeDateDisplay(booking.date)}</p>
//     <p class="information">Room Number: ${booking.roomNumber}</p>
//     </article>
//     `);
//   });

// }

 




// const confirmBookingPost = (dateAndRoomNumber) => {
//   const booking = hotel.makeBookingObj({ id: customer.id, date: dateAndRoomNumber.date, roomNumber: dateAndRoomNumber.roomNumber });
//   postBooking(booking)
//     .then(data => {
//       refreshCustomerAndHotel(bookedMessage)
//     })
//     .catch(error => {
//       userDashBoardLabel.innerText = `${error}`;
//     });

// }
// const displayDashBoard = () => {
//   dashBoard.innerHTML =




//     buildBookings({ bookings: customer.futureBookings, elementID: 'futureBookings' });
//   buildBookings({ bookings: customer.pastBookings, elementID:'previousBookings' });

// }


