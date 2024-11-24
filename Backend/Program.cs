using System.Text;
using System.Text.Json.Serialization;
using BookStore.Repository;
using BookStore.Services.book;
using BookStore.src.Database;
using BookStore.src.Entity;
using BookStore.src.Middlewares;
using BookStore.src.Repository;
using BookStore.src.Services.book;
using BookStore.src.Services.cart;
using BookStore.src.Services.cartItems;
using BookStore.src.Services.category;
using BookStore.src.Services.order;
using BookStore.src.Services.user;
using BookStore.src.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using static BookStore.src.Entity.Order;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// connect database
var dataSourceBuilder = new NpgsqlDataSourceBuilder(
    builder.Configuration.GetConnectionString("Local")
);
dataSourceBuilder.MapEnum<Role>();
dataSourceBuilder.MapEnum<Status>();
dataSourceBuilder.MapEnum<Format>();

var dataSource = dataSourceBuilder.Build();
builder.Services.AddSingleton(dataSource);

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseNpgsql(dataSource);
    //options.UseNpgsql(dataSourceBuilder.Build());
  
});

// add auto-mapper
builder.Services.AddAutoMapper(typeof(MapperProfile).Assembly);






builder
    .Services.AddScoped<IOrderServices, OrderServices>()
    .AddScoped<OrderRepository, OrderRepository>();

builder.Services.AddScoped<IBookService, BookService>().AddScoped<BookRepository, BookRepository>();

builder
    .Services.AddScoped<ICategoryService, CategoryService>()
    .AddScoped<CategoryRepository, CategoryRepository>();

builder.Services.AddScoped<IUserService, UserService>().AddScoped<UserRepository, UserRepository>();

builder.Services.AddScoped<ICartService, CartService>().AddScoped<CartRepository, CartRepository>();

builder
    .Services.AddScoped<ICartItemsService, CartItemsService>()
    .AddScoped<CartItemsRepository, CartItemsRepository>();


// cors
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000","https://sda-3-online-fe-repo-szn0.onrender.com") 
                          .AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed((host) => true)
                            .AllowCredentials();
                      });
});




builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            ),
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

//this is for creating a book. it throws an exception due to a possible cycle if it not included.
// if you want to try and handle it with it this line, go to BookService.CreateOneAsync()
builder
    .Services.AddControllersWithViews()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
    );

// step 1: add controller
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// test if database is connected or not
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

    try
    {
        // Check if the application can connect to the database
        if (dbContext.Database.CanConnect())
        {
            Console.WriteLine("Database is connected");
        }
        else
        {
            Console.WriteLine("Unable to connect to the database.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database connection failed: {ex.Message}");
    }
}


// add middleware
app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<ErrorHandlerMiddleware>();
//cors
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "Hello, this is Feda's backend");
app.Run();
