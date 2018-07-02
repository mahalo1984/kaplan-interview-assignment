const Tag = require('../../../classes/Tag.js');
const Collection = require('../../../classes/Collection.js');
const getAllTagsQuery = require('../../../sql/queries/get-all-tags.js');

async function getTags(pool, origin) {
    try {
        let itemData = await pool.query(getAllTagsQuery);
        return new Collection(itemData.map((x) => new Tag(x.id, x.name, origin)), origin).toJson();

    } catch (error) {
        console.log(error);
        ctx.throw(400, 'INVALID_DATA');
    }
}

module.exports = getTags;
