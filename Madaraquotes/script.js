/* 
  adding functions for audio1 
*/
 let audio1 = document.getElementById("audio1");
let playIcon1 = document.getElementById("play1");
let pauseIcon1 = document.getElementById("pause1");
let downloadIcon1 = document.getElementById("download1");

/* 
 adding functions for audio 2 
*/
let audio2 = document.getElementById("audio2");
let playIcon2 = document.getElementById("play2");
let pauseIcon2 = document.getElementById("pause2");
let downloadIcon2 = document.getElementById("download2");

/* 
 play/pause function for audio 1 
 */
function playPause1() {
    if (audio1.paused) {
        audio1.play();
        playIcon1.style.display = "none";
        pauseIcon1.style.display = "inline-block";
    } else {
        audio1.pause();
        playIcon1.style.display = "inline-block";
        pauseIcon1.style.display = "none";
    }
}

function onAudioEnded() {
    audio1.pause();
    playIcon1.style.display = "inline-block";
    pauseIcon1.style.display = "none";
}

/* 
 play/pause function for audio 2 
 */
function playPause2() {
    if (audio2.paused) {
        audio2.play();
        playIcon2.style.display = "none";
        pauseIcon2.style.display = "inline-block";
    } else {
        audio2.pause();
        playIcon2.style.display = "inline-block";
        pauseIcon2.style.display = "none";
    }
}

function onAudioEnded() {
    audio2.pause();
    playIcon2.style.display = "inline-block";
    pauseIcon2.style.display = "none";
}

/* 
 download function for audio 1 
 */
function downloadAudio1() {
    fetch('Madaraquote1.mp3')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Madaraquote1.mp3';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error fetching audio:', error));
}

/* 
 download function for audio 2 
 */
function downloadAudio2() {
    fetch('Madaraquote2.mp3')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Madaraquote2.mp3';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error fetching audio:', error));
}

/* 
 eventlistner for audio1 
 */
audio1.addEventListener("ended", onAudioEnded);
playIcon1.addEventListener("click", playPause1);
pauseIcon1.addEventListener("click", playPause1);
downloadIcon1.addEventListener("click", downloadAudio1);

/* 
 eventlistner for audio2
 */
audio2.addEventListener("ended", onAudioEnded);
playIcon2.addEventListener("click", playPause2);
pauseIcon2.addEventListener("click", playPause2);
downloadIcon2.addEventListener("click", downloadAudio2);