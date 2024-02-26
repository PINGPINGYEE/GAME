function Cannon() {
    push();
    fill(0, 0, 255);
    for (let i = 0; i < 2; i++)
    {
        ellipse(cannon_x_arr[i],cannon_y_arr[i],40);
        if(cannon_x_arr[i]!=-100)
        {
            cannon_timer[i]++;
            cannon_y_arr[i] -= 10;
        } 
        if(cannon_timer[i]>=180)
        {
            cannon_x_arr[i]=-100;
            cannon_y_arr[i]=0;
            cannon_timer[i]=0;
        }
    }
  pop();
}

function shield() {
    if(shield_timer == 0)
    {
        push();
        fill('#6495ED')
        ellipse(840, 100, 70);
        fill(255);
        textAlign(CENTER);
        textStyle(ITALIC);
        textSize(30)
        text('/', 838, 110);
        pop();
    }

    if(on_shield == true)
    {
      c2 = 'yellow'
      shield_timer++;
    }
    if(on_shield == false && shield_timer != 0)
    {
      shield_timer++;
    }
    if(shield_timer >= 420)
    {
      shield_timer = 0;
    }
    if(shield_timer >= 120)
    {
      on_shield = false;
    }
  }