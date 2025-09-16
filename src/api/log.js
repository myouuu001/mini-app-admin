import request from '@/utils/request'
export function reqRecordLogins(params) {
  return request({
    url: '/vadmin/record/logins',
    method: 'get',
    params
  })
}