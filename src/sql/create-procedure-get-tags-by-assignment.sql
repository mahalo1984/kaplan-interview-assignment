DELIMITER //

CREATE PROCEDURE get_tags_by_assignment(assignId BIGINT(20))

BEGIN

SELECT *
FROM tags
WHERE id IN (SELECT tagId
            FROM assignmentsTags
            WHERE assignmentId = assignId);

END

//

DELIMITER ;
