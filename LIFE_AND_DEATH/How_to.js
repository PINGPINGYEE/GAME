function how_to() {
    background(0);
    fill(255);
    stroke(255);
    strokeWeight(3);
    textAlign(CENTER);
    textFont('Georgia');
    textSize(50);
    text('HOW TO PLAY', 450, 100);
    line(450, 150, 450, 600);
    push();
    fill('#FF7F50');
    strokeWeight(1);
    textSize(30);
    text('P1', 225, 180);
    fill('#B0E0E6');
    text('P2', 675, 180);
    pop();
    textSize(30);
    noStroke();
    textAlign(LEFT);
    text('JUMP', 40, 260);
    text('RIGHT', 40, 330);
    text('LEFT', 40, 400);
    text('ATTACK', 40, 470);
    text('DEFENSE', 40, 540);
    textAlign(LEFT);
    text('W', 320, 260);
    text('D', 320, 330);
    text('A', 320, 400);
    text('S', 320, 470);
    text('Q      E', 320, 540);
    textAlign(LEFT);
    text('JUMP', 490, 260);
    text('RIGHT', 490, 330);
    text('LEFT', 490, 400);
    text('ATTACK', 490, 470);
    text('DEFENSE', 490, 540);
    textAlign(LEFT);
    text('↑', 770, 260);
    text('→', 770, 330);
    text('←', 770, 400);
    text('↓', 770, 470);
    text('/', 770, 540);
    textSize(20);
    text('MAIN', 780, 40);
    text('START', 780, 70);
    text('NEXT', 780, 100);
    if(mouseX > 760 && mouseX < 860 && mouseY > 25 && mouseY < 55)
    {
        triangle(745, 26, 745, 40, 760, 33);
    }
    if(mouseX > 760 && mouseX < 860 && mouseY > 55 && mouseY < 85)
    {
        triangle(745, 56, 745, 70, 760, 63);
    }
    if(mouseX > 760 && mouseX < 860 && mouseY > 85 && mouseY < 115)
    {
        triangle(745, 86, 745, 100, 760, 93);
    }
}

function how_to2() {
    background(0);
    fill(255);
    strokeWeight(3);
    textAlign(CENTER);
    textFont('Georgia');
    textSize(40);
    text('This Is Your Attack Skill', 450, 90);
    stroke(255);
    strokeWeight(7);
    line(0, 450, width, 450); 
    line(450, 150, 450, 600);
    splayer1()
    splayer2()
    if(splayer_x < 225)
    {
    splayer_x+=3
    }
    if(splayer_x >= 225)
    {
      fill('red')
      ellipse(splayer_x, 440, 10)
      fill('blue')
      ellipse(splayer_x + 600, sskill_y, 40)
      if(sskill_y >= 150){
        sskill_y-= 5;;
      }
    }
    s_timer++;
    textSize(30);
    fill(255);
    if(s_timer >= 120)
    {
        text('You Use Land Mine Weapons!', 225, 500);
        text('You Use Droplet Weapons!', 675, 500);
    }
    if(s_timer >= 300)
    {
        splayer_x = 80;
        sskill_y = 620;
        background(0);
        fill(255);
        strokeWeight(3);
        textAlign(CENTER);
        textFont('Georgia');
        textSize(40);
        text('This Is Your Defense Skill', 450, 90);
        stroke(255);
        strokeWeight(7);
        line(0, 450, width, 450); 
        line(450, 150, 450, 600);
        splayer1()
        splayer2()
    }
    if(s_timer >= 420)
    {
        s_c = 'yellow'
        textSize(30);
        fill(255);
        text('You Can Dash!', 225, 500);
        text('You Become Invincible!', 675, 500);
    }
    if(s_timer >= 480)
    {
        textSize(20);
        textAlign(LEFT)
        text('MAIN', 780, 40);
        text('START', 780, 70);
        text('BACK', 780, 100);
        if(mouseX > 760 && mouseX < 860 && mouseY > 25 && mouseY < 55)
        {
            triangle(745, 26, 745, 40, 760, 33);
        }
        if(mouseX > 760 && mouseX < 860 && mouseY > 55 && mouseY < 85)
        {
            triangle(745, 56, 745, 70, 760, 63);
        }
        if(mouseX > 760 && mouseX < 860 && mouseY > 85 && mouseY < 115)
        {
            triangle(745, 86, 745, 100, 760, 93);
        }
    }
}

function splayer1() {
    push();
    c1 = '#FF7F50'
    fill(c1);
    if(s_timer < 420)
    {
        splayer_x1 = splayer_x
    }
    else
    {
        splayer_x1 = splayer_x + 200
    }
    noStroke();
    rectMode(CENTER)
    square(splayer_x1, 420, 60, 20);
    pop();
    noStroke();
    ellipse(splayer_x1 - 20, 400, 50);
    ellipse(splayer_x1 + 20, 400, 50);
      push();
      fill(0);
      ellipse(splayer_x1 - 15, 400, 30);
      ellipse(splayer_x1 + 15, 400, 30);
      pop();
  }

function splayer2() {
    push();
    noStroke();
    rectMode(CENTER)
    fill(s_c);
    square(splayer_x + 450, 420, 60, 20);
    pop();
    noStroke();
    ellipse(splayer_x + 430, 400, 50);
    ellipse(splayer_x + 470, 400, 50);
      push();
      fill(0)
      ellipse(splayer_x + 435, 400, 30);
      ellipse(splayer_x + 465, 400, 30);
    pop();
  }