using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Service.Database;
using Service.Managers;

var builder = WebApplication.CreateBuilder(args);
if (builder.Environment.IsProduction())
{
    builder.WebHost.UseUrls("http://0.0.0.0:80"); // Fix for Docker, listen on all network interfaces.
}

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseInMemoryDatabase("MonsterInMemoryDb"));
builder.Services.AddScoped<MonsterManager>();

var app = builder.Build();

// Seed in-memory data for the database.
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    context.SeedInMemoryData();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (Environment.GetEnvironmentVariable("UseHttps") == "true")
{
    app.UseHttpsRedirection();
}

// Configure default files to serve index.html by default
app.UseDefaultFiles(new DefaultFilesOptions
{
    DefaultFileNames = ["index.html"]
});

app.UseStaticFiles();
app.MapControllers();

// Disable CORS since angular will be running on port 4200 and the service on port 5258.
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.Run();
