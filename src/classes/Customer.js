class Customer {
  constructor(customerData) {
    this.id = customerData.id
    this.name = customerData.name
    this.pastBookings = []
    this.futureBookings = []
    this.bookedRooms = []
    this.totalMoneySpent = 0
  }
}

export default Customer;