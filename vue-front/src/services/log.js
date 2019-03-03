/**
 * Заглушка логирования запросов.
 */
export default function (name, params, response) {
  console.log(
    ' API request: {\n',
    ' request -', name, '\n',
    ' params -', params, '\n',
    ' result -', response, '\n',
    '}',
  );
}
