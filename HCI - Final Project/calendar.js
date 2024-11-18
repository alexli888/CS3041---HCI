document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        droppable: true,
        events: [
            { title: 'Study Math', start: '2024-11-20' },
            { title: 'Group Project', start: '2024-11-22' }
        ],
        eventDrop: function (info) {
            alert(`${info.event.title} was moved to ${info.event.start.toISOString().split('T')[0]}`);
        }
    });
    calendar.render();
});
