import chai from 'chai';
import Customer from '../src/classes/Customer';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';
const expect = chai.expect;

describe('Customer', () => {
  let newCustomer1,newCustomer2,userInfo1,userInfo2,users;

  beforeEach(() => {
    userInfo1 = user1;
    userInfo2 = user2;
    users = [userInfo1,userInfo2]
    newCustomer1 = new Customer({customer: users[0], allBookings: bookingsArray});
    newCustomer2 = new Customer({customer: users[1], allBookings: bookingsArray});
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(newCustomer1).to.be.an.instanceOf(Customer);
  });

  it('should have a name property', () => {
    expect(newCustomer1.name).to.equal('Leatha Ullrich')
    expect(newCustomer2.name).to.equal('Rocio Schuster')
  });

  it('should have an id property', () => {
    expect(newCustomer1.id).to.equal(1)
    expect(newCustomer2.id).to.equal(2)
  });

  it('Should have a future bookings prop', () => {
    expect(newCustomer2.futureBookings).to.deep.equal([bookingsArray[47]]);
  });

  it('Should have a past bookings prop', () => {
    expect(newCustomer1.pastBookings).to.deep.equal([bookingsArray[4]]);
  });

  it('Should return total spent on rooms', () => {
    const lifeTimeTotal = newCustomer1.returnTotalSpent(roomsArray);
    expect(lifeTimeTotal).to.equal(172.09);
  });




});
