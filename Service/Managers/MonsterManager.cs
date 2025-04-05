using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Service.Database;
using Service.Types;

namespace Service.Managers
{
    public class MonsterManager
    {
        private readonly MyDbContext _context;

        public MonsterManager(MyDbContext context)
        {
            _context = context;
        }

        private static string GenerateName()
        {
            Random random = new();
            List<string> textPieces = new()
            {
                "Dread",
                "Specter",
                "Shadow",
                "Fang",
                "Nightmare",
                "Gloom",
                "Inferno",
                "Venom"
            };

            string name = "";

            // Combine random pieces of text to form the name
            for (int i = 0; i < 3; i++)
            {
                int index = random.Next(textPieces.Count);
                string fragment = textPieces[index];

                // Use a part of the text fragment (e.g., first half)
                int midPoint = fragment.Length / 2;
                name += i == 0 ? fragment.Substring(0, midPoint) : fragment.Substring(midPoint);
            }

            return name;
        }

        private static string GenerateDescription()
        {
            Random random = new Random();
            List<string> appearances = new List<string>
            {
                "glowing red eyes",
                "scaly green skin",
                "long sharp claws",
                "multiple heads",
                "a skeletal frame"
            };

            List<string> behaviors = new List<string>
            {
                "lurks in the shadows",
                "charges at its prey",
                "emits a spine-chilling howl",
                "moves with lightning speed",
                "spreads an eerie mist"
            };

            List<string> abilities = new List<string>
            {
                "breathe fire",
                "freeze its surroundings",
                "summon minions",
                "camouflage perfectly",
                "control minds"
            };

            // Randomly select attributes to build the description
            string appearance = appearances[random.Next(appearances.Count)];
            string behavior = behaviors[random.Next(behaviors.Count)];
            string ability = abilities[random.Next(abilities.Count)];

            appearance = $"{char.ToUpper(appearance[0])}{appearance.Substring(1)}";

            // Combine into a descriptive sentence
            return $"{appearance}, {behavior}, and can {ability}.";
        }

        public Monster Generate()
        {
            return new Monster()
            {
                Name = GenerateName(),
                Description = GenerateDescription()
            };
        }

        public List<Monster> Load()
        {
            return [.. _context.Monsters];
        }

        public Monster Save(Monster monster)
        {
            Monster result = monster;

            var existing = _context.Monsters.Find(monster.Id);
            if (existing != null)
            {
                existing.Name = monster.Name;
                existing.Description = monster.Description;
                result = existing;
            }
            else
            {
                _context.Monsters.Add(monster);
            }

            _context.SaveChanges();

            return result;
        }
    }
}