DELIMITER //

CREATE PROCEDURE test_proc(tags VARCHAR(2048))
BEGIN

SET @list := tags;
SET @list := CONCAT("(", 1, ", ", "'", REPLACE(@list, ",", "'),(1, '"), "')");
SELECT @list from DUAL;

END

//

DELIMITER ;
