using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
//
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this._dbContext = dbContext;
            this._httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            string userName_ = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name); //.
            string userName = context.User.FindFirstValue(ClaimTypes.Name); //.

            string userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId == null) //' >> user is not authorized
            { 
                return Task.CompletedTask; 
            } 

            Guid activityId = new Guid();
            try
            {
                activityId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());
                //activityId_ = Guid.Parse(context?.Request.RouteValues.SingleOrDefault(x => x.Key == "Id").Value?.ToString()); //. x
            } 
            catch(Exception ex)
            {
                throw new Exception(string.Format("IsHostRequirementHandler, ActivityId is null: {0}", ex.Message));
            }

            //ActivityAppUser activityAppUser = _dbContext.ActivityAppUsers.FindAsync(userId, activityId).Result; //' not gonna work its always tracking
            ActivityAppUser activityAppUser = _dbContext.ActivityAppUsers
                .AsNoTracking() //'n solution
                //.FindAsync(userId, activityId)  //' not gonna work its always tracking
                .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
                .Result; //' its needed 
               
            if(activityAppUser == null) //' >> user is not authorized
            { 
                return Task.CompletedTask; 
            } 

            if(activityAppUser.IsHost)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

}