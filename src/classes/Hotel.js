import Room from './Room';
import Booking from './Booking';

class Hotel {
  //will take in an object with keys of allRooms, and allBookings
  constructor(allHotelData) {
    this.allRooms = this.makeRooms(allHotelData.allRooms);
    this.allBookings = this.makeBookings(allHotelData.allBookings);
  }
}

makeRooms(rooms) {
  return rooms.map(room => new Room(room));
}











export default Hotel;
