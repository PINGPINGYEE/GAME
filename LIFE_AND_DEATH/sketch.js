let fb_x1 = 0;
let fb_x2 = 900;
let bg_x1 = 0; // background x
let bg_y1 = 500; // background y
let bg_p1x = 80;
let bg_p1y = 470;
let bg_p2x = 270;
let letter_timer = 0;
let wx, wy = -100; // winner text
let lx, ly = -100; // looser text
let dx, dy = -100; // draw text
let player1_x = 80;
let player1_y = 420;
let player2_x = 820;
let player2_y = 420;
let ending_x = 420;
let ending_y1 = 600;
let ending_y2 = 600;
let is_jump1 = false; // p1 jump
let is_jump2 = false; // p2 jump
let check1 = false;
let check2 = false;
let on_shield = false; // shield (p2 defense skill)
let bomb_count = 0; // land mine (p1 attack skill)
let bomb_x_arr = [-100, -100];
let bomb_y_arr = [-100, -100];
let bomb_timer = [0, 0];
let cannon_x_arr = [-100, -100]; // droplet (p2 attack skill)
let cannon_y_arr =  [0, 0];
let cannon_timer = [0,0];
let cannon_count = 0;
let dash_timer = 0; // dash (p1 defense skill)
let shield_timer = 0; // shield
let player1_HP = 60;
let player2_HP = 100;
let c1 = '#FF7F50'
let c2 = '#B0E0E6'
let tt = 0.0;
let scene = 6;
let num_p1w = 0; // how much p1 win
let num_p2w = 0; // how much p2 win
let splayer_x = 80; // how to play x pos
let sskill_y = 620; // how to play y droplet
let s_timer = 0; // how to play timer
let s_c = '#B0E0E6'

function preload() {
  first_sound = loadSound('media/お風呂でチャポン.mp3')
  intro_sound = loadSound('media/ドアを開ける1.mp3')
  start_sound = loadSound('media/SellBuyMusic - 뿅뿅 게임 아케이드 느낌 bgm.mp3');
  game_sound = loadSound('media/Rinne - Holy war.mp3');
  ending_sound = loadSound('media/winning-elevation-111355.mp3');
  how_sound = loadSound('media/Zula - Mini Vandals_howto.mp3');
  p1skill_sound = loadSound('media/超高速ダッシュ_p1skill.mp3');
  p2skill_sound = loadSound('media/煙モクモク_p2skill.mp3');
  p1colli_sound = loadSound('media/ビシッとツッコミ3_p1colli.mp3');
  p2colli_sound = loadSound('media/ビシッとツッコミ2_p2colli.mp3');
  p1jump_sound = loadSound('media/ペタッ_p1jump.mp3');
  p2jump_sound = loadSound('media/パパッ_p2jump.mp3');
  p1att_sound = loadSound('media/Boom Short_p1attack.mp3');
  p2att_sound = loadSound('media/Blop Sound_p2attack.mp3');
}

function setup() {
  createCanvas(900, 600);
  frameRate(60);
  first_sound.play();
  start_sound.loop();
  game_sound.loop();
  ending_sound.loop();
  how_sound.loop();
}

