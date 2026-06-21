SET SERVEROUTPUT ON
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
BEGIN
    UPDATE savings_accounts
    SET balance = balance * 1.01;
    COMMIT;
END;
/
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(p_department_id NUMBER, p_bonus_percent NUMBER) IS
BEGIN
    UPDATE employees
    SET salary = salary + salary * p_bonus_percent / 100
    WHERE department_id = p_department_id;
    COMMIT;
END;
/
CREATE OR REPLACE PROCEDURE TransferFunds(p_source_account NUMBER, p_target_account NUMBER, p_amount NUMBER) IS
    v_balance savings_accounts.balance%TYPE;
BEGIN
    SELECT balance INTO v_balance FROM accounts WHERE account_id = p_source_account FOR UPDATE;
    IF v_balance < p_amount THEN
        RAISE_APPLICATION_ERROR(-20001, 'Insufficient balance');
    END IF;
    UPDATE accounts SET balance = balance - p_amount WHERE account_id = p_source_account;
    UPDATE accounts SET balance = balance + p_amount WHERE account_id = p_target_account;
    COMMIT;
END;
/
