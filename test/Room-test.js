import chai from 'chai';
import Room from '../src/classes/Room';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';
const expect = chai.expect;

describe('Room', () => {
  let newRoom1,newRoom2,singleRoom1,singleRoom2;

  beforeEach(() => {
    singleRoom1 = roomsArray[0]
    singleRoom2 = roomsArray[1]
    newRoom1 = new Room(singleRoom1)
    newRoom2 = new Room(singleRoom2)
  });

  it('should be a function',() => {
    expect(Room).to.be.a('function');
  });

  it('should return true',() => {
    expect(true).to.equal(true);
  });

  
});
