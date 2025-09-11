import request from '@/utils/request'

export function reqOrder(params) {
  return request({
    url: '/vadmin/platform/order', // ?page=1&limit=10
    method: 'get',
    params
  })
}

export function reqPayment(params) {
  return request({
    url: '/vadmin/platform/payment', // ?page=1&limit=10
    method: 'get',
    params
  })
}