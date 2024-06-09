import { useDictionaryStore } from '@/app/store/modules/dictionary.js'
import { salaryToString } from '@/shared/utils/priceMask.js'

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
  console.log('arrSkill', arrSkill)
  const city = cityList.find((item) => item?.habrAlias === applicant?.cityId)
  return {
    ...applicant,
    searchStatus: searchStatusList.find((item) => item?.id === applicant.searchStatusId),
    qualification: qualificationList.find((item) => item?.id === applicant.qualificationId),
    division: divisionList.find((item) => item?.id === applicant.divisionId),
    city: city,
    skillSet: arrSkill.map((id) => skillList.find((item) => item?.id === id)),
    salaryString: salaryToString(applicant?.salaryFrom, applicant?.salaryTo)

  }
}