import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';

describe('Booking', function() {
  
  it('should be a function', () =>  {
    expect(Booking).to.be.a('function');
  });
});
