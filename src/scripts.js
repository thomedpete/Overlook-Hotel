//~~ IMPORTS ~~
import './images/overlookLogo.png'
import './images/theOverlook.png'
import './images/helpfulFrontDesk.png'
import './images/eye-logo.png'
import './css/styles.css';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { getFetch, cancelBooking, postBooking } from './apiCalls';

//~~ QUERY SELECTORS ~~

const loginSection = document.querySelector('#loginSection');
const dashboardSectionCustomer = document.querySelector('#dashboardSectionCustomer');
const bookRoomSectionCustomer = document.querySelector('#bookRoomSectionCustomer');


//~~ VARIABLES ~~

let customer;
let hotel;
const cancelMessage = '<h1>Your booking has been canceled.</h1><p>We are sorry you can\'t make it our mighty father will be displeased.</p>';
const bookedMessage = '<h1></></i> Your room has been booked!</h1><p>Lord Sauron awaits your arival.</p>';

//~~ HELPER FUNCTIONS ~~

const makeUpperCase = (string) => string.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');
const getTodaysDate = () => {
  let year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  let date = new Date().getDate().toString();
  month = month.length === 1 ? 0 + month : month;
  date = date.length === 1 ? 0 + date : date;

  return `${year}/${month}/${date}`;
}

const hide = (elements) => elements.forEach(element => element.classList.add('hidden'));
const show = (elements) => elements.forEach(element => element.classList.remove('hidden'));
const setError = (element) => {
  element.setAttribute('style', 'color: red');
  element.setAttribute('role', 'alert');
  element.setAttribute('tabindex', -1);
  element.focus();

}

const makeDateDisplay = (date) => {
  const dateNums = date.split("/");
  const year = dateNums.shift();
  dateNums.push(year);
  return dateNums.join('/');
};


//~~ FUNCTIONS ~~

const refresPromise = (statusMessage) => {
  Promise.all([getFetch(`customers/${customer.id}`), getFetch('bookings')])
    .then(data => {
      customer = new Customer({ customer: data[0], allBookings: data[1].bookings });
      hotel = new Hotel({ allRooms: hotel.allRooms, allBookings: data[1].bookings });
      show([dashboardSectionCustomer]);
      hide([bookRoomSectionCustomer]);
      dashboardSectionCustomer.innerHTML = (`
            <nav class="nav">
                <button class="nav-btn" id="dashBtn"> Dashboard</button>
                <button class="nav-btn" id="bookRoomBtn"> Book a Room</button>
            </nav>
            <div class="status-msg-wrapper" id="statusMsgWrapper"></div>
            `)
      document.getElementById('statusMsgWrapper').innerHTML = statusMessage;
    })
    .catch(err => {
      dashboardSectionCustomer.innerHTML = (`
            <nav class="nav">
                <button class="nav-btn" id="dashBtn"> Dashboard</book>
                <button class="nav-btn" id="bookRoomBtn"> Book a Room</button>
            </nav>
            <h1 class="heading">Apolgies, it looks like something went wrong reloading the page. Error: ${err}</h1>
            `)
    });

}


const buildBookings = (bookingsAndElementID) => {
  if (!bookingsAndElementID.bookings.length) {
    document.querySelector(`#${bookingsAndElementID.elementID}`).innerHTML += (`
            <p class="informational-p">You don't have any bookings to show.</p>
        `);
  } else {
    bookingsAndElementID.bookings.forEach(booking => {
      const room = hotel.findRoom(booking.roomNumber);
      document.querySelector(`#${bookingsAndElementID.elementID}`).innerHTML += (`
                <button class="booking-detail-btn" type="button" data-bookingID="${booking.id}" data-roomNum="${booking.roomNumber}" data-date="${booking.date}">
                    <p class="information" data-bookingID="${booking.id}" data-roomNum="${booking.roomNumber}" data-date="${booking.date}">${makeDateDisplay(booking.date)}</p>
                    <p class="information" data-bookingID="${booking.id}" data-roomNum="${booking.roomNumber}" data-date="${booking.date}">Room Number: ${booking.roomNumber}</p>
                    <p class="information" data-bookingID="${booking.id}" data-roomNum="${booking.roomNumber}" data-date="${booking.date}">Cost Per Night: $${room.costPerNight}</p>
                    <p class="screen-reader-only">Click for room info</p>
                </button>
            `);
    });
  }

}



