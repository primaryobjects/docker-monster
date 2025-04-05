using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Service.Types;
using Microsoft.EntityFrameworkCore;
using Service.Managers;

namespace Service.Database
{
    public class MyDbContext : DbContext
    {
        public DbSet<Monster> Monsters { get; set; }

        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public void SeedInMemoryData()
        {
            if (Database.IsInMemory())
            {
                MonsterManager monsterManager = new(this);
                Monsters.AddRange(
                    monsterManager.Generate(),
                    monsterManager.Generate()
                );
                SaveChanges();
            }
        }
    }
}