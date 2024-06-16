import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { salaryToString } from '@/shared/utils/priceMask.js'
import { getLocalDate } from '@/shared/utils/getLocalDate.js'
import { habrLink, hhLink } from '@/shared/utils/linkHelper.js'

const {
  cityList,
  employmentTypeList,
  divisionList,
  qualificationList,
  skillList,

} = useDictionaryStore()

export const vacancyBuilder = (vac) => {
  const arrSkill = vac?.skillSet?.length ? vac.skillSet.split(',') :[]
  const city = cityList.find((item) => item?.fiasId === vac?.cityId)
  return {
    ...vac,
    city: {
      ...city,
      key: city?.fiasId,
      value: city?.name
    },
    employmentType: employmentTypeList.find((item) => item?.id === vac?.employmentTypeId),
    division: divisionList.find((item) => item?.id === vac?.divisionId),
    skill: arrSkill.map((id) => skillList.find((item) => item?.id === id)),
    qualification: qualificationList.find((item) => item?.id === vac?.qualificationId),
    salaryString: salaryToString(vac?.salaryFrom, vac?.salaryTo),
    localPublishedDate: getLocalDate(vac?.publishedAt),
    habrUrl: habrLink(vac?.habrId),
    hhUrl: hhLink(vac?.hhId),
  }
}