// To start a game, press "space-bar"
// To see the score, check the console
// To move left paddle, use "w","s"
// To move right paddle, use "l","p"

// reference to Canvas html element
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');

// class to render backgrounds
class BackgroundMaker {

    constructor(canvasProportion) {
        this.canvasProportion = canvasProportion
    }

    renderBackground = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.canvasProportion[0], this.canvasProportion[1]);
    }
}
 
//class to render and move a ball
class BallMaker {

    constructor(ballPosition, ballSpeed) {
        this.ballPosition = ballPosition
        this.ballSpeed = ballSpeed
        this.score = [0,0]
        // color scheme not ideal, maxing out when one player is too good ;)
        this.rainbowColors = ['red', 'yellow', 'blue', 'green', 'purple', 'gold', 'orange']
        this.actualColor = 3
    }

    renderBall(LeftY, RightY) { 
        ctx.beginPath();
        ctx.arc(this.ballPosition[0], this.ballPosition[1], 10, 0, 2 * Math.PI);
        ctx.fillStyle = this.rainbowColors[this.actualColor]
        ctx.fill();
        // makes ball move in the X axis with "X speed" of ball
        this.ballPosition[0] -= this.ballSpeed[0]
        // makes ball move in the Y axis with "Y speed" of ball
        this.ballPosition[1] += this.ballSpeed[1]
        // makes the ball bounce of the top
        if (this.ballPosition[1] + 10 >= 500) {
            return this.ballSpeed[1] *= -1 
            } 
        // makes the ball bounce of the bottom 
        if (this.ballPosition[1] + 10 <= 10) {
            return this.ballSpeed[1] *= -1 
            }
        // makes the ball bounce of the right    
        if (this.ballPosition[0] + 10 >= 700) {
            return this.ballSpeed[0] *= -1,
            this.score[0] += 1,
            console.log(this.score[0] + " : " + this.score[1]),
            this.actualColor += 1 
            } 
        // makes the ball bounce of the left 
        if (this.ballPosition[0] + 10 <= 0) {
            return this.ballSpeed[0] *= -1,
            this.score[1] += 1,
            console.log(this.score[0] + " : " + this.score[1]),
            this.actualColor -= 1
            }

        // registres when the ball hits the right paddle  
        if (this.ballPosition[0] === 660 || this.ballPosition[0] === 661 || this.ballPosition[0] === 659) {
            if (RightY <= this.ballPosition[1]) {
                if (this.ballPosition[1] <= RightY + 100) {
                    return this.ballSpeed[0] *= -1}}
                } 
        // registres when the ball hits the left paddle    
        if (this.ballPosition[0] === 39 || this.ballPosition[0] === 40 || this.ballPosition[0] === 41) {
            if (LeftY <= this.ballPosition[1]) {
                if (this.ballPosition[1] <= LeftY + 100) {
                    return this.ballSpeed[0] *= -1}}
                }       
    }      
}               
// Class to make Paddles
class PaddleMaker {
    constructor(paddlePositionX, paddlePositionY) {
        this.paddlePositionX = paddlePositionX
        this.paddlePositionY = paddlePositionY
    }

    renderPaddle() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.paddlePositionX, this.paddlePositionY, 20, 100);
        }

    paddleMove(a,b) {
        document.addEventListener('keypress', (e) => {
        if (e.key === a) {
            this.paddlePositionY += 20;
        }
        if (e.key === b) {
            this.paddlePositionY -= 20;
        } 
        }); 
    }
} 

// Main function that creates the instances of the classes and runs the game
const game = () => {
    
    // Creating an Instance of the Backgroundmaker to make a background
    const background = new BackgroundMaker([700,500]) 

    // Creating two instances of the PaddleMaker to make paddles
    const leftPaddle = new PaddleMaker(10, 20)
    const rightPaddle = new PaddleMaker(665, 10)

    // creating instance of BallMaker to create Ball  
    const ballOne = new BallMaker([350, 250], [3, -3])
    
    // Define what keys move the paddles
    leftPaddle.paddleMove("s" , "w")
    rightPaddle.paddleMove("l" , "p")
    
    // function that runs every 17ms and creates the items using the various methods
    setInterval(() => {
        background.renderBackground()
        leftPaddle.renderPaddle()
        rightPaddle.renderPaddle()
        ballOne.renderBall(leftPaddle["paddlePositionY"], rightPaddle["paddlePositionY"])
     },17)}

    // function to initialise the game on keypress (space-bar)
    const playGame = () =>  {
        document.addEventListener('keypress', (e) => {
        if (e.key === " ") {
            return game() 
        }})}

    playGame() 
