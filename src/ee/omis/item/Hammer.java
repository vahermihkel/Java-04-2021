package ee.omis.item;

import ee.omis.character.Enemy;

public class Hammer extends Item implements FightWeapon {
    private static double strength = 3.0;
    public Hammer() {
        super("Haamer", strength, 5);
    }

    @Override
    public void hit() {
        strength = getStrengthFromItemType(strength);
        strength *= randomiseStrength();
        Enemy.decreaseHealth((int)strength);
        setLevel(getLevel()+1);
    }

    private double randomiseStrength() {
        return Math.random() * ( 2 );
    }
}
