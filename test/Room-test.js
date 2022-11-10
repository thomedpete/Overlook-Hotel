import chai from 'chai';
import Room from '../src/classes/Room';
import { roomsArray } from '../src/test-data/test-data';
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

  it('should be an instance of Room',() => {
    expect(newRoom1).to.be.an.instanceOf(Room);
    expect(newRoom2).to.be.an.instanceOf(Room);
  });

  it('should have a number property', () => {
    expect(newRoom1.number).to.equal(1)
    expect(newRoom2.number).to.equal(2)
  });

  it('should have a type property', () => {
    expect(newRoom1.roomType).to.equal('residential suite')
    expect(newRoom2.roomType).to.equal('suite')
  });

  it('should have or not have a bidet', () => {
    expect(newRoom1.bidet).to.equal(true)
    expect(newRoom2.bidet).to.equal(false)
  });

  it('should have a bed size property', () => {
    expect(newRoom1.bedSize).to.equal('queen')
    expect(newRoom2.bedSize).to.equal('full')
  });

  it('should have a number of beds property', () => {
    expect(newRoom1.numBeds).to.equal(1)
    expect(newRoom2.numBeds).to.equal(2)
  });

  it('should have a cost per night property', () => {
    expect(newRoom1.costPerNight).to.equal(358.4)
    expect(newRoom2.costPerNight).to.equal(477.38)
  });




  
});
