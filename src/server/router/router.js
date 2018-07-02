const Router = require('koa-router');
const Mysql = require('koa-mysql');
const koaBody = require('koa-body');

const pool = require('../db.js');
const router = new Router();

//router routines
const getAssignments = require('./routes/getAssignments.js');
const getAssignmentById = require('./routes/getAssignmentById.js');
const createAssignment = require('./routes/createAssignment.js');
const getTags = require('./routes/getTags.js');
const getTagById = require('./routes/getTagById.js');
const getAssignmentTags = require('./routes/getAssignmentTags');

const Assignment = require('../../classes/Assignment.js');
const Tag = require('../../classes/Tag.js');

//Preprocessing for routes


//Routes

/**
 * @api {get} / Request Data Model of the API
 * @apiName AssignmentApi
 * @apiGroup Origin
 *
 *
 * @apiSuccess {Url} self               the url of this resource.
 * @apiSuccess {Type} kind              the type of this resource.
 * @apiSuccess {Collection} assignments a collection of assignments.
 * @apiSuccess {Collection} getTags     a collection of tags.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "self": "http://localhost:1337",
 *      "kind": "AssignmentsApi",
 *      "assignments": "http://localhost:1337/assignments",
 *      "tags": "http://localhost:1337/tags"
 *     }
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//document the api structure
router.get('/', async (ctx) => {
  try{
    let result = {
      self: ctx.request.origin,
      kind: 'AssignmentsApi',
      assignments: `${ctx.request.origin}/${new Assignment().constructor.name.toLowerCase()}s`,
      tags: `${ctx.request.origin}/${new Tag().constructor.name.toLowerCase()}s`
    };

    ctx.body = result;


  } catch (error) {

    console.log(error);
    ctx.throw(400, 'INVALID_DATA');

  }
});

/**
 * @api {get} /assignments?tags=val1[,val2[,val3] ...] Request a collection of assignments
 * @apiName GetAssignments
 * @apiGroup Assignments
 *
 * @apiParam {String} tags a comma-separated list of tags to search for assignments by.
 *
 * @apiSuccess {Url} self               the url of this resource.
 * @apiSuccess {Type} kind              the type of this resource.
 * @apiSuccess {Collection} contents    a collection of assignments.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "self": "http://localhost:1337/assignments",
 *         "kind": "Collection",
 *         "contents": [
 *            {
 *              "self": "http://localhost:1337/assignments/1",
 *              "kind": "Assignment",
 *              "id": 1,
 *              "name": "Homework 1",
 *              "title": "The Pythagorean Theorem",
 *              "description": "Ten exercise problems to orient students with solving for the length of the hypotenuse",
 *              "type": "homework",
 *              "duration": 60,
 *              "tags": "http://localhost:1337/assignments/1/tags"
 *            },
 *            {
 *              "self": "http://localhost:1337/assignments/2",
 *              "kind": "Assignment",
 *              "id": 2,
 *              "name": "Homework 2",
 *              "title": "The Cross Product",
 *              "description": "Ten exercise problems to orient students with performing the cross product operation",
 *              "type": "homework",
 *              "duration": 60,
 *              "tags": "http://localhost:1337/assignments/2/tags"
 *            }
 *        ]
 *    }
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//get the entire collection of assignments
router.get('/assignments', async (ctx) => {
  let result = await getAssignments(pool, ctx.request.query.tags, ctx.request.origin);
  ctx.body = result;
});

/**
 * @api {post} /assignments Create a new Assignment
 * @apiName CreateAssignment
 * @apiGroup Assignments
 *
 * @apiParam {String} name        The name of the assignment.
 * @apiParam {String} title       The title of the assignment.
 * @apiParam {String} description The description of the assignment.
 * @apiParam {String} type        The type of the assignment.
 * @apiParam {Number} duration    The duration of the assignment.
 * @apiParam {String} tags        A comma-separated list of tags to give the assignment.
 *
 * @apiSuccess {Number} status    The http response code.
 * @apiSuccess {Number} created   The time the resource was created.
 * @apiSuccess {String} link      A link to the newly created resource.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Resource Created
 *     {
 *      "status":201,
 *      "created":1530523455121,
 *      "link":"http://localhost:1337/assignments/18"
 *    }
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//post a new assignment
router.post('/assignments', koaBody(), async (ctx) => {
  console.dir(ctx.request.body);

  let result = await createAssignment(pool, ctx.request.body, ctx.request.origin);
  ctx.body = result;
});

/**
 * @api {get} /assignments/:assignmentId Request Assignment Information
 * @apiName GetAssignmentById
 * @apiGroup Assignments
 *
 * @apiParam {Number} assignmentId An assignment's unique ID.
 *
 * @apiSuccess {Url}    self              the url of this resource.
 * @apiSuccess {Type}   kind              the type of this resource.
 * @apiSuccess {Number} id                a unique id for this resource.
 * @apiSuccess {String} name              the name of the assignment.
 * @apiSuccess {String} title             the title of the assignment.
 * @apiSuccess {String} description       the description of the assignment.
 * @apiSuccess {String} type              the type of the assignment.
 * @apiSuccess {Number} duration          how long the assignment lasts.
 * @apiSuccess {String} tags              a comma-separted list of tags attached to the assignment.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "self": "http://localhost:1337/assignments/1",
 *      "kind": "Assignment",
 *      "id": 1,
 *      "name": "Homework 1",
 *      "title": "The Pythagorean Theorem",
 *      "description": "Ten exercise problems to orient students with solving for the length of the hypotenuse",
 *      "type": "homework",
 *      "duration": 60,
 *      "tags": "http://localhost:1337/assignments/1/tags"
 *    }
 *
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//get an assignment by its id
router.get('/assignments/:assignmentId', async (ctx) => {
  let result = await getAssignmentById(pool, ctx.params.assignmentId, ctx.request.origin);
  ctx.body = result;
});

/**
 * @api {get} /tags  Request a collection of tags
 * @apiName GetTags
 * @apiGroup Tags
 *
 *
 * @apiSuccess {Url} self               the url of this resource.
 * @apiSuccess {Type} kind              the type of this resource.
 * @apiSuccess {Collection} contents    a collection of tags.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * "self": "http://localhost:1337/tags",
 * "kind": "Collection",
 * "contents": [
 *    {
 *    "self": "http://localhost:1337/tags/20",
 *    "kind": "Tag",
 *    "id": 20,
 *    "name": " english"
 *    }
 *    {
 *    "self": "http://localhost:1337/tags/8",
 *    "kind": "Tag",
 *    "id": 8,
 *    "name": "chemistry"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/3",
 *    "kind": "Tag",
 *    "id": 3,
 *    "name": "cross product"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/1",
 *    "kind": "Tag",
 *    "id": 1,
 *    "name": "homework"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/5",
 *    "kind": "Tag",
 *    "id": 5,
 *    "name": "lab"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/2",
 *    "kind": "Tag",
 *    "id": 2,
 *    "name": "math"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/7",
 *    "kind": "Tag",
 *    "id": 7,
 *    "name": "practice test"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/6",
 *    "kind": "Tag",
 *    "id": 6,
 *    "name": "project"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/4",
 *    "kind": "Tag",
 *    "id": 4,
 *    "name": "pythagorean theorem"
 *    }
 * ]
 * }
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//get the entire collection of tags
router.get('/tags', async (ctx) => {
  let result = await getTags(pool, ctx.request.origin);
  ctx.body = result;
});

/**
 * @api {get} /tags/:tagId Request Tag Information
 * @apiName GetTagsById
 * @apiGroup Tags
 *
 * @apiParam {Number} tagId A tag's unique ID.
 *
 * @apiSuccess {Url}    self              the url of this resource.
 * @apiSuccess {Type}   kind              the type of this resource.
 * @apiSuccess {Number} id                a unique id for this resource.
 * @apiSuccess {String} name              the name of the assignment.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "self": "http://localhost:1337/tags/24",
 *      "kind": "Tag",
 *      "id": 24,
 *      "name": "religion"
 *     }
 *
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//get tag by id
router.get('/tags/:tagId', async (ctx) => {
  let result = await getTagById(pool, ctx.params.tagId, ctx.request.origin);
  ctx.body = result;
});

/**
 * @api {get} /assignments/:assignmentId/tags  Request a collection of tags belonging to an assignment
 * @apiName GetAssignmentTags
 * @apiGroup Assignments
 *
 *
 * @apiSuccess {Url} self               the url of this resource.
 * @apiSuccess {Type} kind              the type of this resource.
 * @apiSuccess {Collection} contents    a collection of tags.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * "self": "http://localhost:1337/tags",
 * "kind": "Collection",
 * "contents": [
 *    {
 *    "self": "http://localhost:1337/tags/1",
 *    "kind": "Tag",
 *    "id": 1,
 *    "name": "homework"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/2",
 *    "kind": "Tag",
 *    "id": 2,
 *    "name": "math"
 *    },
 *    {
 *    "self": "http://localhost:1337/tags/4",
 *    "kind": "Tag",
 *    "id": 4,
 *    "name": "pythagorean theorem"
 *    }
 * ]
 * }
 *
 * @apiError INVALID_DATA The request was not properly formatted.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "INVALID_DATA"
 *     }
 */
//get a collection of tags belonging to a particular assignment
router.get('/assignments/:assignmentId/tags', async (ctx) => {
  let result = await getAssignmentTags(pool, ctx.params.assignmentId, ctx.request.origin);
  ctx.body = result;
});

/*
TODO: add in error code responses with more detailed headers and messages
TODO: add pagination for collections
TODO: unit tests
TODO: more comments
TODO: dockerize it
TODO: incorrect tags url, also add parent relationship
*/

module.exports = router;
