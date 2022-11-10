import chai from 'chai';
import Room from '../src/classes/Room';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';
const expect = chai.expect;

describe('Room', () => {
  let newRoom;

  beforeEach(() => {
    newRoom = new Room()
  });

  it('should return true', function () {
    expect(true).to.equal(true);
  });
});
