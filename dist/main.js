"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const all_exceptions_filterX_1 = require("./src/common/filters/all-exceptions.filterX");
const logging_interceptor_1 = require("./src/common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new all_exceptions_filterX_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const allowedOrigins = ['*', process.env.FRONTEND_URL_WEB, process.env.FRONTEND_URL_MOBILE].filter((o) => !!o);
    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(3000);
    console.log(`🚀 Server running on ${process.env.BACKEND_URL}`);
}
bootstrap();
//# sourceMappingURL=main.js.map