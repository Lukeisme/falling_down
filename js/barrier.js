var barrierArray = 
[[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],
[10,2],[1,4],[2,2],
[7,0],[1,2],[0,0],
[8,0],[1,2],[0,0],
[9,0],[1,2],[1,2],
[1,2],[1,2],[1,4],
[0,0],[0,0],[1,2],
[10,2],[1,4],[0,0],
[7,0],[0,0],[1,2],
[7,0],[1,4],[1,0],
[3,2],[0,0],[1,2],
[1,2],[1,2],[0,0],
[1,6],[1,6],[10,2],
[0,0],[1,6],[1,6],
[1,6],[1,6],[7,0],
[7,0],[1,6],[1,6],
[1,6],[1,6],[7,0],
[7,0],[1,6],[1,6],
[1,4],[7,0],[1,4],
[0,0],[1,2],[2,2],
[1,2],[7,0],[0,0],
[1,4],[0,0],[0,0],
[0,0],[1,4],[1,4],
[1,2],[0,0],[1,4]];

function barrier(kind,x,y,width,height,way,speed,status){
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.way = way;
    this.speed = speed;
    this.status = status;
    //this.type = type;           //0 stands for fatal barrier
}


function createBarrier(){
    if(fallingdown.b_count == 26*3){
        fallingdown.b_count = 0;
    }
    for(var i = 0; i<3; i++ ,fallingdown.b_count++)
    {
        if(barrierArray[fallingdown.b_count][0] == 0){
           // continue;
        }else if(barrierArray[fallingdown.b_count][0] == 1){
            fallingdown.barrier.push(new barrier(1,120*i+25,640,70,70,i,barrierArray[fallingdown.b_count][1],0));
        }else if(barrierArray[fallingdown.b_count][0] == 2){
            fallingdown.barrier.push(new barrier(2,120*i+120,500,70,70,i,barrierArray[fallingdown.b_count][1],0));

        }else if(barrierArray[fallingdown.b_count][0] == 3){
            fallingdown.barrier.push(new barrier(3,120*i-70,500,70,70,i,barrierArray[fallingdown.b_count][1],0));

        }else if(barrierArray[fallingdown.b_count][0] == 10){
            fallingdown.barrier.push(new barrier(10,120*i+25,640,70,70,i,barrierArray[fallingdown.b_count][1],0));

        }else if(barrierArray[fallingdown.b_count][0] == 7)
        {
            fallingdown.item.push(new item(7));

        }
        else if(barrierArray[fallingdown.b_count][0] == 8)  
        {
            fallingdown.item.push(new item(8));

        }
        else if(barrierArray[fallingdown.b_count][0] == 9)  //a sheld is created
        {
            fallingdown.item.push(new item(9));

        }
    }
}


function draw_barrier () {
    ctx.fillStyle = "#007FFF";
    var nn = 0; 
    while(nn<fallingdown.barrier.length)
    {

       //ctx.fillRect(fallingdown.barrier[nn].x,fallingdown.barrier[nn].y,fallingdown.barrier[nn].width,fallingdown.barrier[nn].height);
       if (fallingdown.barrier[nn].kind==1) {
       ctx.drawImage(barrierImg,
        fallingdown.barrier[nn].status*180,
        0,
        // fallingdown.barrier[nn].width,
        // fallingdown.barrier[nn].height,
        180,
        180,
        fallingdown.barrier[nn].x,
        fallingdown.barrier[nn].y,
        fallingdown.barrier[nn].width,
        fallingdown.barrier[nn].height);
       };
       fallingdown.barrier[nn].status=(fallingdown.barrier[nn].status+1)%9;
       fallingdown.barrier[nn].y = fallingdown.barrier[nn].y - fallingdown.barrier[nn].speed * fallingdown.ctrl_speed;
     
       if(fallingdown.barrier[nn].kind==2){
            fallingdown.barrier[nn].x = fallingdown.barrier[nn].x - 2;
            if (fallingdown.barrier[nn].status==8) {
                fallingdown.barrier[nn].status==0;
            };
            ctx.drawImage(barrierDraImg,
            fallingdown.barrier[nn].status*225,
            249*2,
        // fallingdown.barrier[nn].width,
        // fallingdown.barrier[nn].height,
            225,
            249,
            fallingdown.barrier[nn].x,
            fallingdown.barrier[nn].y,
            fallingdown.barrier[nn].width,
            fallingdown.barrier[nn].height);   
        }

       if(fallingdown.barrier[nn].kind==3){
            fallingdown.barrier[nn].x = fallingdown.barrier[nn].x + 2;
            if (fallingdown.barrier[nn].status==8) {
                fallingdown.barrier[nn].status==0;
            };
            ctx.drawImage(barrierDraImg,
            fallingdown.barrier[nn].status*225,
            249,
        // fallingdown.barrier[nn].width,
        // fallingdown.barrier[nn].height,
            225,
            249,
            fallingdown.barrier[nn].x,
            fallingdown.barrier[nn].y,
            fallingdown.barrier[nn].width,
            fallingdown.barrier[nn].height);
       }
       if (fallingdown.barrier[nn].kind==10) {
       ctx.drawImage(fog_Img,
       // fallingdown.barrier[nn].status*180,
       // 0,
        // fallingdown.barrier[nn].width,
        // fallingdown.barrier[nn].height,
       // 180,
       // 180,
        fallingdown.barrier[nn].x,
        fallingdown.barrier[nn].y
       // fallingdown.barrier[nn].width,
       // fallingdown.barrier[nn].height
       );
       };
        if (fallingdown.barrier[nn].y < 0) {
            fallingdown.barrier.splice(nn,1);
        }else{
            nn++;
        }
    }
}