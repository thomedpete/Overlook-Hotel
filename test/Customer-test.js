import chai from 'chai';
import Customer from '../src/classes/Customer';
import { user1, user2, roomsArray, bookingsArray } from '../src/test-data/test-data';
const expect = chai.expect;

describe('Customer', () => {
  let newCustomer;

  beforeEach(() => {
    newCustomer = new Customer()
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });
});
