/*
Snowflake code inspired by STEAM COOKER Capstone Project - http://steamcooker.org

Snowflake concept inspired by "Holiday Wrapping Paper" by Jain7th on Github.
https://github.com/jain7th/Processing-Tree-and-Snowflake-Generator

Feel free to play around with this code and see how it changes the card!
Don't worry about breaking anything - you can always refresh the screen :)
*/


var snowflakes = [];
var bigSnowflake;
var bigSnowflakeRotation = 0;

function preload() {
  holidaySound = loadSound('assets/Dan_Lerch_-_09_-_O_Tannenbaum.mp3');
}

function setup() {
		frameRate(5);

		//create canvas
     mainCanvas =  createCanvas(windowWidth, windowHeight);

    //play background music
    holidaySound.play();

    // center the snowflake drawing within the canvas
     rectMode( CENTER);
    // round off the ends of strokes
     strokeCap( ROUND);

     // white background
     background(245);


    // draw a random snowflake in the middle of the screen, from a radius of 150 to 200 pixels across
    var sSize = random(200, 220);
    // determine the length of the long (longitudinal) arms of the flake
    var rLong =  round( random(sSize*0.5, sSize));

    // determine the length of three arms that will extend from the longitudinal arm
    var rArmFir =  round(rLong* random(0.2, 0.6));
    var rArmSec =  round(rArmFir* random(0.3, 0.9));
    var rArmThi =  round(rArmSec* random(0.1, 1.0));

    // create a random number of (even) snowflake arms from 6 to 14
    var arms = 2 * Math.floor( random(3,7));

    drawSnowflake(width/2, height/2 - 100, 145, 245, 'big', rLong, rArmFir, rArmSec, rArmThi, arms);
    bigSnowflake = new snowflake(width/2, height/2 - 100, 145, 245, rLong, rArmFir, rArmSec, rArmThi, arms);

    //make snowflakes
    for(var i = 0; i < 250; i++){
    	flakeX = random(width);
    	flakeY = random(height);
    	sSize = random(12, 50);
    	opacity = random(25, 70);


	    // determine the length of the long (longitudinal) arms of the flake
	    rLong =  round( random(sSize*0.5, sSize));

	    // determine the length of three arms that will extend from the longitudinal arm
	    rArmFir =  round(rLong* random(0.2, 0.6));
	    rArmSec =  round(rArmFir* random(0.3, 0.9));
	    rArmThi =  round(rArmSec* random(0.1, 1.0));

      // create a random number of (even) snowflake arms from 6 to 14
      var arms = 2 * Math.floor( random(3,7));

    	drawSnowflake(flakeX, flakeY, sSize, opacity, i, rLong, rArmFir, rArmSec, rArmThi, arms);

    	//add snowflake class to snowflake array
    	snowflakes[i] = new snowflake(flakeX, flakeY, sSize, opacity, rLong, rArmFir, rArmSec, rArmThi, arms);

    }

    fill(78, 17, 82);
    noStroke();
    textSize(32);
    textAlign(CENTER);
    textFont("Georgia");

}

function draw() {
  // white background
  background(245);

  //draw and rotate big snowflake
  drawSnowflake(bigSnowflake.flakeX, bigSnowflake.flakeY, bigSnowflake.sSize, bigSnowflake.opacity, 'big', bigSnowflake.rLong, bigSnowflake.rArmFir, bigSnowflake.rArmSec, bigSnowflake.rArmThi, bigSnowflake.arms);


  //snowflakes fall
  for (i = 0; i < snowflakes.length; i++) {
  	//move snowflake down (falling) if it's higher than the ground)
  	if(snowflakes[i].flakeY < height - 10){
  		snowflakes[i].flakeY = snowflakes[i].flakeY + round(random(1, 7));
  	}

    drawSnowflake(snowflakes[i].flakeX, snowflakes[i].flakeY, snowflakes[i].sSize, snowflakes[i].opacity, snowflakes[i].num, snowflakes[i].rLong, snowflakes[i].rArmFir, snowflakes[i].rArmSec, snowflakes[i].rArmThi, snowflakes[i].arms);


  }

	text("Happy Holidays", width/2, height - 160);
	text("Happy Coding", width/2, height - 115);
	text("✦ Vidcode ✦", width/2, height - 40);

}

var drawSnowflake = function(x, y, sSize, opacity, num, rLong, rArmFir, rArmSec, rArmThi, arms) {

  push();

    // move to the x,y location to begin drawing
     translate(x, y);

    //rotate big snowflake
		if(num == "big"){
			bigSnowflakeRotation = bigSnowflakeRotation + 0.02;
			rotate(bigSnowflakeRotation);
		}

     noFill();

    // choose a blue-green random color
     stroke( random(100, 150),  random(50, 120),  random(150, 255), opacity);
     if(num == "big"){
     	stroke(78, 17, 82);
     }

    // weight the snowflake stroke randomly based on its size
     strokeWeight(sSize*0.02);


    // draw each of the arms of the snowflake
    for (var i = 0; i < arms; i++) {
         rotate(  PI /( arms / 2 ));

        // draw the long axis of the snowflake arm
         line(0, 0-rLong, 0, 0);

        //Top Arms Right
         line(0, 0-rArmFir, 0 +  round(rArmFir*0.8), 0 -  round(rArmFir*1.8));
         line(0, 0-rArmSec, 0 +  round(rArmSec*0.8), 0 -  round(rArmSec*1.8));
         line(0, 0-rArmThi, 0 +  round(rArmThi*0.8), 0 -  round(rArmThi*1.8));

        //Top Arms Left
         line(0, 0-rArmFir, 0 -  round(rArmFir*0.8), 0 -  round(rArmFir*1.8));
         line(0, 0-rArmSec, 0 -  round(rArmSec*0.8), 0 -  round(rArmSec*1.8));
         line(0, 0-rArmThi, 0 -  round(rArmThi*0.8), 0 -  round(rArmThi*1.8));
    }
  pop();


}


//create a snowflake object
function snowflake(flakeX, flakeY, sSize, opacity, rLong, rArmFir, rArmSec, rArmThi, arms) {
	this.flakeX = flakeX;
	this.flakeY = flakeY;
	this.sSize = sSize;
	this.opacity = opacity;
	this.rLong = rLong;
  this.rArmFir = rArmFir;
  this.rArmSec = rArmSec;
  this.rArmThi = rArmThi;
  this.arms = arms;
}

