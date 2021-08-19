function createCalendar(elem, year, month) {
    let currDate = new Date();
    let highlight = String(currDate.getDate()).padStart(2, '0');
    let mon = month; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let table = '<table><h2 class="month">' + monthNames[mon] + " - "+ d.getFullYear() + '</h2>';
    //let table = '<table><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr><tr>';
    table += '<table><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr><tr>';
  
    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    let prev = new Date(year, month, 0).getDate();
    console.log(d.getDay()-1)
    let start = prev - d.getDay() + 1;
    for (let i = 0; i < getDay(d); i++) {
      table += '<td class="dummy2"><span class="test dummy">' + start + '</span></td>';
      start++;
      }
  
    // <td> with actual dates
    let calItems = getFromLocalStorage3();
    while (d.getMonth() == mon) {
      if(d.getDate() == highlight && mon == currDate.getMonth()){
        table += '<td class="highlight"><span class="test highlight">' + d.getDate() + '</span></td>';
      }
      // else if(){

      // }
      else{
        table += '<td><span class="test">' + d.getDate() + '</span></td>';
      }
      //table += '<td id="kalb" fix()>' + d.getDate() + '</td>';
      
      if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        table += '</tr><tr>';
      }
  
      d.setDate(d.getDate() + 1);
    }
  
    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    let after = 1; 
    console.log(getDay(d));
    if (getDay(d) !== 0) {
      for (let i = getDay(d)-1; i < 6; i++) {
        table += '<td class="dummy2"><span class="test dummy">' + after + '</span></td>';
        after++; 
      }
    }
  
    // close the table
    table += '</tr></table>';
  
    elem.innerHTML = table;
  }
  
  function getDay(date) { // get day number from 0 (Monday) to 6 (Sunday)
    return date.getDay();
  }

  function getFromLocalStorage3() {
    var reference = localStorage.getItem('items');
    // if reference exists
    if (reference) {
      // converts back to array and store it in items array
      items = JSON.parse(reference);
      return items; 
    }
  }

  let d = new Date();
  let m = d.getMonth();
  let y = d.getFullYear();


  createCalendar(calendar, y, m);