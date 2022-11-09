"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors = __importStar(require("cors"));
const dotenv = __importStar(require("dotenv"));
const mongoService_1 = require("./persistence/mongoService");
const meal_1 = require("./models/meal");
dotenv.config();
const app = (0, express_1.default)();
const PORT = 8080;
app.use(cors.default());
app.get('/meals/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoService_1.connectToDatabase)().then(() => __awaiter(void 0, void 0, void 0, function* () {
        const meals = yield mongoService_1.collection.Meals.find({}).toArray();
        res.send(meals);
    }));
}));
app.post('/meals/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoService_1.connectToDatabase)().then(() => {
        var _a;
        const meal = new meal_1.Meal({
            mealId: req.query.mealId,
            userId: req.query.userId,
            title: req.query.title,
        });
        (_a = mongoService_1.collection.Meals) === null || _a === void 0 ? void 0 : _a.insertOne(meal);
        res.sendStatus(200);
    });
}));
app.listen(PORT, () => {
    console.log('app is running', PORT);
});
