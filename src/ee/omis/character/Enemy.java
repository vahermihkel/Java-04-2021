package ee.omis.character;

public class Enemy extends Character implements FightCharacter {
    private int health;
    private EnemyType enemyType;

    public Enemy() {
        super('Z', false);
        reboost();
        enemyType = EnemyType.getRandomEnemyType();
    }

    public int getHealth() {
        return health;
    }

    public void decreaseHealth(int healthTaken) {
        health -= healthTaken;
    }

    public EnemyType getEnemyType() {
        return enemyType;
    }

    private void healthbyCharacterType() {
        switch (enemyType) {
            case THIEF:
                health = (int) (Math.random() * ( 2 ) + 1 );
                break;
            case WARRIOR:
                health = (int) (Math.random() * ( 3 ) + 1 );
                break;
            case ARCHER:
                health = (int) (Math.random() * ( 4 ) + 1 );
                break;
            case GOBLIN:
                health = (int) (Math.random() * ( 5 ) + 1 );
                break;
            case ORC:
                health = (int) (Math.random() * ( 6 ) + 1 );
                break;
            case WIZARD:
                health = (int) (Math.random() * ( 7 ) + 1 );
                break;
            case DRAGON:
                health = (int) (Math.random() * ( 8 ) + 1 );
                break;
        }
    }

    public void reboost() {
        enemyType = EnemyType.getRandomEnemyType();
        this.healthbyCharacterType();
    }
}
