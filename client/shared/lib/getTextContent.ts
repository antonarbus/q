type Props = {
  html: string
}

export const getTextContent = ({ html }: Props): string | null => {
  const span = document.createElement('span')
  span.innerHTML = html
  return span.textContent
}
