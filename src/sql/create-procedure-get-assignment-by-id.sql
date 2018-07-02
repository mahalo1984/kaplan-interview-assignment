DELIMITER //

CREATE PROCEDURE get_assignment_by_id(assignId BIGINT(20))

BEGIN

SELECT * FROM assignments WHERE id = assignId;

END

//

DELIMITER ;
