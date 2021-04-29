package ee.omis.character;

import ee.omis.World;
import ee.omis.item.Item;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Player extends Character {
    private Direction direction;
    private int health;
    private List<Item> items = new ArrayList<>();

    public Player(String name) {
        super(name, 'X', true);
        this.direction = Direction.UP;
        this.health = 3;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public int getHealth() {
        return health;
    }

    public List<Item> getItems() {
        return items.stream()
                    .filter(item -> item.getDurability() > 0)
                    .collect(Collectors.toList());
    }

    public void showItems() {
        this.items = getItems();
        for (int i = 0; i < items.size(); i++) {
                System.out.println(
                        i+1 + ": " + items.get(i).getName() +
                                ", tugevusega: " + items.get(i).getStrength() +
                                ", kasutuskordi: " + items.get(i).getDurability());
                // Ilusam oleks toString() sisse see teha ja siis this.items.get(i)
        }
    }

    public void addItem(Item item) {
        // ESE - Mõõk
        // LIST - [{name:Sword,..}, {name:Hammer}]
        if (items.contains(item)) {
            this.items.stream()
                    .filter(i -> i.getName().equals(item.getName()))
                    .findFirst()
                    .ifPresent(i -> i.setDurability(i.getDurability()+1));
        } else {
            this.items.add(item);
        }
    }

    public void move() {
        switch (this.direction) {
            case UP:
                if (getyCoord() > 1) {
                    setyCoord(getyCoord()-1);
                }
                break;
            case DOWN:
                if (getyCoord() < World.getHeight()-1) {
                    setyCoord(getyCoord()+1);
                }
                break;
            case LEFT:
                if (getxCoord() > 1) {
                    setxCoord(getxCoord() - 1);
                }
                break;
            case RIGHT:
                if (getxCoord() < World.getWidth()-1) {
                    setxCoord(getxCoord() + 1);
                }
                break;
        }
    }

    public void loseHealth() {
        this.health--;
    }
}
