'use strict'

class Collection
{
  constructor(elements, origin){
    this.self = `${origin}/${elements[0].constructor.name.toLowerCase()}s`;
    this.elements = elements;
  }

  getElement(index){
    return this.elements[index];
  }

  toJson(){
    return {
      self: this.self,
      kind: this.constructor.name,
      contents: this.elements.map(x => x.toJson())
    };
  }
}

module.exports = Collection;
