package ee.omis.item;

import ee.omis.character.Enemy;

public class Dagger extends Item implements FightWeapon {
    private static double strength = 5.0;
    public Dagger() {
        super("Pistoda", strength , 3);
    }

    @Override
    public void hit() {
        strength = getStrengthFromItemType(strength);
        Enemy.decreaseHealth((int)strength);
        setLevel(getLevel()+1);
    }
}
