class Product {
    int id;
    String name;
    String category;
    Product(int id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}
public class EcommerceSearchAndForecast {
    static int linearSearch(Product[] products, String target) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].name.equals(target)) {
                return i;
            }
        }
        return -1;
    }
    static int binarySearch(Product[] products, String target) {
        int low = 0;
        int high = products.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            int cmp = products[mid].name.compareTo(target);
            if (cmp == 0) {
                return mid;
            }
            if (cmp < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
    static double futureValue(double amount, double rate, int periods) {
        if (periods == 0) {
            return amount;
        }
        return futureValue(amount * (1 + rate), rate, periods - 1);
    }
    public static void main(String[] args) {
        Product[] products = new Product[] {
            new Product(101, "Camera", "Electronics"),
            new Product(102, "Laptop", "Electronics"),
            new Product(103, "Mug", "Home"),
            new Product(104, "Notebook", "Stationery"),
            new Product(105, "Shoes", "Fashion")
        };
        String target = "Notebook";
        int linearIndex = linearSearch(products, target);
        System.out.println("Linear search index " + linearIndex);
        Product[] sorted = new Product[products.length];
        System.arraycopy(products, 0, sorted, 0, products.length);
        java.util.Arrays.sort(sorted, (a, b) -> a.name.compareTo(b.name));
        int binaryIndex = binarySearch(sorted, target);
        System.out.println("Binary search index " + binaryIndex);
        System.out.println("Linear search O(n)");
        System.out.println("Binary search O(log n)");
        System.out.println("Binary search is better when data is sorted and queries are frequent");
        double projected = futureValue(1000, 0.05, 5);
        System.out.println("Future value after 5 periods " + projected);
        System.out.println("Recursive time complexity O(n)");
        System.out.println("Memoization or iteration can avoid repeated work");
    }
}
