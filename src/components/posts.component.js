import { Component } from "../core/component"
import { apiService } from "../services/api.service"
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template'


export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id)

    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  async onShow() {
    this.loader.show()
    const response = await apiService.fetchPosts()

    const posts = TransformService.fbObjectToArray(response)
    const html = posts.map(post => renderPost(post, {withButton: true}))

    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    
  }

  onHide() {
    this.$el.innerHTML = ''
  }

}

function buttonHandler(e) {
  const id = e.target.dataset.id
  const button = e.target

  if (id) {
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (favorites.includes(id)) {

      button.classList.remove('button-danger')
      button.classList.add('button-primary')
      button.textContent = 'Сохранить'

      favorites = favorites.filter(fId => fId !== id)
      localStorage.setItem('favorites', JSON.stringify(favorites))

    } else {

      button.classList.remove('button-primary')
      button.classList.add('button-danger')
      button.textContent = 'Удалить'

      favorites.push(id)
      localStorage.setItem('favorites', JSON.stringify(favorites))

    }

  }
}

