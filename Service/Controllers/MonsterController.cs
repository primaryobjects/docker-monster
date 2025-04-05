using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Service.Types;
using Service.Managers;

namespace Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonsterController : ControllerBase
    {
        private readonly MonsterManager _monsterManager;

        public MonsterController(MonsterManager monsterManager)
        {
            _monsterManager = monsterManager;
        }

        [HttpGet("new")]
        public IActionResult New()
        {
            Monster monster = _monsterManager.Generate();
            return new JsonResult(monster);
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new JsonResult(_monsterManager.Load());
        }

        [HttpPost]
        public IActionResult Save(Monster monster)
        {
            monster = _monsterManager.Save(monster);
            return CreatedAtAction(nameof(Save), new { id = monster.Id }, monster);
        }
    }
}