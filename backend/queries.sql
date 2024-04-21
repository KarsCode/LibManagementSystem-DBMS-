CREATE OR REPLACE FUNCTION calculate_fine(overdue_days IN NUMBER)
RETURN NUMBER
IS
    base_fine CONSTANT NUMBER := 150;
    additional_fine_per_day CONSTANT NUMBER := 20;
    fine_amount NUMBER;
BEGIN
    fine_amount := base_fine + (overdue_days * additional_fine_per_day);
    RETURN fine_amount;
END calculate_fine;
/

CREATE OR REPLACE TRIGGER book_return_trigger
AFTER INSERT ON returned_books
FOR EACH ROW
DECLARE
    overdue_days NUMBER;
    fine_amount NUMBER;
BEGIN
    -- Calculate overdue days
    overdue_days := (SYSDATE - :NEW.return_date) - 7; -- Assuming the return_date is the expected return date
    
    -- Check if there is any fine
    IF overdue_days > 0 THEN
        -- Calculate fine amount
        fine_amount := calculate_fine(overdue_days);
        
        -- Insert into fines table
        INSERT INTO fines (user_id, user_name, borrow_id, book_name, fine_amount)
        VALUES (:NEW.user_id, :NEW.user_name, :NEW.borrow_id, :NEW.book_name, fine_amount);
    END IF;
END;
/

CREATE OR REPLACE PROCEDURE update_book_inventory(
    p_isbn IN VARCHAR2,
    p_quantity IN NUMBER
)
IS
BEGIN
    UPDATE books
    SET inventory = inventory + p_quantity
    WHERE isbn = p_isbn;
END update_book_inventory;
/

CREATE OR REPLACE PROCEDURE calculate_total_fine(
    p_user_id IN NUMBER,
    p_total_fine OUT NUMBER
)
IS
BEGIN
    SELECT SUM(fine_amount)
    INTO p_total_fine
    FROM fines
    WHERE user_id = p_user_id;
END calculate_total_fine;
/


CREATE OR REPLACE PROCEDURE generate_fine_report(
    p_user_id IN NUMBER
)
IS
BEGIN
    FOR fine_record IN (
        SELECT *
        FROM fines
        WHERE user_id = p_user_id
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE('User: ' || fine_record.user_name);
        DBMS_OUTPUT.PUT_LINE('Book: ' || fine_record.book_name);
        DBMS_OUTPUT.PUT_LINE('Fine Amount: $' || TO_CHAR(fine_record.fine_amount));
        DBMS_OUTPUT.PUT_LINE('---------------------------');
    END LOOP;
END generate_fine_report;
/