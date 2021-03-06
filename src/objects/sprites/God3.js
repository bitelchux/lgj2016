import God from './God';
import SkillFactory from '../entities/SkillFactory';

class God3 extends God {
    constructor(game, direction, x, y) {
        super(game, direction, x, y, "pose_m", "ataque_m", "cura_m", "ataque_m", "ataque_m", "pose_m");
        this.addSkill('a1', SkillFactory.createSkill('Punch3', game));
        this.addSkill('a2', SkillFactory.createSkill('Heal3', game));
        this.addSkill('a3', SkillFactory.createSkill('Destroy3', game));
        this.addSkill('a4', SkillFactory.createSkill('SuperDestroy3', game));
    }
}

export default God3;