package ee.omis.item;

public class Sword extends Item implements FightWeapon {
    private static double strength = 10.0;
    public Sword() {
        super("Mõõk", strength, 1);
    }

    @Override
    public double hit() {
        strength = getStrengthFromItemType(strength);
        setLevel(getLevel()+1);
        return strength;
    }
}
