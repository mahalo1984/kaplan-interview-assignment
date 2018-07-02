'use strict'

class Assignment
{
  constructor(id, name, title, description, type, duration, origin){
    this.self = `${origin}/assignments/${id}`;
    this.id = id;
    this.name = name;
    this.title = title;
    this.description = description;
    this.type = type;
    this.duration = duration;
    this.tagsUrl = `${origin}/assignments/${id}/tags`;
  }

  toJson(){
    return {
      self: this.self,
      kind: this.constructor.name,
      id: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      type: this.type,
      duration: this.duration,
      tags: this.tagsUrl
    }
  }
}

module.exports = Assignment;
