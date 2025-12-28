type Props = {
  html: string
}

export const getTextContentFromHtml = (props: Props): string | null => {
  const span = document.createElement('span')
  span.innerHTML = props.html

  return span.textContent
}
