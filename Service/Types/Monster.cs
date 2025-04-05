using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Types
{
    public class Monster
    {
        [Key]
        [Required]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

        public Monster()
        {
            Name = "Mystery";
            Description = "A scary monster.";
        }
    }
}