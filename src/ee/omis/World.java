package ee.omis;

import java.sql.SQLOutput;
import java.util.List;

public class World {
    private static int height;
    private static int width;
    private List<Character> characters;

    public World(int height, int width, List<Character> characters) {
        World.height = height;
        World.width = width;
        this.characters = characters;
    }

    public static int getHeight() {
        return height;
    }

    /*public void setHeight(int height) {
        World.height = height;
    }*/

    public static int getWidth() {
        return width;
    }

   /* public void setWidth(int width) {
        this.width = width;
    }*/

    public List<Character> getCharacters() {
        return characters;
    }

    public void setCharacters(List<Character> characters) {
        this.characters = characters;
    }

    public void render() {
        char symbol;
        for (int y = 0; y <= height; y++) {
            for (int x = 0; x <= width; x++) {
                if (y == 0 || y == height) {
                    symbol = '-';
                } else if (x == 0 || x == width) {
                    symbol = '|';
                } else {
                    symbol = ' ';
                }

                for (Character c : characters) {
                    if (c.getxCoord() == x && c.getyCoord() == y) {
                        symbol = c.getSymbol();
                    }
                }

                System.out.print(symbol);
            }
            System.out.println();
        }
    }
}
