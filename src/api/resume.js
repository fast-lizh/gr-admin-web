import request from '@/utils/request'

export function add(resumeName,resumeUrl) {
  return request({
    url: '/resume/add/',
    method: 'post',
    data:{
      resumeName,
      resumeUrl
    }
  })
}

export function getDownload() {
  return request({
    url: '/resume/getMyResume/',
    method: 'get',
  })
}

