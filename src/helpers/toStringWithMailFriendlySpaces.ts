/**
 * By default, `URLSearchParams.toString()` encodes spaces as `+`. In some mail
 * clients, this results in the `+`s being displayed literally, rather than
 * being converted into a space as they should be.
 *
 * This helper converts `+`s to `%20`s, which seem to be more friendly to mail
 * clients.
 */
export default function toStringWithMailFriendlySpaces(
  params: URLSearchParams
) {
  return params.toString().replaceAll('+', '%20')
}
