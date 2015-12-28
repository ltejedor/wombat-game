var wombat_x;
var wombat_y;
var wallCollision;

function setup() {
  mainCanvas = createCanvas(windowWidth, windowHeight);

  frameRate(20);

  half_w=width/2;
  half_h=height/2;

  noStroke();
  background(80, 200, 150);

  wombat(half_w, half_h);


  wombat_x = half_w;
  wombat_y = half_h;


  walls = [];

  //top walls
  walls[0] = new wall(160, 130, 300, 15);
  walls[1] = new wall(460, 130, 15, 120);
  walls[2] = new wall(460, 250, 300, 15);
  walls[3] = new wall(760, 130, 15, 135);
  walls[4] = new wall(760, 130, 300, 15);
  walls[5] = new wall(1060, 0, 15, 145);


  //flip level - bottom walls
  flipPlatform(160, 130, 300, 15, 6);
  flipPlatform(460, 130, 15, 120, 7);
  flipPlatform(460, 250, 300, 15, 8);
  flipPlatform(760, 130, 15, 135, 9);
  flipPlatform(760, 130, 300, 15, 10);
  flipPlatform(1060, 0, 15, 145, 11);


  //left walls
  walls[12] = new wall(160, 250, 150, 15);
  walls[13] = new wall(310, 250, 15, 120);
  walls[14] = new wall(160, 355, 150, 15);

  flipPlatform(160, 250, 150, 15, 15);
  flipPlatform(310, 250, 15, 120, 16);
  flipPlatform(160, 355, 150, 15, 17);

}



function draw() {
  background(80, 200, 150);
  //make walls
  fill(200, 200, 200);

  for(i = 0; i < walls.length; i++){
    rect(walls[i].wall_x, walls[i].wall_y, walls[i].wall_width, walls[i].wall_height);
  }


  wombat(wombat_x, wombat_y);

}

function keyPressed() {
  if(!(wombatCollision())){
    if (keyCode === LEFT_ARROW) {
      if(wallCollision == false){
        //wombat goes left
        wombat_x = wombat_x - 12;
      }else{
        wombat_x = wombat_x + 12;
      }
    } else if (keyCode === RIGHT_ARROW) {
        if(wallCollision == false){
          //wombat goes right
          console.log('not hitting wall');
          wombat_x = wombat_x + 12;
        }else if(wallCollision == true){
          console.log('hitting wall');
          wombat_x = wombat_x - 12;
      }
      }if (keyCode === UP_ARROW) {
        if(wallCollision == false){
          //wombat goes up
          wombat_y = wombat_y - 12;
        }
        else{
          wombat_y = wombat_y + 12;
        }
    } else if (keyCode === DOWN_ARROW) {
      if(wallCollision == false){
        //wombat goes down
        wombat_y = wombat_y + 12;
      }
      else{
        wombat_y = wombat_y - 12;
      }
    }
  }
}

//create a wall object
function wall(wall_x, wall_y, wall_width, wall_height) {
  this.wall_x = wall_x;
  this.wall_y = wall_y;
  this.wall_width = wall_width;
  this.wall_height = wall_height;
}


 function wombat(w_x, w_y){
  fill(80, 50, 50);
  //ears
  ellipse(w_x-25, w_y-29.5, 15, 20);
  ellipse(w_x+25, w_y-29.5, 15, 20);
  //inner ear
  fill(235, 223, 186);
  ellipse(w_x-25, w_y-29.5, 6, 11);
  ellipse(w_x+25, w_y-29.5, 6, 11);
  //face
  fill(100, 80, 80);
  ellipse(w_x, w_y, 75, 75);


  //eyes
  fill(0, 0, 0);
  ellipse(w_x-17, w_y-13, 5, 5);
  ellipse(w_x+17, w_y-13, 5, 5);

  //eye sparkles
  fill(150);
  ellipse(w_x-16, w_y-14, 2, 2);
  ellipse(w_x+18, w_y-14, 2, 2);


  //teeth
  fill(205);

  rect(w_x-5, w_y+14.5, 4, 5, 1);
  rect(w_x+1, w_y+14.5, 4, 5, 1);

  //nose
  fill(80, 50, 50);
  ellipse(w_x, w_y+10, 16, 13);



 }

 function wombatCollision(){
  w_radius = 37.5;
  for(i = 0; i < walls.length; i++){
    //console.log('wombat right x - ' + wombat_x + w_radius);
    //console.log( walls[i].wall_x + ', ' + walls[i].wall_x + walls[i].wall_width);
    if((wombat_x + w_radius > walls[i].wall_x && wombat_x + w_radius  < walls[i].wall_x + walls[i].wall_width) && (wombat_y + w_radius > walls[i].wall_y && wombat_y + w_radius  < walls[i].wall_y + walls[i].wall_height)){
      wallCollision = true;
      break;
    }
    else if((wombat_x - w_radius > walls[i].wall_x && wombat_x - w_radius  < walls[i].wall_x + walls[i].wall_width) && (wombat_y - w_radius > walls[i].wall_y && wombat_y - w_radius  < walls[i].wall_y + walls[i].wall_height)){
      wallCollision = true;
      break;
    }
    else{
      wallCollision = false;
    }
  }


 }




 function flipPlatform(platform_x, platform_y, platform_width, platform_height, i){

  platform_x = width - platform_x - platform_width;
  platform_y = height - platform_y - platform_height;

  walls[i] = new wall(platform_x, platform_y, platform_width, platform_height);
 }