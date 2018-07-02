create table assignments (id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
                          name VARCHAR(80),
                          title VARCHAR(80),
                          description TEXT,
                          type VARCHAR(80),
                          duration NUMERIC(5,2)
                        );
