using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;    
namespace StudentRecordManagerAPI.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Course { get; set; } = string.Empty;

        [Range(1, 100)]
        public int Age { get; set; }
    }
}
