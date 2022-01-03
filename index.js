document.addEventListener('DOMContentLoaded', function() {
    const date = new Date();

    const today = document.querySelector('.content__date');
    const phrase = document.querySelector('.content__phrase');

    const hours = document.querySelector('#timer-hours');
    const minutes = document.querySelector('#timer-minutes');
    const seconds = document.querySelector('#timer-seconds');
    
    const btnClear = document.querySelector('#btn-clear');
    const btnStart = document.querySelector('#btn-start');
    const btnStop = document.querySelector('#btn-stop');

    const playerPrev = document.querySelector('#player-prev');
    const playerToggle = document.querySelector('#player-toggle');
    const playerNext = document.querySelector('#player-next');


    today.textContent = date;

    let secondsValue = 0;
    let minutesValue = 0;
    let hoursValue = 0;

    let timer = null;

    function addZero(number) {
        if (number < 10) return '0' + number;
        return number;
    }

    function startTimer() {
        const audio = new Audio('assets/audio/notification.wav');

        btnStart.disabled = true;

        timer = setInterval(function() {
            seconds.textContent = addZero(secondsValue);
            minutes.textContent = addZero(minutesValue);
            hours.textContent = addZero(hoursValue);
    
            secondsValue++;
    
            if (secondsValue >= 60) {
                secondsValue = 0;
                minutesValue++;
            }
            if (minutesValue >= 60) {
                secondsValue = 0;
                minutesValue = 0;
                hoursValue++;
            }

            if (minutesValue % 15 === 0) {
                audio.play();
            }

        }, 1000)
    } 

    function stopTimer() {
        clearInterval(timer);
        btnStart.disabled = false;
    }

    function clearTimer() {
        stopTimer();

        secondsValue = 0;
        minutesValue = 0;
        hoursValue = 0;
        
        seconds.textContent = addZero(secondsValue);
        minutes.textContent = addZero(minutesValue);
        hours.textContent = addZero(hoursValue);
        btnStart.disabled = false;
    }

    const tracks = [
        new Audio('assets/audio/track-1.mp3'),
        new Audio('assets/audio/track-2.mp3'),
        new Audio('assets/audio/track-3.mp3'),
        new Audio('assets/audio/track-4.mp3'),
        new Audio('assets/audio/track-5.mp3')
    ]
    let currentTrackIndex = 2;
    let currentTrack = tracks[currentTrackIndex];

    function playPrevTrack() {
        currentTrack.pause();

        if (currentTrackIndex > 0) {
            currentTrackIndex--;
        } else {
            currentTrackIndex = tracks.length - 1;
        }

        currentTrack = tracks[currentTrackIndex];
        currentTrack.play();
    }
    function playNextTrack() {
        currentTrack.pause();

        if (currentTrackIndex === tracks.length - 1) {
            currentTrackIndex = 0;
        } else {
            currentTrackIndex++;
        }

        currentTrack = tracks[currentTrackIndex];
        currentTrack.play();
    }
    function toggleTrackPlayback() {
        return currentTrack.paused ? currentTrack.play() : currentTrack.pause();
    }

    // Listeners

    playerPrev.addEventListener('click', playPrevTrack);
    playerNext.addEventListener('click', playNextTrack);
    playerToggle.addEventListener('click', toggleTrackPlayback);
    
    btnStart.addEventListener('click', startTimer);
    btnStop.addEventListener('click', stopTimer);
    btnClear.addEventListener('click', clearTimer);

    fetch('https://zenquotes.io/api/random')
    .then(data => {
        console.log(data.json())
        phrase.textContent =  data.json()[0] || 'Have a nice day';
    })
    .catch(() => {
        phrase.textContent = 'Have a nice day';
    })

})