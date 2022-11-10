class Customer {
  constructor(customerData) {
    this.id = customerData.id
    this.name = customerData.name
    this.pastBookings = []
    this.futureBookings = []
    this.bookedRooms = []
    this.totalMoneySpent = 0
  }
  
  checkAllBookings(bookingsArray) {
    let filterByUserBookings = bookingsArray.filter((element) => {
      return this.id === element.userID
    });
    let today = new Date().toJSON().slice(0, 10);
    let compDay;
    filterByUserBookings.forEach((booking) => {
      let bookingDate = booking.date;
      let formatDates = bookingDate.split('/').join('-');
      compDay = new Date(formatDates).toJSON().slice(0, 10);
      if (today >= compDay) { 
        this.pastBookings.push(booking) 
      } else if (today < compDay) { 
        this.futureBookings.push(booking) 
      };
    });
  }



};

export default Customer;