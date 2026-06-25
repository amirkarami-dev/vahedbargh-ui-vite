import axios from "axios";
import { Cities } from "common/data/Cities";
import { Section } from "common/data/Section";


export  const CityFromSection = (sectionId) => {
       
            const findSection =  Section.filter(e => e.Id === sectionId).map((value,index)=>{
               
                    const findCity = Cities.filter(ee => ee.Id === value.Id_City)
                   
                return {city:findCity[0].CityName}
            });
           // const findCity = await  Cities.filter(ee => ee.Id === findSection.Id_City);
         
           return findSection[0].city
  
}

export  const GetCityWithSection = (sectionId) => {
    const findSection =  Section.filter(e => e.Id === sectionId).map((value,index)=>{
       
            const findCity = Cities.filter(ee => ee.Id === value.Id_City)
           
        return {city:findCity[0]?.CityName , section:value.SectionName }
    });

    if(!findSection[0]){
        console.log("not found", sectionId);
    }
 
   return findSection[0]?.city + "-" + findSection[0]?.section

}
export  const GetCityIdWithSection = (sectionId) => {
       
    const findSection =  Section.filter(e => e.Id === sectionId).map((value,index)=>{
       
            const findCity = Cities.filter(ee => ee.Id === value.Id_City)
           
        return { city:findCity[0] }
    });

    if(!findSection[0]){
        console.log("not found", sectionId);
    }
 
   return findSection[0].city

}

export  const GetSectionIdWithCityId = (cityId) => {
       if(!cityId) return 0
    const findCenterSectionId = Section.filter(f=>f.Id_City === cityId && f.SectionName === 'مرکزی')
 
   return findCenterSectionId[0].Id

}