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
const avalibleRoomsByDate = document.getElementById('avalibleRooms');
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
  displayAvailableRoomsManager(makeDateDisplay(selectedDate))
console.log(makeDateDisplay(selectedDate))
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

const displayAvailableUnfilteredRooms = () => {
 avalibleRoomsByDate.innerHTML += (`
            <h1 class="heading available-room-heading" id="roomPickerHeading">Here are all available rooms for ${makeDateDisplay(roomsDateAndElement.date)}.</h1>
            <form class="form-filter" id="filterRooms">
                <label class="search-label-filter" for="room-type">Filter rooms by type: 
                    <select class="room-type-select" id="filterRoomChoice" name="room-type">
                        <option class="room-type-option" value="">All Available</option>
                        <option class="room-type-option" value="residential suite">Residential Suite</option>
                        <option class="room-type-option" value="suite">Suite</option>
                        <option class="room-type-option" value="single room">Single Room</option>
                        <option class="room-type-option" value="junior suite">Junior Suite</option>
                    </select> 
                </label>
                <input class="search-btn-filter" id="roomFilterBtn" type="button" value="Filter" data-date="${roomsDateAndElement.date}">
            </form>
            <section class="available-room-section" id="availableRoomSection"></section>
        `)
  displayRoomsAndDetails({ rooms: roomsDateAndElement.rooms, date: roomsDateAndElement.date, element: 'availableRoomSection' })

}

const displayRoomsAndDetails = (roomsDateAndElementID) => {
 avalibleRoomsByDate.innerHTML = '';
  roomsDateAndElementID.rooms.forEach((room, i) => {
    const hasBidet = room.bidet ? 'Has a bidet' : 'Doesn\'t have a bidet';
    avalibleRoomsByDate.innerHTML += (`
            <article class="room-wrapper ${room.roomType.split(' ').join('-')}" id="room${room.number}">
                <p class="room-filter-info">${makeUpperCase(room.roomType)}</p>
                <ul class="list">
                    <li class="room-filter-info">Room number ${room.number}</li>
                    <li class="room-filter-info">${makeUpperCase(room.bedSize)} bed</li>
                    <li class="room-filter-info">${room.numBeds} bed(s)</li>
                    <li class="room-filter-info">${hasBidet}</li>
                    <li class="room-filter-info">$${room.costPerNight} per night</li> 
                </ul>
                <button class="book-btn" id="selectRoomBtn${room.number}" data-date="${roomsDateAndElementID.date}" data-roomNumber="${room.number}">Book</button>
            </article>
        `);
  });

}

const displayAvailableRoomsManager = (date) => {
  const availableRooms = hotel.returnAvailableAndBookedRooms(date).availableRooms
  if (!availableRooms.length) {
    avalibleRoomsByDate.innerHTML = ('<h1 class="heading-no-rooms">We\'re so sorry. Looks like we are all booked up for this night.</h1>');
  } else {
    avalibleRoomsByDate.innerHTML = "";
    displayAvailableUnfilteredRooms({ rooms: availableRooms, date: date, element: document.getElementById('availableRoomSectionManager') });
  }

}








 




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


