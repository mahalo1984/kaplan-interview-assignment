DELIMITER //

CREATE PROCEDURE insert_assignment(aName VARCHAR(80),
                                   aTitle VARCHAR(80),
                                   aDescription TEXT,
                                   aType VARCHAR(80),
                                   aDuration DECIMAL(5,2),
                                   tags VARCHAR(2048))
BEGIN

DECLARE exit handler for sqlexception
  BEGIN
    SELECT 'An error has occurred';
    ROLLBACK;
  END;

SET @list := tags;
SET @list := CONCAT("('", REPLACE(@list, ",", "'),('"), "')");

SET @insert_tags_sql := CONCAT('INSERT IGNORE INTO tags(name) VALUES ', @list);
PREPARE insert_tags_stmt FROM @insert_tags_sql;


START TRANSACTION;

    INSERT INTO assignments(name, title, description, type, duration)
    VALUES (aName, aTitle, aDescription, aType, aDuration);

    SET @new_assignment_id = LAST_INSERT_ID();

    EXECUTE insert_tags_stmt;
    DEALLOCATE PREPARE insert_tags_stmt;

    INSERT INTO assignmentsTags SELECT @new_assignment_id, id FROM tags WHERE FIND_IN_SET(name, tags);

    SELECT @new_assignment_id;
COMMIT;

END

//

DELIMITER ;