function draw() {
  background(0);
  if(scene == 6)
  {
    fill(255);
    textFont('Georgia');
    textSize(50);
    textAlign(RIGHT);
    text('MADE BY', fb_x1, 200);
    textAlign(LEFT);
    text('5585833', fb_x2, 200);
    textAlign(RIGHT);
    text('BY', fb_x1, 400);
    textAlign(LEFT);
    text('ME', fb_x2, 400);
    if(fb_x1 <= 425)
    {
      fb_x1+=5;
    }
    if(fb_x2 >= 475)
    {
      fb_x2-=5;
    }
    textSize(30)
    textAlign(CENTER);
    if(fb_x1 >= 425)
    {
      text('Press Space To Start', 450, 300)
    }
    start_sound.setVolume(0);
    game_sound.setVolume(0);
    ending_sound.setVolume(0);
    how_sound.setVolume(0)
  }
  if(scene == 0)
  {
    start_sound.setVolume(0.3);
    game_sound.setVolume(0);
    ending_sound.setVolume(0);
    how_sound.setVolume(0);
    main_background(); // start
  }
  else if(scene == 1)
  {
    start_sound.setVolume(0);
    game_sound.setVolume(0.5);
    ending_sound.setVolume(0);
    how_sound.setVolume(0);
    basic_tool(); // game
    stardraw();
    player1();
    player2();
    player1_move();
    player2_move();
    dash();
    shield();
    Bomb();
    Cannon(); 
    p1colli();
    p2colli();
    end_game_s();
  }
  else if(scene == 2)
  {
    start_sound.setVolume(0);
    game_sound.setVolume(0);
    ending_sound.setVolume(0.3);
    how_sound.setVolume(0);
    end_game_p1w(); // ending p1 win
  }
  else if(scene == 3)
  {
    start_sound.setVolume(0);
    game_sound.setVolume(0);
    ending_sound.setVolume(0.3);
    how_sound.setVolume(0);
    end_game_p2W(); // ending p2 win
  }
  else if(scene == 4) // how to play1
  {
    start_sound.setVolume(0);
    game_sound.setVolume(0);
    ending_sound.setVolume(0);
    how_sound.setVolume(0.5);
    how_to();
  }
  else if(scene == 5) // how to play2
  {
    start_sound.setVolume(0);
    game_sound.setVolume(0);
    ending_sound.setVolume(0);
    how_sound.setVolume(0.5);
    how_to2();
  }
}

function main_background() {
  push();
  strokeWeight(7);
  stroke(255);
  line(bg_x1, bg_y1, bg_x1 + 900, bg_y1);
  fill(c1)
  noStroke();
  rectMode(CENTER);
  square(bg_p1x, bg_p1y, 60, 20);
  fill(255);
  ellipse(bg_p1x - 20, bg_p1y - 20, 50);
  ellipse(bg_p1x + 20, bg_p1y - 20, 50);
  fill(0);
  ellipse(bg_p1x - 15, bg_p1y - 20, 30);
  ellipse(bg_p1x + 25, bg_p1y - 20, 30);
  fill(c2)
  noStroke();
  rectMode(CENTER);
  square(bg_p2x, bg_p1y, 60, 20);
  fill(255);
  ellipse(bg_p2x - 20, bg_p1y - 20, 50);
  ellipse(bg_p2x + 20, bg_p1y - 20, 50);
  fill(0);
  ellipse(bg_p2x - 15, bg_p1y - 20, 30);
  ellipse(bg_p2x + 25, bg_p1y - 20, 30);
  pop();
  bg_p1x += 3;
  bg_p2x += 3;
  wx += 3;
  lx += 3;
  if(bg_p1x >= 930) // background player routine
  {
    bg_p1x = -30;
  }
  if(bg_p2x >= 930) // background player routine
  {
    bg_p2x = -30;
  }
  if(wx >= 930)
  {
    wx = -30;
  }
  if(lx >= 930)
  {
    lx = -30;
  }
  letter_timer++;
  fill(255);
  textAlign(CENTER);
  textFont('Georgia');
  textSize(20);
  text('WINNER', wx, wy);
  text('LOOSER', lx, ly);
  text('It Is Peaceful!', dx, dy);
  if(letter_timer >= 60)
  {
    textSize(50)
    text('LIFE', 315, 150)
  }
  if(letter_timer >= 120)
  {
    text('and', 450, 150)
  }
  if(letter_timer >= 180)
  {
    text('DEATH', 615, 150)
  }
  if(letter_timer >= 240)
  {
    textSize(25);
    text('GAME START', 450, 280)
    text('HOW TO PLAY', 450, 340)
  }
  if(letter_timer >= 240&& mouseX > 330 && mouseX < 570 && mouseY > 240 && mouseY < 300) {
    triangle(325,262,325,282,345,272)
  }
  if(letter_timer >= 240&& mouseX > 330 && mouseX < 570 && mouseY > 300 && mouseY < 360) {
    triangle(325,322,325,342,345,332)
  }
}

