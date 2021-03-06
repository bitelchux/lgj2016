import God1 from './../sprites/God1';
import God2 from './../sprites/God2';
import God3 from './../sprites/God3';
import Board from './Board';
import GodFlare from './GodFlare';

class Player {
    constructor(game, type, typeGod) {
        this.type = type;
        this.game = game;
        this.typeGod = typeGod;
        this.matrixInputs = [[false, false, false], [false, false, false], [false, false, false]];
        this.resource = 0;
        this.direction = 1;
        let lifeX = 10;
        let x = 200;
        if (this.type == 1) {
            this.direction = -1;
            this.positionGod = [200, 120];
            this.positionSkills = [10, 205];
            this.positionBoard = [108, 290];
            this.positionFlare = [200, 180];
        } else {
            this.positionGod = [600, 120];
            this.positionSkills = [410, 605];
            this.positionBoard = [503, 290];
            this.positionFlare = [620, 180];
            lifeX = 410;
            x = 600;
        }
        this.godFlare = new GodFlare(this.game, ...this.positionFlare);
        this.board = new Board(game, ...this.positionBoard);
        switch (this.typeGod) {
            case 1:
                this.god = new God1(this.game, this.direction, ...this.positionGod);
                break;
            case 2:
                this.god = new God2(this.game, this.direction, ...this.positionGod);
                break;
            case 3:
                this.god = new God3(this.game, this.direction, ...this.positionGod);
                break;
        }
        this.god.show2RandomSkills(...this.positionSkills);
        this.god.setLife(lifeX);
        this.board.setDiamondX(x);
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

    updatePlayer() {
        if (this.god.lifeParticles.length <= 0) {
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyall, this);
        }
    }


    destroyall() {
        let th = this.enemy.typeGod;
        this.destroy();
        this.enemy.destroy();
        let t = 1;
        if (this.type == 1)
            t = 2;
        this.game.state.start("WinnerState", true, true, t, th);
    }

    attack1() {
        console.log(this.god.activeSkill1.name);
        if (this.board.compareMatrix(this.god.activeSkill1.matrix)) {
            this.god.attack1(this.enemy);
            this.god.show2RandomSkills(...this.positionSkills);
        } else {
            console.log("You must build more pylons :v");
        }
    }

    attack2() {
        console.log(this.god.activeSkill2.name);
        if (this.board.compareMatrix(this.god.activeSkill2.matrix)) {
            this.god.attack2(this.enemy);
            this.god.show2RandomSkills(...this.positionSkills);
        } else {
            console.log("You must build more pylons :v");
        }
    }

    attack3() {
        if (this.god.attack3(this.enemy)) {
            this.board.deleteRandom(3, [4]);
            this.godFlare.downgrade();
            this.godFlare.downgrade();
            this.godFlare.downgrade();
            this.board.disappearDiamond();
        }
    }

    refreshCels() {
        this.matrixInputs = [[false, false, false], [false, false, false], [false, false, false]];
    }

    pressResource() {
        var res = arguments[0];
        if (this.resource != 0) {
            if (this.resource == res) {
                this.resource = 0;
            } else {
                this.resource = res;
            }
        } else {
            this.resource = res;
            this.refreshCels();
        }
    }

    pressCel() {
        var cel = arguments[0];
        var col = (cel - 1) % 3;
        var row = (Math.floor((cel - 1) / 3)) % 3;
        if (this.matrixInputs[col][row]) {
            var misslife = this.board.destroyResource(cel);
            if (misslife[0]) {
                this.god.subtractLife(1);
            } else if (misslife[1] == 4) {
                this.godFlare.downgrade();
            }
            this.refreshCels();
        } else {
            if (this.resource != 0) {
                if (this.board.insertResource(this.resource, cel) && this.resource == 4) {
                    if (this.godFlare.level < 3) {
                        if (this.godFlare.level == 2) {
                            this.board.appearDiamond();
                        } else {
                            this.board.disappearDiamond();
                        }
                        this.godFlare.upgrade();
                    }
                }
                this.refreshCels();
                this.resource = 0;
            } else {
                this.refreshCels();
                this.matrixInputs[col][row] = true;
            }
        }
    }

    destroy() {
        this.god.destroy();
        this.board.destroy();

    }

    playN() {
        if (this.board.verifyN()) {
            let music = this.game.add.audio('nox1');
            music.play();
        }
    }

}

export default Player;