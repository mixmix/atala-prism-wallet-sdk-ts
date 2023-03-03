import HelloWorld from "../src/hello/hello-world";

describe('Hello', function () {
    describe('execute method', function () {
        it('should have hello method', function () {
            let hi = new HelloWorld()
            hi.hello()
        });
    });
});
