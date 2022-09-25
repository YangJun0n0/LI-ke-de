import request from '@/utils/request'
/**
 * 图片验证码
 * @returns
 */
export function getimgCodeAPI(clientToken) {
  return request({
    url: `/user-service/user/imageCode/` + clientToken,
    method: 'get',
    responseType: 'blob'
  })
}
/**
 * 登录请求
 * @returns
 */
export function getLoginAPI(data) {
  return request({
    url: `/user-service/user/login`,
    method: 'POST',
    data
  })
}
