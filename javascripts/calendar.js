
  const monthYear = document.getElementById('monthYear');
  const calendarDays = document.getElementById('calendarDays');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay(); // Sunday=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    calendarDays.innerHTML = '';
    monthYear.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Adjust so Monday is first
    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    // Previous month days
    for(let i = startDay; i > 0; i--) {
      const div = document.createElement('div');
      div.classList.add('other-month');
      div.textContent = prevMonthDays - i + 1;
      calendarDays.appendChild(div);
    }

    // Current month days
    for(let i = 1; i <= daysInMonth; i++) {
      const div = document.createElement('div');
      div.textContent = i;
      if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
        div.classList.add('today');
      }
      calendarDays.appendChild(div);
    }

    // Next month days to fill grid (if needed)
    const totalCells = calendarDays.children.length;
    const nextDays = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
    for(let i = 1; i <= nextDays; i++){
      const div = document.createElement('div');
      div.classList.add('other-month');
      div.textContent = i;
      calendarDays.appendChild(div);
    }
  }

  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if(currentMonth < 0){
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if(currentMonth > 11){
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
