// Always extend our abstract module when defining a module
WMAPP.module(
  "Intro",
  WMAPP.Extension.Module.AbstractModule.extend({
    // This function will be called when the module is started for the first time.
    // It is not required, but if you do define it, you must remember to apply up the prototype chain
    onStart: function() {
      // Do something if you want
      console.log("Intro module has started");
      // Dont forget to apply the prototype
      WMAPP.Extension.Module.AbstractModule.prototype.onStart.apply(
        this,
        arguments
      );
    },
    // This property maps tile names to their namespace in the code
    tileTypes: {
      intro_hello_world_tile:
        "WMAPP.Intro.Application.IntroHelloWorldTileApplication"
    }
  })
);
