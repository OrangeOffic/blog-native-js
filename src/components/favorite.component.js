import { Component } from "../core/component"
import { apiService } from "../services/api.service"
import { renderPost } from '../templates/post.template'


export class FavoriteComponent extends Component {
  constructor(id, {loader}) {
    super(id)

    this.loader = loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  onShow() {
    this.$el.innerHTML = ''

    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    const html = renderList(favorites)

    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

async function linkClickHandler(e) {
  e.preventDefault()

  if(e.target.classList.contains('js-link')) {
    this.$el.innerHTML = ''
    const postId = e.target.textContent

    this.loader.show()
    const post = await apiService.fetchPostById(postId)
    this.loader.hide()

    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}))
  }
}

function renderList(list = []) {

  if (list && list.length) {

    return list.map(item => {
      return `<li><a href="#" class="js-link">${item}</a></li>`
    })

  }
    
  return '<p>Избранных постов пока нет!</p>'

}