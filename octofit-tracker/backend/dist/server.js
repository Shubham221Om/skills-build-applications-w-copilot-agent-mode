"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
};
exports.getApiBaseUrl = getApiBaseUrl;
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        mongodb: mongoose_1.default.connection.readyState === 1,
        apiBaseUrl: (0, exports.getApiBaseUrl)(),
    });
});
app.use('/api', api_1.default);
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${(0, exports.getApiBaseUrl)()}`);
});
