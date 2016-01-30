class ChoiceCharacterState extends Phaser.State {


    preload() {
        this.game.load.spritesheet('button_back', 'assets/menu/back_image.png', 50, 50);
        this.game.load.image('background','assets/menu/starfield.jpg');
        this.game.load.image('characters','assets/menu/mk2.jpg');
        this.game.load.image('select1','assets/menu/select1.png');
        this.game.load.image('select2','assets/menu/select2.png');
    }

    create() {
        this.game.stage.backgroundColor = '#182d3b';
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
        this.button_back = this.game.add.button(10, 10, 'button_back', this.backAction, this, 0, 0, 0);
        this.style = { font: "30px Arial", fill: "#ff0044", align: "center" };

        //definition select
        this.characters = this.game.add.tileSprite(this.game.world.centerX-300, this.game.world.centerY-122, 600, 244, 'characters');
        this.select1 = this.game.add.tileSprite(this.game.world.centerX-300, this.game.world.centerY-122, 200, 244, 'select1');
        this.select2 = this.game.add.tileSprite(this.game.world.centerX+100, this.game.world.centerY-122, 200, 244, 'select2');
        this.choice1 = false;
        this.choice2 = false;
        this.choiceCharacter1 = 1;
        this.choiceCharacter2 = 3;

        this.choiceUser1left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.choiceUser1left.onDown.add(this.moveLeftUser1, this);
        this.choiceUser1Rigth = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.choiceUser1Rigth.onDown.add(this.moveRigthUser1, this);
        this.confirm1 = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.confirm1.onDown.add(this.actionConfirm1, this);

        this.choiceUser2left = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
        this.choiceUser2left.onDown.add(this.moveLeftUser2, this);
        this.choiceUser2Rigth = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
        this.choiceUser2Rigth.onDown.add(this.moveRigthUser2, this);
        this.confirm2 = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
        this.confirm2.onDown.add(this.actionConfirm2, this);

        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.esc.onDown.add(this.backAction, this);

    }
    actionConfirm2(){
        if(!this.choice2) {
            this.choice2 = true;
            if (this.select2.x <= this.game.world.centerX - 300) {
                this.choiceCharacter2 = 1;
            } else if (this.select2.x <= this.game.world.centerX - 100) {
                this.choiceCharacter2 = 2;
            } else {
                this.choiceCharacter2 = 3;
            }
            console.log("choise2", this.choiceCharacter2);
            this.text2 = this.game.add.text(this.game.world.centerX+200, this.game.world.centerY+125, "Ready", this.style);

            this.passGame();
        }
    }

    actionConfirm1(){
        if(!this.choice1){
            this.choice1 = true;
            if(this.select1.x<=this.game.world.centerX-300){
                this.choiceCharacter1 = 1;
            }else if(this.select1.x<=this.game.world.centerX-100){
                this.choiceCharacter1 = 2;
            }else{
                this.choiceCharacter1 = 3;
            }
            console.log("choise1",this.choiceCharacter1);
            this.text1 = this.game.add.text(this.game.world.centerX-300, this.game.world.centerY+125, "Ready", this.style);

            this.passGame();
        }

    }

    moveLeftUser1(){
        if(!this.choice1)
        if(this.select1.x > this.game.world.centerX-300 ){
            this.select1.x = this.select1.x - 200;

        }
    }

    moveRigthUser1(){
        if(!this.choice1)
        if(this.select1.x < this.game.world.centerX+100 ){
            this.select1.x = this.select1.x + 200;
        }
    }

    moveLeftUser2(){
        if(!this.choice2)
        if(this.select2.x > this.game.world.centerX-300 ){
            this.select2.x = this.select2.x - 200;
        }
    }

    moveRigthUser2(){
        if(!this.choice2)
        if(this.select2.x < this.game.world.centerX+100 ){
            this.select2.x = this.select2.x + 200;
        }
    }

    backAction(){
        this.game.state.start('MenuState', true, true);
    }

    playGame(){
        this.game.state.start('GameState', true, true, this.choiceCharacter1, this.choiceCharacter2);

    }

    passGame(){
        if(this.choice1&&this.choice2){
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.playGame, this);
        }
    }

}

export default ChoiceCharacterState;