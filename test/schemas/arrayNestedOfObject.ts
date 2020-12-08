import { buildSchema, getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

class ArrayNestedOfObjects {
    @prop({ type: () => [arrayTypedProp], _id: false })
    arrayTypedProp?: arrayTypedProp[];
}

class arrayTypedProp {
  @prop({ required: true })
  stringProp!: String;
}

let ArrayNestedOfObjectsModel: ReturnModelType<
  typeof ArrayNestedOfObjects,
  {}
>;

ArrayNestedOfObjectsModel = getModelForClass(ArrayNestedOfObjects);

export {ArrayNestedOfObjectsModel};