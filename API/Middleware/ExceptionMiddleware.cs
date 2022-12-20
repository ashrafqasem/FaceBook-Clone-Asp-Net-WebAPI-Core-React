using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using System.Net;
using Application.Core;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _requestDelegateNext;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _hostEnvironment;
       
        public ExceptionMiddleware(RequestDelegate requestDelegateNext, ILogger<ExceptionMiddleware> logger, IHostEnvironment hostEnvironment)
        {
            this._hostEnvironment = hostEnvironment;
            this._requestDelegateNext = requestDelegateNext;
            this._logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _requestDelegateNext(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Request.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; //. 500

                AppException appExceptionResponse = _hostEnvironment.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error!");

                JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions();
                jsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

                string jsonStr = JsonSerializer.Serialize(appExceptionResponse, jsonSerializerOptions);
                await context.Response.WriteAsync(jsonStr);
            }
        }

    }
}