package ee.omis;

import ee.omis.character.*;
import ee.omis.item.*;

import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.Scanner;

public class Game {

    public static void main(String[] args) {
        World world = new World(5,10);
        Player player = new Player("Player");
        Enemy enemy = new Enemy("Enemy");
        Healer healer = new Healer();
        QuestMaster questMaster = new QuestMaster("QuestMaster");

        Sword sword = new Sword();
        Dagger dagger = new Dagger();
        Hammer hammer = new Hammer();
        Teleporter teleporter = new Teleporter();

        world.setCharacters(Arrays.asList(enemy,questMaster,healer,player));
        world.setItems(Arrays.asList(sword, dagger, hammer, teleporter));
        checkCharacterCoordinates(player, enemy, questMaster, healer, false);
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
                } else if (player.getHealth() < 1) {
                    System.out.println("SA EI SAA VÕIDELDA, KUI SUL ON ELUD OTSAS");
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

                            if (finalChosenItem.getName().equals("Teleporter")) {
                                player.setRandomCoordinates();
                                checkCharacterCoordinates(player, enemy, questMaster, healer, false);
                            } else {
                                while (player.getHealth() > 0 && Enemy.getHealth() > 0) {
                                    System.out.println("ÜTLE NUMBER 1-st 3-ni JA KUI PANED TÄPPI, SIIS VÕIDAD VASTASE");
                                    input = scanner.nextLine();
                                    while(!input.equals("1") && !input.equals("2") && !input.equals("3")) {
                                        System.out.println("ÜTLE NUMBER 1-st 3-ni JA KUI PANED TÄPPI, SIIS VÕIDAD VASTASE");
                                        input = scanner.nextLine();
                                    }
                                    int randomNumber = (int) (Math.random() * ( 3 ) + 1 );
                                    System.out.println(randomNumber);
                                    if (randomNumber == Integer.parseInt(input)) {
                                        System.out.println("ÕIGE! VÕTSID VASTASELT ELU");
                                        ((FightWeapon)(finalChosenItem)).hit();
                                        System.out.println(Enemy.getHealth());
                                        if (Enemy.getHealth()<1) {
                                            System.out.println("TAPSID VASTASE!");
                                            enemy.setVisible(false);
                                            enemy.setRandomCoordinates();
                                            Enemy.reboost();
                                            checkCharacterCoordinates(player, enemy, questMaster, healer, true);
                                        }
                                    } else {
                                        System.out.println("VALE! KAOTASID ELU");
                                        player.loseHealth();
                                        System.out.println(player.getHealth());
                                    }
                                }
                            }
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
                        } catch (Exception e) {
                            System.out.println("SEDA VIGA EI TOHIKS");
                        }
                    }
                }
            }
            checkIfPlayerCanGetItem(player,sword);
            checkIfPlayerCanGetItem(player,dagger);
            checkIfPlayerCanGetItem(player,hammer);
            checkIfPlayerCanGetItem(player,teleporter);

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

    private static void checkCharacterCoordinates(Player player, Enemy enemy, QuestMaster questMaster, Healer healer, boolean playerOnQuestMaster) {
        if (player.getxCoord() == questMaster.getxCoord() &&
                player.getyCoord() == questMaster.getyCoord() && !playerOnQuestMaster) {
            player.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, healer, false);
        }
        if (player.getxCoord() == enemy.getxCoord() &&
                player.getyCoord() == enemy.getyCoord() ) {
            enemy.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, healer, playerOnQuestMaster);
        }
        if (healer.getxCoord() == questMaster.getxCoord() &&
                healer.getyCoord() == questMaster.getyCoord() ) {
            healer.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, healer, false);
        }
        if (questMaster.getxCoord() == enemy.getxCoord() &&
                questMaster.getyCoord() == enemy.getyCoord()) {
            enemy.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, healer, playerOnQuestMaster);
        }
    }
}
