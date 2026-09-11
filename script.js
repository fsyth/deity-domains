let strings = []

async function loadStrings() {
  const response = await fetch('domains.csv')
  const content = await response.text()
  strings = content.split('\n').filter(Boolean)
  generate()
}

function generate() {
  const count = Math.min(3, strings.length)
  const indexes = new Set()

  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * strings.length))
  }

  const elements = [...indexes].map(index => {
    const span = document.createElement('span')
    span.innerText = strings[index]
    return span
  })

  const output = document.getElementById('part-2')
  output.replaceChildren()

  elements.forEach((element, index) => {
    if (index > 0) {
      output.append(index === elements.length - 1 ? ', and ' : ', ')
    }

    output.append(element)
  })
}

document.getElementById('generate').addEventListener('click', generate)

loadStrings()
