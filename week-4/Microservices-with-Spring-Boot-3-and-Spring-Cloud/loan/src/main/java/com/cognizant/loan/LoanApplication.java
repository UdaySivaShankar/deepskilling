package com.cognizant.loan;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.charset.StandardCharsets;

public class LoanApplication {
    public static void main(String[] args) throws IOException {
        int port = resolvePort(8081);
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", LoanApplication::handleRequest);
        server.setExecutor(null);
        server.start();
        System.out.println("Loan service started on http://localhost:" + port);
    }

    private static int resolvePort(int preferredPort) {
        for (int port = preferredPort; port < preferredPort + 20; port++) {
            try (ServerSocket socket = new ServerSocket(port)) {
                return socket.getLocalPort();
            } catch (IOException ignored) {
                // Try the next port.
            }
        }
        throw new IllegalStateException("No free port available for the loan service.");
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();
        String response;

        if (path != null && path.startsWith("/loans/")) {
            String number = path.substring("/loans/".length());
            response = "{\"number\":\"" + number + "\",\"type\":\"car\",\"loan\":400000,\"emi\":3258,\"tenure\":18}";
        } else {
            response = "{\"message\":\"Use /loans/{number}\"}";
        }

        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, bytes.length);

        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(bytes);
        }
    }
}
