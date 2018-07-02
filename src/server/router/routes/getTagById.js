const Tag = require('../../../classes/Tag.js');

async function getTagById(pool, tagId, origin) {
    try {

        let itemData = [];

        if(tagId !== null){
          itemData = await pool.query(
            `call get_tag_by_id(${tagId})`
          );
        } else {
          itemData[0] = null;
        }

        let obj = itemData[0][0];

        return new Tag(obj.id, obj.name, origin).toJson();

    } catch (error) {
        console.log(error);
        ctx.throw(400, 'INVALID_DATA');
    }
}

module.exports = getTagById;
