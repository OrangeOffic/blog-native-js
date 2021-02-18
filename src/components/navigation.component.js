import { Component } from "../core/component";


export class NavigationComponent extends Component {
  constructor(id) {
    super(id)

    this.tabs = []
  }

  init() {

    this.$el.addEventListener('click', tabClickHandler.bind(this))

  }
  

  registerTabs(arr) {
    this.tabs = arr
  }

}

function tabClickHandler(event) {
  if (event.target.classList.contains('tab')) {
    Array.from(this.$el.querySelectorAll('.tab')).forEach((tab) => tab.classList.remove('active'))

    const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)

    this.tabs.forEach(t => t.component.hide())

    activeTab.component.show()

    event.target.classList.add('active')
  }
}