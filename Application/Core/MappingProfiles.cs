using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//
using AutoMapper;
using Domain;
using Application.DTOs;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            
            CreateMap<Activity, ActivityDto>() //' n
                .ForMember(d => d.HostUserName, o => o.MapFrom(s => s.ActivityAppUsers.FirstOrDefault(x => x.IsHost).AppUser.UserName)); 
        
            CreateMap<ActivityAppUser, Profiles.Profile>() //' n
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}