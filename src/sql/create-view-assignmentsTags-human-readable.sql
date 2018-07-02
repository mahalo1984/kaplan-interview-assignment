create view assignmentsTagsHumanReadable as
  SELECT assignments.id AS assignmentId,
         assignments.name AS assignmentName,
         tags.id as tagsId,
         tags.name AS tagName
  FROM assignmentsTags, assignments, tags
  WHERE tags.id = assignmentsTags.tagId AND
        assignments.id = assignmentsTags.assignmentId;
