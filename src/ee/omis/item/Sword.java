package ee.omis.item;

import ee.omis.character.Enemy;

public class Sword extends Item implements FightWeapon {
    public Sword() {
        super("Mõõk", 10.0, 1);
    }

    @Override
    public void hit() {
        Enemy.killed();
        setLevel(getLevel()+1);
    }
}
