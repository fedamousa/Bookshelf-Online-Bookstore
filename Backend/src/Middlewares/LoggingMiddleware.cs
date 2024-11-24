
using System.Diagnostics;


namespace BookStore.src.Middlewares
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogInformation(
                $"Incoming request: {context.Request.Method} , {context.Request.Path}"
            );
            var stopwatch = Stopwatch.StartNew();
            await _next(context);

            stopwatch.Stop();

            _logger.LogInformation(
                $"Outgoing request: {context.Response.StatusCode} takes ({stopwatch.ElapsedMilliseconds}ms)"
            );
        }
    }
}
