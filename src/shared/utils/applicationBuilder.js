import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { salaryToString } from '@/shared/utils/priceMask.js'
import { getLocalDate } from '@/shared/utils/getLocalDate.js'

const {
  cityList,
  employmentTypeList,
  divisionList,
  qualificationList,
  skillList,
  searchStatusList
} = useDictionaryStore()

export const applicantBuilder = (applicant) => {
  const arrSkill = applicant?.skillSet?.length ? applicant.skillSet.split(',') :[]
  const city = cityList.find((item) => item?.habrAlias === applicant?.cityId)
  return {
    ...applicant,
    searchStatus: searchStatusList.find((item) => item?.id === applicant.searchStatusId),
    qualification: qualificationList.find((item) => item?.id === applicant.qualificationId),
    division: divisionList.find((item) => item?.id === applicant.divisionId),
    city: city,
    skillSet: arrSkill.map((id) => skillList.find((item) => item?.id === id)).filter(Boolean),
    salaryString: salaryToString(applicant?.salaryFrom, applicant?.salaryTo),
    lastVisited: getLocalDate(applicant?.lastVisited)

  }
}