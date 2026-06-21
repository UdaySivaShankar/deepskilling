interface Document {
    String getType();
    void open();
}
class WordDocument implements Document {
    public String getType() {
        return "Word";
    }
    public void open() {
        System.out.println("Opening Word document");
    }
}
class PdfDocument implements Document {
    public String getType() {
        return "PDF";
    }
    public void open() {
        System.out.println("Opening PDF document");
    }
}
class ExcelDocument implements Document {
    public String getType() {
        return "Excel";
    }
    public void open() {
        System.out.println("Opening Excel document");
    }
}
abstract class DocumentFactory {
    public abstract Document createDocument();
}
class WordDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new WordDocument();
    }
}
class PdfDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new PdfDocument();
    }
}
class ExcelDocumentFactory extends DocumentFactory {
    public Document createDocument() {
        return new ExcelDocument();
    }
}
public class DocumentFactoryTest {
    public static void main(String[] args) {
        DocumentFactory[] factories = new DocumentFactory[] {
            new WordDocumentFactory(),
            new PdfDocumentFactory(),
            new ExcelDocumentFactory()
        };
        for (DocumentFactory factory : factories) {
            Document document = factory.createDocument();
            System.out.println(document.getType() + " document created");
            document.open();
        }
    }
}
