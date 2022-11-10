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
    let compDay;
    let today = new Date().toJSON().slice(0, 10);
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
  returnTotalMoneySpent(roomsArray) {
    let pastRoomNumbers = this.pastBookings.map((booking) => { 
      return  booking.roomNumber
    });
    roomsArray.forEach((room) => {
      if (pastRoomNumbers.includes(room.number)) {
        this.bookedRooms.push(room)
      }
    });
    let futureRoomNumbers = this.futureBookings.map((booking) => { 
      return  booking.roomNumber
    });
    roomsArray.forEach((room) => {
      if (futureRoomNumbers.includes(room.number)) {
        this.bookedRooms.push(room)
      }
    })
    let totalCost = this.bookedRooms.reduce((acc, room) => {
      return acc += room.costPerNight
    }, 0)
    this.totalMoneySpent = totalCost
    return totalCost
  };
};





export default Customer;