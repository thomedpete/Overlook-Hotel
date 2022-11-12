import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';

describe('Hotel', () => {
  let newHotel, hotelInfo; 

  beforeEach(() => {
    hotelInfo = { allRooms: roomsArray, allBookings: bookingsArray }
    newHotel = new Hotel(hotelInfo)
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(newHotel).to.be.an.instanceOf(Hotel);
  });

  it('Should have an array of all the rooms', () => {
    expect(newHotel.allRooms).to.deep.equal(roomsArray);
  });

  it('Should have an array of all the bookings', () => {
    expect(newHotel.allBookings).to.deep.equal(bookingsArray);
  });

  it('Should update all unavailable rooms from the Hotel unavailableRooms prop ', () => {
    const unavailableRooms = newHotel.returnAvailableAndBookedRooms('2022/04/22').unavailableRooms;
    expect(unavailableRooms).to.deep.equal([
    {
    "bedSize": "full",
    "bidet": false,
    "costPerNight": 294.56,
    "numBeds": 1,
    "number": 15,
   "roomType": "residential suite",
    }
    ]);
  });


  it('should ', () => {
    expect().to.deep.equal();
  });

  it('should ', () => {
    expect().to.equal()
  });




});