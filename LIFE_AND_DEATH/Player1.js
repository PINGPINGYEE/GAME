function player1() {
  push();
  fill(c1);
  c1 = '#FF7F50'
  noStroke();
  rectMode(CENTER)
  square(player1_x, player1_y, 60, 20);
  pop();
  if(keyIsPressed==false)
  {
    push();
    fill(255);
    textAlign(CENTER)
    textSize(25)
    text("P1", player1_x, player1_y - 100)
    noStroke();
    fill(255);
    triangle(player1_x-20,player1_y-90, player1_x, player1_y-70,player1_x+20, player1_y-90)
    pop();
  }
  noStroke();
  ellipse(player1_x - 20, player1_y - 20, 50);
  ellipse(player1_x + 20, player1_y - 20, 50);
  if(player1_x < player2_x)
  {
    push();
    fill(0);
    ellipse(player1_x - 12, player1_y - 20, 30);
    ellipse(player1_x + 28, player1_y - 20, 30);
    pop();
  }
  else if(player1_x > player2_x)
  {
    push();
    fill(0);
    ellipse(player1_x - 28, player1_y - 20, 30);
    ellipse(player1_x + 12, player1_y - 20, 30);
    pop();
  }
  else
  {
    push();
    fill(0);
    ellipse(player1_x - 15, player1_y - 20, 30);
    ellipse(player1_x + 15, player1_y - 20, 30);
    pop();
  }
}
  
function player1_move() {
  if(keyIsDown('65') && player1_x >= 30)
  {
      player1_x -= 5;
  }
    
  if(keyIsDown('68') && player1_x <= 870)
  {
      player1_x += 5;
  }
  if(is_jump1==true&&check1==false)
  {
    player1_y-=10;
  }
  
  if(player1_y<=250)
  {
    check1=true;
  }
  else if(player1_y>410)
  {
    is_jump1 = false;
    check1 = false;
    player1_y=420;
  }
  
  if(check1==true)
  {
    player1_y+=12;
  }
}

function p1colli() {
  for(let i = 0; i < 2; i++)
  {
    let d1_x = 100;
    d1_x = dist(player1_x, player1_y, cannon_x_arr[i], cannon_y_arr[i])
    if (d1_x <= 50)
   {
     player1_HP--;
     p1colli_sound.setVolume(0.3);
     p1colli_sound.play();
     c1 = 'red';
   }
  }
}