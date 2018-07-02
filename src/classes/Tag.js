'use strict';

class Tag
{
  constructor(id, name, origin){
    this.self = `${origin}/tags/${id}`;
    this.id = id;
    this.name = name;
  }

  toJson(){
    return {
      self: this.self,
      kind: this.constructor.name,
      id: this.id,
      name: this.name
    }
  }
}

module.exports = Tag;
