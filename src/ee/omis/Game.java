package ee.omis;

import ee.omis.character.Direction;
import ee.omis.character.Enemy;
import ee.omis.character.Player;
import ee.omis.character.QuestMaster;
import ee.omis.item.Dagger;
import ee.omis.item.Hammer;
import ee.omis.item.Item;
import ee.omis.item.Sword;

import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.Scanner;

public class Game {

    public static void main(String[] args) {
        World world = new World(5,10);
        Player player = new Player("Player");
        Enemy enemy = new Enemy("Enemy");
        QuestMaster questMaster = new QuestMaster("QuestMaster");

        Sword sword = new Sword("Mõõk",10.0, 1);
        Dagger dagger = new Dagger("Pistoda",5.0, 2);
        Hammer hammer = new Hammer("Haamer",3.0, 5);

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
                    player.getyCoord() == enemy.getyCoord() && enemy.isVisible()) {
                if (player.getItems().size() < 1) {
                    System.out.println("SA EI SAA VÕIDELDA, KUI SUL POLE RELVI, KOGU MAAST");
                } else {
                    player.showItems();
                    System.out.println("VALI NUMBER MILLIST RELVA KASUTADA TAHAD: ");
                    input = scanner.nextLine();
                    Item chosenItem = null;
                    while (chosenItem == null) {
                        try {
                            chosenItem = player.getItems().get(Integer.parseInt(input)-1);
//                            for (int i = 0; i < player.getItems().size(); i++) {
//                                if (player.getItems().get(i).getName().equals(chosenItem.getName())) {
//                                    chosenItem.setDurability(chosenItem.getDurability()-1);
//                                }
//                            }
                            System.out.println("VALISID RELVA: " + chosenItem.getName());
                            Item finalChosenItem = chosenItem;
                            player.getItems().stream()
                                    .filter(e -> e.getName().equals(finalChosenItem.getName()))
                                    .findFirst()
                                    .ifPresent(e -> e.setDurability(e.getDurability()-1));

                            System.out.println("ÜTLE NUMBER 1-st 3-ni JA KUI PANED TÄPPI, SIIS VÕIDAD VASTASE");
                            input = scanner.nextLine();
                            while(!input.equals("1") && !input.equals("2") && !input.equals("3")) {
                                System.out.println("ÜTLE NUMBER 1-st 3-ni JA KUI PANED TÄPPI, SIIS VÕIDAD VASTASE");
                                input = scanner.nextLine();
                            }
                            int randomNumber = (int) (Math.random() * ( 3 - 1 ) + 1 );
                            if (randomNumber == Integer.parseInt(input)) {
                                System.out.println("ÕIGE! VÕTSID VASTASELT ELU");
                                enemy.loseHealth(chosenItem);
                                System.out.println(enemy.getHealth());
                            } else {
                                System.out.println("VALE! KAOTASID ELU");
                                player.loseHealth();
                                System.out.println(player.getHealth());
                            }

                            enemy.setVisible(false);
                            enemy.setRandomCoordinates();
                            checkCharacterCoordinates(player, enemy, questMaster, true);
                        } catch (NumberFormatException e) {
                            System.out.println("SISESTA NUMBER!");
                            player.showItems();
                            System.out.println("VALI NUMBER MILLIST RELVA KASUTADA TAHAD: ");
                            input = scanner.nextLine();
                        } catch (IndexOutOfBoundsException e) {
                            System.out.println("VALITUD NUMBRIGA RELVA EI LEITUD!");
                            player.showItems();
                            System.out.println("VALI NUMBER MILLIST RELVA KASUTADA TAHAD: ");
                            input = scanner.nextLine();
                        }
                    }
                }
            }
            checkIfPlayerCanGetItem(player,sword);
            checkIfPlayerCanGetItem(player,dagger);
            checkIfPlayerCanGetItem(player,hammer);

            world.render();
            input = scanner.nextLine();
        }
    }

    private static void checkIfPlayerCanGetItem(Player player, Item item) {
        if (player.getxCoord() == item.getxCoord() &&
                player.getyCoord() == item.getyCoord()) {
            player.addItem(item);
//            item.setRandomCoordinates();
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
