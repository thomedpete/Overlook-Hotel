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
const allFutureBookingsPage = document.getElementById('allFutureBookingsPage'); 
const mostRecentBookings = document.getElementById('mostRecentBookings');
const mostRecentPastBookings = document.getElementById('mostRecentPastBookings');
const returnToDash = document.getElementById('returnToDash');
let customerData;
let bookingData;
let roomData;
let customer;
let pastBookings;
let totalMoneySpent;
let upcomingBookings;
let hotel;


const getPromiseData = () => {
  Promise.all([fetchData('customers'), fetchData('bookings'), fetchData('rooms')]).then(data => {
    customer = data[0].customers[0];
    bookingData = data[1].bookings;
    roomData = data[2].rooms;
    customer = new Customer({ customer: customer, allBookings: bookingData });
    hotel = new Hotel({ allRooms: roomData, allBookings: bookingData });
    displayUserName();
    displayRecentBookings();
    displayRecentBookingsPast();
  })
};


const displayRecentBookings = () => {
  customer.futureBookings.forEach((booking) => {
   let roomToType = convertRoomNumberToType(booking.roomNumber)
    mostRecentBookings.innerHTML += `
    <article class='booking-card' id='bookingCard'>
    <p class='dashboard-recent-bookings'> <span class='format'>Date</span>: ${booking.date}</p>
    <p class='dashboard-recent-bookings'> <span class='format'>Room Number</span>: ${booking.roomNumber}</p>
    <p class='dashboard-recent-bookings'> <span class='format'>Room Type</span>: ${roomToType.roomType}</p>
    </article>`
  })  
};

const displayRecentBookingsPast = () => {
  console.log(customer.pastBookings)
  customer.pastBookings.reverse().forEach((booking) => {
    let roomToType = convertRoomNumberToType(booking.roomNumber)
    mostRecentPastBookings.innerHTML = `
    <article class='booking-card' id='bookingCard'> 
    <p class='dashboard-recent-bookings'> <span class='format'>Date</span>: ${booking.date}</p>
    <p class='dashboard-recent-bookings'> <span class='format'>Room Number</span>: ${booking.roomNumber}</p>
    <p class='dashboard-recent-bookings'> <span class='format'>Room Type</span>: ${roomToType.roomType}</p>
    </article>`
  })
};

const createPastBookingsPage = () => {
  hide([dashBoard, navBar]);
  show([previousBookingsPage])
  customer.pastBookings.forEach(booking => {
    let roomToType = convertRoomNumberToType(booking.roomNumber)
    previousBookingsPage.innerHTML += `
        <article class="customer-booking-article past-bookings" id="${booking.id}">
            <p class="booking-info">ID: ${booking.id}</p>
            <p class="booking-info">Date: ${makeDateDisplay(booking.date)}</p>
            <p class="booking-info">Room Number: ${booking.roomNumber}</p>
            <p class="booking-info">Room Type: ${roomToType.roomType}</p>
            <p class="booking-info">This Room Has ${roomToType.numBeds} ${roomToType.bedSize} beds.</p>
            <button class="cancel-btn" id="${booking.id}" data-bookingID="${booking.id}">Cancel Booking</button>
        </article>
            `;
})}

const dashReturnRefresh = () => {
  hide([previousBookingsPage]);
  show([dashBoard, navBar]);
  console.log('did it work?')
};

const convertRoomNumberToType = (roomNumber) => {
let roomDeets = hotel.allRooms.find((room) => {
   return room.number === roomNumber
  })
  return roomDeets
}

const createFutureBookingsPage = () => {
  hide([dashBoard, navBar]);
  show([allFutureBookingsPage])
  customer.futureBookings.forEach(booking => {
   let roomToType = convertRoomNumberToType(booking.roomNumber)
      allFutureBookingsPage.innerHTML += (`
        <article class="customer-booking-article future-bookings" id="${booking.id}">
            <p class="booking-info">ID: ${booking.id}</p>
            <p class="booking-info">Date: ${makeDateDisplay(booking.date)}</p>
            <p class="booking-info">Room Number: ${booking.roomNumber}</p>
            <p class="booking-info">Room Type: ${roomToType.roomType}</p>
            <p class="booking-info">This Room Has ${roomToType.numBeds} ${roomToType.bedSize} beds.</p>
            <button class="cancel-btn" id="${booking.id}" data-bookingID="${booking.id}">Cancel Booking</button>
        </article>
            `);
  });
}


//~~Event Listeners~~
window.addEventListener('load', getPromiseData);
showAllFutureButton.addEventListener('click',createFutureBookingsPage);
showAllPastButton.addEventListener('click', createPastBookingsPage);
returnToDash.addEventListener('click', dashReturnRefresh);
calenderSubmitButton.addEventListener('click', (event) => {
  let selectedDate = actualCalender.value
  makeDateDisplay(selectedDate);
  console.log('does anything work?')
});


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

// function mapBookings(bookingsArray) {
//   let mappedBookings = ''
//   mappedBookings = bookingsArray.map((booking) => {
//     return `<p class='past-booking-info'> Date: ${booking.date}  <br />
//     Room Number: ${booking.roomNumber} <br /> </p>`
//   }).join('')
//   return mappedBookings
// }

function displayUserName() {
  userWelcome.innerText = `Welcome, ${customer.name} you have spent $${customer.returnTotalSpent(hotel.allRooms)} this pleases our Dark Lord! `
  let firstName = customer.name.split(' ')[0]
  userDashBoardLabel.innerText = `${firstName}'s Dashboard `

};










 




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


