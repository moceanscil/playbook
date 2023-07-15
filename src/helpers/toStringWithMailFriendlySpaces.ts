export default function toStringWithMailFriendlySpaces(
  params: URLSearchParams
) {
  return params.toString().replaceAll('+', '%20')
}
