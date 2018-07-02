const Assignment = require('../../../classes/Assignment.js');
const assignmentName = new Assignment().constructor.name.toLowerCase() + 's';

async function createAssignment(pool, params, origin) {
  try {
    let rowData = await pool.query(`
                                  call insert_assignment( '${params.name}',
                                                          '${params.title}',
                                                          '${params.description}',
                                                          '${params.type}',
                                                          ${params.duration},
                                                          '${params.tags}'
                                                        );
                              `);
    let assignmentId = rowData[0][0]['@new_assignment_id'];

    return {
      status: 201,
      created: Date.now(),
      link: `${origin}/${assignmentName}/${assignmentId}`
    };


  } catch (error) {
    console.log(error);
    ctx.throw(400, 'INVALID_DATA');
  }
}

module.exports = createAssignment;
