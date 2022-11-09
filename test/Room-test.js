import chai from 'chai';
import Room from '../src/classes/Room';
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
