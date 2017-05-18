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

    it("GET /pets returns pre-populated mock data", ()=> {
        return expect(
            hippie(swagger)
                .base('http://localhost:8000')
                .get('/pets')
                .expectStatusCode(200)
                .expectBody('[{"name":"Neko","type":"cat"}]')
                .end()
        ).to.be.fulfilled;
    });

    describe("Add and remove 'Liono", ()=> {
        it("POST /pets adds 'Liono'", ()=> {
            return expect(
                hippie(swagger)
                    .base('http://localhost:8000')
                    .post('/pets')
                    .send({
                        name: 'Liono',
                        type: 'cat'
                    })
                    .expectStatusCode(201)
                    .end()
            ).to.be.fulfilled;
        });

        it("GET /pets/Liono", ()=> {
            return expect(
                hippie(swagger)
                    .base('http://localhost:8000')
                    .get('/pets/{petName}')
                    .pathParams({
                        petName: 'Liono'
                    })
                    .expectStatusCode(200)
                    .end()
            ).to.be.fulfilled;
        });

        it("DELETE /pets/Liono", ()=> {
            return expect(
                hippie(swagger)
                    .base('http://localhost:8000')
                    .del('/pets/{petName}')
                    .pathParams({
                        petName: 'Liono'
                    })
                    .expectStatusCode(200)
                    .end()
            ).to.be.fulfilled;
        });
    });
});