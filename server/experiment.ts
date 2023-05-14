export default function showGreetings(greetings: any) {
  return greetings?.birthday?.mom || 'no such property'
}
