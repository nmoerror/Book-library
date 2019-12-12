WMAPP.module("Intro.Application", function(Application) {
  Application.IntroHelloWorldTileApplication = WMAPP.Extension.Application.AbstractApplication.extend(
    {
      onStart: function(options) {
        this.options = options;

        this.tileRegion = new WMAPP.Extension.View.Region({
          el: options.regionId
        });
        if (!Backbone.History.started) {
          Backbone.history.start({
            root: "C:/Users/Working Mouse/Desktop/wmapp-introduction/index.html"
          });
        }

        this.router = new WMAPP.Intro.Router.IntroHelloWorldTileRouter({
          controller: this
        });

        this.vent = this._channel.vent;
        this.library = new WMAPP.Intro.Model.BookCollection([
          {
            id: 1,
            title: "To Kill A Mockingbird",
            author: "Harper Lee",
            published_date: "11/07/1960",
            description: 'TODO - write description for "To Kill A Mockingbird"',
            image:
              "https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG"
          },
          {
            id: 2,
            title: "Harry Potter and the Philosopher's Stone",
            author: "JK Rowling",
            published_date: "26/06/1997",
            description:
              'TODO - write description for "Harry Potter and the Philosopher\'s Stone"',
            image:
              "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"
          },
          {
            id: 3,
            title: "Tomorrow, When the War Began",
            author: "John Marsden",
            published_date: "01/01/1993",
            description:
              'TODO - write description for "Tomorrow, When the War Began"',
            image:
              "https://upload.wikimedia.org/wikipedia/en/4/4a/Tomorrow_When_The_War_Began_Front_Cover.JPG"
          }
        ]);

        this.listenTo(
          this.vent,
          "trigger:library:show:add-book",
          this.showAddBookView
        );
        this.listenTo(
          this.vent,
          "trigger:library:show:edit-book",
          this.showEditBookView
        );
        this.listenTo(
          this.vent,
          "trigger:library:show:list",
          this.showLibraryListView
        );
        this.listenTo(
          this.vent,
          "trigger:library:show:details",
          this.showBookDetailsView
        );
        this.listenTo(
          this.vent,
          "trigger:library:add:book",
          this.addBookToLibrary
        );
        this.listenTo(
          this.vent,
          "trigger:library:delete:book",
          this.deleteBookFromLibrary
        );

        this.showLibraryListView();
      },

      onStop: function() {
        this.tileRegion.reset();
        this.stopListening();
      },

      showLibraryListView: function() {
        this.router.navigate("");
        var libraryListView = new WMAPP.Intro.View.IntroLibraryListView({
          vent: this.vent,
          collection: this.library
        });

        this.tileRegion.show(libraryListView);
      },

      showAddBookView: function() {
        this.router.navigate("add");
        var book = new WMAPP.Intro.Model.Book({
          id: this.library.length + 1
        });

        var libraryAddBookView = new WMAPP.Intro.View.IntroLibraryAddBookView({
          vent: this.vent,
          model: book,
          collection: this.library
        });

        this.tileRegion.show(libraryAddBookView);
      },

      showBookDetailsView: function(book) {
        if (typeof book === "string") {
          book = this.library.get(book);
        }

        this.router.navigate(`show/${book.get("id")}`);
        var libraryBookDetailsView = new WMAPP.Intro.View.IntroLibraryBookDetailsView(
          {
            vent: this.vent,
            model: book,
            collection: this.library
          }
        );

        this.tileRegion.show(libraryBookDetailsView);
      },

      showEditBookView: function(book) {
        if (typeof book === "string") {
          book = this.library.get(book);
        }

        this.router.navigate(`edit/${book.get("id")}`);
        var libraryEditBookView = new WMAPP.Intro.View.IntroLibraryAddBookView({
          vent: this.vent,
          model: book,
          collection: this.library
        });

        this.tileRegion.show(libraryEditBookView);
      },

      addBookToLibrary: function(book) {
        this.library.add(book);

        this.showLibraryListView();
      },

      deleteBookFromLibrary: function(book) {
        var confirmed = confirm(
          'Are you sure you want to remove "' +
            book.get("title") +
            '" from the library?'
        );
        if (confirmed) {
          this.library.remove(book);
        }
      }
    }
  );
});
