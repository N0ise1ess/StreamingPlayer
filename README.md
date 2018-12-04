# Simple player
####Example
```javascript
    let myPlayer = new Player(new (window.AudioContext || window.webkitAudioContext)());
    fetch('./test.mp3').then(res => res.arrayBuffer()).then(res => myPlayer.setData(res));
    //---------//
    myPlayer.play();
    myPlayer.pause();
    myPlayer.stop();
```