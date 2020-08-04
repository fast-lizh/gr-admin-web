import request from '@/utils/request'

export function addArticle(title, html) {
  return request({
    url: '/file/release',
    method: 'post',
    data: {
      title,
      html
    }
  })
}
