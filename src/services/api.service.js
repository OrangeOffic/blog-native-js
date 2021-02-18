class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl
  }

  async createPost(post) {
    try {

      const request = new Request(this.url + '/posts.json', {
        method: 'POST',
        body: JSON.stringify(post)
      })
  
      return await useRequest(request)

    } catch(error) {
      console.error(error)
    }
  }

  async fetchPosts() {

    try {

      const request = new Request(`${this.url}/posts.json`)

      return await useRequest(request)

    } catch(error) {
      console.error(error)
    }

  }

  async fetchPostById(id) {
    try {
      const request = new Request(`${this.url}/posts/${id}.json`)

      return await useRequest(request)
    } catch(error) {
      console.error(error)
    }
  }
}

async function useRequest(request) {
  const response = await fetch(request)
  return await response.json()
}

export const apiService = new ApiService('https://wfm-js-2d86e-default-rtdb.firebaseio.com')