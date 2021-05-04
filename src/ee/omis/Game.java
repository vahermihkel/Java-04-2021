package ee.omis;

import ee.omis.character.*;
import ee.omis.item.*;

import java.util.*;
import java.util.concurrent.TimeUnit;

public class Game {
    static int interval  = 0;

    public static void main(String[] args) {
        World world = new World(5,10);
        Timer timer = new Timer();
        Map<EnemyType, Integer> defeatedEnemies = new HashMap<>();
        Player player = new Player();
        Enemy enemy = new Enemy();
        Healer healer = new Healer();
        QuestMaster questMaster = new QuestMaster();
        Sword sword = new Sword();
        Dagger dagger = new Dagger();
        Hammer hammer = new Hammer();
        Teleporter teleporter = new Teleporter();
        Scanner scanner = new Scanner(System.in);

        world.setCharacters(Arrays.asList(enemy,questMaster,healer,player));
        world.setItems(Arrays.asList(sword, dagger, hammer, teleporter));
        checkCharacterCoordinates(player, enemy, questMaster, healer, false);
        world.render();
        startTimer(timer);
        String input = scanner.nextLine();
        interactWithWorld(world, timer, defeatedEnemies, player, enemy, healer, questMaster, sword, dagger, hammer, teleporter, scanner, input);
    }

    private static void interactWithWorld(World world, Timer timer, Map<EnemyType, Integer> defeatedEnemies, Player player, Enemy enemy, Healer healer, QuestMaster questMaster, Sword sword, Dagger dagger, Hammer hammer, Teleporter teleporter, Scanner scanner, String input) {
        while (!input.equals("end") && player.getLives() > 0) {
            setPlayerDirection(player, input);
            player.move();

            questMasterSeen(player, enemy, questMaster);
            healerSeen(player, healer);
            enemySeen(defeatedEnemies, player, enemy, healer, questMaster, scanner, input);

            checkIfPlayerCanGetItem(player,sword);
            checkIfPlayerCanGetItem(player,dagger);
            checkIfPlayerCanGetItem(player,hammer);
            checkIfPlayerCanGetItem(player,teleporter);

            if (player.getLives() > 0) {
                world.render();
                input = scanner.nextLine();
            } else {
                timer.cancel();
            }
        }
    }

    private static void healerSeen(Player player, Healer healer) {
        if (player.getxCoord() == healer.getxCoord() &&
                player.getyCoord() == healer.getyCoord()) {
            player.reboost();
            System.out.println("LEIDSID RAVITSEJA, RAVISID ELUD TÄIS!");
        }
    }

    private static void questMasterSeen(Player player, Enemy enemy, QuestMaster questMaster) {
        if (player.getxCoord() == questMaster.getxCoord() &&
                player.getyCoord() == questMaster.getyCoord()) {
            enemy.setVisible(true);
        }
    }

    private static void setPlayerDirection(Player player, String input) {
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
    }

    private static void enemySeen(Map<EnemyType, Integer> defeatedEnemies, Player player, Enemy enemy, Healer healer, QuestMaster questMaster, Scanner scanner, String input) {
        if (player.getxCoord() == enemy.getxCoord() &&
                player.getyCoord() == enemy.getyCoord() && enemy.isVisible()) {
            if (player.getItems().size() < 1) {
                System.out.println("SA EI SAA VÕIDELDA, KUI SUL POLE RELVI, KOGU MAAST");
            } else if (player.getHealth() < 1) {
                System.out.println("SA EI SAA VÕIDELDA, KUI SUL ON ELUD OTSAS");
            } else {
                chooseWeapon(defeatedEnemies, player, enemy, healer, questMaster, scanner);
            }
        }
    }

