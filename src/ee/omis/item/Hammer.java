package ee.omis.item;

public class Hammer extends Item implements FightWeapon {
    private static double strength = 3.0;
    public Hammer() {
        super("Haamer", strength, 5);
    }

    @Override
    public double hit() {
        strength = getStrengthFromItemType(strength);
        setLevel(getLevel()+1);
        strength *= randomiseStrength();
        return strength;
    }

    private double randomiseStrength() {
        return Math.random() * ( 2 );
    }
}
