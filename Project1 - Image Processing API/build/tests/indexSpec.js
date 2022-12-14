"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const imageProcessingService_1 = __importDefault(require("../routes/api/services/imageProcessingService"));
const request = (0, supertest_1.default)(index_1.default);
describe('given a filename, width and height to doImgProcessing function', () => {
    it('Should return a promise with the filename-width-height', () => {
        return (0, imageProcessingService_1.default)('fjord', 300, 300)
            .then((result) => {
            expect(result).toEqual('fjord-300-300');
        })
            .catch((err) => {
            expect(err).toEqual(err);
        });
    });
    it('Should return a promise error no file found', () => {
        return (0, imageProcessingService_1.default)('ford', 300, 300)
            .then((result) => {
            expect(result).toEqual('ford-300-300');
        })
            .catch((err) => {
            expect(err).toEqual('Error: Input file is missing: D:\\Learning\\Udacity FWD Advanced Web\\Projects\\Project1 - Image Processing API\\public\\images\\ford.png');
        });
    });
});
describe('given a request parameter', () => {
    it('Should response with 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=katarina');
        expect(response.statusCode).toBe(200);
    }));
    it('Should response with 200 OK if fielname parameter is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filname=katarina');
        expect(response.statusCode).toBe(200);
    }));
    it('Should response with 400 Bad Request if the width is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=katarina&height=300&width=metain');
        expect(response.statusCode).toBe(400);
    }));
    it('Should response with 400 Bad Request if the height is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=katarina&height=toltomeya&width=200');
        expect(response.statusCode).toBe(400);
    }));
});
describe('given a request without parameters', () => {
    it('Should return with 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.statusCode).toBe(200);
    }));
});
