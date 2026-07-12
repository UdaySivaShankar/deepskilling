# Microservices exercise

This folder contains two simple Java-based microservice examples:

- account: exposes GET /accounts/{number}
- loan: exposes GET /loans/{number}

## Run locally

Open two terminals and run these commands from the project root.

### Account service

cd account
javac -d out src/main/java/com/cognizant/account/AccountApplication.java
java -cp out com.cognizant.account.AccountApplication

### Loan service

cd loan
javac -d out src/main/java/com/cognizant/loan/LoanApplication.java
java -cp out com.cognizant.loan.LoanApplication

The account service runs on port 8080 and the loan service runs on port 8081.
