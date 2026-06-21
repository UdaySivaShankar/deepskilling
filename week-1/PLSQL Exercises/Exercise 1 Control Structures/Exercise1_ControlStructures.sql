SET SERVEROUTPUT ON
DECLARE
    CURSOR customer_cursor IS
        SELECT customer_id, age, balance, loan_interest_rate FROM customers;
    v_id customers.customer_id%TYPE;
    v_age customers.age%TYPE;
    v_balance customers.balance%TYPE;
    v_rate customers.loan_interest_rate%TYPE;
BEGIN
    FOR record IN customer_cursor LOOP
        v_id := record.customer_id;
        v_age := record.age;
        v_balance := record.balance;
        v_rate := record.loan_interest_rate;
        IF v_age > 60 THEN
            UPDATE customers
            SET loan_interest_rate = loan_interest_rate - 0.01
            WHERE customer_id = v_id;
        END IF;
        IF v_balance > 10000 THEN
            UPDATE customers
            SET isvip = 1
            WHERE customer_id = v_id;
        END IF;
    END LOOP;
    FOR loan_record IN (
        SELECT loan_id, customer_id FROM loans
        WHERE due_date BETWEEN SYSDATE AND SYSDATE + 30
    ) LOOP
        DBMS_OUTPUT.PUT_LINE('Reminder for customer ' || loan_record.customer_id || ' loan ' || loan_record.loan_id || ' due soon');
    END LOOP;
    COMMIT;
END;
/