const displayCustomerDash = () => {
  dashboardSectionCustomer.innerHTML = (`
        <nav class="nav">
            <button class="nav-btn" id="bookRoomBtn"> Book a Room</button>
            <h1 class=nav-heading>Over Look Hotel </h1>
        </nav>
        <div class="customer-heading-wrapper">
            <h1 class="heading customer-dash-heading">Welcome back ${customer.name}!</h1>
        </div>
        <h2 class="heading-two booking-heading">Upcoming Bookings</h2>
        <section class="bookings-section" id="upcomingBookingSection"></section>
        <h2 class="heading-two booking-heading">Past Bookings</h2>
        <section class="bookings-section" id="pastBookingSection"></section>
        <section class="total-spent-section" id="totalSpentSection">
            <h2 class="heading-two">Total Amount Spent on Past Bookings</h2>
            <p class="amount-spent">$${customer.returnTotalSpent(hotel.allRooms)}</p>
            <p class='ammount-spent'>You have earned ${customer.returnTotalSpent(hotel.allRooms)} Watchful Eye Rewards Points!</p>
        </section>
`);

  buildBookings({ bookings: customer.futureBookings, elementID: 'upcomingBookingSection' });
  buildBookings({ bookings: customer.pastBookings, elementID: 'pastBookingSection' });

}

const showSelectBooking = (bookingIDAndRoom) => {
  const selectedBooking = hotel.findBooking(bookingIDAndRoom.selectedBooking);
  const hasBidet = bookingIDAndRoom.selectedRoom.bidet ? 'This room has a bidet' : 'This room doesn\'t have a bidet';
  dashboardSectionCustomer.innerHTML = (`
        <nav class="nav">
            <button class="nav-btn" id="dashBtn"> Dashboard</book>
            <button class="nav-btn" id="bookRoomBtn"> Book a Room</button>
        </nav>
        <div class="room-display-wrapper" id="roomDisplayWrapper">
            <h1 class="heading">A Beautiful ${makeUpperCase(bookingIDAndRoom.selectedRoom.roomType)}</h1>
            <article class='room-pic'></article>
            <p class="information">Cost Per Night: $${bookingIDAndRoom.selectedRoom.costPerNight}</p>
            <ul class="list">
                <li> ${makeUpperCase(bookingIDAndRoom.selectedRoom.bedSize)} bed</li>
                <li> Has ${bookingIDAndRoom.selectedRoom.numBeds} bed(s)</li>
                <li> ${hasBidet}</li>
                <li> The room number is ${bookingIDAndRoom.selectedRoom.number}</li>
            </ul>
        </div>
    `);

  if (selectedBooking.date >= getTodaysDate()) {
    document.getElementById('roomDisplayWrapper').innerHTML += (`
            <p class="information">Your booking is for ${makeDateDisplay(selectedBooking.date)}</p>
            <button class="cancel-btn" id="cancelBtn" data-selectedBookingID="${selectedBooking.id}"> Cancel Booking</button>
    `);
  }

}

const confirmCancelCustomer = (bookingID) => {
  document.getElementById('cancelBtn').remove();
  document.getElementById('roomDisplayWrapper').innerHTML += (`
        <form class="form">
            <label class="search-label" for="confirm-cancel">Are you sure you want too cancel?</label>
            <input class="cancel-btn" id="confirmCancelBtn" type="submit" name="confirm-cancel" value="Confirm" data-selectedBookingID="${bookingID}">
        </form>
    `);

}

const cancelBookingAndShowResponse = (bookingID) => {
  cancelBooking(bookingID)
    .then(response => {
      if (!response.ok) {
        throw 'Oops, looks like something went wrong. Please try agian.'
      } else {
        refresPromise(cancelMessage);
      }
    })
    .catch(error => {
      dashboardSectionCustomer.innerHTML += (`<p id="bookingError">${error}</p>`);
      setError(document.getElementById('bookingError'));
    });

}

