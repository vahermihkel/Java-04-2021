package ee.omis;

import ee.omis.character.Direction;
import ee.omis.character.Enemy;
import ee.omis.character.Player;
import ee.omis.character.QuestMaster;
import ee.omis.item.Dagger;
import ee.omis.item.Hammer;
import ee.omis.item.Sword;

import java.util.Arrays;
import java.util.Scanner;

public class Game {

    public static void main(String[] args) {
        System.out.println("Hello World");
        World world = new World(2,5);
        Player player = new Player("Player");
        Enemy enemy = new Enemy("Enemy");
        QuestMaster questMaster = new QuestMaster("QuestMaster");

        Sword sword = new Sword(10.0, 1);
        Dagger dagger = new Dagger(5.0, 2);
        Hammer hammer = new Hammer(3.0, 5);

        world.setCharacters(Arrays.asList(enemy,questMaster,player));
        world.setItems(Arrays.asList(sword, dagger, hammer));
        checkCharacterCoordinates(player, enemy, questMaster, false);
        world.render();

        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        while (!input.equals("end")) {
            switch (input) {
                case "w":
                    player.setDirection(Direction.UP);
                    break;
                case "s":
                    player.setDirection(Direction.DOWN);
                    break;
                case "a":
                    player.setDirection(Direction.LEFT);
                    break;
                case "d":
                    player.setDirection(Direction.RIGHT);
                    break;
            }
            player.move();

            if (player.getxCoord() == questMaster.getxCoord() &&
                    player.getyCoord() == questMaster.getyCoord()) {
                enemy.setVisible(true);
            }

            if (player.getxCoord() == enemy.getxCoord() &&
                    player.getyCoord() == enemy.getyCoord()) {
                enemy.setVisible(false);
                enemy.setRandomCoordinates();
                checkCharacterCoordinates(player, enemy, questMaster, true);
            }

            world.render();
            input = scanner.nextLine();
        }
    }

    private static void checkCharacterCoordinates(Player player, Enemy enemy, QuestMaster questMaster, boolean playerOnQuestMaster) {
        if (player.getxCoord() == questMaster.getxCoord() &&
                player.getyCoord() == questMaster.getyCoord() && !playerOnQuestMaster) {
            player.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, false);
        }
        if (player.getxCoord() == enemy.getxCoord() &&
                player.getyCoord() == enemy.getyCoord() ) {
            enemy.setRandomCoordinates();
        }
        if (questMaster.getxCoord() == enemy.getxCoord() &&
                questMaster.getyCoord() == enemy.getyCoord()) {
            enemy.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, playerOnQuestMaster);
        }
    }
}
