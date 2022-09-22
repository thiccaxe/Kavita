using System.IO.Abstractions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace API.Controllers;

/// <summary>
/// All APIs here are for Cypress testing only. They will only work on development builds.
/// </summary>
[AllowAnonymous]
public class TestController : BaseApiController
{
    private readonly IWebHostEnvironment _environment;
    private readonly IDirectoryService _directoryService;

    public TestController(IWebHostEnvironment environment, IDirectoryService directoryService)
    {
        _environment = environment;
        _directoryService = directoryService;
    }

    [HttpGet("test-data-dir")]
    public ActionResult<string> GetTestDataDirectory()
    {
        if (!_environment.IsDevelopment()) return BadRequest("");

        return _directoryService.FileSystem.Path.GetFullPath(
            _directoryService.FileSystem.Path.Join(_directoryService.FileSystem.Directory.GetCurrentDirectory(), "TestData"));
    }
}
