function Bomb(){
    push();
    fill(255,0,0);
    for (let i = 0; i < 2; i++)
    {
      ellipse(bomb_x_arr[i],bomb_y_arr[i]+30,10);
      if(bomb_x_arr[i]!=-100)
      {
        bomb_timer[i]++;
      }
      if(bomb_timer[i]>=180)
      {
        bomb_x_arr[i]=-100;
        bomb_y_arr[i]=-100;
        bomb_timer[i]=0;
      }
    }
    pop();
  }

  function dash() {
    if(dash_timer == 0)
    {
        push();
        fill('#FA8258')
        ellipse(60, 100, 70);
        fill(255);
        textAlign(CENTER);
        textStyle(ITALIC);
        textSize(30)
        text('Q&E', 58, 110);
        pop();
    }

    if(dash_timer != 0)
    {
        dash_timer++;
    }
      if(dash_timer >= 300)
    {
        dash_timer = 0;
    }
}