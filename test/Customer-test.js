import chai from 'chai';
import Customer from '../src/classes/Customer';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';
const expect = chai.expect;

describe('Customer', () => {
  let newCustomer1,newCustomer2,userInfo1,userInfo2;

  beforeEach(() => {
    userInfo1 = user1;
    userInfo2 = user2;
    newCustomer1 = new Customer(userInfo1);
    newCustomer2 = new Customer(userInfo2);
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





});
