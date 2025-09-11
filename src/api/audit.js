import request from '@/utils/request'
export function reqMediaList(params) {
  return request({
    url: '/vadmin/user/review/media',
    method: 'get',
    params
  })
}

export function reqMediaUpload(params) {
  return request({
    url: '/vadmin/user/review/media/upload',
    method: 'get',
    params
  })
}