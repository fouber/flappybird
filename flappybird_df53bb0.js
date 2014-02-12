function init(){window.top!=window&&(document.getElementById("header").style.display="none"),stage=new createjs.Stage("testCanvas"),createjs.Touch.enable(stage),w=stage.canvas.width,h=stage.canvas.height,manifest=[{src:"/img/bird_eb28ba4.png",id:"bird"},{src:"/img/background_ad8f6b9.png",id:"background"},{src:"/img/ground_0f9af2d.png",id:"ground"},{src:"/img/pipe_63f6967.png",id:"pipe"},{src:"/img/restart_87d50d5.png",id:"start"},{src:"/img/share_6452583.png",id:"share"},{src:"/img/share_pk_c896666.png",id:"share_pk"},{src:"/fonts/FB_c08313c.eot"},{src:"/fonts/FB_1d971c4.svg"},{src:"/fonts/FB_7ad6c9f.ttf"},{src:"/fonts/FB_a392f5d.woff"}],loader=new createjs.LoadQueue(!1),loader.addEventListener("complete",handleComplete),loader.loadManifest(manifest)}function handleComplete(){background=new createjs.Shape,background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,w,h);var e=loader.getResult("ground");ground=new createjs.Shape,ground.graphics.beginBitmapFill(e).drawRect(0,0,w+e.width,e.height),ground.tileW=e.width,ground.y=h-e.height;var t=new createjs.SpriteSheet({images:[loader.getResult("bird")],frames:{width:92,height:64,regX:46,regY:32,count:3},animations:{fly:[0,2,"fly",.21],dive:[1,1,"dive",1]}});bird=new createjs.Sprite(t,"fly"),startX=w/2-46,startY=512,wiggleDelta=18,bird.setTransform(startX,startY,1,1),bird.framerate=30,createjs.Tween.get(bird,{loop:!0}).to({y:startY+wiggleDelta},380,createjs.Ease.sineInOut).to({y:startY},380,createjs.Ease.sineInOut),stage.addChild(background),pipes=new createjs.Container,stage.addChild(pipes),stage.addChild(bird,ground),stage.addEventListener("stagemousedown",handleJumpStart),counter=new createjs.Text(0,"86px 'Flappy Bird'","#ffffff"),counterOutline=new createjs.Text(0,"86px 'Flappy Bird'","#000000"),counterOutline.outline=5,counterOutline.textAlign="center",counter.textAlign="center",counterOutline.x=w/2,counterOutline.y=150,counter.x=w/2,counter.y=150,counter.alpha=1,counterOutline.alpha=1,stage.addChild(counter,counterOutline),createjs.Ticker.timingMode=createjs.Ticker.RAF,createjs.Ticker.addEventListener("tick",tick)}function handleKeyDown(e){if(!e)var e=window.event;switch(e.keyCode){case KEYCODE_SPACE:handleJumpStart()}}function handleJumpStart(){dead||(createjs.Tween.removeTweens(bird),bird.gotoAndPlay("jump"),startJump=!0,started||(started=!0,counterShow=!0))}function diveBird(){bird.gotoAndPlay("dive")}function restart(){pipes.removeAllChildren(),createjs.Tween.get(start).to({y:start.y+10},50).call(removeStart),counter.text=0,counterOutline.text=0,counterOutline.alpha=0,counter.alpha=0,counterShow=!1,pipeDelay=masterPipeDelay,dead=!1,started=!1,startJump=!1,createjs.Tween.removeTweens(bird),bird.x=startX,bird.y=startY,bird.rotation=0,createjs.Tween.get(bird,{loop:!0}).to({y:startY+wiggleDelta},380,createjs.Ease.sineInOut).to({y:startY},380,createjs.Ease.sineInOut)}function die(){dead=!0,bird.gotoAndPlay("dive"),createjs.Tween.removeTweens(bird),createjs.Tween.get(bird).wait(0).to({y:bird.y+200,rotation:90},380/1.5,createjs.Ease.linear).call(diveBird).to({y:ground.y-30},(h-(bird.y+200))/1.5,createjs.Ease.linear),createjs.Tween.get(stage).to({alpha:0},100).to({alpha:1},100),start=new createjs.Bitmap(loader.getResult("start")),start.alpha=0,start.x=w/2-start.image.width/2,start.y=h/2-start.image.height/2-150,share=new createjs.Bitmap(loader.getResult("share")),share.alpha=0,share.x=w/2-share.image.width/2,share.y=h/2-share.image.height/2-50,share_pk=new createjs.Bitmap(loader.getResult("share_pk")),share_pk.alpha=0,share_pk.x=w/2-share_pk.image.width/2,share_pk.y=h/2-share_pk.image.height/2+50,stage.addChild(start),stage.addChild(share),stage.addChild(share_pk),createjs.Tween.get(start).to({alpha:1,y:start.y+50},400,createjs.Ease.sineIn).call(addClickToStart),createjs.Tween.get(share).to({alpha:1,y:share.y+50},400,createjs.Ease.sineIn).call(addClickToStart),createjs.Tween.get(share_pk).to({alpha:1,y:share_pk.y+50},400,createjs.Ease.sineIn).call(addClickToStart)}function removeStart(){stage.removeChild(start),stage.removeChild(share),stage.removeChild(share_pk)}function addClickToStart(){start.addEventListener("click",restart),share.addEventListener("click",goShare),share_pk.addEventListener("click",goSharePk)}function goShare(){var e;e=1==counter.text?"1 point":counter.text+" points",alert("go share")}function goSharePk(){var e;e=1==counter.text?"1 point":counter.text+" points",alert("go share pk")}function tick(e){var t=e.delta/1e3,a=pipes.getNumChildren();if(bird.y>ground.y-40&&(dead||die(),bird.y>ground.y-30&&createjs.Tween.removeTweens(bird)),dead||(ground.x=(ground.x-300*t)%ground.tileW),started&&!dead){0==pipeDelay?(pipe=new createjs.Bitmap(loader.getResult("pipe")),pipe.x=w+600,pipe.y=(ground.y-2*gap)*Math.random()+1.5*gap,pipes.addChild(pipe),pipe2=new createjs.Bitmap(loader.getResult("pipe")),pipe2.scaleX=-1,pipe2.rotation=180,pipe2.x=pipe.x,pipe2.y=pipe.y-gap,pipes.addChild(pipe2),pipeDelay=masterPipeDelay):pipeDelay-=1;for(var r=0;a>r;r++)if(pipe=pipes.getChildAt(r)){var i=ndgmr.checkRectCollision(pipe,bird,1,!0);i&&i.width>8&&i.height>8&&die(),pipe.x=pipe.x-300*t,pipe.x<=338&&0==pipe.rotation&&"counted"!=pipe.name&&(pipe.name="counted",counter.text=counter.text+1,counterOutline.text=counterOutline.text+1),pipe.x+pipe.image.width<=-pipe.w&&pipes.removeChild(pipe)}counterShow&&(counter.alpha=1,counterOutline.alpha=1,counterShow=!1)}1==startJump&&(startJump=!1,bird.framerate=60,bird.gotoAndPlay("fly"),rotationDelta=bird.roation<0?(-bird.rotation-20)/5:(bird.rotation+20)/5,bird.y<-200&&(bird.y=-200),createjs.Tween.get(bird).to({y:bird.y-rotationDelta,rotation:-20},rotationDelta,createjs.Ease.linear).to({y:bird.y-jumpAmount,rotation:-20},jumpTime-rotationDelta,createjs.Ease.quadOut).to({y:bird.y},jumpTime,createjs.Ease.quadIn).to({y:bird.y+200,rotation:90},380/1.5,createjs.Ease.linear).call(diveBird).to({y:ground.y-30},(h-(bird.y+200))/1.5,createjs.Ease.linear)),stage.update(e)}var stage,w,h,loader,pipe1height,pipe2height,pipe3height,startX,startY,wiggleDelta,background,bird,ground,pipe,bottomPipe,pipes,rotationDelta,counter,counterOutline,started=!1,startJump=!1,jumpAmount=120,jumpTime=266,dead=!1,KEYCODE_SPACE=32,gap=250,masterPipeDelay=78,pipeDelay=masterPipeDelay,counterShow=!1;document.onkeydown=handleKeyDown;