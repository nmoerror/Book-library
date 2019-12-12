WMAPP.module("Intro.Router", function(Router) {
  Router.IntroHelloWorldTileRouter = WMAPP.Extension.Router.AppRouter.extend({
    appRoutes: {
      "": "showLibraryListView",

      add: "showAddBookView",

      "edit/:bookId": "showEditBookView",

      "details/:bookId": "showBookDetailsView"
    }
  });
});
