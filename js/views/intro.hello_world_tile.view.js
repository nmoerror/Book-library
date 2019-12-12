WMAPP.module("Intro.View", function(View) {
  // MAIN VIEW
  View.IntroLibraryListView = WMAPP.Extension.View.LayoutView.extend({
    template: function() {
      var tmplStr =
        "<h1>Library</h1>" +
        '<button class="add-book">Add Book</button>' +
        '<div class="wmapp-intro-library-list-region"></div>';
      return tmplStr;
    },

    regions: {
      libraryListRegion: ".wmapp-intro-library-list-region"
    },

    events: {
      "click button.add-book": "onAddBookClicked"
    },

    onRender: function() {
      var libraryListView = new View.IntroLibraryListCompositeView({
        vent: this.options.vent,
        collection: this.options.collection
      });

      this.libraryListRegion.show(libraryListView);
    },

    onAddBookClicked: function(e) {
      e.stopPropagation();
      e.preventDefault();

      this.options.vent.trigger("trigger:library:show:add-book");
    }
  });
  // TABLE ROW VIEW FOR BOOK
  View.IntroLibraryListItemView = WMAPP.Extension.View.ItemView.extend({
    tagName: "tr",

    className: "wmapp-intro-library-list-book",

    template: function(options) {
      var tmplStr =
        "<td>" +
        options.model.get("title") +
        "</td>" +
        "<td>" +
        options.model.get("author") +
        "</td>" +
        "<td>" +
        options.model.get("published_date") +
        "</td>" +
        "<td>" +
        ' <button class="view-details button">View Details</button>' +
        ' <button class="delete-book button alert">Delete</button>' +
        "</td>";
      return tmplStr;
    },

    templateHelpers: function() {
      return this.options;
    },

    events: {
      "click button.view-details": "onViewDetailsClicked",
      "click button.delete-book": "onDeleteBookClicked"
    },

    onViewDetailsClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.options.vent.trigger(
        "trigger:library:show:details",
        this.options.model
      );
    },
    onDeleteBookClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.options.vent.trigger(
        "trigger:library:delete:book",
        this.options.model
      );
    }
  });

  // EMPTY VIEW

  View.IntroLibraryListEmptyView = WMAPP.Extension.View.ItemView.extend({
    tagName: "tr",
    template: function() {
      return '<td colspan="4">The library is empty!</td>';
    }
  });

  View.IntroLibraryListCompositeView = WMAPP.Extension.View.CompositeView.extend(
    {
      className: "wmapp-intro-library-list",

      tagName: "div",

      template: function() {
        var tmplStr =
          "<table>" +
          " <thead>" +
          " <tr>" +
          " <th>Title</th>" +
          " <th>Author</th>" +
          " <th>Published</th>" +
          " <td></td>" +
          " </tr>" +
          " </thead>" +
          " <tbody></tbody>" +
          "</table>";
        return tmplStr;
      },

      childView: View.IntroLibraryListItemView,

      childViewContainer: "tbody",

      childViewOptions: function() {
        return {
          vent: this.options.vent
        };
      },

      getEmptyView: function() {
        return View.IntroLibraryListEmptyView;
      }
    }
  );
  View.IntroLibraryAddBookView = WMAPP.Extension.View.LayoutView.extend({
    // Define the template. It will contain all the fluff (titles, buttons, etc) and will have a div for each user input.
    template: function(options) {
      // We could have written <inputs> into the below template, but then we would have to handle two-way binding of the input to the attribute in the model
      // The WMAPP Extension Views already contain pretty much all the different inputs you could need which handle all this for you.
      var tmplStr =
        "<h2>" +
        (options.isNew ? "Add" : "Edit") +
        " a Book</h2>" +
        '<div class="wmapp-intro-library-book-title-region"></div>' +
        '<div class="wmapp-intro-library-book-author-region"></div>' +
        '<div class="wmapp-intro-library-book-published_date-region"></div>' +
        '<div class="wmapp-intro-library-book-description-region"></div>' +
        '<div class="wmapp-intro-library-book-image-region"></div>' +
        '<button class="cancel">Cancel</button> ' +
        '<button class="save-book">Save Book</button>';
      return tmplStr;
    },
    // Define the template helpers
    templateHelpers: function() {
      // In this helper, we check if the model exists within the collection.
      // If it does, it must already exist, otherwise, assume it is new.
      return {
        isNew: this.options.collection.get(this.options.model) ? false : true
      };
    },
    // Define a region for each of the user inputs
    regions: {
      titleRegion: ".wmapp-intro-library-book-title-region",
      authorRegion: ".wmapp-intro-library-book-author-region",
      publishedDateRegion: ".wmapp-intro-library-book-published_date-region",
      descriptionRegion: ".wmapp-intro-library-book-description-region",
      imageRegion: ".wmapp-intro-library-book-image-region"
    },
    // Define some events
    events: {
      "click button.save-book": "onSaveBookClicked",
      "click button.cancel": "onCancelClicked"
    },
    // When the view is rendered, we'll render the child/sub views
    onRender: function() {
      // This is just a very basic example of using some of the basic user input extension views.
      // We have many different extensions, all with varing levels of complexity. They all may define different options, and those options may be required or optional
      // When working on a project, it is always recommended to look through the extension views to see what is already available, and also see its usage.
      // Initialize a new TextField input from the WMAPP Extension View
      var titleField = new WMAPP.Extension.View.TextField({
        model: this.options.model, // The model to bind this user input to
        name: "title", // The attribute within the model to bind this user input to
        label: "Title", // The label of the user input
        placeholder: "Title" // The placeholder of the user input
      });
      // Show the textField in the appropriate region
      this.titleRegion.show(titleField);
      // Initialize a new TextField input from the WMAPP Extension View
      var authorField = new WMAPP.Extension.View.TextField({
        model: this.options.model, // The model to bind this user input to
        name: "author", // The attribute within the model to bind this user input to
        label: "Author", // The label of the user input
        placeholder: "Author" // The placeholder of the user input
      });
      // Show the textField in the appropriate region
      this.authorRegion.show(authorField);
      // Initialize a new DatePicker input from the WMAPP Extension View
      var publishedDateField = new WMAPP.Extension.View.DatePicker({
        model: this.options.model, // The model to bind this user input to
        name: "published_date", // The attribute within the model to bind this user input to
        label: "Published Date", // The label of the user input
        placeholder: "Published Date" // The placeholder of the user input
      });
      // Show the DatePicker in the appropriate region
      this.publishedDateRegion.show(publishedDateField);
      // Initialize a new TextArea input from the WMAPP Extension View
      var descriptionField = new WMAPP.Extension.View.TextArea({
        model: this.options.model, // The model to bind this user input to
        name: "description", // The attribute within the model to bind this user input to
        label: "Description", // The label of the user input
        placeholder: "Description" // The placeholder of the user input
      });
      // Show the TextArea in the appropriate region
      this.descriptionRegion.show(descriptionField);
      // Initialize a new TextField input from the WMAPP Extension View
      var imageField = new WMAPP.Extension.View.TextField({
        model: this.options.model, // The model to bind this user input to
        name: "image", // The attribute within the model to bind this user input to
        label: "Image URL", // The label of the user input
        placeholder: "Image URL" // The placeholder of the user input
      });
      // Show the textField in the appropriate region
      this.imageRegion.show(imageField);
    },
    // This custom method is called when the "Cancel" button is clicked, as defined above in 'events'
    onCancelClicked: function(e) {
      // Stop propagation and prevent default action
      e.preventDefault();
      e.stopPropagation();
      // If we are editing an existing book, we need to "reset" it back to what it was before we started editing it.
      // Check if the model is already in the library collection
      if (this.options.collection.get(this.options.model)) {
        // Yes, it exists in the collection, so we must be editing an existing book
        // There exists a special property on a model called "_previousAttributes" which remembers the values of the model before it was changed.
        // We can simply set the model to these values, and it will be "reset" back to what it was
        this.options.model.set(this.options.model._previousAttributes);
        // Trigger an event on the 'vent'.
        this.options.vent.trigger(
          "trigger:library:show:details",
          this.options.model
        );
      } else {
        // Trigger an event on the 'vent'.
        this.options.vent.trigger("trigger:library:show:list");
      }
    },
    // This custom method is called when the "Save Book" button is clicked, as defined above in 'events'
    onSaveBookClicked: function(e) {
      // Stop propagation and prevent default action
      e.preventDefault();
      e.stopPropagation();
      // Because we have been "clever" and are reusing this view for both the "add" and "edit" functionality,
      // we need to trigger different events based on whether or not the model is new or existing.
      // Check if the model is already in the library collection
      if (this.options.collection.get(this.options.model)) {
        // Yes, it exists in the collection, so we must be editing an existing book
        // Normally, we'd persist this change to the server, but because we're dealing with a local collection,
        // we actually don't need to do anything, since the fields were bound to the model, the model has already been changed!
        // All we need to do now is show either the list view or details view. Up to you!
        this.options.vent.trigger(
          "trigger:library:show:details",
          this.options.model
        );
      } else {
        // No, it does not exist in the collection, so we must be creating a new book
        // Trigger an event on the 'vent'. We pass through the current model with the event so we can access it back in the application.
        this.options.vent.trigger(
          "trigger:library:add:book",
          this.options.model
        );
      }
    }
  });

  // Define an "Book Details" view, remembering to extend the base ItemView
  // We could use either a LayoutView or ItemView here
  View.IntroLibraryBookDetailsView = WMAPP.Extension.View.ItemView.extend({
    // Define the template
    template: function(options) {
      var tmplStr =
        "<h2>" +
        options.model.get("title") +
        "</h2>" +
        "<p><em>By " +
        options.model.get("author") +
        " (" +
        options.model.get("published_date") +
        ")</em></p>" +
        "<p>" +
        ' <button class="back">Back</button>' +
        ' <button class="edit">Edit</button>' +
        "</p>" +
        "<p>" +
        options.model.get("description") +
        "</p>" +
        '<p><img src="' +
        options.model.get("image") +
        '" /></p>';
      return tmplStr;
    },
    // Define the templateHelpers
    templateHelpers: function() {
      // Return the options the view was initialised with
      return this.options;
    },
    // Define some events
    events: {
      "click button.back": "onBackClicked",
      "click button.edit": "onEditClicked"
    },
    // This custom method is called when the "Back" button is clicked, as defined above in 'events'
    onBackClicked: function(e) {
      // Stop propagation and prevent default action
      e.preventDefault();
      e.stopPropagation();
      // Trigger an event on the 'vent'
      this.options.vent.trigger("trigger:library:show:list");
    },
    // This custom method is called when the "Edit" button is clicked, as defined above in 'events'
    onEditClicked: function(e) {
      // Stop propagation and prevent default action
      e.preventDefault();
      e.stopPropagation();
      // Trigger an event on the 'vent', passing through the current book model
      this.options.vent.trigger(
        "trigger:library:show:edit-book",
        this.options.model
      );
    }
  });
});
