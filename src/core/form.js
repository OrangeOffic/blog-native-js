export class Form {
  constructor(form, controls) {
    this.form = form
    this.controls = controls
  }

  value() {
    const value = {}

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    })

    return value

  }

  isValid() {
    let formValid = true

    Object.keys(this.controls).forEach(control => {

      let isValid = true

      this.controls[control].forEach(validator => {
        isValid = validator(this.form[control].value) && isValid
      })

      isValid ? clearError(this.form[control]) : setError(this.form[control])

      formValid = isValid && formValid
    })

    return formValid
  }

  clear() {
    Object.keys(this.controls).forEach(control => {
      this.form[control].value = ''
    })
  }
}

function setError($control) {

  clearError($control)

  const errorMessage = '<p class="validation-error">Введите корректное значение!!</p>'

  $control.classList.add('invalid')
  $control.insertAdjacentHTML('afterend', errorMessage)

}

function clearError($control) {
  
  $control.classList.remove('invalid')

  if ($control.nextSibling) {
    $control.closest('.form-control').removeChild($control.nextSibling)
  }

}