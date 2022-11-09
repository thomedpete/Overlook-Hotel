import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import { bookingsArray } from '../src/test-data/test-data';

describe('Booking',() => {
  let singleBooking1,singleBooking2,bookingInfo1,bookingInfo2; 

  beforeEach(() => {
    bookingInfo1 = bookingsArray[0];
    bookingInfo2 = bookingsArray[1];
    singleBooking1 = new Booking(bookingInfo1);
    singleBooking2 = new Booking(bookingInfo2);
    });

  it('should be a function', () =>  {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(singleBooking1).to.be.an.instanceOf(Booking);
  });

  it('should have an id property', () => {
    expect(singleBooking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(singleBooking2.id).to.equal("5fwrgu4i7k55hl6t5");
  });

  it('should have a USER ID property', () => {
    expect(singleBooking1.userID).to.equal(9);
    expect(singleBooking2.userID).to.equal(43);
  });

  it('should have a date property', () => {
    expect(singleBooking1.date).to.equal("2022/04/22");
    expect(singleBooking2.date).to.equal("2022/01/24");
  });

  it('should have a room number property', () => {
    expect(singleBooking1.roomNumber).to.equal(15);
    expect(singleBooking2.roomNumber).to.equal(24);
  });



});
