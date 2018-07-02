const Tag = require('../../../classes/Tag.js');
const Collection = require('../../../classes/Collection.js');

async function getAssignmentTags(pool, assignmentId, origin) {
    try {

        let itemData = [];

        if(assignmentId != null){
          itemData = await pool.query(
            `call get_tags_by_assignment(${assignmentId})`
          );
        }

        return new Collection(itemData[0].map((x) => new Tag(x.id, x.name, origin)), origin).toJson();

    } catch (error) {
        console.log(error);
        ctx.throw(400, 'INVALID_DATA');
    }
}

module.exports = getAssignmentTags;