const bookRoomCustomer = () => {
  hide([dashboardSectionCustomer]);
  show([bookRoomSectionCustomer]);
  bookRoomSectionCustomer.innerHTML = (`
        <nav class="nav">
            <button class="nav-btn" id="dashBtn"> Dashboard</book>
        </nav>
        <section class="find-room-wrapper">
            <h1 class="heading find-room-heading">It pleases the Lord Sauron to find you a fresh room!.</h1>
            <p class="information pick-date-info">When will you Arrive?.</p>
            <form class="room-picker" id="roomPicker">
                <label class="search-label" for="stay-date">Choose From The Calender!: </label>
                <input role='date-picker' aria-label='calendar' class="search-input-calender" type="date" id="datePicker" name="stay-date" value="${getTodaysDate().split('/').join('-')}" min="${getTodaysDate().split('/').join('-')}" max="2024-01-01">
                <input class="find-btn" id="roomPickerBtn" type="submit" value="Find Rooms">
            </form>
        </section>
    `);

}

const displayAvailableRooms = (dateAndElement) => {
  dateAndElement.element.innerHTML = (`
        <nav class="nav">
            <button class="nav-btn" id="dashBtn"> Dashboard</book>
            <button class="nav-btn" id="backToSelectDate">Back</button>
        </nav>
    `);
  const availableRooms = hotel.getAvailableAndUnavailableRooms(dateAndElement.date).availableRooms;
  if (!availableRooms.length) {
    dateAndElement.element.innerHTML += (`
            <div class="no-rooms-available">
                <h1 class="heading">There are no available rooms for ${makeDateDisplay(dateAndElement.date)}.</h1>
                <p class="information">We're so sorry! We are looking forward to having you, can you come another night?</p>
                <button class="search-btn" id="returnToPickerBtn">Pick another Date</button>
            </div>
        `)
  } else {
    displayAvailableUnfilteredRooms({ rooms: availableRooms, date: dateAndElement.date, element: dateAndElement.element });
  }

}

const displayFilteredRoomDetails = (dateAndRoomType) => {
  const availableRooms = hotel.getAvailableAndUnavailableRooms(dateAndRoomType.date).availableRooms;
  if (!dateAndRoomType.roomType.length) {
    document.getElementById('roomPickerHeading').innerText = (`Here are all available rooms for ${makeDateDisplay(dateAndRoomType.date)}.`)
    displayRoomsAndDetails({ rooms: availableRooms, date: dateAndRoomType.date, element: 'availableRoomSection' });
  } else {
    const filteredRooms = hotel.filterRoomsByType({ rooms: availableRooms, roomType: dateAndRoomType.roomType });
    if (!filteredRooms.length) {
      document.getElementById('roomPickerHeading').innerText = (`Sorry, there are no rooms with the type ${makeUpperCase(dateAndRoomType.roomType)} available for ${makeDateDisplay(dateAndRoomType.date)}.`)
    } else {
      document.getElementById('roomPickerHeading').innerText = (`Here are all the rooms with the type ${makeUpperCase(dateAndRoomType.roomType)} available for ${makeDateDisplay(dateAndRoomType.date)}.`)
      displayRoomsAndDetails({ rooms: filteredRooms, date: dateAndRoomType.date, element: 'availableRoomSection' });
    }
  }

}

