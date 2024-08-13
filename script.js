document.addEventListener("DOMContentLoaded", function() {
    const calendarElement = document.getElementById('calendar');
    const titleElement = document.querySelector('.title');
    const modeToggle = document.getElementById('mode-toggle');
    const modeText = document.querySelector('.mode-text');
    let expandedHour = new Date().getHours();
    let manualExpansionTimeout = null;

    // Array of day names
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the current day name and update the title
    const currentDayName = daysOfWeek[new Date().getDay()];
    titleElement.textContent = currentDayName;

    // Toggle dark/light mode
    modeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        modeText.textContent = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
    });

    // Set the initial mode to light mode
    document.body.classList.add('light-mode');

    // Define the detailed schedules for each hour
    const schedules = {
        4: '4:15 - 6:00 : Journal',
        5: '4:15 - 6:00 : Journal',
        6: '6:00 - 7:00 : Momo Time',
        7: '7:00 - 8:00 : Breakfast',
        8: '8:00 - 9:00 : MMW',
        9: '9:00 - 11:30 : YK Media',
        10: '9:00 - 11:30 : YK Media',
        11: '11:30 - 12:30 : Lunch',
        12: '12:30 - 2:30 : Fundraising',
        13: '12:30 - 2:30 : Fundraising',
        14: '2:30 - 3:30 : Work Duty w/ Momo',
        15: '3:30 - 4:30 : RTC',
        16: '4:30 - 5:30 : Dinner',
        17: '5:30 - 6:30 : Fam Time',
        18: '6:30 - 7:00 : Momos Night Routine',
        19: '7:00 - 8:00 : Evening Walk',
        20: '8:00 - 9:00 : Night Routine',
        21: '9:00 : Bedtime',
    };

    // Define secondary text for each hour
    const secondaryText = {
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '(Outside Time, Ark Park w/ Friends, etc.)',
        18: '',
        19: '',
        20: '(Prep Clothes, Drink Tea, Prayer & Devo w/ Sam)',
        21: '',
    };

    function formatTime(hour) {
        const date = new Date();
        date.setHours(hour, 0, 0, 0);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/ AM| PM/, '');
    }

    function expandHour(hour) {
        expandedHour = hour;
        renderCalendar();

        // Clear any existing manual expansion timeout
        if (manualExpansionTimeout) {
            clearTimeout(manualExpansionTimeout);
        }

        // Set a timeout to collapse the manually expanded hour after 45 seconds
        manualExpansionTimeout = setTimeout(() => {
            expandedHour = new Date().getHours();
            renderCalendar();
        }, 20000);
    }

    function renderCalendar() {
        const hours = Array.from({ length: 18 }, (_, i) => i + 4); // 4am to 9pm
        const currentHour = new Date().getHours();
        calendarElement.innerHTML = ''; // Clear the calendar

        hours.forEach(hour => {
            const isExpanded = hour === expandedHour;
            const calendarItem = document.createElement('div');
            calendarItem.className = `calendar-item ${isExpanded ? 'expanded' : 'normal'}`;
            calendarItem.addEventListener('click', () => expandHour(hour));

            const timeElement = document.createElement('span');
            timeElement.className = 'font-semibold';
            timeElement.textContent = formatTime(hour);

            calendarItem.appendChild(timeElement);

            if (hour === currentHour) {
                const currentHourElement = document.createElement('span');
                currentHourElement.className = 'current-hour';
                currentHourElement.textContent = 'Current Hour';
                calendarItem.appendChild(currentHourElement);
            }

            // Add the detailed schedule for this hour
            const detailsElement = document.createElement('div');
            detailsElement.className = 'schedule-details';
            detailsElement.textContent = schedules[hour] || 'No schedule available'; // Default text if no schedule is defined
            calendarItem.appendChild(detailsElement);

            // Add secondary text if the row is expanded
            if (isExpanded) {
                const secondaryElement = document.createElement('div');
                secondaryElement.className = 'secondary-text';
                secondaryElement.textContent = secondaryText[hour] || ''; // Default empty text if no secondary text is defined
                calendarItem.appendChild(secondaryElement);
            }

            calendarElement.appendChild(calendarItem);
        });
    }

    // Initial render
    renderCalendar();

    // Update the current time and re-render every minute
    setInterval(() => {
        if (!manualExpansionTimeout) {
            expandedHour = new Date().getHours();
            renderCalendar();
        }
    }, 60000);
});


