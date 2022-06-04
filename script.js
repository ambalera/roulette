//aa

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


let count = -1
const statu = document.getElementById("status")
const main = document.getElementById("main")
const game = document.getElementById("game")
const output = document.getElementById("output")
const controls = document.getElementById("controls")
const restart = document.getElementById("restart")
const playerInput = document.getElementById("playerInput")
//statu.innerText = ""
  
let players = []
let Playing = -1
let pointBucket = 0
let cylinder = [false,false,false,false,false,false]
cylinder[randomIntFromInterval(0, 5)] = true

let a = 1

function log(i, death) {
    let span = document.createElement("span")
    span.innerHTML = i
    if (a==1) {
        span.style.backgroundColor = "lightgrey";
        a = 2;
    } else {
        span.style.backgroundColor = "white"
        a = 1
    }
    if (death) { span.style.color = "red" }
    output.appendChild(span)
    span.scrollIntoView()
}

function cycle() {
    Playing += 1
    console.log(players)
    console.log(Playing)
    if (players.length<=1) {
        if (Playing>players.length-1) {
            Playing = 0
        }
        log(`Player ${players[Playing]} wins with ${pointBucket} points.`)
        controls.hidden = true
        restart.hidden = false
    } else {
        if (Playing>players.length-1) {
            Playing = 0
        }
        log(`It is now Player ${players[Playing]}'s turn`)
    }
}

function start() {
    if (playerInput.value<=8 && playerInput.value>1) {
        for (i=1; i<=playerInput.value; i++) {
            players.push(i)
        }
        main.hidden = true
        game.hidden = false
        controls.hidden = false
        log(`Playing: ${playerInput.value}`)
        cycle()
    } else {
        statu.innerText = "Please enter a number between 2 and 8."
    }
}

function restartGame() {
    output.innerHTML = ""
    log(`Restarting round...`)
    players = []
    for (i=1; i<=playerInput.value; i++) {
        players.push(i)
    }
    controls.hidden = false
    restart.hidden = true
    count = -1
    Playing = 0
    turns = 0
    cylinder = [false,false,false,false,false,false]
    cylinder[randomIntFromInterval(0, 5)] = true
    pointBucket = 0
    log(`It is now Player ${players[Playing]}'s turn`)
}

function fire() {
    log(`Player ${players[Playing]} has decided to fire.`)
    count += 1
    if (count>5) { count = 0 }
    if (cylinder[count]) {
        let audio = new Audio('bang.mp3');
        audio.play()
        log(`Player ${players[Playing]} has died.`, true)
        players.splice(Playing, 1)
    } else {
        pointBucket += 1
        log(`Player ${players[Playing]} survives.`)
    }
    cycle()
}

function spinfire() {
    log(`Player ${players[Playing]} has decided to spin & fire.`)
    cylinder = [false,false,false,false,false,false]
    cylinder[randomIntFromInterval(0, 5)] = true
    count = randomIntFromInterval(0, 5)
    if (cylinder[count]) {
        let audio = new Audio('bang.mp3');
        audio.play()
        log(`Player ${players[Playing]} has died.`, true)
        players.splice(Playing, 1)
    } else {
        log(`Player ${players[Playing]} survives.`)
    }
    cycle()
}