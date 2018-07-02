const Assignment = require('../../../classes/Assignment.js');

async function getAssignmentById(pool, assignmentId, origin) {
    try {
        let itemData = [];

        if(assignmentId != null){
          itemData = await pool.query(
            `call get_assignment_by_id(${assignmentId})`
          );
        } else {
          itemData[0] = null;
        }

        let obj = itemData[0][0];

        let assignment = new Assignment(obj.id, obj.name, obj.title, obj.description, obj.type, obj.duration, origin);

        return assignment.toJson();

    } catch (error) {
        console.log(error);
        ctx.throw(400, 'INVALID_DATA');
    }
}

module.exports = getAssignmentById;