function basic_tool() {
  background(0);
  push();
  fill(255);
  textSize(30);
  text("P1 HP : " + player1_HP, 30, 30)
  text("P2 HP : " + player2_HP, 700, 30)
  stroke(255);
  strokeWeight(7);
  line(0, 450, width, 450);
  pop();
}

function keyPressed() {
  if (scene == 6 & keyCode == 32)
  {
    intro_sound.play();
    scene = 0;
  }
  if(keyCode == 87)
  {
    is_jump1=true;
    if(player1_y == 420)
    {
      p1jump_sound.setVolume(0.5);
      p1jump_sound.play();
    }
  }
  if(keyCode == UP_ARROW)
  {
    is_jump2=true;
    if(player2_y == 420)
    {
      p2jump_sound.setVolume(0.5);
      p2jump_sound.play();
    }
  }
  if(keyCode == 83&&bomb_timer[bomb_count]==0)
  {
    p1att_sound.setVolume(0.5);
    p1att_sound.play();
    bomb_x_arr[bomb_count]=player1_x;
    bomb_y_arr[bomb_count]=410;
    bomb_count++;
    if(bomb_count==2)
    {
     bomb_count=0;
    }
  }
  if(keyCode == DOWN_ARROW&&cannon_timer[cannon_count]==0)
  {
    if(player1_x<player2_x){
      p2att_sound.setVolume(1.2);
      p2att_sound.play();
      cannon_x_arr[cannon_count] = player2_x-150;
      cannon_y_arr[cannon_count] = 600;
    }
    else{
      p2att_sound.setVolume(1.2);
      p2att_sound.play();
      cannon_x_arr[cannon_count] = player2_x+150;
      cannon_y_arr[cannon_count] = 600;
    }
    cannon_count++;
    if(cannon_count==2) cannon_count=0;
  }
  if(keyCode == 81&&dash_timer == 0)
  {
    dash_timer++;
    p1skill_sound.play();
    if(player1_x > 200)
    {
      player1_x -= 200;
    }
    else
    {
      player1_x = 30;
    }
  }
  if(keyCode == 69&&dash_timer == 0)
  {
    dash_timer++;
    p1skill_sound.play();
    if(player1_x < 700)
    {
      player1_x += 200;
    }
    else
    {
      player1_x = 870;
    }
  }
  if(keyCode == 191 && shield_timer == 0)
  {
    on_shield = true;
    p2skill_sound.play();
  }
}

