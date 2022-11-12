import Room from './Room';
import Booking from './Booking';

class Hotel {
  //will take in an object with keys of allRooms, and allBookings
  constructor(allHotelData) {
    this.allRooms = this.returnRoomsObjectArray(allHotelData.allRooms);
    this.allBookings = this.returnBookingsObjectArray(allHotelData.allBookings);
  }
  
  returnRoomsObjectArray(rooms) {
    return rooms.map(room => new Room(room));
  }

  returnBookingsObjectArray(bookings) {
    return bookings.map(booking => new Booking(booking));
  }

  returnAvailableAndBookedRooms(date) {
    const unavailableRoomNums = this.allBookings.filter(booking => { 
    return  booking.date === date
    })
      .map(booking => booking.roomNumber);
    return {
      availableRooms: this.allRooms.filter(room => {
       return !unavailableRoomNums.includes(room.number)
      }),
      unavailableRooms: this.allRooms.filter(room => {
       return unavailableRoomNums.includes(room.number)})
    };
  }

  ReturnBookingObj(bookingData) {
    return {
      "userID": bookingData.id,
      "date": bookingData.date,
      "roomNumber": parseInt(bookingData.roomNumber)
    }
  }

};













export default Hotel;
