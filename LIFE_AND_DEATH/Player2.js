function player2() {
  push();
  fill(c2);
  c2 = '#B0E0E6'
  noStroke();
  rectMode(CENTER)
  square(player2_x, player2_y, 60, 20);
  pop();
  if(keyIsPressed==false)
  {
    push();
    fill('255');
    textAlign(CENTER)
    textSize(25)
    text("P2", player2_x, player2_y - 100)
    noStroke();
    fill(255);
    triangle(player2_x-20,player2_y-90, player2_x, player2_y-70,player2_x+20, player2_y-90)
    pop();
  }
  noStroke();
  ellipse(player2_x - 20, player2_y - 20, 50);
  ellipse(player2_x + 20, player2_y - 20, 50);
  if(player2_x < player1_x)
  {
    push();
    fill(0);
    ellipse(player2_x - 12, player2_y - 20, 30);
    ellipse(player2_x + 28, player2_y - 20, 30);
    pop();
  }
  else if(player2_x > player1_x)
  {
    push();
    fill(0);
    ellipse(player2_x - 28, player2_y - 20, 30);
    ellipse(player2_x + 12, player2_y - 20, 30);
    pop();
  }
  else
  {
    push();
    fill(0);
    ellipse(player2_x - 15, player2_y - 20, 30);
    ellipse(player2_x + 15, player2_y - 20, 30);
    pop();
  }
}
  
function player2_move() {
  if(keyIsDown(LEFT_ARROW)&&player2_x>=30)
  {
    player2_x -= 9;
  }
  if(keyIsDown(RIGHT_ARROW)&&player2_x<=870)
  {
    player2_x += 9;
  }
  if(is_jump2==true&&check2==false)
  {
    player2_y-=10;
  }
  if(player2_y<=250)
  {
    check2=true;
  }
  else if(player2_y>410)
  {
    is_jump2 = false;
    check2=false;
    player2_y=420;
  }
  if(check2==true)
  {
    player2_y+=12;
  }
}

function p2colli() {
  for(let i = 0; i < 2; i++)
  {
    let d2_x = 100;
    d2_x = dist(player2_x, player2_y, bomb_x_arr[i], bomb_y_arr[i])
    if (d2_x <= 35 && on_shield == false)
   {
     player2_HP--;
     p2colli_sound.setVolume(0.3);
     p2colli_sound.play();
     c2 = 'red'
   }
  }
}