function mousePressed() {
  if(scene == 0 && mouseIsPressed && mouseButton === LEFT && letter_timer >= 240 && mouseX > 330 && mouseX < 570 && mouseY > 240 && mouseY < 300)
  {
    scene = 1;
  }
  if(scene == 0 && mouseIsPressed && mouseButton === LEFT && letter_timer >= 240 && mouseX > 330 && mouseX < 570 && mouseY > 300 && mouseY < 360)
  {
    scene = 4;
    s_timer = 0;
  }
  if(ending_y1 <= 180 && scene == 2 && mouseIsPressed && mouseButton === LEFT && mouseX > 540 && mouseX < 760 && mouseY > 325 && mouseY < 385)
  {
    scene = 0;
    if(num_p1w < num_p2w)
    {
      wx = bg_p2x;
      wy = bg_p1y - 60;
      lx = bg_p1x;
      ly = bg_p1y - 60;
      dx = -100;
      dy = -100;
    }
    else if(num_p1w > num_p2w)
    {
      wx = bg_p1x;
      wy = bg_p1y - 60;
      lx = bg_p2x;
      ly = bg_p1y - 60;
      dx = -100;
      dy = -100;
    }
    else
    {
      wx = -100;
      wy = -100;
      lx = -100;
      ly = -100;
      dx = 450;
      dy = 410;
    }
    player1_HP = 50;
    player2_HP = 100;
    player1_x = 80;
    player1_y = 420;
    player2_x = 820;
    player2_y = 420;
    num_p1w = 0;
    num_p2w = 0;
    ending_x = 420;
    ending_y1 = 600;
    ending_y2 = 600;
  }
  if(ending_y2 <= 180 && scene == 3 && mouseIsPressed && mouseButton === LEFT && mouseX > 540 && mouseX < 760 && mouseY > 325 && mouseY < 385)
  {
    scene = 0;
    if(num_p1w < num_p2w)
    {
      wx = bg_p2x;
      wy = bg_p1y - 60;
      lx = bg_p1x;
      ly = bg_p1y - 60;
      dx = -100;
      dy = -100;
    }
    else if(num_p1w > num_p2w)
    {
      wx = bg_p1x;
      wy = bg_p1y - 60;
      lx = bg_p2x;
      ly = bg_p1y - 60;
      dx = -100;
      dy = -100;
    }
    else
    {
      wx = -100;
      wy = -100;
      lx = -100;
      ly = -100;
      dx = 450;
      dy = 410;
    }
    player1_HP = 50;
    player2_HP = 100;
    player1_x = 80;
    player1_y = 420;
    player2_x = 820;
    player2_y = 420;
    num_p1w = 0;
    num_p2w = 0;
    ending_x = 420;
    ending_y1 = 600;
    ending_y2 = 600;
  }
  if(ending_y1 <= 180 && scene == 2 && mouseIsPressed && mouseButton === LEFT && mouseX > 160 && mouseX < 380 && mouseY > 325 && mouseY < 385) {
    scene = 1;
    player1_HP = 50;
    player2_HP = 100;
    player1_x = 80;
    player1_y = 420;
    player2_x = 820;
    player2_y = 420;
    ending_x = 420;
    ending_y1 = 600;
    ending_y2 = 600;
  }
  if(ending_y2 <= 180 && scene == 3 && mouseIsPressed && mouseButton === LEFT && mouseX > 160 && mouseX < 380 && mouseY > 325 && mouseY < 385) {
    scene = 1;
    player1_HP = 50;
    player2_HP = 100;
    player1_x = 80;
    player1_y = 420;
    player2_x = 820;
    player2_y = 420;
    ending_x = 420;
    ending_y1 = 600;
    ending_y2 = 600;
  }
  if(scene == 4 && mouseIsPressed && mouseButton === LEFT && mouseX > 760 && mouseX < 860 && mouseY > 25 && mouseY < 55)
  {
    scene = 0;
  }
  if(scene == 4 && mouseIsPressed && mouseButton === LEFT && mouseX > 760 && mouseX < 860 && mouseY > 55 && mouseY < 85)
  {
    scene = 1;
  }
  if(scene == 4 && mouseIsPressed && mouseButton === LEFT && mouseX > 760 && mouseX < 860 && mouseY > 85 && mouseY < 115)
  {
    scene = 5;
  }
  if(s_timer >= 480 && scene == 5 && mouseIsPressed && mouseButton === LEFT && mouseX > 760 && mouseX < 860 && mouseY > 25 && mouseY < 55)
  {
    scene = 0;
    s_c = '#B0E0E6'
  }
  if(s_timer >= 480 && scene == 5 && mouseIsPressed && mouseButton === LEFT && mouseX > 760 && mouseX < 860 && mouseY > 55 && mouseY < 85)
  {
    scene = 1;
    s_c = '#B0E0E6'
  }
  if(s_timer >= 480 && scene == 5 && mouseIsPressed && mouseButton === LEFT && mouseX > 760 && mouseX < 860 && mouseY > 85 && mouseY < 115)
  {
    scene = 4;
    s_c = '#B0E0E6'
    s_timer = 0;
  }
}

function end_game_s() {
  if(player2_HP <= 0)
  {
    scene = 2;
  }
  if(player1_HP <= 0)
  {
    scene = 3;
  }
  if(player1_HP <= 0 && player2_HP <= 0)
  {
    end_game_draw();
  }
}

