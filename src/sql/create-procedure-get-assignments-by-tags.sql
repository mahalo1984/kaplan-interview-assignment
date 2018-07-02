DELIMITER //

CREATE PROCEDURE get_assignments_by_tags(tagslist VARCHAR(2048))

BEGIN

SELECT * FROM assignments WHERE id IN (SELECT DISTINCT assignmentId FROM assignmentsTagsHumanReadable WHERE FIND_IN_SET(tagName, tagslist));

END

//

DELIMITER ;
