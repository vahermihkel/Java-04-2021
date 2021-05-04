package ee.omis.item;

public class Dagger extends Item implements FightWeapon {
    private static double strength = 5.0;
    public Dagger() {
        super("Pistoda", strength , 3);
    }

    @Override
    public double hit() {
        strength = getStrengthFromItemType(strength);
        setLevel(getLevel()+1);
        return strength;
    }
}
