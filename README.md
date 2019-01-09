# Streaming player


### For init player:

```javascript
    const myPlayer = new StreamingPlayer(new (window.AudioContext || window.webkitAudioContext)());
    myPlayer.downloadSound(<<Your url>>);
```

### Use standart methods:

```javascript
    myPlayer.play();
    myPlayer.pause();
    myPlayer.stop();
    myPlayer.changeVolume(100) //100% (max 200)
    myPlayer.changeTime(100) //100 second to up (-100 second to down)
```

### Filters

```javascript
    ///for create standart filters call the method
    myPlayer.createStandartFilters();

    ///you can create castom filters:
    myPlayer.createFilter(option);
```

Filters have options:

|  Name  | 
| ------ |
|type|
|frequency|
|gain|
|Q|

### List propertes:

|  Name  | 
| ------ |
|Filters|
|Context|
|Buffer|
|Source|
|CurrentTimeBuffer|
|DurationBuffer|