public class LoggerTest {
    public static void main(String[] args) {
        Logger first = Logger.getInstance();
        Logger second = Logger.getInstance();
        if (first == second) {
            System.out.println("Singleton works");
        } else {
            System.out.println("Singleton failed");
        }
        first.log("first instance used");
        second.log("second instance used");
    }
}
