function createCalendar(elem, year, month) {

  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);

  let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

  // spaces for the first row
  // from Monday till the first day of the month
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += '<td></td>';
    }

  // <td> with actual dates
  while (d.getMonth() == mon) {
    table += '<td><span class="test">' + d.getDate() + '</span></td>';
    //table += '<td id="kalb" fix()>' + d.getDate() + '</td>';
    
    if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
      table += '</tr><tr>';
    }

    d.setDate(d.getDate() + 1);
  }

  // add spaces after last days of month for the last row
  // 29 30 31 * * * *
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += '<td></td>';
    }
  }

  // close the table
  table += '</tr></table>';

  elem.innerHTML = table;
}

function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

// play around with this
//function fix() {
//    var elem = document.getElementById('kalb');
//    elem.style.align = "right";
//    elem.style.verticalAlign = "top";
//}
 
//createCalendar(calendar, 2021, 10);

function saveFile(){
  alert('test');
  let FileSaver = require('file-saver');
  let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "hello world.txt");
}

function download(filename) {
  var element = document.createElement('a');
  text = document.getElementById("plan-inp").value;
  date = document.getElementById("due-date").value;
  
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(date + ": " + text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}