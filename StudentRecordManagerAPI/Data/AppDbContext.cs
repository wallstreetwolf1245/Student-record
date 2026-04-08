using Microsoft.EntityFrameworkCore;
using StudentRecordManagerAPI.Models;

namespace StudentRecordManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        //This  constructor allows ASP.NET to inject the database settings automatically.
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        //Create/manage a table for student records in the database. The name of the table will be "Students" by convention.

        public DbSet<Student> Students { get; set; }
    }
}