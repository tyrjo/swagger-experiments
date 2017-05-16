import chai from 'chai';
import {expect} from 'chai';
import SwaggerParser from 'swagger-parser';
import chap from 'chai-as-promised';
import hippie from 'hippie-swagger';

chai.use(chap);

describe("swagger test", ()=> {
    let parser;
    const swaggerFile = 'src/swagger.yaml';
    let swagger;
    before(()=> {
        parser = new SwaggerParser();
        return parser.dereference(swaggerFile)
            .then((api)=> {
                swagger = api;
            })
    });

    it("validates", ()=> {
        const promise = parser
            .validate(swaggerFile)
            .then((api)=> {
                //console.log(api);
            });
        return expect(promise).to.be.fullfilled;
    });

    it("dereferences", ()=> {
        return expect(
            parser.dereference(swaggerFile)
        ).to.be.fullfilled;
    });

    it("missing path fails", ()=> {
        return expect(
            hippie(swagger)
                .get('/snarf')
                .end()
        ).to.be.rejectedWith('Swagger spec does not define path: /snarf');
    });

    it("missing option fails", ()=> {
        return expect(
            hippie(swagger)
                .get('/pet')
                .end()
        ).to.be.rejectedWith('Swagger spec does not define path: /pet');
    })
});