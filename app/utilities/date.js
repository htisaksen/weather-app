var todayDate = function(){
  var date = new Date();
  //date.getMonth() returns a number -1 from the actual month(october = 9). monthArray will display the month based on the number.
  var monthArray = new Array();
  monthArray[0] = "January";
  monthArray[1] = "February";
  monthArray[2] = "March";
  monthArray[3] = "April";
  monthArray[4] = "May";
  monthArray[5] = "June";
  monthArray[6] = "July";
  monthArray[7] = "August";
  monthArray[8] = "September";
  monthArray[9] = "October";
  monthArray[10] = "November";
  monthArray[11] = "December";
  return monthArray[date.getMonth()] + " " + date.getDate()+ 'th' + " " + date.getFullYear()
}
module.exports = todayDate;