    private static void chooseWeapon(Map<EnemyType, Integer> defeatedEnemies, Player player, Enemy enemy, Healer healer, QuestMaster questMaster, Scanner scanner) {
        player.showItems();
        System.out.println("VALI NUMBER MILLIST RELVA KASUTADA TAHAD: ");
        String input = scanner.nextLine();
        Item chosenItem = null;
        while (chosenItem == null) {
            try {
                chosenItem = player.getItems().get(Integer.parseInt(input)-1);
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
                    startBattle(defeatedEnemies, player, enemy, healer, questMaster, scanner, input, finalChosenItem);
                }
            } catch (NumberFormatException e) {
                input = printErrorAndAskAgain(player, scanner, "SISESTA NUMBER!");
            } catch (IndexOutOfBoundsException e) {
                input = printErrorAndAskAgain(player, scanner, "VALITUD NUMBRIGA RELVA EI LEITUD!");
            } catch (Exception e) {
                System.out.println("SEDA VIGA EI TOHIKS");
            }
        }
    }

    private static String printErrorAndAskAgain(Player player, Scanner scanner, String error) {
        System.out.println(error);
        player.showItems();
        System.out.println("VALI NUMBER MILLIST RELVA KASUTADA TAHAD: ");
        return scanner.nextLine();
    }

    private static void startBattle(Map<EnemyType, Integer> defeatedEnemies, Player player, Enemy enemy, Healer healer, QuestMaster questMaster, Scanner scanner, String input, Item finalChosenItem) throws InterruptedException {
        while (player.getHealth() > 0 && enemy.getHealth() > 0) {
            TimeUnit.MILLISECONDS.sleep(1000);
            System.out.println("ÜTLE NUMBER 1-st 3-ni JA KUI PANED TÄPPI, SIIS VÕIDAD VASTASE");
            String userEntered = scanner.nextLine();
            while(!input.equals("1") && !input.equals("2") && !input.equals("3")) {
                System.out.println("ÜTLE NUMBER 1-st 3-ni JA KUI PANED TÄPPI, SIIS VÕIDAD VASTASE");
                userEntered = scanner.nextLine();
            }
            int randomNumber = (int) (Math.random() * ( 3 ) + 1 );
            System.out.println(randomNumber);
            if (randomNumber == Integer.parseInt(userEntered)) {
                enemyHit(defeatedEnemies, player, enemy, healer, questMaster, finalChosenItem);
            } else {
                playerHit(defeatedEnemies, player);
            }
        }
        enemy.reboost();
    }

    private static void playerHit(Map<EnemyType, Integer> defeatedEnemies, Player player) throws InterruptedException {
        TimeUnit.MILLISECONDS.sleep(1000);
        System.out.println("VALE! KAOTASID ELU");
        player.loseHealth();
        System.out.println(player.getHealth());
        if (player.getHealth() <= 0) {
            player.takeLife();
            TimeUnit.MILLISECONDS.sleep(1000);
            if (player.getLives() < 1) {
                System.out.println("SAID SURMA JA ELUD ON OTSAS! MÄNG LÄBI.");
                defeatedEnemies.forEach((key, value)-> System.out.println(key + "---" + value));
                TimeUnit.MILLISECONDS.sleep(1000);
                System.out.println("KULUNUD AEG KOKKU: " + interval);
            } else {
                System.out.println("SAID SURMA! OTSI ÜLES RAVITSEJA");
            }
        }
    }

    private static void enemyHit(Map<EnemyType, Integer> defeatedEnemies, Player player, Enemy enemy, Healer healer, QuestMaster questMaster, Item finalChosenItem) throws InterruptedException {
        TimeUnit.MILLISECONDS.sleep(1000);
        System.out.println("ÕIGE! VÕTSID VASTASELT ELU");
        double healthTaken = ((FightWeapon)(finalChosenItem)).hit();
        enemy.decreaseHealth((int)healthTaken);
        System.out.println(enemy.getHealth());
        if (enemy.getHealth()<1) {
            int defeatedCount = defeatedEnemies.getOrDefault(enemy.getEnemyType(), 1);
            defeatedEnemies.put(enemy.getEnemyType(), defeatedCount);
            System.out.println("TAPSID VASTASE!");
            defeatedEnemies.forEach((key, value)-> System.out.println(key + "---" + value));
            enemy.setVisible(false);
            enemy.setRandomCoordinates();
            checkCharacterCoordinates(player, enemy, questMaster, healer, true);
        }
    }

    private static void startTimer(Timer timer) {
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                interval++;
            }
        }, 1000, 1000);
    }

    private static void checkIfPlayerCanGetItem(Player player, Item item) {
        if (player.getxCoord() == item.getxCoord() &&
                player.getyCoord() == item.getyCoord()) {
            player.addItem(item);
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
