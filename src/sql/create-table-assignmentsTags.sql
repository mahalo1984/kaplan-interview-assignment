create table assignmentsTags (assignmentId BIGINT(20),
                              tagId BIGINT(20),
                              PRIMARY KEY (assignmentId, tagId),
                              FOREIGN KEY (assignmentId) REFERENCES assignments(id),
                              FOREIGN KEY (tagId) REFERENCES tags(id));
