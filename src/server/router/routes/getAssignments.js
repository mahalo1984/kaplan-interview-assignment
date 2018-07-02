const Assignment = require('../../../classes/Assignment.js');
const Collection = require('../../../classes/Collection.js');

const getAllAssignmentsQuery = require('../../../sql/queries/get-all-assignments.js');


async function getAssignments(pool, tags, origin) {

    try {
        let itemData = null;
        let returnData = null;

        if(tags == null){
          itemData = await pool.query(getAllAssignmentsQuery);
          returnData = itemData;
        } else {
          itemData = await pool.query(`call get_assignments_by_tags('${tags}')`);
          returnData = itemData[0];
        }

        return new Collection(returnData.map((x) => new Assignment(x.id, x.name, x.title, x.description, x.type, x.duration, origin)), origin).toJson();

    } catch (error) {
        console.log(error);
        ctx.throw(400, 'INVALID_DATA');
    }
}

module.exports = getAssignments;
