// Prefix model with base module name
WMAPP.module("Intro.Model", function(Model) {
  //Model Variable to create models and collections in
  Model.Book = WMAPP.Extension.Model.AbstractModel.extend({
    //Define set of detault values for the model
    defaults: {
      id: null,
      title: null,
      author: null,
      published_date: null,
      description: null,
      image: null
    }
  });
  //Define Book Collection
  Model.BookCollection = WMAPP.Extension.Model.Collection.extend({
    model: Model.Book
  });
});
