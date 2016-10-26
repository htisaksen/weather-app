var todayDate = function(){
  var date = new Date();
  //date.getMonth() returns a number -1 from the actual month(october = 9). monthArray will display the month based on the number.
  var monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
  return monthArray[date.getMonth()] + " " + date.getDate()+ 'th' + " " + date.getFullYear()
}
module.exports = todayDate;
