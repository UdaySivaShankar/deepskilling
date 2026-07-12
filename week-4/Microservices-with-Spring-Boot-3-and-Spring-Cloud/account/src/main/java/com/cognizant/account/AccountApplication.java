package com.cognizant.account;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.charset.StandardCharsets;

public class AccountApplication {
    public static void main(String[] args) throws IOException {
        int port = resolvePort(8080);
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", AccountApplication::handleRequest);
        server.setExecutor(null);
        server.start();
        System.out.println("Account service started on http://localhost:" + port);
    }

    private static int resolvePort(int preferredPort) {
        for (int port = preferredPort; port < preferredPort + 20; port++) {
            try (ServerSocket socket = new ServerSocket(port)) {
                return socket.getLocalPort();
            } catch (IOException ignored) {
                // Try the next port.
            }
        }
        throw new IllegalStateException("No free port available for the account service.");
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();
        String response;

        if (path != null && path.startsWith("/accounts/")) {
            String number = path.substring("/accounts/".length());
            response = "{\"number\":\"" + number + "\",\"type\":\"savings\",\"balance\":234343}";
        } else {
            response = "{\"message\":\"Use /accounts/{number}\"}";
        }

        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, bytes.length);

        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(bytes);
        }
    }
}
