// createCube accepts a hypercube definition and a function definition
// to be called each time the `changed` event fires on the hypercube
// object.
async function createCube(hyperCubeDef, callback) {
    // Gets the qix doc reference to the app from being added to doc prototype
    const app = this;

    // okFunc checks for existence of a supplied callback function.
    // invokes callback function or empty function.
    const okFunc = await callback
        ? async function (data) {
            await callback(data, app);
        }
        : function () { };

    // Create a session object from the supplied hypercube definition.
    const theData = await app.createSessionObject(hyperCubeDef);
    let dataLayout;

    // When the object changes, get the layout of the updated object
    // and invoke the supplied callback function.
    theData.on("changed", async () => {
        dataLayout = await theData.getLayout();
        await okFunc(dataLayout);
        return theData;
    });

    return theData;
}

// Export the function so it can be added to the doc prototype.
export { createCube };