const displayAvailableUnfilteredRooms = (roomsDateAndElement) => {
  roomsDateAndElement.element.innerHTML += (`
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
  document.getElementById(roomsDateAndElementID.element).innerHTML = '';
  roomsDateAndElementID.rooms.forEach((room, i) => {
    const hasBidet = room.bidet ? 'Has a bidet' : 'Doesn\'t have a bidet';
    document.getElementById(roomsDateAndElementID.element).innerHTML += (`
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

const displayConfirmBooking = (dateAndRoomNum) => {
  const selectedRoom = hotel.findRoom(parseInt(dateAndRoomNum.roomNumber));
  bookRoomSectionCustomer.innerHTML = (`
        <nav class="nav">
            <button class="nav-btn" id="dashBtn"> Dashboard</book>
            <button class="nav-btn" id="backToSelectRoom" data-date="${dateAndRoomNum.date}">Back</button>
        </nav>
        <section class="confirm-booking-customer">
            <h1 class="heading">Let's confirm your booking details.</h1>
            <p class="information">You have not booked this room yet, confirm below to book this room.</p>
            <ul class="list">
                <li> Booking Date: ${makeDateDisplay(dateAndRoomNum.date)}</li>
                <li> Room Type: ${selectedRoom.roomType}</li>
                <li> Room Number: ${selectedRoom.number}</li>
                <li> Bed Size: ${selectedRoom.bedSize}</li>
                <li> Number of Beds: ${selectedRoom.numBeds}</li>
                <li> Cost Per Night: $${selectedRoom.costPerNight}</li>
            </ul>
            <p class="hidden" id="bookingError"></p>
            <button class="confirm-btn" id="confirmBookingBtn" data-date="${dateAndRoomNum.date}" data-roomNumber="${dateAndRoomNum.roomNumber}">Confirm Booking</button>    
        </section>
    `);

}

const confirmBooking = (dateAndRoomNumber) => {
  const booking = hotel.makeBookingObj({ id: customer.id, date: dateAndRoomNumber.date, roomNumber: dateAndRoomNumber.roomNumber });
  postBooking(booking)
    .then(data => {
      refresPromise(bookedMessage)
    })
    .catch(error => {
      show([document.getElementById('bookingError')])
      setError(document.getElementById('bookingError'))
      document.getElementById('bookingError').innerHTML = ` ${error}`;
    });

}



const loginAsCustomer = (loginNum) => {
  show([dashboardSectionCustomer]);
  hide([loginSection]);
  Promise.all([getFetch(`customers/${loginNum}`), getFetch('rooms'), getFetch('bookings')])
    .then(data => {
      customer = new Customer({ customer: data[0], allBookings: data[2].bookings });
      hotel = new Hotel({ allRooms: data[1].rooms, allBookings: data[2].bookings });
      displayCustomerDash();
    })
    .catch(error => {
      setError(document.getElementById('loginDescription'));
      document.getElementById('loginDescription').innerHTML = ` Looks like something went wrong. Error: ${error}`
    });

}
window.addEventListener('load', loginAsCustomer(4))
/* EVENT LISTENERS */




dashboardSectionCustomer.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-bookingID')) {
    const selectedRoom = hotel.findRoom(parseInt(event.target.getAttribute('data-roomNum')));
    if (event.target.getAttribute('data-date') < getTodaysDate()) {
      showSelectBooking({ selectedBooking: event.target.getAttribute('data-bookingID'), selectedRoom: selectedRoom })
    } else if (event.target.getAttribute('data-date') >= getTodaysDate()) {
      showSelectBooking({ selectedBooking: event.target.getAttribute('data-bookingID'), selectedRoom: selectedRoom });
    }
  } else if (event.target.id === 'dashBtn') {
    displayCustomerDash();
  } else if (event.target.id === 'cancelBtn') {
    confirmCancelCustomer(event.target.getAttribute('data-selectedBookingID'));
  } else if (event.target.id === 'confirmCancelBtn') {
    event.preventDefault();
    cancelBookingAndShowResponse(event.target.getAttribute('data-selectedBookingID'));
  } else if (event.target.id === 'bookRoomBtn') {
    bookRoomCustomer();
  }

});


bookRoomSectionCustomer.addEventListener('click', (event) => {
  if (event.target.id === 'roomPickerBtn') {
    event.preventDefault();
    displayAvailableRooms({ date: document.getElementById('datePicker').value.split('-').join('/'), element: bookRoomSectionCustomer });
  } else if (event.target.id === 'roomFilterBtn') {
    event.preventDefault();
    displayFilteredRoomDetails({ roomType: document.getElementById('filterRoomChoice').value, date: event.target.getAttribute('data-date') });
  } else if (event.target.id === 'dashBtn') {
    show([dashboardSectionCustomer]);
    hide([loginSection, bookRoomSectionCustomer]);
    displayCustomerDash();
  } else if (event.target.id === 'backToSelectDate') {
    bookRoomCustomer();
  } else if (event.target.id.includes('selectRoomBtn')) {
    displayConfirmBooking({ date: event.target.getAttribute('data-date'), roomNumber: event.target.getAttribute('data-roomNumber') })
  } else if (event.target.id === 'backToSelectRoom') {
    displayAvailableRooms({ date: event.target.getAttribute('data-date'), element: bookRoomSectionCustomer });
  } else if (event.target.id === 'confirmBookingBtn') {
    confirmBooking({ date: event.target.getAttribute('data-date'), roomNumber: event.target.getAttribute('data-roomNumber') });
  } else if (event.target.id === 'returnToPickerBtn') {
    bookRoomCustomer();
  }

});

