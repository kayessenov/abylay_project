module.exports = function (str = '', { onlyDate } = {}) {
 
    if (typeof str == 'string') str = str.trim();
    if (!str) return new Date().toISOString();
    if (isNaN(str)) {
     let date, time;
     if (str.indexOf('T') > 0) {
      [ date, time ] = str.split('T');
     } else
     if (str.indexOf(',') > 0) {
      [ date, time ] = str.split(',');
     } else {
      [ date, time ] = str.split(' ');
     }
     if (!time) {
      time = '';
     } else {
      time = time.trim();
     }
   
     if (date.indexOf('.') > 0) date = date.split('.').reverse().join('-');
   
     str = (date + ' ' + time).trim();
     if (str.substr(-1) != 'Z') str += 'Z';
    } else {
     str = parseInt(str);
    }
   
    let res = new Date(str);
   
    if (res == 'Invalid Date') return null;
    
    if (onlyDate) res.setHours(0, 0, 0, 0);
   
    return res.toISOString();
   
   };
   