function end_game_p1w() { // when p1 win
    background(0);
    bomb_timer = [180, 180];
    cannon_timer = [180, 180];
    c1 = '#FF7F50'
    c2 = '#B0E0E6'
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    text('Player1 Win!!', 450, 60);
    textSize(30);
    text('P1 : ' + (num_p1w), 200, 150)
    text('P2 : ' + (num_p2w), 700, 150)
    fill(c1);
    square(390, ending_y1, 120, 30);
    push();
    noStroke();
    fill('#CD5C5C')
    arc(450, ending_y1+90, 25, 60, 0, PI, CHORD);
    pop();
    fill(255);
    ellipse(410, ending_y1 + 20, 100);
    ellipse(490, ending_y1 + 20, 100);
    fill(0);
    stroke(0)
    strokeWeight(1);
    line(450, ending_y1+95, 450, ending_y1+117);
    line(430, ending_y1+90, 470, ending_y1+90);
    let ending_x = map(mouseX, 0, width, 390, 430);
    ellipse(ending_x, ending_y1 + 20, 60);
    ellipse(ending_x+80, ending_y1 + 20, 60);
    pop();
    if(ending_y1 == 180)
    {
      num_p1w++;
    }
    ending_wave(c1);
    if(ending_y1 >= 180)
    {
      ending_y1 -= 2;
    }
    if(ending_y1 <= 180)
    {
      fill(255);
      textAlign(CENTER);
      textFont('Georgia');
      textSize(25)
      text('Next Round', 270, 355)
      text('Main screen', 650, 355)
      if(mouseX > 160 && mouseX < 380 && mouseY > 325 && mouseY < 385)
      {
        triangle(135,337,135,357,155,347);
      }
      else if(mouseX > 540 && mouseX < 760 && mouseY > 325 && mouseY < 385)
      {
        triangle(515,337,515,357,535,347);
      }
    }
}

function end_game_p2W() { // when p2 win
    background(0);
    bomb_timer = [180, 180];
    cannon_timer = [180, 180];
    c1 = '#FF7F50'
    c2 = '#B0E0E6'
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    text('Player2 Win!!', 450, 60);
    textSize(30);
    text('P1 : ' + (num_p1w), 200, 150)
    text('P2 : ' + (num_p2w), 700, 150)
    fill(c2);
    square(390, ending_y2, 120, 30);
    push();
    noStroke();
    fill('#CD5C5C')
    arc(450, ending_y2+90, 25, 60, 0, PI, CHORD);
    pop();
    fill(255);
    ellipse(410, ending_y2 + 20, 100);
    ellipse(490, ending_y2 + 20, 100);
    fill(0);
    stroke(0)
    strokeWeight(1)
    line(450, ending_y2+95, 450, ending_y2+117);
    line(430, ending_y2+90, 470, ending_y2+90);
    let ending_x = map(mouseX, 0, width, 390, 430);
    ellipse(ending_x, ending_y2 + 20, 60);
    ellipse(ending_x+80, ending_y2 + 20, 60);
    pop();
    if(ending_y2 == 180)
    {
      num_p2w++;
    }
    ending_wave(c2);
    if(ending_y2 >= 180)
    {
      ending_y2 -= 2;
    }
    if(ending_y2 <= 180)
    {
      fill(255);
      textAlign(CENTER);
      textFont('Georgia');
      textSize(25)
      text('Next Round', 270, 355)
      text('Main screen', 650, 355)
      if(mouseX > 160 && mouseX < 380 && mouseY > 325 && mouseY < 385)
      {
        triangle(135,337,135,357,155,347);
      }
      else if(mouseX > 540 && mouseX < 760 && mouseY > 325 && mouseY < 385)
      {
        triangle(515,337,515,357,535,347)
      }
    }
}

function end_game_draw() { // draw, easter egg
  background(0);
  bomb_timer = [180, 180];
  cannon_timer = [180, 180];
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text('Draw, Wow Amazing!!', 450, 60);
  text('Take Picture And Click F5', 450, 100);
}