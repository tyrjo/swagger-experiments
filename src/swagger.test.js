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
    let api;

    before(()=> {
        parser = new SwaggerParser();
        return parser.dereference(swaggerFile)
            .then((derefedSwagger)=> {
                swagger = derefedSwagger;
                api = hippie(swagger)
                    .base("http://localhost:8000");
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

    it("GET /pets", ()=> {
        return expect(
            hippie(swagger)
                .base('http://localhost:8000')
                .get('/pets')
                .expectStatusCode(200)
                .end()
        ).to.be.fulfilled;
    });

    it("POST /pets", ()=> {
        return expect(
            hippie(swagger)
                .base('http://localhost:8000')
                .post('/pets')
                .send({
                    name: 'Neko',
                    type: 'cat'
                })
                .expectStatusCode(201)
                .end()
        ).to.be.fulfilled;
    });

    it("GET /pets/Neko", ()=> {
        return expect(
            hippie(swagger)
                .base('http://localhost:8000')
                .get('/pets/{petName}')
                .pathParams({
                    petName: 'Neko'
                })
                .expectStatusCode(200)
                .end()
        ).to.be.fulfilled;
    });

    it("DELETE /pets/Neko", ()=> {
        return expect(
            hippie(swagger)
                .base('http://localhost:8000')
                .del('/pets/{petName}')
                .pathParams({
                    petName: 'Neko'
                })
                .expectStatusCode(200)
                .end()
        ).to.be.fulfilled;
    });
});