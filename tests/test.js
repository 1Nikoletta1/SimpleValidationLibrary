describe("easyValidate.checkNumber", function() {

    describe("Function checks a number", function() {

        it("Pass a '123' ", function() {
            assert((easyValidate.checkNumber('123')), "");
        });

        it("Pass a 123", function() {
            assert((easyValidate.checkNumber(123)), "");
        });

        it("Pass a '123a'", function() {
            assert((easyValidate.checkNumber('123a')), "");
        });

        it("Pass a 'abc'", function() {
            assert((isNaN(easyValidate.checkNumber('abc'))), "");
        });

        it("Pass several arguments", function() {
            assert((isNaN(easyValidate.checkNumber('abc', 11, 1))), "");
        });

        it("Don't pass arguments", function() {
            assert((isNaN(easyValidate.checkNumber())), "");
        });

    });

});
