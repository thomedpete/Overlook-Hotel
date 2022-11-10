import chai from 'chai';
import Customer from '../src/classes/Customer';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';
const expect = chai.expect;

describe('Customer', () => {
  let newCustomer1,newCustomer2,userInfo1,userInfo2,allBookings;

  beforeEach(() => {
    userInfo1 = user1;
    userInfo2 = user2;
    newCustomer1 = new Customer(userInfo1);
    newCustomer2 = new Customer(userInfo2);
    allBookings = bookingsArray
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

  it('should be able to check existing bookings', () => {
    newCustomer1.checkAllBookings(allBookings)
    expect(newCustomer1.pastBookings).to.deep.equal(
      [
        {
          id: '5fwrgu4i7k55hl6t8',
          userID: 1,
          date: '2022/02/05',
          roomNumber: 12
        }
    ]
    )
  });

  it('should not push bookings in if they do not match userID', () => {
    newCustomer1.checkAllBookings(allBookings)
    newCustomer2.checkAllBookings(allBookings)
    
    expect(newCustomer1.futureBookings).to.deep.equal([])
    
    expect(newCustomer2.futureBookings).to.deep.equal([
      {
      "date": "2023/01/09",
      "id": "5fwrgu4i7k55hl6uf",
      "roomNumber": 18,
      "userID": 2
     }
    ]);
  });

  it('should be able to check total money spent', () => {
    newCustomer1.checkAllBookings(allBookings)
    expect(newCustomer1.returnTotalMoneySpent(roomsArray)).to.equal(172.09)
  });




});
