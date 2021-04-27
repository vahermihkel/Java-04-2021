package ee.omis.character;

import ee.omis.character.Character;
import ee.omis.item.Item;

public class Enemy extends Character {
    private int health;

    public Enemy(String name) {
        super(name, 'Z', false);
        this.health = (int) (Math.random() * ( 10 - 1 ) + 1 );
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }

    public void loseHealth(Item item) {
        this.health = (int) (this.health-item.getStrength());
    }
}
